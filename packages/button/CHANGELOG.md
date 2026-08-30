# @rubenpazch/button

## 6.0.0

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

## 5.0.0

### Major Changes

- dd69442: new components

### Patch Changes

- Updated dependencies [dd69442]
  - @rubenpazch/shared@5.0.0

## 4.0.2

### Patch Changes

- Updated dependencies
  - @rubenpazch/shared@4.0.2

## 4.0.1

### Patch Changes

- updates
- Updated dependencies
  - @rubenpazch/shared@4.0.1

## 4.0.0

### Major Changes

- css modules

### Patch Changes

- Updated dependencies
  - @rubenpazch/shared@4.0.0

## 3.0.0

### Major Changes

- update compilation file

### Patch Changes

- Updated dependencies
  - @rubenpazch/shared@3.0.0

## 2.0.0

### Major Changes

- 0d12d77: release
- 552379e: new release

### Patch Changes

- Updated dependencies [0d12d77]
- Updated dependencies [552379e]
  - @rubenpazch/shared@2.0.0
