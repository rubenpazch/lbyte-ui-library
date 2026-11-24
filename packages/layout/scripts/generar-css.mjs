#!/usr/bin/env node
// Genera src/Layout.module.css: las clases utilitarias que usan Flex, Stack, Inline, Grid…
// Cada prop tiene una clase por valor y por punto de quiebre (sm_, md_, lg_, xl_).
// No edites el CSS a mano: cambia este archivo y corre `pnpm --filter @rubenpazch/layout css`.
import { writeFileSync } from "fs";

const ESPACIOS = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16];
const PUNTOS = { sm: "40rem", md: "48rem", lg: "64rem", xl: "80rem" };

const ALINEAR = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};
const JUSTIFICAR = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

/** prefijo -> { valor: "declaraciones" } */
const utilidades = {
  dir: Object.fromEntries(
    ["row", "column", "row-reverse", "column-reverse"].map((v) => [
      v,
      `flex-direction: ${v};`,
    ]),
  ),
  align: Object.fromEntries(
    Object.entries(ALINEAR).map(([k, v]) => [k, `align-items: ${v};`]),
  ),
  justify: Object.fromEntries(
    Object.entries(JUSTIFICAR).map(([k, v]) => [k, `justify-content: ${v};`]),
  ),
  wrap: {
    wrap: "flex-wrap: wrap;",
    nowrap: "flex-wrap: nowrap;",
    "wrap-reverse": "flex-wrap: wrap-reverse;",
  },
  ji: Object.fromEntries(
    ["start", "center", "end", "stretch"].map((v) => [
      v,
      `justify-items: ${v};`,
    ]),
  ),
  gap: Object.fromEntries(
    ESPACIOS.map((n) => [n, `gap: var(--lb-space-${n});`]),
  ),
  p: Object.fromEntries(
    ESPACIOS.map((n) => [n, `padding: var(--lb-space-${n});`]),
  ),
  px: Object.fromEntries(
    ESPACIOS.map((n) => [n, `padding-inline: var(--lb-space-${n});`]),
  ),
  py: Object.fromEntries(
    ESPACIOS.map((n) => [n, `padding-block: var(--lb-space-${n});`]),
  ),
  cols: Object.fromEntries(
    Array.from({ length: 12 }, (_, i) => [
      i + 1,
      `grid-template-columns: repeat(${i + 1}, minmax(0, 1fr));`,
    ]),
  ),
  span: {
    ...Object.fromEntries(
      Array.from({ length: 12 }, (_, i) => [
        i + 1,
        `grid-column: span ${i + 1} / span ${i + 1};`,
      ]),
    ),
    full: "grid-column: 1 / -1;",
  },
  hide: { true: "display: none;", false: "display: var(--lb-layout-display);" },
};

const BASE = `/* Generado por scripts/generar-css.mjs — no editar a mano. */

.flex {
  --lb-layout-display: flex;
  display: flex;
  min-width: 0;
}

.inlineFlex {
  --lb-layout-display: inline-flex;
  display: inline-flex;
}

.grid {
  --lb-layout-display: grid;
  display: grid;
  min-width: 0;
}

/* Columnas automáticas: tantas como quepan con un ancho mínimo, sin puntos de quiebre. */
.autoCols {
  grid-template-columns: repeat(
    var(--lb-grid-fill, auto-fill),
    minmax(min(var(--lb-grid-min, 16rem), 100%), 1fr)
  );
}

.gridItem {
  --lb-layout-display: block;
  min-width: 0;
}

.grow {
  flex: 1 1 0%;
  min-width: 0;
}

.spacer {
  flex: 1 1 auto;
}

.minh-screen {
  min-height: 100vh;
  min-height: 100dvh;
}

.minh-full {
  min-height: 100%;
}

.container {
  --lb-layout-display: block;
  box-sizing: border-box;
  width: 100%;
  margin-inline: auto;
  max-width: var(--lb-container-max, 64rem);
}

.size-sm { --lb-container-max: 40rem; }
.size-md { --lb-container-max: 48rem; }
.size-lg { --lb-container-max: 64rem; }
.size-xl { --lb-container-max: 80rem; }
.size-2xl { --lb-container-max: 96rem; }
.size-full { --lb-container-max: none; }
`;

function bloque(pref) {
  const lineas = [];
  for (const [prop, valores] of Object.entries(utilidades)) {
    for (const [valor, decl] of Object.entries(valores)) {
      lineas.push(`${pref ? "  " : ""}.${pref}${prop}-${valor} { ${decl} }`);
    }
  }
  return lineas.join("\n");
}

let css = BASE + "\n" + bloque("") + "\n";
for (const [bp, ancho] of Object.entries(PUNTOS)) {
  css += `\n@media (min-width: ${ancho}) {\n${bloque(`${bp}_`)}\n}\n`;
}

writeFileSync(new URL("../src/Layout.module.css", import.meta.url), css);
console.log("Layout.module.css generado");
