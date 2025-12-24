#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const roots = ["packages", "apps"];
const devDeps = {
  "@rubenpazch/eslint-config": "workspace:*",
  "@rubenpazch/typescript-config": "workspace:*",
  "@rollup/plugin-commonjs": "^28.0.2",
  "@rollup/plugin-node-resolve": "^16.0.0",
  "@rollup/plugin-terser": "^0.4.3",
  "@rollup/plugin-typescript": "^12.1.2",
  "@testing-library/react": "^16.1.0",
  "@types/jest": "^29.5.1",
  "@types/react": "^19.0.2",
  "@types/react-dom": "^19.0.2",
  autoprefixer: "^10.4.14",
  eslint: "^9.16.0",
  "identity-obj-proxy": "^3.0.0",
  jest: "^29.5.0",
  "jest-environment-jsdom": "^29.5.0",
  postcss: "^8.4.23",
  prettier: "^3.2.5",
  react: "^19.2.3",
  "react-dom": "^19.2.3",
  rollup: "^4.29.1",
  "rollup-plugin-dts": "^6.1.0",
  "rollup-plugin-postcss": "^4.0.2",
  "rollup-plugin-typescript2": "^0.36.0",
  tslib: "^2.5.2",
  typescript: "^5.0.4",
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const res = path.resolve(dir, d.name);
    if (d.isDirectory()) return walk(res);
    return res;
  });
}

let updatedFiles = [];
roots.forEach((root) => {
  const rootPath = path.resolve(__dirname, "..", root);
  if (!fs.existsSync(rootPath)) return;
  const pkgFiles = walk(rootPath).filter((f) => f.endsWith("package.json"));
  pkgFiles.forEach((file) => {
    const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!pkg.scripts || Object.keys(pkg.scripts).length === 0) return; // only packages with scripts
    pkg.devDependencies = pkg.devDependencies || {};
    // merge: overwrite existing keys with provided versions
    Object.keys(devDeps).forEach((k) => {
      pkg.devDependencies[k] = devDeps[k];
    });
    fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + "\n");
    updatedFiles.push(file);
  });
});

if (updatedFiles.length === 0)
  console.log("No package.json files with scripts found.");
else {
  console.log("Updated devDependencies in:");
  updatedFiles.forEach((f) => console.log(" -", f));
}
