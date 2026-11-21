import type { StorybookConfig } from "@storybook/react-vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ["../../../packages/*/src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  docs: {},
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || { alias: {} };
    // Cada @rubenpazch/<paquete> apunta a su src/ (se edita sin compilar).
    // Se genera desde packages/, así los paquetes nuevos no requieren tocar este archivo.
    const paquetes = path.resolve(__dirname, "../../../packages");
    const alias: Record<string, string> = {};
    for (const dir of fs.readdirSync(paquetes)) {
      const pkgFile = path.join(paquetes, dir, "package.json");
      const src = path.join(paquetes, dir, "src");
      if (!fs.existsSync(pkgFile) || !fs.existsSync(path.join(src, "index.ts")))
        continue;
      const { name } = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
      alias[name] = src;
    }
    config.resolve.alias = { ...(config.resolve.alias || {}), ...alias };
    return config;
  },
};

export default config;
