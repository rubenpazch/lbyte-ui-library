#!/usr/bin/env node
/**
 * Configura npm Trusted Publishing (OIDC) en todos los paquetes publicables del monorepo,
 * para que .github/workflows/release.yml publique sin token. Ver docs/PUBLICAR.md.
 *
 *   npm login --auth-type=web        # una vez, con tu cuenta de npm
 *   pnpm trusted-publishing --dry-run
 *   pnpm trusted-publishing
 *
 * Es idempotente: si un paquete ya confía en este repo y workflow, lo salta.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = "rubenpazch/lbyte-ui-library";
const WORKFLOW = "release.yml";
const NPM = ["-y", "npm@latest"]; // `npm trust` necesita npm >= 11.16
const dryRun = process.argv.includes("--dry-run");

const npm = (args, opciones = {}) =>
  spawnSync("npx", [...NPM, ...args], {
    encoding: "utf8",
    shell: process.platform === "win32",
    ...opciones,
  });

const quien = npm(["whoami"]);
if (quien.status !== 0) {
  console.error(
    "✗ No hay sesión de npm. Ejecuta primero: npm login --auth-type=web",
  );
  process.exit(1);
}
console.log(
  `Sesión npm: ${quien.stdout.trim()} · repo ${REPO} · workflow ${WORKFLOW}${dryRun ? " · DRY RUN" : ""}\n`,
);

const paquetes = fs
  .readdirSync(path.join(RAIZ, "packages"))
  .map((d) => path.join(RAIZ, "packages", d, "package.json"))
  .filter((f) => fs.existsSync(f))
  .map((f) => JSON.parse(fs.readFileSync(f, "utf8")))
  .filter((p) => !p.private)
  .map((p) => p.name)
  .sort();

let configurados = 0;
let saltados = 0;
const fallidos = [];

for (const nombre of paquetes) {
  const lista = npm(["trust", "list", nombre, "--json"]);
  const yaConfia =
    lista.status === 0 &&
    lista.stdout.includes(REPO) &&
    lista.stdout.includes(WORKFLOW);
  if (yaConfia) {
    console.log(`= ${nombre} (ya configurado)`);
    saltados++;
    continue;
  }
  const args = [
    "trust",
    "github",
    nombre,
    "--file",
    WORKFLOW,
    "--repo",
    REPO,
    "--allow-publish",
    "--yes",
  ];
  if (dryRun) args.push("--dry-run");
  // stdio heredado: si npm pide 2FA (código o navegador), lo verás y podrás responder.
  const r = npm(args, { stdio: "inherit" });
  if (r.status === 0) {
    console.log(`✓ ${nombre}`);
    configurados++;
  } else {
    console.log(`✗ ${nombre}`);
    fallidos.push(nombre);
  }
}

console.log(
  `\nConfigurados: ${configurados} · ya estaban: ${saltados} · fallidos: ${fallidos.length}`,
);
if (fallidos.length) {
  console.log(
    `Reintenta (es idempotente): pnpm trusted-publishing\nFallidos: ${fallidos.join(" ")}`,
  );
  process.exit(1);
}
