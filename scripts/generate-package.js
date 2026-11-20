#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";

async function write(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, { encoding: "utf8" });
}

function kebabToPascal(name) {
  return name
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

async function main() {
  const args = process.argv.slice(2);
  if (!args[0]) {
    console.error("Usage: generate-package <package-name> [@scope]");
    process.exit(1);
  }

  const rawName = args[0];
  const scope = args[1] || "@rubenpazch";
  const pkgName = `${scope}/${rawName}`;
  const pkgDir = path.resolve(process.cwd(), "packages", rawName);
  const componentName = kebabToPascal(rawName);

  const pkgJson = {
    name: pkgName,
    version: "1.0.0",
    description: `${componentName} component`,
    private: false,
    main: "dist/index.cjs.js",
    module: "dist/index.esm.js",
    types: "dist/index.d.ts",
    repository: {
      type: "git",
      url: "https://github.com/rubenpazch/lbyte-ui-library.git",
      directory: `packages/${rawName}`,
    },
    author: "Ruben Paz Chuspe <rubenpazchuspe@outlook.com>",
    license: "MIT",
    files: ["dist"],
    sideEffects: ["**/*.css"],
    exports: {
      ".": {
        import: "./dist/index.esm.js",
        require: "./dist/index.cjs.js",
        types: "./dist/index.d.ts",
      },
    },
    scripts: {
      build: "rollup -c",
      test: "jest --passWithNoTests",
      "test:watch": "jest --watch",
      lint: "eslint src",
      clean: "rm -rf dist",
    },
    peerDependencies: {
      "@rubenpazch/tokens": "workspace:*",
      react: "^19.2.3",
      "react-dom": "^19.2.3",
    },
    dependencies: {
      "@rubenpazch/shared": "workspace:*",
    },
    devDependencies: {
      "@rubenpazch/eslint-config": "workspace:*",
      "@rubenpazch/typescript-config": "workspace:*",
    },
    publishConfig: {
      access: "public",
    },
    // Metadatos para el catálogo (pnpm catalogo). Completar antes de abrir el PR:
    // pnpm catalogo:check falla mientras categoria sea "COMPLETAR".
    lbyte: {
      categoria: "COMPLETAR",
      resumen: "COMPLETAR: qué es, en una frase.",
      usarCuando: "COMPLETAR: en qué casos usarlo.",
      evitarCuando: "COMPLETAR: cuándo usar otro componente y cuál.",
    },
  };

  const indexTs = `export { default } from './${componentName}';\n`;

  const componentTsx = `import React from 'react';
import styles from './${componentName}.module.css';

const classNames = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

// Documenta cada prop con /** ... */: el catálogo (pnpm catalogo) usa estos comentarios.
export interface ${componentName}Props {
  /** Contenido del componente */
  children?: React.ReactNode;
  /** Clase extra para márgenes o posición (no para cambiar el estilo interno) */
  className?: string;
}

/** COMPLETAR: descripción del componente en una o dos frases. */
export default function ${componentName}({ children, className }: ${componentName}Props) {
  return (
    <div className={classNames(styles['${rawName}'], className)} data-testid="${rawName}">
      {children}
    </div>
  );
}
`;

  // Solo tokens --lb-* (ver packages/tokens/src/tokens.css): nada de hex ni px sueltos.
  const cssModule = `.${rawName} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--lb-space-2) var(--lb-space-4);
  font-family: var(--lb-font-sans);
  color: var(--lb-color-foreground);
  border-radius: var(--lb-radius-md);
}
`;

  const story = `import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ${componentName}, { type ${componentName}Props } from './${componentName}';

const meta: Meta<${componentName}Props> = {
  title: 'Components/${componentName}',
  component: ${componentName} as any,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<${componentName}Props>;

export const Default: Story = {
  args: {
    children: '${componentName} Component',
  },
};
`;

  const test = `import React from 'react';
import { render, screen } from '@testing-library/react';
import ${componentName} from './${componentName}';
import styles from './${componentName}.module.css';

test('renders ${componentName}', () => {
  render(<${componentName}>Hello</${componentName}>);
  const element = screen.getByTestId('${rawName}');
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent('Hello');
  expect(element).toHaveClass(styles['${rawName}']);
});
`;

  // La sección entre marcadores la completa pnpm catalogo; lo de fuera se puede escribir a mano.
  const readme = `# ${pkgName}\n\n<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->\n<!-- catalogo:fin -->\n`;

  const rollupConfig = `import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import fs from 'fs';
import path from 'path';

const packageJson = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));

export default [
  {
    input: "src/index.ts",
    external: ["react", "react-dom", "@rubenpazch/shared"],
    output: [
      { file: packageJson.main || 'dist/index.cjs.js', format: "cjs" },
      { file: packageJson.module || 'dist/index.esm.js', format: "esm" },
    ],
    // rollup plugins array, not ESLint
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        extract: false,
        modules: true,
        // postcss plugins array, not ESLint
        plugins: []
      }),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    // rollup plugins array, not ESLint
    plugins: [dts()],
    external: [/\\.css$/],
  },
];
`;

  const tsconfig = {
    extends: "@rubenpazch/typescript-config/react.json",
    compilerOptions: {
      outDir: "dist",
      rootDir: "src",
      declarationDir: "dist",
    },
    include: ["src", "../../css-module.d.ts"],
    exclude: ["node_modules", "dist", "**/*.stories.*", "**/*.test.*"],
  };

  const jestConfig = `module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\\\.(css|less|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["../shared/src/setupTests.ts"],
  transform: {
    "^.+\\\\.(ts|tsx|js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
};
`;

  const babelConfig = `module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript'
  ]
};
`;

  try {
    await write(
      path.join(pkgDir, "package.json"),
      JSON.stringify(pkgJson, null, 2) + "\n",
    );
    await write(path.join(pkgDir, "src", `${componentName}.tsx`), componentTsx);
    await write(path.join(pkgDir, "src", "index.ts"), indexTs);
    await write(
      path.join(pkgDir, "src", `${componentName}.module.css`),
      cssModule,
    );
    // put stories next to the component so Storybook resolves source imports reliably
    await write(
      path.join(pkgDir, "src", `${componentName}.stories.tsx`),
      story,
    );
    await write(path.join(pkgDir, "src", `${componentName}.test.tsx`), test);
    await write(path.join(pkgDir, "README.md"), readme);
    // write rollup, tsconfig, jest and babel config files for build/test
    await write(path.join(pkgDir, "rollup.config.mjs"), rollupConfig);
    await write(
      path.join(pkgDir, "tsconfig.json"),
      JSON.stringify(tsconfig, null, 2),
    );
    await write(path.join(pkgDir, "jest.config.js"), jestConfig);
    await write(path.join(pkgDir, "babel.config.js"), babelConfig);
    console.log(`✅ Package scaffolded at packages/${rawName}`);
    console.log(`📦 Siguientes pasos (detalle en AGENTS.md):
  1. pnpm install                         (enlaza el paquete nuevo)
  2. src/${componentName}.tsx              lógica + JSDoc en cada prop
  3. src/${componentName}.module.css       estilos solo con tokens --lb-*
  4. src/${componentName}.stories.tsx      historias de cada variante
  5. src/${componentName}.test.tsx         pruebas
  6. packages/${rawName}/package.json      completar el bloque "lbyte" (categoria, resumen, usarCuando, evitarCuando)
  7. pnpm catalogo                         lo agrega a @rubenpazch/ui, al catálogo y a su README
  8. pnpm test && pnpm build
  9. pnpm changeset                        minor para el paquete nuevo y para @rubenpazch/ui`);
  } catch (err) {
    console.error("❌ Failed to scaffold package", err);
    process.exit(1);
  }
}

main();
