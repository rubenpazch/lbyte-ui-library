import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import { readFileSync, copyFileSync, mkdirSync } from "fs";
import { dirname } from "path";

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

// Copy styles.css to dist
const copyStyles = () => ({
  name: "copy-styles",
  writeBundle() {
    try {
      mkdirSync(dirname("./dist/styles.css"), { recursive: true });
      copyFileSync("./src/styles.css", "./dist/styles.css");
      console.log("✓ Copied styles.css to dist/");
    } catch (err) {
      console.error("Failed to copy styles.css:", err);
    }
  },
});

export default [
  {
    input: "src/index.ts",
    external: ["react", "classnames"],
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
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      postcss({
        extract: false,
        modules: true,
        plugins: [],
      }),
      terser(),
      copyStyles(),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
