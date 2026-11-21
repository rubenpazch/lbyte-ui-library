#!/usr/bin/env node
/**
 * Genera, a partir del código de cada paquete:
 *   - packages/ui/src/index.ts        reexporta todos los componentes y tipos (paquete @rubenpazch/ui)
 *   - packages/ui/package.json        dependencias del paquete ui (una por paquete de componente)
 *   - packages/ui/docs/catalogo.json  catálogo para agentes y herramientas
 *   - packages/ui/docs/COMPONENTES.md catálogo legible (personas y agentes)
 *   - packages/<pkg>/README.md        sección "API" entre marcadores (lo demás se respeta)
 *   - packages/tokens/src/tailwind.css puente de los tokens --lb-* hacia Tailwind 4 (@theme)
 *
 * Fuentes: el bloque "lbyte" de cada package.json (categoría, resumen, cuándo usar / evitar),
 * las exportaciones de src/index.ts y las props de TypeScript (react-docgen-typescript).
 *
 * Uso:
 *   pnpm catalogo          regenera todo
 *   pnpm catalogo:check    falla (exit 1) si algo generado está desactualizado o falta documentación
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const docgen = require("react-docgen-typescript");

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PKGS = path.join(RAIZ, "packages");
const UI = path.join(PKGS, "ui");
const CHECK = process.argv.includes("--check");
const SCOPE = "@rubenpazch/";
const INICIO =
  "<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->";
const FIN = "<!-- catalogo:fin -->";
const CATEGORIAS = {
  base: "Base (tokens y utilidades)",
  acciones: "Acciones",
  formularios: "Formularios",
  navegacion: "Navegación",
  retroalimentacion: "Retroalimentación",
  presentacion: "Presentación de datos",
  datos: "Datos",
  iconos: "Iconos",
  salud: "Salud (pacientes y óptica)",
};
// Paquetes sin componentes: se documentan pero no pasan por docgen.
const SIN_COMPONENTES = new Set(["shared", "tokens"]);

const errores = [];
const salidas = new Map(); // ruta -> contenido

const leerJson = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
// CRLF (Windows) y CR suelto → LF: lo generado debe ser idéntico en Windows y en el CI.
const norm = (s) => s.replace(/\r\n?/g, "\n");

// ---------------------------------------------------------------- paquetes
const paquetes = fs
  .readdirSync(PKGS, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== "ui")
  .map((d) => {
    const dir = path.join(PKGS, d.name);
    const pkgFile = path.join(dir, "package.json");
    if (!fs.existsSync(pkgFile)) return null;
    const pkg = leerJson(pkgFile);
    const clave = pkg.name.replace(SCOPE, "");
    if (
      !pkg.lbyte?.categoria ||
      !pkg.lbyte?.resumen ||
      !pkg.lbyte?.usarCuando
    ) {
      errores.push(
        `${pkg.name}: falta el bloque "lbyte" (categoria, resumen, usarCuando, evitarCuando) en package.json`,
      );
    } else if (!CATEGORIAS[pkg.lbyte.categoria]) {
      errores.push(
        `${pkg.name}: categoría "${pkg.lbyte.categoria}" no válida (${Object.keys(CATEGORIAS).join(", ")})`,
      );
    }
    // npm rechaza la publicación con provenance (E422) si falta repository.url.
    const repoUrl =
      typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url;
    if (
      !pkg.private &&
      !/github\.com\/rubenpazch\/lbyte-ui-library/.test(repoUrl ?? "")
    ) {
      errores.push(
        `${pkg.name}: falta "repository" en package.json ({ "type": "git", "url": "https://github.com/rubenpazch/lbyte-ui-library.git", "directory": "packages/…" }); npm no lo publica sin él`,
      );
    }
    return {
      dir,
      pkgFile,
      pkg,
      clave,
      index: path.join(dir, "src", "index.ts"),
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.clave.localeCompare(b.clave));

// ---------------------------------------------------------------- TypeScript
const opciones = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  esModuleInterop: true,
  allowSyntheticDefaultImports: true,
  skipLibCheck: true,
  strict: true,
  noEmit: true,
  // Los paquetes de la librería se leen desde su src/, no desde dist/: así el catálogo es el
  // mismo antes y después de compilar (en el CI esta comprobación corre antes del build).
  baseUrl: RAIZ,
  paths: Object.fromEntries(
    paquetes.map((p) => [
      p.pkg.name,
      [path.relative(RAIZ, p.index).replace(/\\/g, "/")],
    ]),
  ),
};
const programa = ts.createProgram(
  [
    path.join(RAIZ, "css-module.d.ts"),
    ...paquetes.map((p) => p.index).filter(fs.existsSync),
  ],
  opciones,
);
const checker = programa.getTypeChecker();
const parser = docgen.withCompilerOptions(opciones, {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) =>
    !prop.parent || !/node_modules/.test(prop.parent.fileName),
});

function exportaciones(p) {
  const sf = programa.getSourceFile(p.index);
  if (!sf) return [];
  const mod = checker.getSymbolAtLocation(sf);
  if (!mod) return [];
  return checker.getExportsOfModule(mod).map((s) => {
    const real =
      s.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(s) : s;
    const decl = real.declarations?.[0];
    const archivo = decl?.getSourceFile().fileName;
    // Un "default" se publica con el nombre de su archivo (Stepper.tsx -> Stepper), que coincide
    // con el paquete, aunque la función interna se llame distinto (ProgressSteps).
    const interno = real.name;
    const nombreReal =
      s.name === "default" && archivo
        ? path.basename(archivo).replace(/\.(tsx?|jsx?)$/, "")
        : interno;
    return {
      exportado: s.name,
      nombreReal,
      interno,
      archivo,
      valor: Boolean(real.flags & ts.SymbolFlags.Value),
      tipo: Boolean(
        real.flags &
        (ts.SymbolFlags.Type |
          ts.SymbolFlags.Interface |
          ts.SymbolFlags.TypeAlias),
      ),
      real,
    };
  });
}

// Muestra los valores de una unión ("primary" | "secondary") en vez del alias (ButtonColor).
function tipoLegible(t) {
  if (!t) return "unknown";
  if (t.name === "enum" && Array.isArray(t.value) && t.value.length) {
    let valores = [
      ...new Set(t.value.map((v) => v.value).filter((v) => v !== "undefined")),
    ];
    if (
      valores.some((v) => /ReactElement|ReactPortal|AwaitedReactNode/.test(v))
    )
      return "ReactNode";
    if (valores.includes("false") && valores.includes("true")) {
      valores = [
        "boolean",
        ...valores.filter((v) => v !== "false" && v !== "true"),
      ];
    }
    const texto = valores.join(" | ");
    if (texto.length <= 200) return texto;
  }
  if (t.raw && t.raw.length < 160) return t.raw;
  return t.name ?? "unknown";
}

function props(componentes) {
  const archivos = [
    ...new Set(componentes.map((c) => c.archivo).filter(Boolean)),
  ];
  if (!archivos.length) return new Map();
  const docs = parser.parse(archivos);
  const porNombre = new Map();
  for (const d of docs) {
    const lista = Object.values(d.props)
      .map((pr) => ({
        nombre: pr.name,
        tipo: tipoLegible(pr.type),
        requerido: Boolean(pr.required),
        // Sin CR: en Windows (core.autocrlf) el código llega con CRLF y el catálogo no coincidiría con el CI.
        porDefecto:
          pr.defaultValue?.value != null
            ? norm(String(pr.defaultValue.value))
            : null,
        descripcion: norm(pr.description || "").trim(),
      }))
      .sort(
        (a, b) =>
          Number(b.requerido) - Number(a.requerido) ||
          a.nombre.localeCompare(b.nombre),
      );
    porNombre.set(d.displayName, {
      descripcion: norm(d.description || "").trim(),
      props: lista,
    });
  }
  return porNombre;
}

// ---------------------------------------------------------------- recorrer paquetes
const usados = new Map(); // nombre exportado en ui -> paquete
const lineasIndex = [];
const catalogo = [];

for (const p of paquetes) {
  const exp = exportaciones(p);
  const valores = exp.filter((e) => e.valor);
  const tipos = exp.filter((e) => e.tipo && !e.valor);

  // Un "default" se reexporta con su nombre real, salvo que ya exista un named export del mismo símbolo.
  const valoresUi = [];
  for (const v of valores) {
    if (v.exportado === "default") {
      if (valores.some((o) => o.exportado !== "default" && o.real === v.real))
        continue;
      valoresUi.push({ ...v, como: v.nombreReal });
    } else {
      valoresUi.push({ ...v, como: v.exportado });
    }
  }
  for (const v of [
    ...valoresUi.map((v) => v.como),
    ...tipos.map((t) => t.exportado),
  ]) {
    if (usados.has(v))
      errores.push(
        `Nombre repetido "${v}" en ${p.pkg.name} y ${usados.get(v)}: renómbralo en uno de los dos`,
      );
    usados.set(v, p.pkg.name);
  }

  if (valoresUi.length || tipos.length) {
    const partes = valoresUi.map((v) =>
      v.exportado === v.como ? v.como : `${v.exportado} as ${v.como}`,
    );
    if (partes.length)
      lineasIndex.push(`export { ${partes.join(", ")} } from "${p.pkg.name}";`);
    if (tipos.length)
      lineasIndex.push(
        `export type { ${tipos.map((t) => t.exportado).join(", ")} } from "${p.pkg.name}";`,
      );
  }

  const esComponente = (v) =>
    /^[A-Z]/.test(v.como) && /\.tsx$/.test(v.archivo || "");
  const componentes = SIN_COMPONENTES.has(p.clave)
    ? []
    : valoresUi.filter(esComponente);
  const docs = props(componentes);
  catalogo.push({
    paquete: p.pkg.name,
    carpeta: path.relative(RAIZ, p.dir).replace(/\\/g, "/"),
    categoria: p.pkg.lbyte?.categoria ?? null,
    resumen: p.pkg.lbyte?.resumen ?? p.pkg.description ?? "",
    usarCuando: p.pkg.lbyte?.usarCuando ?? "",
    evitarCuando: p.pkg.lbyte?.evitarCuando ?? "",
    componentes: componentes.map((c) => ({
      nombre: c.como,
      importar: `import { ${c.como} } from "@rubenpazch/ui";`,
      descripcion:
        (docs.get(c.interno) || docs.get(c.nombreReal) || docs.get(c.como))
          ?.descripcion || "",
      props:
        (docs.get(c.interno) || docs.get(c.nombreReal) || docs.get(c.como))
          ?.props || [],
    })),
    otrosValores: valoresUi
      .filter((v) => !componentes.includes(v))
      .map((v) => v.como),
    tipos: tipos.map((t) => t.exportado),
  });
}

// Textos de la plantilla del generador que nadie completó.
for (const c of catalogo) {
  const textos = [
    c.resumen,
    c.usarCuando,
    c.evitarCuando,
    ...c.componentes.map((x) => x.descripcion),
  ];
  if (textos.some((t) => /COMPLETAR/.test(t))) {
    errores.push(
      `${c.paquete}: quedan textos "COMPLETAR" (bloque lbyte o descripción JSDoc del componente)`,
    );
  }
}

// ---------------------------------------------------------------- packages/ui/src/index.ts
salidas.set(
  path.join(UI, "src", "index.ts"),
  `// GENERADO por scripts/catalogo.mjs (pnpm catalogo). No editar a mano.\n` +
    `// Reexporta todos los paquetes @rubenpazch/* para instalar e importar uno solo.\n\n` +
    lineasIndex.join("\n") +
    "\n",
);

// ---------------------------------------------------------------- packages/ui/package.json (dependencias)
const uiPkgFile = path.join(UI, "package.json");
const uiPkg = leerJson(uiPkgFile);
const deps = { ...(uiPkg.dependencies || {}) };
for (const k of Object.keys(deps)) if (k.startsWith(SCOPE)) delete deps[k];
for (const p of paquetes) deps[p.pkg.name] = "workspace:^";
uiPkg.dependencies = Object.fromEntries(
  Object.entries(deps).sort(([a], [b]) => a.localeCompare(b)),
);
salidas.set(uiPkgFile, JSON.stringify(uiPkg, null, 2) + "\n");

// ---------------------------------------------------------------- iconos (packages/icons/src/iconos.ts)
// Formato fijo: i("Nombre", "categoria", "palabra, palabra", "Uso."). El test de icons valida que estén todos.
const iconos = [
  ...fs
    .readFileSync(
      path.join(RAIZ, "packages", "icons", "src", "iconos.ts"),
      "utf8",
    )
    .matchAll(/\bi\(\s*"(\w+)",\s*"(\w+)",\s*"([^"]+)",\s*"([^"]+)",?\s*\)/g),
].map(([, nombre, categoria, palabras, usarPara]) => ({
  nombre,
  categoria,
  palabras: palabras.split(", "),
  usarPara,
}));
if (iconos.length === 0)
  errores.push(
    "No se pudieron leer los iconos de packages/icons/src/iconos.ts",
  );

let mdIconos =
  `<!-- GENERADO por scripts/catalogo.mjs desde packages/icons/src/iconos.ts. No editar a mano. -->\n\n` +
  `# Iconos de @rubenpazch/ui\n\n` +
  `${iconos.length} iconos SVG. Se importan por nombre y solo los que uses entran en el bundle:\n\n` +
  '```tsx\nimport { TrashIcon, PlusIcon } from "@rubenpazch/ui";\n\n<TrashIcon size="sm" /> // sm 16px · md 20px · lg 24px; color = currentColor\n```\n\n' +
  `Reglas: usa el color del texto (\`currentColor\`); un botón solo con icono necesita \`aria-label\` (usa \`IconButton\`). ` +
  `Si no hay un icono adecuado, no lo dibujes en la app: agrégalo a \`packages/icons\` (ver su README).\n`;
const porCategoria = Object.groupBy(iconos, (ic) => ic.categoria);
for (const [cat, lista] of Object.entries(porCategoria)) {
  mdIconos += `\n## ${cat}\n\n| Icono | Usar para | Palabras clave |\n|---|---|---|\n`;
  for (const ic of lista)
    mdIconos += `| \`${ic.nombre}\` | ${ic.usarPara} | ${ic.palabras.join(", ")} |\n`;
}
salidas.set(path.join(UI, "docs", "ICONOS.md"), mdIconos);

// ---------------------------------------------------------------- catálogo JSON
const catalogoJson = {
  paquete: "@rubenpazch/ui",
  generadoPor: "scripts/catalogo.mjs",
  categorias: CATEGORIAS,
  paquetes: catalogo,
  iconos,
};
salidas.set(
  path.join(UI, "docs", "catalogo.json"),
  JSON.stringify(catalogoJson, null, 2) + "\n",
);

// ---------------------------------------------------------------- COMPONENTES.md
const esc = (s) =>
  String(s ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\n+/g, " ");
const tablaProps = (lista) =>
  lista.length
    ? "| Prop | Tipo | Req. | Por defecto | Descripción |\n|---|---|---|---|---|\n" +
      lista
        .map(
          (pr) =>
            `| \`${pr.nombre}\` | \`${esc(pr.tipo)}\` | ${pr.requerido ? "sí" : ""} | ${pr.porDefecto !== null ? `\`${esc(pr.porDefecto)}\`` : ""} | ${esc(pr.descripcion)} |`,
        )
        .join("\n")
    : "_Sin props documentadas._";

let md = `<!-- GENERADO por scripts/catalogo.mjs (pnpm catalogo). No editar a mano. -->
# Componentes de @rubenpazch/ui

Todo se importa desde un solo paquete:

\`\`\`tsx
import { Button, TextInput, Toast } from "@rubenpazch/ui";
\`\`\`

Antes de crear un componente en una app, busca aquí uno que sirva. Si no existe, agrégalo a la
librería (ver AGENTS.md del repo lbyte-ui-library), no lo copies en la app.

## Índice

| Paquete | Categoría | Exporta | Qué es |
|---|---|---|---|
${catalogo
  .map(
    (c) =>
      `| [\`${c.paquete}\`](#${c.paquete.replace(/[@/]/g, "").replace(/[^a-z0-9-]/g, "")}) | ${CATEGORIAS[c.categoria] ?? ""} | ${[...c.componentes.map((x) => x.nombre), ...c.otrosValores].slice(0, 6).join(", ")}${c.componentes.length + c.otrosValores.length > 6 ? ", …" : ""} | ${esc(c.resumen)} |`,
  )
  .join("\n")}
`;

for (const [cat, titulo] of Object.entries(CATEGORIAS)) {
  const grupo = catalogo.filter((c) => c.categoria === cat);
  if (!grupo.length) continue;
  md += `\n## ${titulo}\n`;
  for (const c of grupo) {
    md += `\n### ${c.paquete}\n\n${c.resumen}\n\n- **Usar cuando:** ${c.usarCuando}\n- **Evitar cuando:** ${c.evitarCuando}\n`;
    if (c.categoria === "iconos") {
      md += `\nIconos disponibles (${c.componentes.length}): ${c.componentes.map((x) => `\`${x.nombre}\``).join(", ")}.\n\nProps habituales: \`size\`, \`className\` (y en algunos \`color\`, \`width\`, \`height\`). Ver el tipo de cada icono en su archivo.\n`;
      continue;
    }
    for (const comp of c.componentes) {
      md += `\n#### ${comp.nombre}\n\n${comp.descripcion ? comp.descripcion + "\n\n" : ""}\`\`\`tsx\n${comp.importar}\n\`\`\`\n\n${tablaProps(comp.props)}\n`;
    }
    if (c.otrosValores.length)
      md += `\nOtras exportaciones: ${c.otrosValores.map((v) => `\`${v}\``).join(", ")}.\n`;
    if (c.tipos.length)
      md += `\nTipos: ${c.tipos.map((t) => `\`${t}\``).join(", ")}.\n`;
  }
}
salidas.set(path.join(UI, "docs", "COMPONENTES.md"), md);

// ---------------------------------------------------------------- README de cada paquete
for (const p of paquetes) {
  const c = catalogo.find((x) => x.paquete === p.pkg.name);
  const bloque =
    `${INICIO}\n\n${c.resumen}\n\n- **Usar cuando:** ${c.usarCuando}\n- **Evitar cuando:** ${c.evitarCuando}\n\n` +
    `Se recomienda instalar el paquete completo \`@rubenpazch/ui\` (incluye este). Por separado:\n\n` +
    "```bash\nnpm install " +
    p.pkg.name +
    "\n```\n" +
    (c.categoria === "iconos"
      ? `\nIconos: ${c.componentes.map((x) => `\`${x.nombre}\``).join(", ")}.\n`
      : c.componentes
          .map(
            (comp) =>
              `\n## ${comp.nombre}\n\n${comp.descripcion ? comp.descripcion + "\n\n" : ""}${tablaProps(comp.props)}\n`,
          )
          .join("")) +
    (c.otrosValores.length
      ? `\nOtras exportaciones: ${c.otrosValores.map((v) => `\`${v}\``).join(", ")}.\n`
      : "") +
    (c.tipos.length
      ? `\nTipos: ${c.tipos.map((t) => `\`${t}\``).join(", ")}.\n`
      : "") +
    `\n${FIN}`;
  const f = path.join(p.dir, "README.md");
  const actual = fs.existsSync(f)
    ? norm(fs.readFileSync(f, "utf8"))
    : `# ${p.pkg.name}\n`;
  const i = actual.indexOf(INICIO);
  const j = actual.indexOf(FIN);
  const nuevo =
    i >= 0 && j > i
      ? actual.slice(0, i) + bloque + actual.slice(j + FIN.length)
      : actual.replace(/\s*$/, "") + "\n\n" + bloque + "\n";
  salidas.set(f, nuevo);
}

// ---------------------------------------------------------------- puente Tailwind 4
const tokensCss = norm(
  fs.readFileSync(path.join(PKGS, "tokens", "src", "tokens.css"), "utf8"),
);
const raizTokens = tokensCss.slice(0, tokensCss.indexOf("[data-theme")); // solo :root
const nombres = [
  ...new Set(
    [...raizTokens.matchAll(/(--lb-[a-z0-9-]+)\s*:/g)].map((m) => m[1]),
  ),
];
const mapa = [
  [/^--lb-color-(.+)$/, "--color-lb-$1"],
  [/^--lb-font-(sans|mono)$/, "--font-lb-$1"],
  [/^--lb-font-size-(.+)$/, "--text-lb-$1"],
  [/^--lb-font-weight-(.+)$/, "--font-weight-lb-$1"],
  [/^--lb-line-height-(.+)$/, "--leading-lb-$1"],
  [/^--lb-letter-spacing-(.+)$/, "--tracking-lb-$1"],
  [/^--lb-space-(.+)$/, "--spacing-lb-$1"],
  [/^--lb-radius-(.+)$/, "--radius-lb-$1"],
  [/^--lb-shadow-(.+)$/, "--shadow-lb-$1"],
];
const lineasTw = [];
for (const n of nombres) {
  const regla = mapa.find(([re]) => re.test(n));
  if (regla) lineasTw.push(`  ${n.replace(regla[0], regla[1])}: var(${n});`);
}
salidas.set(
  path.join(PKGS, "tokens", "src", "tailwind.css"),
  `/* GENERADO por scripts/catalogo.mjs (pnpm catalogo). No editar a mano.
 *
 * Puente de los tokens --lb-* hacia Tailwind 4. En el CSS global de la app:
 *
 *   @import "tailwindcss";
 *   @import "@rubenpazch/ui/tokens.css";
 *   @import "@rubenpazch/ui/tailwind.css";
 *
 * Crea utilidades con prefijo lb: bg-lb-primary, text-lb-foreground, border-lb-border,
 * rounded-lb-md, shadow-lb-md, p-lb-4, text-lb-sm, font-lb-sans…
 * "inline" hace que el tema oscuro ([data-theme="dark"]) cambie también estas utilidades.
 */
@theme inline {
${lineasTw.join("\n")}
}
`,
);

// ---------------------------------------------------------------- escribir o comprobar
if (errores.length) {
  console.error("Errores de documentación:\n- " + errores.join("\n- "));
  process.exit(1);
}
// Formatear con prettier (misma configuración que el hook de pre-commit) para que lo generado y
// lo que queda tras el commit sean idénticos.
const prettier = await import("prettier");
const ignorar = path.join(RAIZ, ".prettierignore");
async function formatear(f, contenido) {
  const info = await prettier.getFileInfo(f, {
    ignorePath: fs.existsSync(ignorar) ? ignorar : undefined,
  });
  if (info.ignored || !info.inferredParser) return contenido;
  const config = (await prettier.resolveConfig(f)) ?? {};
  return norm(await prettier.format(contenido, { ...config, filepath: f }));
}

const desactualizados = [];
for (const [f, crudo] of salidas) {
  const contenido = await formatear(f, crudo);
  const actual = fs.existsSync(f) ? norm(fs.readFileSync(f, "utf8")) : null;
  if (actual === contenido) continue;
  if (CHECK) {
    // Primera línea distinta, para entender la diferencia sin tener que reproducirla.
    const a = (actual ?? "").split("\n");
    const b = contenido.split("\n");
    const i = b.findIndex((l, k) => l !== a[k]);
    const linea = i < 0 ? a.length : i;
    desactualizados.push(
      `${path.relative(RAIZ, f)}\n    línea ${linea + 1}\n    actual:   ${(a[linea] ?? "(fin)").trim().slice(0, 160)}\n    generado: ${(b[linea] ?? "(fin)").trim().slice(0, 160)}`,
    );
  } else {
    fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f, contenido);
  }
}
if (CHECK && desactualizados.length) {
  console.error(
    "El catálogo está desactualizado. Ejecuta `pnpm catalogo` y haz commit de:\n- " +
      desactualizados.join("\n- "),
  );
  process.exit(1);
}
const total = catalogo.reduce((n, c) => n + c.componentes.length, 0);
console.log(
  `${CHECK ? "Catálogo al día" : "Catálogo generado"}: ${catalogo.length} paquetes, ${total} componentes.`,
);
