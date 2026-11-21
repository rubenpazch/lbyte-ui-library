# @rubenpazch/overlay-loader

## 1.1.4

### Patch Changes

- 1a4b995: Tema por marca: nuevos tokens `--lb-color-primary-subtle`, `-border`, `-accent` y `-strong`, derivados de `--lb-color-primary` con `color-mix` (también en modo oscuro). Los componentes los usan en lugar de `--lb-color-blue-*` para los tonos del color principal, así que basta con redefinir `--lb-color-primary` para cambiar la marca de toda la interfaz. Las variantes `info` siguen en azul.
- Updated dependencies [1a4b995]
  - @rubenpazch/tokens@0.5.0

## 1.1.3

### Patch Changes

- 0d27db1: - Iconos: metadatos para la IA (`ICONOS`, `docs/ICONOS.md`), galería única en Storybook y nuevo `ReceiptIcon`.
  - Iconos: se publican como un archivo por icono (`preserveModules`, `sideEffects: false`); importar uno pasa de ~22 KB a ~1,3 KB.
  - Iconos decorativos por defecto (`aria-hidden`): se quitan los `aria-label` fijos en inglés que se sumaban al nombre de los botones.
  - `pnpm icono:nuevo` crea un icono desde un `.svg`.
  - Historias de `Select` y `OverlayLoader`; títulos de Storybook unificados por categoría en español.

## 1.1.2

### Patch Changes

- Updated dependencies [d0f0768]
  - @rubenpazch/tokens@0.4.0

## 1.1.1

### Patch Changes

- c2188cd: Nuevo paquete `@rubenpazch/ui` que reexporta todos los componentes (marcado `"use client"`) e incluye su documentación para personas y agentes de IA (`AGENTS.md`, `docs/COMPONENTES.md`, `docs/catalogo.json`). `@rubenpazch/tokens` agrega `tailwind.css` (puente de los tokens hacia Tailwind 4). Cada paquete trae un README con su uso y sus props, generado por `pnpm catalogo`.
- Updated dependencies [c2188cd]
  - @rubenpazch/tokens@0.3.0

## 1.1.0

### Minor Changes

- Design tokens rollout + toolchain upgrade.

  **Cambios que rompen compatibilidad (major):**

  - Los siguientes paquetes ahora declaran `@rubenpazch/tokens` como **peer dependency** y basan sus colores en los design tokens `--lb-*`: `toast`, `chip`, `draggable-list`, `loading-spinner`, `tabs`, `confirmation-dialog`, `stepper`, `autocomplete`, `date-input`, `date-picker`, `image-upload`, `numeric-picker`, `numeric-up-picker`, `patient-search`. Las apps consumidoras deben instalar `@rubenpazch/tokens` e importar `@rubenpazch/tokens/tokens.css` una vez para que los componentes rendericen con los colores correctos.

  **Otros cambios (minor):**

  - Migración completa de colores hardcodeados a design tokens `--lb-*` en todos los componentes; limpieza de hex residual en `avatar`, `checkbox-input`, `drawer`, `icon-button`, `patient-details`, `radio-button`, `text-input`.
  - Fix en `overlay-loader`: se corrigen nombres de tokens inexistentes (`--lb-color-accent-*`) que forzaban el uso del fallback hex.
  - Actualización de todo el toolchain a las últimas versiones (Storybook 10, Jest 30, Vite 8, turbo, testing-library, dnd-kit, etc.), con `typescript` fijado a 6.0.3, `eslint` a 9 y los presets de Babel a 7 por compatibilidad del ecosistema. Node de desarrollo elevado a 24 (`.nvmrc`, CI).
  - Se elimina el tooling muerto de Tailwind (`@tailwindcss/postcss`) del build de `button` y `text-input`.

### Patch Changes

- Updated dependencies
  - @rubenpazch/tokens@0.2.0
