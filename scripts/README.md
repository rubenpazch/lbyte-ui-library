# Package Generator

Automated script to scaffold new component packages in the lbyte-ui-library monorepo.

## 📋 Overview

The `generate-package.js` script creates a complete, ready-to-use component package with all necessary configuration files, boilerplate code, and best practices already set up.

## 🚀 Usage

### Basic Command

```bash
npm run generate <package-name>
```

or

```bash
node scripts/generate-package.js <package-name>
```

### With Custom Scope

```bash
node scripts/generate-package.js <package-name> @your-scope
```

**Default scope:** `@rubenpazch`

### Examples

```bash
# Generate a button-group package
npm run generate button-group

# Generate with custom scope
node scripts/generate-package.js modal @mycompany
```

## 📦 What Gets Generated

The script creates a complete package structure in `packages/<package-name>/`:

```
packages/<package-name>/
├── package.json              # Package manifest with dependencies
├── README.md                 # Package documentation
├── tsconfig.json             # TypeScript configuration
├── jest.config.js            # Jest test configuration
├── babel.config.js           # Babel configuration for Jest
├── rollup.config.mjs         # Rollup bundler configuration
└── src/
    ├── index.ts              # Package entry point
    ├── <ComponentName>.tsx   # React component
    ├── <ComponentName>.stories.tsx  # Storybook stories
    └── <ComponentName>.test.tsx     # Jest tests
```

## 🔧 Generated Files Details

### `package.json`

- **Version:** `1.0.0`
- **Main fields:**
  - `main`: CommonJS bundle (`dist/index.cjs.js`)
  - `module`: ES module bundle (`dist/index.esm.js`)
  - `types`: TypeScript definitions (`dist/index.d.ts`)
- **Exports:** Properly configured for dual package (CJS/ESM)
- **Scripts:**
  - `build`: Builds the package using Rollup
  - `test`: Runs Jest tests
- **Peer Dependencies:** React 19+
- **Dev Dependencies:** `@rubenpazch/typescript-config` (workspace reference)

### Component File (`<ComponentName>.tsx`)

Generated with:

- Exported TypeScript interface (`<ComponentName>Props`)
- Functional component with React
- **Tailwind CSS** ready (no CSS imports needed)
- Basic props: `children`, `className`
- Example Tailwind classes applied

```tsx
export interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Component({ children, className }: ComponentProps) {
  return <div className={`p-4 ${className || ""}`}>{children}</div>;
}
```

### Storybook Stories (`<ComponentName>.stories.tsx`)

- **Storybook 7+** compatible syntax
- Includes React import (required for JSX)
- Exported TypeScript types
- Meta configuration with:
  - Component title
  - Layout centered
  - Autodocs enabled
- Default story example
- Type-safe using `StoryObj<Props>`

### Test File (`<ComponentName>.test.tsx`)

- **Jest** test setup
- React Testing Library imports
- Basic render test example
- Uses `@testing-library/jest-dom` matchers

### `rollup.config.mjs`

Configured with:

- **Dual output:** CommonJS and ES modules
- **Plugins:**
  - `@rollup/plugin-node-resolve`: Resolves node_modules
  - `@rollup/plugin-commonjs`: Converts CommonJS to ES6
  - `rollup-plugin-typescript2`: TypeScript support
  - `rollup-plugin-postcss`: CSS/PostCSS processing (Tailwind ready)
  - `rollup-plugin-dts`: TypeScript declaration bundling
- **Externals:** React, ReactDOM, `@rubenpazch/shared`
- Uses `fs.readFileSync` to avoid JSON import assertion issues

### `tsconfig.json`

- Extends `@rubenpazch/typescript-config/react.json`
- Configured paths:
  - `outDir`: `dist`
  - `rootDir`: `src`
  - `declarationDir`: `dist`
- Includes: `src/`, CSS module types
- Excludes: `node_modules`, `dist`, test/story files

### `jest.config.js`

- **Environment:** jsdom (browser simulation)
- **CSS/SCSS mocking:** Uses `identity-obj-proxy`
- **Setup:** Shared setupTests from `packages/shared`
- **Transform:** Babel for TS/TSX/JS/JSX
- Ignores `node_modules`

### `babel.config.js`

Presets configured for Jest:

- `@babel/preset-env`: Targets current Node version
- `@babel/preset-react`: JSX with automatic runtime
- `@babel/preset-typescript`: TypeScript support

## 🎨 Styling Approach

**Tailwind CSS v4** is used for styling:

- ✅ **No separate CSS files** generated
- ✅ Use Tailwind utility classes directly in components
- ✅ Tailwind is configured at the **monorepo root**
- ✅ All packages share the same Tailwind configuration
- ✅ PostCSS pipeline processes Tailwind automatically

### Example:

```tsx
// Use Tailwind classes directly
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click me
</button>
```

## 🔄 Workflow After Generation

1. **Generate the package:**

   ```bash
   npm run generate my-component
   ```

2. **Install dependencies** (from monorepo root):

   ```bash
   pnpm install
   ```

3. **Develop your component:**
   - Edit `packages/my-component/src/MyComponent.tsx`
   - Add Tailwind CSS classes for styling
   - Update props interface as needed

4. **Add stories:**
   - Edit `packages/my-component/src/MyComponent.stories.tsx`
   - Add different component variations
   - Test in Storybook: `pnpm storybook`

5. **Write tests:**
   - Edit `packages/my-component/src/MyComponent.test.tsx`
   - Run tests: `pnpm test`

6. **Build the package:**

   ```bash
   pnpm -F @rubenpazch/my-component build
   ```

7. **Use in other packages:**
   ```tsx
   import MyComponent from "@rubenpazch/my-component";
   ```

## 📚 Naming Conventions

- **Package names:** `kebab-case` (e.g., `button-group`, `text-input`)
- **Component names:** `PascalCase` (e.g., `ButtonGroup`, `TextInput`)
- **File names:** Match component name for `.tsx`, use kebab-case for CSS

The generator automatically converts:

- `button-group` → `ButtonGroup` component
- `text-input` → `TextInput` component

## 🛠️ Integration with Monorepo

### Turborepo

All generated packages automatically work with Turborepo tasks:

- `pnpm build` - Builds all packages
- `pnpm test` - Runs all tests
- `pnpm -F @rubenpazch/my-component build` - Build specific package

### Storybook

Generated stories are automatically discovered by Storybook:

- Story pattern: `packages/*/src/**/*.stories.tsx`
- Run Storybook: `pnpm storybook`
- Build Storybook: `pnpm build-storybook`

### TypeScript

- Shared TypeScript config via `@rubenpazch/typescript-config`
- Type declarations bundled in `dist/index.d.ts`
- CSS module types from monorepo root

## 🔍 Troubleshooting

### Package not found after generation

**Solution:** Run `pnpm install` at the monorepo root to register the new workspace package.

### Tests failing with "Cannot find module"

**Solution:** Ensure `pnpm install` has been run and `babel.config.js` is present in the package.

### Storybook not showing stories

**Solution:**

1. Check story file is in `src/` directory
2. Restart Storybook dev server
3. Verify story file has `.stories.tsx` extension

### Build errors with CSS

**Solution:** Tailwind is configured at the root. No need to import CSS files. Use Tailwind classes directly.

### TypeScript errors in generated code

**Solution:**

1. Run `pnpm install` at root
2. Check `@rubenpazch/typescript-config` is available
3. Restart TypeScript server in your editor

## 📖 Best Practices

1. **Use semantic package names** that describe the component's purpose
2. **Export the interface** from your component for better TypeScript support
3. **Write comprehensive stories** covering all component variants
4. **Add tests** for important component behaviors
5. **Use Tailwind utilities** instead of custom CSS when possible
6. **Document your component** in the README.md
7. **Keep components small and focused** on a single responsibility

## 🔗 Related Documentation

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Rollup Documentation](https://rollupjs.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🤝 Contributing

To improve the generator:

1. Edit `scripts/generate-package.js`
2. Test by generating a new package
3. Update this README if you change the structure
4. Submit a PR with your improvements

---

**Happy component building! 🚀**
