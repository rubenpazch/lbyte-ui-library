#!/usr/bin/env node
/**
 * Crea un icono en packages/icons desde un archivo .svg.
 *
 *   pnpm icono:nuevo <Nombre> <archivo.svg> <categoria> "<palabras, separadas, por coma>" "<Usar para…>"
 *   pnpm icono:nuevo Factura ./factura.svg dinero "factura, comprobante, boleta" "Comprobantes de pago."
 *   pnpm icono:nuevo Banco lucide:landmark dinero "banco, entidad, cuenta" "Cuentas o entidades bancarias."
 *
 * - Genera packages/icons/src/<Nombre>Icon.tsx (tamaños sm/md/lg, currentColor,
 *   decorativo por defecto: aria-hidden, o con `title` si transmite información).
 * - Lo exporta en src/index.ts y agrega sus metadatos en src/iconos.ts.
 * - Ideal: SVG de 24×24 de un set con licencia libre (Lucide, Tabler, Heroicons: MIT/ISC).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(RAIZ, "packages", "icons", "src");
const CATEGORIAS = [
  "acciones",
  "navegacion",
  "estado",
  "archivos",
  "comunicacion",
  "personas",
  "dinero",
  "salud",
  "lugares",
  "otros",
];

const [base, archivo, categoria, palabras, usarPara] = process.argv.slice(2);
const fallar = (m) => {
  console.error(`✗ ${m}`);
  process.exit(1);
};
if (!base || !archivo || !categoria || !palabras || !usarPara)
  fallar(
    'Uso: pnpm icono:nuevo <Nombre> <archivo.svg> <categoria> "<palabras>" "<Usar para…>"',
  );
if (!/^[A-Z][A-Za-z0-9]*$/.test(base))
  fallar("El nombre va en PascalCase, sin 'Icon' (p. ej. Factura).");
if (!CATEGORIAS.includes(categoria))
  fallar(`Categoría no válida: ${CATEGORIAS.join(", ")}`);

const nombre = base.endsWith("Icon") ? base : `${base}Icon`;
const destino = path.join(SRC, `${nombre}.tsx`);
if (fs.existsSync(destino)) fallar(`${nombre} ya existe.`);

// "lucide:<nombre>" toma el SVG del paquete lucide-static (ISC), p. ej. lucide:receipt
const rutaSvg = archivo.startsWith("lucide:")
  ? path.join(
      RAIZ,
      "node_modules",
      "lucide-static",
      "icons",
      `${archivo.slice(7)}.svg`,
    )
  : path.resolve(archivo);
if (!fs.existsSync(rutaSvg))
  fallar(
    `No existe ${rutaSvg}${archivo.startsWith("lucide:") ? " (busca el nombre en https://lucide.dev/icons)" : ""}`,
  );
const svg = fs.readFileSync(rutaSvg, "utf8");
const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 24 24";
const raiz = svg.match(/<svg\b([^>]*)>/)?.[1] ?? "";
const atributo = (n) => raiz.match(new RegExp(`\\b${n}="([^"]+)"`))?.[1];
const interior = svg
  .replace(/^[\s\S]*?<svg\b[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "")
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<title>[\s\S]*?<\/title>/g, "")
  // atributos SVG con guion → camelCase de React
  .replace(
    /\b(stroke|fill|clip|stop|font|text|color)-([a-z])([a-z-]*)=/g,
    (_, a, b, c) =>
      `${a}${b.toUpperCase()}${c.replace(/-([a-z])/g, (__, x) => x.toUpperCase())}=`,
  )
  .replace(/\bclass=/g, "className=")
  .trim();

const trazo = atributo("stroke");
const relleno = atributo("fill") ?? (trazo ? "none" : "currentColor");
const extra = [
  `fill="${relleno === "none" ? "none" : "currentColor"}"`,
  trazo && `stroke="currentColor"`,
  atributo("stroke-width") && `strokeWidth={${atributo("stroke-width")}}`,
  atributo("stroke-linecap") && `strokeLinecap="${atributo("stroke-linecap")}"`,
  atributo("stroke-linejoin") &&
    `strokeLinejoin="${atributo("stroke-linejoin")}"`,
]
  .filter(Boolean)
  .join("\n      ");

fs.writeFileSync(
  destino,
  `import React from "react";

export interface ${nombre}Props extends Omit<React.SVGProps<SVGSVGElement>, "ref"> {
  /** sm 16px · md 20px · lg 24px. */
  size?: "sm" | "md" | "lg";
  /** Texto para lectores de pantalla. Sin él, el icono es decorativo (aria-hidden). */
  title?: string;
}

const PX = { sm: 16, md: 20, lg: 24 } as const;

/** ${usarPara} */
export default function ${nombre}({ size = "md", title, ...props }: ${nombre}Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox}"
      width={PX[size]}
      height={PX[size]}
      ${extra}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      ${interior.split("\n").join("\n      ")}
    </svg>
  );
}
`,
);

const index = path.join(SRC, "index.ts");
let idx = fs.readFileSync(index, "utf8");
idx = idx.replace(
  "\n// Metadatos para la galería",
  `export { default as ${nombre} } from "./${nombre}";\n\n// Metadatos para la galería`,
);
fs.writeFileSync(index, idx);

const meta = path.join(SRC, "iconos.ts");
let m = fs.readFileSync(meta, "utf8");
m = m.replace(
  /\n\];\s*$/,
  `\n  i("${nombre}", "${categoria}", "${palabras}", "${usarPara}"),\n];\n`,
);
fs.writeFileSync(meta, m);

console.log(
  `✓ ${nombre} creado. Revisa la galería (pnpm storybook) y ejecuta pnpm catalogo.`,
);
