import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../../../packages/*/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../packages/*/src/**/*.mdx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || { alias: {} };
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@rubenpazch/shared': path.resolve(__dirname, '../../../packages/shared/src'),
      '@rubenpazch/shared/styles': path.resolve(__dirname, '../../../packages/shared/src/styles.css'),
      '@rubenpazch/button': path.resolve(__dirname, '../../../packages/button/src'),
      '@rubenpazch/background': path.resolve(__dirname, '../../../packages/background/src'),
      '@rubenpazch/drawer': path.resolve(__dirname, '../../../packages/drawer/src'),
      '@rubenpazch/drawer-menu-mobile': path.resolve(__dirname, '../../../packages/drawer-menu-mobile/src'),
      '@rubenpazch/icon-button': path.resolve(__dirname, '../../../packages/icon-button/src'),
      '@rubenpazch/icons': path.resolve(__dirname, '../../../packages/icons/src'),
      '@rubenpazch/input-button': path.resolve(__dirname, '../../../packages/input-button/src'),
      '@rubenpazch/link': path.resolve(__dirname, '../../../packages/link/src'),
      '@rubenpazch/menu': path.resolve(__dirname, '../../../packages/menu/src'),
      '@rubenpazch/menu-mobile': path.resolve(__dirname, '../../../packages/menu-mobile/src'),
      '@rubenpazch/navbar': path.resolve(__dirname, '../../../packages/navbar/src'),
      '@rubenpazch/page': path.resolve(__dirname, '../../../packages/page/src'),
      '@rubenpazch/square-button': path.resolve(__dirname, '../../../packages/square-button/src'),
      '@rubenpazch/text-area': path.resolve(__dirname, '../../../packages/text-area/src'),
      '@rubenpazch/text-input': path.resolve(__dirname, '../../../packages/text-input/src'),
    };

    return config;
  }
};

export default config;
