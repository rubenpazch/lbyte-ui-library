import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import autoprefixer from "autoprefixer";
import fs from "fs";
import path from "path";

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve("./package.json"), "utf8"),
);

export default [
  {
    input: "src/index.ts",
    external: ["react", "react-dom", "@rubenpazch/shared", "@rubenpazch/icons"],
    output: [
      {
        file: packageJson.main || "dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module || "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: false,
        modules: true,
        plugins: [autoprefixer()],
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
