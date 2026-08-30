# @rubenpazch/drawer

## 4.1.0

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
  - @rubenpazch/icons@6.1.0
  - @rubenpazch/tokens@0.2.0

## 4.0.0

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
  - @rubenpazch/icons@6.0.0

## 3.0.3

### Patch Changes

- Updated dependencies [dd69442]
  - @rubenpazch/icons@5.0.0

## 3.0.2

### Patch Changes

- @rubenpazch/icons@4.0.2

## 3.0.1

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@4.0.1

## 3.0.0

### Major Changes

- css modules

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@4.0.0

## 2.0.4

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@3.0.4

## 2.0.3

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@3.0.3

## 2.0.2

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@3.0.2

## 2.0.1

### Patch Changes

- Updated dependencies [8157049]
  - @rubenpazch/icons@3.0.1

## 2.0.0

### Major Changes

- update compilation file

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@3.0.0
