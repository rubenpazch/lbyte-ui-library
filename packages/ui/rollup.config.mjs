import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { copyFileSync, mkdirSync, readFileSync } from "fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

// Todo lo de @rubenpazch/* y React queda como dependencia: este paquete solo reexporta.
const external = (id) => /^@rubenpazch\//.test(id) || /^react(-dom)?(\/|$)/.test(id);

// Los CSS de tokens se publican también desde aquí para que la app importe solo @rubenpazch/ui.
const copiarCss = () => ({
  name: "copiar-css-tokens",
  writeBundle() {
    mkdirSync("./dist", { recursive: true });
    for (const f of ["tokens.css", "base.css"]) copyFileSync(`../tokens/dist/${f}`, `./dist/${f}`);
    copyFileSync("../tokens/src/tailwind.css", "./dist/tailwind.css");
  },
});

export default [
  {
    input: "src/index.ts",
    external,
    output: [
      // "use client": los componentes usan estado e inyectan su CSS en el navegador.
      // Con esto se pueden importar desde cualquier archivo de Next.js (App Router).
      { file: pkg.main, format: "cjs", sourcemap: true, banner: '"use client";' },
      { file: pkg.module, format: "esm", sourcemap: true, banner: '"use client";' },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json", declaration: false }), copiarCss()],
  },
  {
    input: "src/index.ts",
    external,
    output: [{ file: pkg.types, format: "esm" }],
    plugins: [dts()],
  },
];
