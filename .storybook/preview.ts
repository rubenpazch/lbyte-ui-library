//import { Decorator } from "@storybook/react-webpack5";
import { Preview } from "@storybook/react-webpack5";
import "../src/index.css";
//import { decorateWithContrastMode } from "./decorators/contrast-mode";
import "./styles/preview-setup.css";
//import { themes } from 'storybook/theming';

//export const decorators = [decorateWithContrastMode];

const preview: Preview = {
  parameters: {
    //actions: { argTypesRegex: "^on[A-Z].*" },
    //controls: {
    //  matchers: {
    //    color: /(background|color)$/i,
    //    date: /Date$/,
    //  },
    //},
    //darkMode: {
    //  // Override the default dark theme
    //  dark: { ...themes.dark, appBg: 'black' },
    //  // Override the default light theme
    //  light: { ...themes.normal, appBg: 'red' }
    //},
  },
};

export default preview;
