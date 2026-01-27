# Integration Guide: Lbyte UI Library Setup

This guide covers how to integrate `@rubenpazch/lbyte-ui-library` components into external projects using different build systems.

## Quick Start (All Bundlers)

### 1. Install Dependencies

```bash
npm install @rubenpazch/button @rubenpazch/icons @rubenpazch/shared
# or
pnpm add @rubenpazch/button @rubenpazch/icons @rubenpazch/shared
```

This automatically includes:

- Component packages
- `@fontsource/material-symbols-*` fonts (self-hosted)
- All dependencies

### 2. Import Shared Styles (Once in Entry Point)

**main.tsx / main.jsx / index.js:**

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "@rubenpazch/shared/styles"; // ← Import once globally
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 3. Use Components

```tsx
import { Button } from "@rubenpazch/button";
import { MaterialIcon } from "@rubenpazch/icons";

export default function App() {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<MaterialIcon name="search" />}
    >
      Search
    </Button>
  );
}
```

---

## Vite Setup

### Configuration (No Special Config Needed!)

Vite handles everything automatically:

- ✅ CSS imports
- ✅ CSS Modules
- ✅ @fontsource packages
- ✅ Tree-shaking

**vite.config.ts** (optional, for optimization):

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@rubenpazch/button",
      "@rubenpazch/icons",
      "@rubenpazch/shared",
      "@fontsource/material-symbols-outlined",
      "@fontsource/material-symbols-rounded",
      "@fontsource/material-symbols-sharp",
    ],
  },
});
```

### Installation

```bash
npm install @rubenpazch/button @rubenpazch/icons @rubenpazch/shared
```

**That's it!** Just import the styles in your entry point and use components.

---

## Webpack Setup

### Configuration Required

**webpack.config.js:**

```javascript
module.exports = {
  // ... other config
  module: {
    rules: [
      // Handle TypeScript/TSX
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // Handle CSS and CSS Modules
      {
        test: /\.css$/,
        use: [
          "style-loader", // Or MiniCssExtractPlugin.loader for production
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true, // Enable CSS modules for .module.css
              },
            },
          },
          "postcss-loader", // For @fontsource imports
        ],
      },
      // Handle font files
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
```

### Required Loaders

```bash
npm install --save-dev \
  ts-loader \
  css-loader \
  style-loader \
  postcss-loader \
  postcss
```

### Post CSS Config

**postcss.config.js:**

```javascript
module.exports = {
  plugins: {
    autoprefixer: {},
  },
};
```

### Installation

```bash
npm install @rubenpazch/button @rubenpazch/icons @rubenpazch/shared
```

---

## Next.js Setup

### App Router (Recommended)

**app/layout.tsx:**

```typescript
import "@rubenpazch/shared/styles"; // Import once globally
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**app/page.tsx:**

```typescript
import { Button } from "@rubenpazch/button";
import { MaterialIcon } from "@rubenpazch/icons";

export default function Home() {
  return (
    <Button
      variant="contained"
      startIcon={<MaterialIcon name="home" />}
    >
      Home
    </Button>
  );
}
```

### Pages Router (Legacy)

**pages/\_app.tsx:**

```typescript
import "@rubenpazch/shared/styles";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

**pages/index.tsx:**

```typescript
import { Button } from "@rubenpazch/button";

export default function Home() {
  return <Button>Click Me</Button>;
}
```

### Installation

```bash
npm install @rubenpazch/button @rubenpazch/icons @rubenpazch/shared
```

---

## Remix Setup

**root.tsx:**

```typescript
import { cssBundleHref } from "@remix-run/css-bundle";
import "@rubenpazch/shared/styles"; // Add this

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

**routes/\_index.tsx:**

```typescript
import { Button } from "@rubenpazch/button";
import { MaterialIcon } from "@rubenpazch/icons";

export default function Index() {
  return (
    <Button
      variant="contained"
      startIcon={<MaterialIcon name="rocket" />}
    >
      Launch
    </Button>
  );
}
```

---

## Module Resolution

### CSS Modules

The library uses CSS Modules. Make sure your bundler is configured to handle them:

**Vite** - Automatic ✅

```css
/* Button.module.css */
.button {
  /* ... */
}
```

**Webpack** - Configure:

```javascript
{
  loader: "css-loader",
  options: {
    modules: {
      auto: true, // Enable for *.module.css
    }
  }
}
```

**Next.js** - Automatic ✅

### Font Resolution

The library uses `@fontsource` packages for self-hosted fonts.

**Make sure these are installed:**

```bash
npm ls @fontsource/material-symbols-outlined
npm ls @fontsource/material-symbols-rounded
npm ls @fontsource/material-symbols-sharp
```

They're automatically included when you install `@rubenpazch/shared`.

---

## TypeScript Support

All packages include TypeScript definitions (.d.ts files).

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```

---

## Common Issues

### Issue: "Cannot find module '@rubenpazch/...'​"

**Solution:** Make sure the package is installed:

```bash
npm install @rubenpazch/button
npm list @rubenpazch/button # Verify installation
```

### Issue: Styles not loading

**Solution:** Import shared styles in entry point:

```tsx
import "@rubenpazch/shared/styles";
```

### Issue: Material Icons not displaying

**Solution:** Verify fonts are loaded:

1. Check DevTools Network tab for font files
2. Verify `@fontsource` packages are installed:
   ```bash
   npm ls @fontsource/material-symbols-outlined
   ```
3. Make sure shared styles are imported

### Issue: CSS Module errors in Webpack

**Solution:** Enable CSS modules in webpack config:

```javascript
{
  loader: "css-loader",
  options: {
    modules: {
      auto: true, // ← Add this
    }
  }
}
```

### Issue: Build size concerns

**Solution:** Tree-shake unused components:

```typescript
// ✅ Good - only import what you use
import { Button } from "@rubenpazch/button";

// ❌ Avoid - imports entire library
import * as Components from "@rubenpazch/button";
```

---

## Performance Tips

1. **Lazy Load Components**

   ```typescript
   const Button = lazy(() => import("@rubenpazch/button"));
   ```

2. **Code Splitting**

   ```typescript
   const HeavyComponent = lazy(() =>
     import("@rubenpazch/drawer").then((mod) => ({
       default: mod.Drawer,
     })),
   );
   ```

3. **Bundle Analysis**
   ```bash
   npm run build -- --analyze # Check bundle size
   ```

---

## Version Compatibility

| Package                | Version | React   | Node      |
| ---------------------- | ------- | ------- | --------- |
| @rubenpazch/button     | 4.0.1   | ^19.2.0 | >=22.12.0 |
| @rubenpazch/icons      | 4.0.1   | ^19.2.0 | >=22.12.0 |
| @rubenpazch/shared     | 4.0.1   | ^19.2.3 | >=22.12.0 |
| @rubenpazch/chip       | 1.0.2   | ^19.2.0 | >=22.12.0 |
| @rubenpazch/pagination | 1.0.2   | ^19.2.0 | >=22.12.0 |

---

## Support

For issues or questions:

- GitHub: https://github.com/rubenpazch/lbyte-ui-library
- NPM: https://www.npmjs.com/~rubenpazch
