# Lbyte UI Library - Monorepo

Librería de componentes React de Lbyte. Monorepo con **pnpm workspaces**, **Turborepo**, **Rollup**,
**Storybook** y **Changesets**. Cada componente se publica como paquete npm (`@rubenpazch/<nombre>`)
y todos juntos en **`@rubenpazch/ui`**, que es lo que instalan las apps.

## Usar en una app

```bash
npm install @rubenpazch/ui
```

```css
/* app/globals.css (Tailwind 4) */
@import "tailwindcss";
@import "@rubenpazch/ui/tokens.css";
@import "@rubenpazch/ui/tailwind.css";
```

```tsx
import { Button, TextInput, CheckIcon } from "@rubenpazch/ui";

<Button variant="contained" startIcon={<CheckIcon size="sm" />}>
  Guardar
</Button>;
```

- **Catálogo** de componentes, cuándo usar cada uno y sus props:
  [packages/ui/docs/COMPONENTES.md](packages/ui/docs/COMPONENTES.md) (generado).
- **Reglas de uso** (Next.js, estilos con tokens, textos, qué hacer si falta un componente):
  [packages/ui/AGENTS.md](packages/ui/AGENTS.md). Viaja dentro del paquete npm, así que cada app
  (y cualquier agente de IA que trabaje en ella) lo tiene en `node_modules/@rubenpazch/ui/`.

## Estructura

```
packages/<componente>/   un paquete por componente (src, estilos, historias, pruebas)
packages/tokens/         tokens de diseño --lb-* (tokens.css, base.css, tailwind.css)
packages/shared/         utilidades internas
packages/ui/             @rubenpazch/ui: reexporta todo + documentación (generado)
apps/storybook/          Storybook de toda la librería
tooling/                 configuración compartida de TypeScript y ESLint
scripts/                 generate-package.js (paquete nuevo), catalogo.mjs (catálogo e índice)
```

## Desarrollo

Requisitos: **Node.js 24** (`.nvmrc`) y **pnpm 10**.

```bash
pnpm install
pnpm build              # todos los paquetes (Turborepo + Rollup)
pnpm test               # Jest en todos los paquetes
pnpm storybook          # http://localhost:6006
pnpm catalogo           # regenera @rubenpazch/ui, el catálogo y los README
pnpm catalogo:check     # lo que corre el CI: falla si el catálogo está desactualizado
```

**Agregar o cambiar un componente:** ver [AGENTS.md](AGENTS.md) (`pnpm generate-package <nombre>`,
bloque `lbyte` en su `package.json`, `pnpm catalogo`, `pnpm changeset`).

## Publicación

Con Changesets y GitHub Actions (`release.yml`): al integrar en `main` se abre el PR
"chore: version packages"; al integrar ese PR se publica en npm. Ver [RELEASE.md](RELEASE.md).

## Stack

React 19 · TypeScript 6 · CSS Modules + tokens · Rollup · Turborepo · pnpm · Storybook ·
Jest + Testing Library · Changesets.

## Licencia

MIT © Ruben Paz Chuspe
