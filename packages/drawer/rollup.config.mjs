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

export default [
  {
    input: "src/index.ts",
    external: ["react", "react-dom", "@rubenpazch/icons"],
    output: [
      { file: packageJson.main || "dist/index.cjs.js", format: "cjs" },
      { file: packageJson.module || "dist/index.esm.js", format: "esm" },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
        check: false,
      }),
      postcss({
        extract: false,
        modules: true,
        plugins: [],
      }),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
