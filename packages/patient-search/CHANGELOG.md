# @rubenpazch/patient-search

## 3.0.0

### Major Changes

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
  - @rubenpazch/icons@6.1.0
  - @rubenpazch/tokens@0.2.0

## 2.0.1

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@6.0.0

## 2.0.0

### Major Changes

- dd69442: new components

### Patch Changes

- Updated dependencies [dd69442]
  - @rubenpazch/icons@5.0.0
