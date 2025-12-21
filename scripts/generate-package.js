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
    private: true,
    main: 'dist/index.cjs.js',
    module: 'dist/index.esm.js',
    types: 'dist/index.d.ts',
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
      react: '^18.0.0',
      'react-dom': '^18.0.0'
    },
    devDependencies: {
      "@rubenpazch/typescript-config": "workspace:*"
    },
  };

  const indexTs = `export { default } from './${componentName}';\n`;

  const componentTsx = `import React from 'react';\nimport './${rawName}.css';\n\nexport interface ${componentName}Props {
  children?: React.ReactNode;
  className?: string;
}\n\nexport default function ${componentName}({ children, className }: ${componentName}Props) {
  return (
    <button className={className ? className : '${rawName}'}>
      {children}
    </button>
  );
}\n`;

  const css = `.${rawName} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
}
`;

  const story = `import { Meta, StoryObj } from '@storybook/react';\nimport ${componentName} from './${componentName}';\n\nconst meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
};\n\nexport default meta;\n\ntype Story = StoryObj<typeof ${componentName}>;\n\nexport const Default: Story = {
  args: {
    children: '${componentName}',
  },
};\n`;

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
import packageJson from "./package.json" assert { type: "json" };

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
      postcss({ extract: false, modules: false }),
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
    ".(css|less|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["../shared/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
};
`;

  try {
    await write(path.join(pkgDir, 'package.json'), JSON.stringify(pkgJson, null, 2));
    await write(path.join(pkgDir, 'src', `${componentName}.tsx`), componentTsx);
    await write(path.join(pkgDir, 'src', 'index.ts'), indexTs);
    await write(path.join(pkgDir, 'src', `${rawName}.css`), css);
    // put stories next to the component so Storybook resolves source imports reliably
    await write(path.join(pkgDir, 'src', `${componentName}.stories.tsx`), story);
    await write(path.join(pkgDir, 'src', `${componentName}.test.tsx`), test);
    await write(path.join(pkgDir, 'README.md'), readme);
    // write rollup, tsconfig and jest config files for build/test
    await write(path.join(pkgDir, 'rollup.config.mjs'), rollupConfig);
    await write(path.join(pkgDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));
    await write(path.join(pkgDir, 'jest.config.js'), jestConfig);
    console.log(`Package scaffolded at packages/${rawName}`);
  } catch (err) {
    console.error('Failed to scaffold package', err);
    process.exit(1);
  }
}

main();
