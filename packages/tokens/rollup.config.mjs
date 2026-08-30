import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import { readFileSync, copyFileSync, mkdirSync } from "fs";

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

// Copy the raw CSS token files into dist so consumers can import them directly.
const copyCss = () => ({
  name: "copy-css",
  writeBundle() {
    mkdirSync("./dist", { recursive: true });
    copyFileSync("./src/tokens.css", "./dist/tokens.css");
    copyFileSync("./src/base.css", "./dist/base.css");
    console.log("\u2713 Copied tokens.css and base.css to dist/");
  },
});

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      copyCss(),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    plugins: [dts()],
  },
];
