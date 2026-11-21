# @rubenpazch/prescription-card

## 3.0.5

### Patch Changes

- 1a4b995: Tema por marca: nuevos tokens `--lb-color-primary-subtle`, `-border`, `-accent` y `-strong`, derivados de `--lb-color-primary` con `color-mix` (también en modo oscuro). Los componentes los usan en lugar de `--lb-color-blue-*` para los tonos del color principal, así que basta con redefinir `--lb-color-primary` para cambiar la marca de toda la interfaz. Las variantes `info` siguen en azul.
- Updated dependencies [1a4b995]
  - @rubenpazch/tokens@0.5.0
  - @rubenpazch/chip@4.0.5
  - @rubenpazch/icon-button@4.2.1

## 3.0.4

### Patch Changes

- 0d27db1: - Iconos: metadatos para la IA (`ICONOS`, `docs/ICONOS.md`), galería única en Storybook y nuevo `ReceiptIcon`.
  - Iconos: se publican como un archivo por icono (`preserveModules`, `sideEffects: false`); importar uno pasa de ~22 KB a ~1,3 KB.
  - Iconos decorativos por defecto (`aria-hidden`): se quitan los `aria-label` fijos en inglés que se sumaban al nombre de los botones.
  - `pnpm icono:nuevo` crea un icono desde un `.svg`.
  - Historias de `Select` y `OverlayLoader`; títulos de Storybook unificados por categoría en español.
- Updated dependencies [0d27db1]
  - @rubenpazch/icons@6.3.0
  - @rubenpazch/chip@4.0.3

## 3.0.3

### Patch Changes

- Updated dependencies [d0f0768]
  - @rubenpazch/tokens@0.4.0
  - @rubenpazch/icons@6.2.0
  - @rubenpazch/icon-button@4.2.0
  - @rubenpazch/chip@4.0.2

## 3.0.2

### Patch Changes

- c2188cd: Nuevo paquete `@rubenpazch/ui` que reexporta todos los componentes (marcado `"use client"`) e incluye su documentación para personas y agentes de IA (`AGENTS.md`, `docs/COMPONENTES.md`, `docs/catalogo.json`). `@rubenpazch/tokens` agrega `tailwind.css` (puente de los tokens hacia Tailwind 4). Cada paquete trae un README con su uso y sus props, generado por `pnpm catalogo`.
- Updated dependencies [c2188cd]
  - @rubenpazch/chip@4.0.1
  - @rubenpazch/icon-button@4.1.1
  - @rubenpazch/icons@6.1.1
  - @rubenpazch/tokens@0.3.0

## 3.0.1

### Patch Changes

- Updated dependencies
  - @rubenpazch/chip@4.0.0
  - @rubenpazch/icon-button@4.1.0
  - @rubenpazch/icons@6.1.0
  - @rubenpazch/tokens@0.2.0

## 3.0.0

### Major Changes

- Migración de Tailwind a CSS Modules con centralización de colores en design tokens.

  **Cambios que rompen compatibilidad (breaking):**
  - Los colores dejan de venir de utilidades de Tailwind y ahora se basan en los design tokens `--lb-*` provistos por el nuevo paquete `@rubenpazch/tokens`. Las apps consumidoras deben importar los tokens para que los componentes se rendericen con los colores correctos.
  - `RadioGroup` y `Autocomplete` eliminan las últimas clases utilitarias de Tailwind (`w-4 h-4`) en favor de CSS Modules.
  - Se elimina el tooling muerto de Tailwind (`@tailwindcss/postcss`) de la configuración de build de `button` y `text-input`.

  **Otros cambios:**
  - Reescritura de estilos a CSS Modules co-localizados en `autocomplete`, `avatar`, `button`, `checkbox-input`, `chip`, `drawer`, `icon-button`, `info-row`, `pagination`, `patient-details`, `prescription-card`, `prescription-eye-card`, `text-input` y `toast`.
  - `text-input`: mejoras en el componente y en su suite de pruebas.
  - `icons`: limpieza de imports no usados y ajustes menores en pruebas y stories.
  - Cada paquete afectado declara ahora su dependencia en los design tokens.

### Patch Changes

- Updated dependencies
  - @rubenpazch/chip@3.0.0
  - @rubenpazch/icon-button@4.0.0
  - @rubenpazch/icons@6.0.0

## 2.0.0

### Major Changes

- dd69442: new components

### Patch Changes

- Updated dependencies [dd69442]
  - @rubenpazch/icons@5.0.0
  - @rubenpazch/chip@2.0.0
