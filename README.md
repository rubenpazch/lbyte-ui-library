# Lbyte UI Library - Monorepo

A modern React component library built with **Turborepo** and **pnpm workspaces**. Each component is published as an independent npm package for on-demand installation.

## 📦 Monorepo Architecture

This project uses a monorepo structure where each component is its own package:

```
lbyte-ui-library/
├── packages/
│   ├── shared/              → @rubenpazch/shared (common utilities & styles)
│   ├── button/              → @rubenpazch/button
│   ├── link/                → @rubenpazch/link
│   ├── icons/               → @rubenpazch/icons
│   ├── drawer/              → @rubenpazch/drawer
│   └── ...                  (all other components)
├── apps/
│   └── storybook/           → Centralized documentation
└── tooling/
    ├── typescript-config/   → Shared TypeScript configs
    └── eslint-config/       → Shared ESLint configs
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0

```bash
# Set correct Node version
nvm use

# Install pnpm globally if needed
npm install -g pnpm
```

### Installation

```bash
# Install all dependencies and link workspace packages
pnpm install
```

## 📝 Development Scripts

```bash
# Build all packages (Turborepo + Rollup)
pnpm build

# Run tests across all packages
pnpm test

# Watch mode for tests
pnpm test:watch

# Lint all packages
pnpm lint

# Format code
pnpm format

# Start Storybook documentation
pnpm storybook

# Build Storybook for deployment
pnpm build-storybook

# Clean all build artifacts
pnpm clean
```

## 📚 Available Packages

### Core Components

- `@rubenpazch/button` - Modern button with variants
- `@rubenpazch/link` - Styled link component
- `@rubenpazch/icon-button` - Icon button
- `@rubenpazch/square-button` - Square button variant
- `@rubenpazch/input-button` - Input button

### Navigation

- `@rubenpazch/navbar` - Navigation bar
- `@rubenpazch/menu` / `@rubenpazch/menu-mobile` - Menu components
- `@rubenpazch/drawer` / `@rubenpazch/drawer-menu-mobile` - Drawer components

### Form Inputs

- `@rubenpazch/text-input` - Text input
- `@rubenpazch/text-area` - Text area

### Icons & Layout

- `@rubenpazch/icons` - Icon library
- `@rubenpazch/page` - Page wrapper
- `@rubenpazch/background` - Background component
- `@rubenpazch/shared` - Shared utilities & styles

## 💻 Usage

### Install Only What You Need

```bash
pnpm add @rubenpazch/button @rubenpazch/icons
```

### Import and Use

```tsx
import Button from "@rubenpazch/button";
import { MenuIcon } from "@rubenpazch/icons";

function App() {
  return (
    <Button leftIcon={<MenuIcon />} color="primary">
      Click Me
    </Button>
  );
}
```

## 🏗️ Building Individual Packages

```bash
# Build specific package
cd packages/button
pnpm build

# Or filter from root
pnpm turbo build --filter=@rubenpazch/button
```

## 📖 Documentation

```bash
pnpm storybook
# Visit http://localhost:6006
```

## 🚢 Deployment

Configure `.npmrc` with your tokens:

```
registry=https://registry.npmjs.org/
@rubenpazch:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
```

Publish with changesets:

```bash
pnpm changeset
pnpm changeset version
pnpm release
```

## 🧪 Tech Stack

- React 18 + TypeScript
- Turborepo (orchestration)
- pnpm workspaces
- Rollup (bundling)
- Storybook (docs)
- Jest + Testing Library
- CSS Modules

## 📄 License

MIT © Ruben Paz Chuspe
