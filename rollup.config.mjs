import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { readFileSync } from "fs";

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import image from "@rollup/plugin-image";

export default [
  {
    input: "src/index.ts",
    external: [...Object.keys(packageJson.devDependencies)],
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        name: "lbyte-ui-library",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
      }),
      postcss({
        extract: false,
        writeDefinitions: true,
        modules: true,
        namedExports: true,
        plugins: [],
      }),
      image(),
      sizeSnapshot(),
      terser(),
    ],
    watch: {
      clearScreen: false,
    },
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
