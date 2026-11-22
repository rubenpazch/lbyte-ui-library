# @rubenpazch/ui

## 0.12.0

### Minor Changes

- 3552ede: `AuthScreen`: además de la espera, pantallas con mensaje y acción para la sesión (decisión 0011): `description`, `action`, `busy={false}` (sin indicador) y `tone="error"` (se anuncia con `role="alert"`). Sin cambios para el uso actual. Se exportan `AuthGateProps`, `AuthGateLabels` y `AuthScreenProps`.

### Patch Changes

- Updated dependencies [3552ede]
  - @rubenpazch/auth-gate@0.2.0

## 0.11.0

### Minor Changes

- 43f7b4a: `Tabs`: `value` para usarlo **controlado** (la pestaña vive en la URL o en el estado de la app; el componente avisa con `onChange` y no cambia solo). Sin `value` funciona como antes. Se exportan `TabsProps`, `Tab` y `TabOrientation`.

### Patch Changes

- Updated dependencies [43f7b4a]
  - @rubenpazch/tabs@3.2.0

## 0.10.0

### Minor Changes

- 0d3e5f0: `Autocomplete`: `freeSolo`, texto libre con sugerencias. El valor es lo escrito (`onChange(texto)` en cada cambio) y las opciones ayudan a completarlo. Escape, Tab y salir del campo no borran lo escrito; al volver se sigue editando. Útil para un destinatario que puede ser un usuario de la lista o un nombre externo.

### Patch Changes

- Updated dependencies [0d3e5f0]
  - @rubenpazch/autocomplete@5.3.0

## 0.9.0

### Minor Changes

- c735699: - `Select` y `Autocomplete`: `labelAction`, contenido junto a la etiqueta (botón de ayuda, enlace), igual que en `TextInput`.
  - Los paquetes que no exportaban sus tipos ahora los exportan (`ButtonProps`, `DateInputProps`, `AutocompleteOption`, `DrawerProps`…), y `@rubenpazch/ui` los reexporta.

### Patch Changes

- Updated dependencies [c735699]
  - @rubenpazch/select@1.3.0
  - @rubenpazch/autocomplete@5.2.0
  - @rubenpazch/button@6.2.4
  - @rubenpazch/checkbox-input@3.2.4
  - @rubenpazch/chip@4.0.7
  - @rubenpazch/confirmation-dialog@3.1.5
  - @rubenpazch/date-input@3.2.1
  - @rubenpazch/date-picker@3.2.1
  - @rubenpazch/draggable-list@3.0.4
  - @rubenpazch/drawer@4.2.5
  - @rubenpazch/numeric-picker@5.1.3
  - @rubenpazch/prescription-eye-card@3.0.7
  - @rubenpazch/date-range-picker@0.1.1

## 0.8.0

### Minor Changes

- f747c04: Calendario a pantalla completa en celulares (< 640 px) en `DateInput` y `DatePicker`: barra con el nombre del campo y "Cerrar", días más grandes para el dedo, sin teclado virtual (`inputMode="none"`), sin scroll detrás y con el foco dentro; al elegir la fecha se cierra y vuelve al campo. En escritorio no cambia. Se desactiva con `mobileFullScreen={false}`. `shared` suma `useMediaQuery` y `MOBILE_QUERY`.
- 3a87d2e: - `DateRangePicker`: periodo desde/hasta (ISO) con dos `DateInput`, validación del orden y atajos (hoy, últimos 7/30 días, este mes, mes anterior, este año) o propios.
  - `Turnstile`: verificación anti-robots de Cloudflare para formularios públicos; carga el script una sola vez, entrega el token y se reinicia con `resetKey` (sale del `Captcha` de auth-ui).
- 7e356fa: Componentes genéricos para la migración de hal-docs (criterio 0010 de lbyte-contexto):

  - `Timeline`: historial en orden con estado, fecha (`<time>`) y descripción; resalta el evento actual.
  - `DescriptionList`: pares etiqueta/valor (`<dl>`) en 1–3 columnas, con valor por defecto para vacíos.
  - `FileUpload`: uno o varios archivos con arrastrar y soltar, validación de tipo, tamaño, cantidad y duplicados, y lista para quitarlos (`ImageUpload` sigue para una sola imagen).
  - `LoadingSpinner`: `color="primary"` (por defecto) con el nombre correcto; `"blue"` sigue como alias (ya usaba el color de la marca).

- 64222a4: `TextInput`:

  - Con `type="password"` muestra un botón para **ver u ocultar** lo escrito (`aria-pressed`, textos en `passwordToggleLabels`). Activo por defecto; `showPasswordToggle={false}` lo quita.
  - `labelAction`: contenido junto a la etiqueta, a la derecha (botón de ayuda, "¿Olvidaste tu contraseña?"…), fuera del `<label>`.

### Patch Changes

- Updated dependencies [f747c04]
- Updated dependencies [3a87d2e]
- Updated dependencies [7e356fa]
- Updated dependencies [64222a4]
  - @rubenpazch/date-input@3.2.0
  - @rubenpazch/date-picker@3.2.0
  - @rubenpazch/shared@5.3.0
  - @rubenpazch/date-range-picker@0.1.0
  - @rubenpazch/turnstile@0.1.0
  - @rubenpazch/timeline@0.1.0
  - @rubenpazch/description-list@0.1.0
  - @rubenpazch/file-upload@0.1.0
  - @rubenpazch/loading-spinner@4.1.0
  - @rubenpazch/text-input@6.4.0
  - @rubenpazch/numeric-picker@5.1.2
  - @rubenpazch/numeric-up-picker@6.1.4
  - @rubenpazch/alert@0.2.1
  - @rubenpazch/app-shell@0.3.1
  - @rubenpazch/auth-gate@0.1.1
  - @rubenpazch/autocomplete@5.1.4
  - @rubenpazch/badge@0.1.2
  - @rubenpazch/button@6.2.3
  - @rubenpazch/card@0.1.2
  - @rubenpazch/checkbox-input@3.2.3
  - @rubenpazch/chip@4.0.6
  - @rubenpazch/data-table@0.1.2
  - @rubenpazch/empty-state@0.1.2
  - @rubenpazch/form-field@0.1.2
  - @rubenpazch/icon-button@4.2.2
  - @rubenpazch/icons@6.4.1
  - @rubenpazch/menu@0.1.2
  - @rubenpazch/modal@0.1.3
  - @rubenpazch/money-input@0.1.2
  - @rubenpazch/month-navigator@0.1.2
  - @rubenpazch/page-header@0.1.2
  - @rubenpazch/pagination@3.2.4
  - @rubenpazch/progress-bar@0.1.2
  - @rubenpazch/segmented-control@0.1.2
  - @rubenpazch/sidebar@0.1.3
  - @rubenpazch/skeleton@0.1.2
  - @rubenpazch/stepper@4.1.2
  - @rubenpazch/switch@0.1.2
  - @rubenpazch/textarea@0.1.2
  - @rubenpazch/tooltip@0.1.2
  - @rubenpazch/user-card@0.1.1
  - @rubenpazch/confirmation-dialog@3.1.4
  - @rubenpazch/prescription-eye-card@3.0.6
  - @rubenpazch/drawer@4.2.4
  - @rubenpazch/patient-search@3.0.6
  - @rubenpazch/toast@4.1.1

## 0.7.0

### Minor Changes

- c0d9260: Decisión 0006 (sesión y transiciones):

  - Nuevo `AuthGate`: puerta de sesión para la raíz de las apps. Sin token va al login sin pintar nada; con token muestra una pantalla neutra mientras `verify()` (/me) confirma; un 401 posterior (`auth:logout`) oculta la app y va al login.
  - `AppShell`: prop `loading` (y `loadingLabel`) que muestra la carga solo en el contenido al cambiar de pantalla; el menú y la cabecera no cambian.

### Patch Changes

- Updated dependencies [c0d9260]
  - @rubenpazch/auth-gate@0.1.0
  - @rubenpazch/app-shell@0.3.0

## 0.6.0

### Minor Changes

- 9aae9cd: - `ToastProvider` + `useToast()` (`toast.exito`, `error`, `aviso`, `info`): mensajes del servidor dentro de la app como toast bajo la cabecera. Fuera de un proveedor, `useToast()` lanza un error claro (en pantallas públicas el mensaje va en el formulario).
  - `AppShell` incluye `ToastProvider` (prop `toasts={false}` para desactivarlo).
  - Toast: `role="status"` para éxito/info y `role="alert"` para error/aviso (antes todos `alert`).
  - AGENTS.md: regla de **Mensajes** para todas las apps y valores por defecto de `Button` y `TextInput`.
  - `ToastRegion` y `placement="inline"`: `AppShell` muestra los toasts en su bloque fijo bajo la cabecera, solo en la columna del contenido (no tapan el menú ni el contenido; lo empujan).
- 57f6af5: Nuevo `UserCard`: tarjeta reutilizable de una persona (avatar con iniciales, nombre, dato secundario, etiquetas, acciones principales en el pie y secundarias en un menú ⋮).

### Patch Changes

- Updated dependencies [9aae9cd]
- Updated dependencies [57f6af5]
  - @rubenpazch/toast@4.1.0
  - @rubenpazch/app-shell@0.2.0
  - @rubenpazch/user-card@0.1.0

## 0.5.1

### Patch Changes

- Updated dependencies [b1cb9e0]
  - @rubenpazch/button@6.2.2
  - @rubenpazch/alert@0.2.0
  - @rubenpazch/checkbox-input@3.2.2
  - @rubenpazch/confirmation-dialog@3.1.3
  - @rubenpazch/date-input@3.1.4
  - @rubenpazch/date-picker@3.1.4
  - @rubenpazch/prescription-eye-card@3.0.5

## 0.5.0

### Minor Changes

- 1a4b995: Tema por marca: nuevos tokens `--lb-color-primary-subtle`, `-border`, `-accent` y `-strong`, derivados de `--lb-color-primary` con `color-mix` (también en modo oscuro). Los componentes los usan en lugar de `--lb-color-blue-*` para los tonos del color principal, así que basta con redefinir `--lb-color-primary` para cambiar la marca de toda la interfaz. Las variantes `info` siguen en azul.

### Patch Changes

- Updated dependencies [1a4b995]
- Updated dependencies [7ce6522]
  - @rubenpazch/tokens@0.5.0
  - @rubenpazch/autocomplete@5.1.3
  - @rubenpazch/badge@0.1.1
  - @rubenpazch/chip@4.0.5
  - @rubenpazch/data-table@0.1.1
  - @rubenpazch/date-input@3.1.3
  - @rubenpazch/date-picker@3.1.3
  - @rubenpazch/icon-button@4.2.1
  - @rubenpazch/image-upload@3.1.1
  - @rubenpazch/info-row@3.0.4
  - @rubenpazch/money-input@0.1.1
  - @rubenpazch/numeric-picker@5.1.1
  - @rubenpazch/overlay-loader@1.1.4
  - @rubenpazch/patient-details@3.1.3
  - @rubenpazch/patient-search@3.0.5
  - @rubenpazch/prescription-card@3.0.5
  - @rubenpazch/prescription-eye-card@3.0.4
  - @rubenpazch/sidebar@0.1.2
  - @rubenpazch/stepper@4.1.1
  - @rubenpazch/tabs@3.1.1
  - @rubenpazch/textarea@0.1.1
  - @rubenpazch/text-input@6.3.0
  - @rubenpazch/numeric-up-picker@6.1.3
  - @rubenpazch/alert@0.1.1
  - @rubenpazch/app-shell@0.1.2
  - @rubenpazch/avatar@3.1.3
  - @rubenpazch/button@6.2.1
  - @rubenpazch/card@0.1.1
  - @rubenpazch/checkbox-input@3.2.1
  - @rubenpazch/confirmation-dialog@3.1.2
  - @rubenpazch/draggable-list@3.0.3
  - @rubenpazch/drawer@4.2.3
  - @rubenpazch/empty-state@0.1.1
  - @rubenpazch/form-field@0.1.1
  - @rubenpazch/loading-spinner@4.0.3
  - @rubenpazch/menu@0.1.1
  - @rubenpazch/modal@0.1.2
  - @rubenpazch/month-navigator@0.1.1
  - @rubenpazch/page-header@0.1.1
  - @rubenpazch/pagination@3.2.3
  - @rubenpazch/progress-bar@0.1.1
  - @rubenpazch/radio-button@4.2.1
  - @rubenpazch/segmented-control@0.1.1
  - @rubenpazch/select@1.2.1
  - @rubenpazch/skeleton@0.1.1
  - @rubenpazch/switch@0.1.1
  - @rubenpazch/toast@4.0.5
  - @rubenpazch/tooltip@0.1.1

## 0.4.0

### Minor Changes

- 0eeab3b: 41 iconos nuevos (Lucide, ISC): candado, llave, iniciar/cerrar sesión, escudo, huella/passkey, banco, tarjeta, billete, gráficos, empresa, panel, guardar, enviar, QR, celular, Excel, historial, tema claro/oscuro, paleta y más. `pnpm icono:nuevo <Nombre> lucide:<icono>` los toma de lucide-static.

### Patch Changes

- Updated dependencies [0eeab3b]
  - @rubenpazch/icons@6.4.0
  - @rubenpazch/numeric-up-picker@6.1.2
  - @rubenpazch/autocomplete@5.1.2
  - @rubenpazch/chip@4.0.4
  - @rubenpazch/date-input@3.1.2
  - @rubenpazch/date-picker@3.1.2
  - @rubenpazch/drawer@4.2.2
  - @rubenpazch/pagination@3.2.2
  - @rubenpazch/patient-search@3.0.4
  - @rubenpazch/text-input@6.2.2
  - @rubenpazch/toast@4.0.4

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
