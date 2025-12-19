import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

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
    "@chromatic-com/storybook",
    "@storybook/addon-webpack5-compiler-babel",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  webpackFinal: async (config) => {
    // Configure Babel to handle TypeScript type imports
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Find the Babel loader rule and update its options
    const babelLoaderRule = config.module.rules.find((rule) => {
      if (typeof rule !== 'object' || !rule || !('test' in rule)) return false;
      return rule.test instanceof RegExp && (rule.test.test('.tsx') || rule.test.test('.ts'));
    });

    if (babelLoaderRule && typeof babelLoaderRule === 'object' && 'use' in babelLoaderRule) {
      const useArray = Array.isArray(babelLoaderRule.use) ? babelLoaderRule.use : [babelLoaderRule.use];
      useArray.forEach((use: any) => {
        if (use && typeof use === 'object' && use.loader && use.loader.includes('babel-loader')) {
          use.options = use.options || {};
          use.options.presets = [
            '@babel/preset-env',
            '@babel/preset-react',
            ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
          ];
        }
      });
    }

    // Resolve aliases for workspace packages
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
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
  },
};

export default config;
