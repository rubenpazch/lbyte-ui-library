---
"@rubenpazch/ui": minor
"@rubenpazch/shared": minor
"@rubenpazch/tokens": minor
"@rubenpazch/icons": minor
"@rubenpazch/text-input": minor
"@rubenpazch/date-input": minor
"@rubenpazch/date-picker": minor
"@rubenpazch/numeric-picker": minor
"@rubenpazch/numeric-up-picker": minor
"@rubenpazch/checkbox-input": minor
"@rubenpazch/autocomplete": minor
"@rubenpazch/confirmation-dialog": minor
"@rubenpazch/button": minor
"@rubenpazch/icon-button": minor
"@rubenpazch/pagination": minor
"@rubenpazch/stepper": minor
"@rubenpazch/tabs": minor
"@rubenpazch/chip": patch
"@rubenpazch/toast": patch
"@rubenpazch/drawer": minor
"@rubenpazch/modal": minor
"@rubenpazch/alert": minor
"@rubenpazch/badge": minor
"@rubenpazch/card": minor
"@rubenpazch/empty-state": minor
"@rubenpazch/skeleton": minor
"@rubenpazch/progress-bar": minor
"@rubenpazch/textarea": minor
"@rubenpazch/switch": minor
"@rubenpazch/money-input": minor
"@rubenpazch/segmented-control": minor
"@rubenpazch/form-field": minor
"@rubenpazch/tooltip": minor
"@rubenpazch/menu": minor
"@rubenpazch/page-header": minor
"@rubenpazch/month-navigator": minor
"@rubenpazch/data-table": minor
"@rubenpazch/sidebar": minor
"@rubenpazch/app-shell": minor
---

Accesibilidad, español por defecto, API común y 19 componentes nuevos.

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
