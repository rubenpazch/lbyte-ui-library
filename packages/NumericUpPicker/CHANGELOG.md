# @rubenpazch/numeric-up-picker

## 6.1.5

### Patch Changes

- Updated dependencies [01f5b31]
  - @rubenpazch/icons@6.5.0

## 6.1.4

### Patch Changes

- Updated dependencies [f747c04]
  - @rubenpazch/shared@5.3.0
  - @rubenpazch/icons@6.4.1

## 6.1.3

### Patch Changes

- Updated dependencies [1a4b995]
  - @rubenpazch/tokens@0.5.0

## 6.1.2

### Patch Changes

- Updated dependencies [0eeab3b]
  - @rubenpazch/icons@6.4.0

## 6.1.1

### Patch Changes

- Updated dependencies [0d27db1]
  - @rubenpazch/icons@6.3.0

## 6.1.0

### Minor Changes

- d0f0768: Accesibilidad, español por defecto, API común y 19 componentes nuevos.

  **Componentes nuevos:** Modal, Alert, Badge, Card, EmptyState, Skeleton, ProgressBar, Textarea, Switch, MoneyInput (+ formatMoney), SegmentedControl, FormField (+ FormRow, FormActions), Tooltip, Menu, PageHeader, MonthNavigator, DataTable, Sidebar (barra vertical colapsable y cajón en móvil) y AppShell.

  **Correcciones:**

  - NumericPicker no dejaba escribir números de más de un dígito.
  - DateInput: en español no se podía escribir la fecha y en Perú mostraba el día anterior (UTC); "Hoy" elegía mal la fecha al navegar a otro mes.
  - CheckboxInput generaba un id nuevo en cada render.
  - NumericUpPicker mostraba el error con el icono de éxito; TextInput no mostraba `warning`.
  - 59 iconos dependían de Tailwind para tener tamaño.

  **Accesibilidad:** etiquetas asociadas e `aria-invalid`/`aria-describedby` en todos los campos; ConfirmationDialog es un `alertdialog` (Escape, foco retenido); Tabs usa el patrón tablist; Autocomplete el patrón combobox; Stepper y Pagination marcan el paso/página actual.

  **API (sin romper):** `size` acepta `sm`/`md`/`lg` además de `small`/`medium`/`large`; `id`, `name` y `ref` en los campos; `Pagination.onPageChange(page)`.

  **Cambio de valores por defecto:** textos en español, `DateInput`/`DatePicker` con `locale="es"` (DD/MM/AAAA). Para el comportamiento anterior pasa `locale="en"` y los textos con sus props (`labels`, `confirmText`…).

### Patch Changes

- Updated dependencies [d0f0768]
  - @rubenpazch/shared@5.2.0
  - @rubenpazch/tokens@0.4.0
  - @rubenpazch/icons@6.2.0

## 6.0.1

### Patch Changes

- c2188cd: Nuevo paquete `@rubenpazch/ui` que reexporta todos los componentes (marcado `"use client"`) e incluye su documentación para personas y agentes de IA (`AGENTS.md`, `docs/COMPONENTES.md`, `docs/catalogo.json`). `@rubenpazch/tokens` agrega `tailwind.css` (puente de los tokens hacia Tailwind 4). Cada paquete trae un README con su uso y sus props, generado por `pnpm catalogo`.
- Updated dependencies [c2188cd]
  - @rubenpazch/icons@6.1.1
  - @rubenpazch/tokens@0.3.0

## 6.0.0

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

## 5.0.1

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@6.0.0

## 5.0.0

### Major Changes

- dd69442: new components

### Patch Changes

- Updated dependencies [dd69442]
  - @rubenpazch/icons@5.0.0

## 4.0.2

### Patch Changes

- @rubenpazch/icons@4.0.2

## 4.0.1

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@4.0.1

## 4.0.0

### Major Changes

- css modules

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@4.0.0

## 3.0.4

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@3.0.4

## 3.0.3

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@3.0.3

## 3.0.2

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@3.0.2

## 3.0.1

### Patch Changes

- 8157049: updates
- Updated dependencies [8157049]
  - @rubenpazch/icons@3.0.1

## 3.0.0

### Major Changes

- update compilation file

### Patch Changes

- Updated dependencies
  - @rubenpazch/icons@3.0.0

## 2.0.1

### Patch Changes

- 6d66cbb: Update Numeric Up Picker with more stories

## 2.0.0

### Major Changes

- 0d12d77: release
- 552379e: new release

### Patch Changes

- Updated dependencies [0d12d77]
- Updated dependencies [552379e]
  - @rubenpazch/icons@2.0.0
