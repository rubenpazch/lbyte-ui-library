#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

async function write(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, { encoding: 'utf8' });
}

function kebabToPascal(name) {
  return name
    .split(/[-_]/)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

async function main() {
  const args = process.argv.slice(2);
  if (!args[0]) {
    console.error('Usage: generate-package <package-name> [@scope]');
    process.exit(1);
  }

  const rawName = args[0];
  const scope = args[1] || '@rubenpazch';
  const pkgName = `${scope}/${rawName}`;
  const pkgDir = path.resolve(process.cwd(), 'packages', rawName);
  const componentName = kebabToPascal(rawName);

  const pkgJson = {
    name: pkgName,
    version: '1.0.0',
    description: `${componentName} component`,
    private: false,
    main: 'dist/index.cjs.js',
    module: 'dist/index.esm.js',
    types: 'dist/index.d.ts',
    repository: {
      type: 'git',
      url: 'https://github.com/rubenpazch/lbyte-ui-library.git',
      directory: `packages/${rawName}`
    },
    author: 'Ruben Paz Chuspe <rubenpazchuspe@outlook.com>',
    license: 'MIT',
    files: ['dist'],
    sideEffects: false,
    exports: {
      '.': {
        import: './dist/index.esm.js',
        require: './dist/index.cjs.js',
        types: './dist/index.d.ts'
      }
    },
    scripts: {
      build: 'rollup -c',
      test: 'jest --passWithNoTests',
    },
    peerDependencies: {
      react: '^19.0.0',
      'react-dom': '^19.0.0'
    },
    devDependencies: {
      "@rubenpazch/typescript-config": "workspace:*"
    },
    publishConfig: {
      access: 'public'
    }
  };

  const indexTs = `export { default } from './${componentName}';\n`;

  const componentTsx = `import React from 'react';

export interface ${componentName}Props {
  children?: React.ReactNode;
  className?: string;
}

export default function ${componentName}({ children, className }: ${componentName}Props) {
  return (
    <div className={\`p-4 \${className || ''}\`}>
      {children}
    </div>
  );
}
`;

  const css = `.${rawName} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
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

  const test = `import React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport ${componentName} from './${componentName}';\n\ntest('renders ${componentName}', () => {
  render(<${componentName}>Hello</${componentName}>);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});\n`;

  const readme = `# ${componentName}\n\nGenerated component package.\n`;

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
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        extract: false,
        modules: false,
        plugins: []
      }),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
    external: [/\\.css$/],
  },
];
`;

  const tsconfig = {
    extends: '@rubenpazch/typescript-config/react.json',
    compilerOptions: {
      outDir: 'dist',
      rootDir: 'src',
      declarationDir: 'dist'
    },
    include: ['src', '../../css-module.d.ts'],
    exclude: ['node_modules', 'dist', '**/*.stories.*', '**/*.test.*']
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
    await write(path.join(pkgDir, 'package.json'), JSON.stringify(pkgJson, null, 2));
    await write(path.join(pkgDir, 'src', `${componentName}.tsx`), componentTsx);
    await write(path.join(pkgDir, 'src', 'index.ts'), indexTs);
    // No CSS file - using Tailwind CSS classes
    // put stories next to the component so Storybook resolves source imports reliably
    await write(path.join(pkgDir, 'src', `${componentName}.stories.tsx`), story);
    await write(path.join(pkgDir, 'src', `${componentName}.test.tsx`), test);
    await write(path.join(pkgDir, 'README.md'), readme);
    // write rollup, tsconfig, jest and babel config files for build/test
    await write(path.join(pkgDir, 'rollup.config.mjs'), rollupConfig);
    await write(path.join(pkgDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));
    await write(path.join(pkgDir, 'jest.config.js'), jestConfig);
    await write(path.join(pkgDir, 'babel.config.js'), babelConfig);
    console.log(`✅ Package scaffolded at packages/${rawName}`);
    console.log(`📦 Next steps:
  1. cd packages/${rawName}
  2. Update src/${componentName}.tsx with your component logic
  3. Add Tailwind classes for styling
  4. Update src/${componentName}.stories.tsx with your stories
  5. Add tests in src/${componentName}.test.tsx
  6. Run 'pnpm install' at the root to link dependencies
  7. Run 'pnpm test' to run tests
  8. Run 'pnpm build' to build the package`);
  } catch (err) {
    console.error('❌ Failed to scaffold package', err);
    process.exit(1);
  }
}

main();
