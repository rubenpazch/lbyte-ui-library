# @rubenpazch/button

## 6.2.5

### Patch Changes

- 8655e6c: `Button`: con `loading` marca `aria-busy="true"` (la acción está en curso; lo anuncian los lectores de pantalla y lo ven las pruebas de transiciones de la decisión 0011).

## 6.2.4

### Patch Changes

- c735699: - `Select` y `Autocomplete`: `labelAction`, contenido junto a la etiqueta (botón de ayuda, enlace), igual que en `TextInput`.
  - Los paquetes que no exportaban sus tipos ahora los exportan (`ButtonProps`, `DateInputProps`, `AutocompleteOption`, `DrawerProps`…), y `@rubenpazch/ui` los reexporta.

## 6.2.3

### Patch Changes

- Updated dependencies [f747c04]
  - @rubenpazch/shared@5.3.0

## 6.2.2

### Patch Changes

- b1cb9e0: - `Button`: `type="button"` por defecto. Antes, un `Button` sin `type` dentro de un `<form>` lo enviaba (en HTML el tipo por defecto es `submit`). Para enviar, usa `type="submit"`.
  - `Alert`: prop `role` para avisos fijos (`"note"`), que no se anuncian como urgentes.

## 6.2.1

### Patch Changes

- Updated dependencies [1a4b995]
  - @rubenpazch/tokens@0.5.0

## 6.2.0

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

## 6.1.1

### Patch Changes

- c2188cd: Nuevo paquete `@rubenpazch/ui` que reexporta todos los componentes (marcado `"use client"`) e incluye su documentación para personas y agentes de IA (`AGENTS.md`, `docs/COMPONENTES.md`, `docs/catalogo.json`). `@rubenpazch/tokens` agrega `tailwind.css` (puente de los tokens hacia Tailwind 4). Cada paquete trae un README con su uso y sus props, generado por `pnpm catalogo`.
- Updated dependencies [c2188cd]
  - @rubenpazch/shared@5.1.1
  - @rubenpazch/tokens@0.3.0

## 6.1.0

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
  - @rubenpazch/shared@5.1.0
  - @rubenpazch/tokens@0.2.0

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
