import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import {
  readFileSync,
  copyFileSync,
  mkdirSync,
  readdirSync,
  existsSync,
} from "fs";
import { dirname, join } from "path";

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

// Copy Material Symbols font files
const copyFonts = () => ({
  name: "copy-fonts",
  writeBundle() {
    try {
      const distFontsDir = "./dist/files";
      mkdirSync(distFontsDir, { recursive: true });

      const fontPackages = [
        "@fontsource/material-symbols-outlined",
        "@fontsource/material-symbols-rounded",
        "@fontsource/material-symbols-sharp",
      ];

      let copiedCount = 0;
      for (const pkg of fontPackages) {
        const pkgPath = join("node_modules", pkg, "files");
        if (existsSync(pkgPath)) {
          const files = readdirSync(pkgPath);
          for (const file of files) {
            if (file.match(/\.(woff2?|ttf)$/)) {
              copyFileSync(join(pkgPath, file), join(distFontsDir, file));
              copiedCount++;
            }
          }
        }
      }
      console.log(`✓ Copied ${copiedCount} font files to dist/files/`);
    } catch (err) {
      console.error("Failed to copy font files:", err);
    }
  },
});

export default [
  // Main bundle
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
  // Styles bundle with fonts
  {
    input: "src/styles.ts",
    output: {
      file: "dist/styles.js",
      format: "esm",
    },
    plugins: [
      resolve(),
      postcss({
        extract: false,
        inject: true,
        minimize: false,
      }),
      copyFonts(),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
