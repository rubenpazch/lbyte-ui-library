# @rubenpazch/data-table

## 0.1.1

### Patch Changes

- 1a4b995: Tema por marca: nuevos tokens `--lb-color-primary-subtle`, `-border`, `-accent` y `-strong`, derivados de `--lb-color-primary` con `color-mix` (también en modo oscuro). Los componentes los usan en lugar de `--lb-color-blue-*` para los tonos del color principal, así que basta con redefinir `--lb-color-primary` para cambiar la marca de toda la interfaz. Las variantes `info` siguen en azul.
- Updated dependencies [1a4b995]
  - @rubenpazch/tokens@0.5.0
  - @rubenpazch/empty-state@0.1.1
  - @rubenpazch/skeleton@0.1.1

## 0.1.0

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
  - @rubenpazch/empty-state@0.1.0
  - @rubenpazch/skeleton@0.1.0
