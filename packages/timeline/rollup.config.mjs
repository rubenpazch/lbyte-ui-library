import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import autoprefixer from "autoprefixer";
import { readFileSync } from "fs";

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);
const deps = Object.keys(packageJson.dependencies ?? {});

// React y las dependencias declaradas (incluidos otros @rubenpazch/*) no se empaquetan.
const external = (id) =>
  /^react(-dom)?(\/|$)/.test(id) ||
  deps.some((d) => id === d || id.startsWith(d + "/"));

export default [
  {
    input: "src/index.ts",
    external,
    output: [
      { file: packageJson.main, format: "cjs", sourcemap: true },
      { file: packageJson.module, format: "esm", sourcemap: true },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({ extract: false, modules: true, plugins: [autoprefixer()] }),
      terser(),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/, external],
  },
];
