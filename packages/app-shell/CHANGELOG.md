# @rubenpazch/app-shell

## 0.4.0

### Minor Changes

- 01f5b31: Componentes para la migración de club-ui:

  - `List` + `ListItem`: lista de filas con icono, título, detalle y contenido a la derecha (botón o enlace).
  - `Collapsible`: sección plegable ("Más opciones") sobre `<details>`.
  - `BottomNavigation`: barra inferior del celular con 3 a 5 secciones.
  - `AppShell` acepta `bottomNav`: muestra la barra en el celular y agrega "Más", que abre el menú lateral.
  - Iconos nuevos: `TrophyIcon`, `NewspaperIcon`, `VideoIcon`, `RadioIcon`, `UndoIcon`, `ArrowLeftRightIcon`,
    `IdCardIcon`, `FootballIcon`, `ArrowUpIcon`, `ArrowDownIcon`, `UserIcon`, `RectangleVerticalIcon`.
  - `Chip`: con `selected` y `variant="filled"` el texto ya no queda ilegible (se conserva el relleno).

### Patch Changes

- Updated dependencies [01f5b31]
  - @rubenpazch/bottom-navigation@0.1.0
  - @rubenpazch/toast@4.1.2

## 0.3.1

### Patch Changes

- Updated dependencies [f747c04]
  - @rubenpazch/shared@5.3.0
  - @rubenpazch/sidebar@0.1.3
  - @rubenpazch/toast@4.1.1

## 0.3.0

### Minor Changes

- c0d9260: Decisión 0006 (sesión y transiciones):

  - Nuevo `AuthGate`: puerta de sesión para la raíz de las apps. Sin token va al login sin pintar nada; con token muestra una pantalla neutra mientras `verify()` (/me) confirma; un 401 posterior (`auth:logout`) oculta la app y va al login.
  - `AppShell`: prop `loading` (y `loadingLabel`) que muestra la carga solo en el contenido al cambiar de pantalla; el menú y la cabecera no cambian.

## 0.2.0

### Minor Changes

- 9aae9cd: - `ToastProvider` + `useToast()` (`toast.exito`, `error`, `aviso`, `info`): mensajes del servidor dentro de la app como toast bajo la cabecera. Fuera de un proveedor, `useToast()` lanza un error claro (en pantallas públicas el mensaje va en el formulario).
  - `AppShell` incluye `ToastProvider` (prop `toasts={false}` para desactivarlo).
  - Toast: `role="status"` para éxito/info y `role="alert"` para error/aviso (antes todos `alert`).
  - AGENTS.md: regla de **Mensajes** para todas las apps y valores por defecto de `Button` y `TextInput`.
  - `ToastRegion` y `placement="inline"`: `AppShell` muestra los toasts en su bloque fijo bajo la cabecera, solo en la columna del contenido (no tapan el menú ni el contenido; lo empujan).

### Patch Changes

- Updated dependencies [9aae9cd]
  - @rubenpazch/toast@4.1.0

## 0.1.2

### Patch Changes

- Updated dependencies [1a4b995]
  - @rubenpazch/tokens@0.5.0
  - @rubenpazch/sidebar@0.1.2

## 0.1.1

### Patch Changes

- Updated dependencies [4a35192]
  - @rubenpazch/sidebar@0.1.1

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
  - @rubenpazch/sidebar@0.1.0
