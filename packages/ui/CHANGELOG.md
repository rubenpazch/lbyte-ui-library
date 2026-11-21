# @rubenpazch/ui

## 0.3.0

### Minor Changes

- 4a35192: - `Select`, `RadioGroup`/`RadioButton`, `IdentificationInput` e `ImageUpload` exponen `ref` y aceptan las props comunes de campo (`label`, `hint`, `error`, `required`, `id`, `name`), con `aria-describedby`/`aria-invalid`.
  - `IdentificationInput` e `ImageUpload`: `labels` pasa a ser opcional, con textos en español por defecto (`DEFAULT_IDENTIFICATION_LABELS`, `DEFAULT_IMAGE_UPLOAD_LABELS`).
  - `RadioGroup`: textos por defecto en español ("Seleccionado:", "Ninguno").
  - `DateInput`/`DatePicker`: el campo usa `role="combobox"`, que es lo que permite `aria-expanded` (lo detectó axe).
  - Pruebas automáticas de accesibilidad con jest-axe en 42 componentes.
- 0d27db1: - Iconos: metadatos para la IA (`ICONOS`, `docs/ICONOS.md`), galería única en Storybook y nuevo `ReceiptIcon`.
  - Iconos: se publican como un archivo por icono (`preserveModules`, `sideEffects: false`); importar uno pasa de ~22 KB a ~1,3 KB.
  - Iconos decorativos por defecto (`aria-hidden`): se quitan los `aria-label` fijos en inglés que se sumaban al nombre de los botones.
  - `pnpm icono:nuevo` crea un icono desde un `.svg`.
  - Historias de `Select` y `OverlayLoader`; títulos de Storybook unificados por categoría en español.

### Patch Changes

- Updated dependencies [4a35192]
- Updated dependencies [0d27db1]
  - @rubenpazch/select@1.2.0
  - @rubenpazch/radio-button@4.2.0
  - @rubenpazch/identification-input@2.1.0
  - @rubenpazch/image-upload@3.1.0
  - @rubenpazch/date-input@3.1.1
  - @rubenpazch/date-picker@3.1.1
  - @rubenpazch/modal@0.1.1
  - @rubenpazch/sidebar@0.1.1
  - @rubenpazch/icons@6.3.0
  - @rubenpazch/prescription-card@3.0.4
  - @rubenpazch/overlay-loader@1.1.3
  - @rubenpazch/confirmation-dialog@3.1.1
  - @rubenpazch/app-shell@0.1.1
  - @rubenpazch/numeric-up-picker@6.1.1
  - @rubenpazch/autocomplete@5.1.1
  - @rubenpazch/chip@4.0.3
  - @rubenpazch/drawer@4.2.1
  - @rubenpazch/pagination@3.2.1
  - @rubenpazch/patient-search@3.0.3
  - @rubenpazch/text-input@6.2.1
  - @rubenpazch/toast@4.0.3

## 0.2.0

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
  - @rubenpazch/text-input@6.2.0
  - @rubenpazch/date-input@3.1.0
  - @rubenpazch/date-picker@3.1.0
  - @rubenpazch/numeric-picker@5.1.0
  - @rubenpazch/numeric-up-picker@6.1.0
  - @rubenpazch/checkbox-input@3.2.0
  - @rubenpazch/autocomplete@5.1.0
  - @rubenpazch/confirmation-dialog@3.1.0
  - @rubenpazch/button@6.2.0
  - @rubenpazch/icon-button@4.2.0
  - @rubenpazch/pagination@3.2.0
  - @rubenpazch/stepper@4.1.0
  - @rubenpazch/tabs@3.1.0
  - @rubenpazch/chip@4.0.2
  - @rubenpazch/toast@4.0.2
  - @rubenpazch/drawer@4.2.0
  - @rubenpazch/modal@0.1.0
  - @rubenpazch/alert@0.1.0
  - @rubenpazch/badge@0.1.0
  - @rubenpazch/card@0.1.0
  - @rubenpazch/empty-state@0.1.0
  - @rubenpazch/skeleton@0.1.0
  - @rubenpazch/progress-bar@0.1.0
  - @rubenpazch/textarea@0.1.0
  - @rubenpazch/switch@0.1.0
  - @rubenpazch/money-input@0.1.0
  - @rubenpazch/segmented-control@0.1.0
  - @rubenpazch/form-field@0.1.0
  - @rubenpazch/tooltip@0.1.0
  - @rubenpazch/menu@0.1.0
  - @rubenpazch/page-header@0.1.0
  - @rubenpazch/month-navigator@0.1.0
  - @rubenpazch/data-table@0.1.0
  - @rubenpazch/sidebar@0.1.0
  - @rubenpazch/app-shell@0.1.0
  - @rubenpazch/avatar@3.1.2
  - @rubenpazch/draggable-list@3.0.2
  - @rubenpazch/image-upload@3.0.2
  - @rubenpazch/info-row@3.0.3
  - @rubenpazch/loading-spinner@4.0.2
  - @rubenpazch/overlay-loader@1.1.2
  - @rubenpazch/patient-details@3.1.2
  - @rubenpazch/patient-search@3.0.2
  - @rubenpazch/prescription-card@3.0.3
  - @rubenpazch/prescription-eye-card@3.0.3
  - @rubenpazch/radio-button@4.1.2
  - @rubenpazch/select@1.1.2

## 0.1.0

### Minor Changes

- c2188cd: Nuevo paquete `@rubenpazch/ui` que reexporta todos los componentes (marcado `"use client"`) e incluye su documentación para personas y agentes de IA (`AGENTS.md`, `docs/COMPONENTES.md`, `docs/catalogo.json`). `@rubenpazch/tokens` agrega `tailwind.css` (puente de los tokens hacia Tailwind 4). Cada paquete trae un README con su uso y sus props, generado por `pnpm catalogo`.

### Patch Changes

- Updated dependencies [c2188cd]
  - @rubenpazch/autocomplete@5.0.1
  - @rubenpazch/avatar@3.1.1
  - @rubenpazch/button@6.1.1
  - @rubenpazch/checkbox-input@3.1.1
  - @rubenpazch/chip@4.0.1
  - @rubenpazch/confirmation-dialog@3.0.1
  - @rubenpazch/date-input@3.0.1
  - @rubenpazch/date-picker@3.0.1
  - @rubenpazch/draggable-list@3.0.1
  - @rubenpazch/drawer@4.1.1
  - @rubenpazch/icon-button@4.1.1
  - @rubenpazch/icons@6.1.1
  - @rubenpazch/identification-input@2.0.3
  - @rubenpazch/image-upload@3.0.1
  - @rubenpazch/info-row@3.0.2
  - @rubenpazch/loading-spinner@4.0.1
  - @rubenpazch/numeric-picker@5.0.1
  - @rubenpazch/numeric-up-picker@6.0.1
  - @rubenpazch/overlay-loader@1.1.1
  - @rubenpazch/pagination@3.1.1
  - @rubenpazch/patient-details@3.1.1
  - @rubenpazch/patient-search@3.0.1
  - @rubenpazch/prescription-card@3.0.2
  - @rubenpazch/prescription-eye-card@3.0.2
  - @rubenpazch/radio-button@4.1.1
  - @rubenpazch/select@1.1.1
  - @rubenpazch/shared@5.1.1
  - @rubenpazch/stepper@4.0.1
  - @rubenpazch/tabs@3.0.1
  - @rubenpazch/text-input@6.1.1
  - @rubenpazch/toast@4.0.1
  - @rubenpazch/tokens@0.3.0
