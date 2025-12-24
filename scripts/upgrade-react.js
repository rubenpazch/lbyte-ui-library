#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const roots = ["packages", "apps", "tooling"];
const newVersion = "^19.2.3";

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const res = path.resolve(dir, d.name);
    if (d.isDirectory()) return walk(res);
    return res;
  });
}

roots.forEach((root) => {
  const rootPath = path.resolve(__dirname, "..", root);
  if (!fs.existsSync(rootPath)) return;
  const files = walk(rootPath).filter((f) => f.endsWith("package.json"));
  files.forEach((file) => {
    const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
    let changed = false;
    [
      "dependencies",
      "devDependencies",
      "peerDependencies",
      "optionalDependencies",
    ].forEach((depType) => {
      if (!pkg[depType]) return;
      ["react", "react-dom"].forEach((dep) => {
        if (pkg[depType][dep] && typeof pkg[depType][dep] === "string") {
          // update only if it's not already referencing 19
          if (!/^\^?19/.test(pkg[depType][dep])) {
            pkg[depType][dep] = newVersion;
            changed = true;
            console.log(`Updated ${dep} in ${file} (${depType})`);
          }
        }
      });
    });
    if (changed) fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + "\n");
  });
});
console.log("Done.");
