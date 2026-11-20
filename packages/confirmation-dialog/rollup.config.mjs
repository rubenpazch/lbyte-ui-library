import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import fs from "fs";
import path from "path";

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve("./package.json"), "utf8"),
);
const deps = Object.keys(packageJson.dependencies ?? {});
// React y las dependencias declaradas no se empaquetan.
const external = (id) =>
  /^react(-dom)?(\/|$)/.test(id) || deps.some((d) => id === d || id.startsWith(d + "/"));

export default [
  {
    input: "src/index.ts",
    external,
    output: [
      { file: packageJson.main || "dist/index.cjs.js", format: "cjs" },
      { file: packageJson.module || "dist/index.esm.js", format: "esm" },
    ],
    // rollup plugins array, not ESLint
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: false,
        modules: true,
        // postcss plugins array, not ESLint
        plugins: [],
      }),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    // rollup plugins array, not ESLint
    plugins: [dts()],
    external: [/\.css$/],
  },
];
