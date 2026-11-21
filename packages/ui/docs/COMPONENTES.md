<!-- GENERADO por scripts/catalogo.mjs (pnpm catalogo). No editar a mano. -->

# Componentes de @rubenpazch/ui

Todo se importa desde un solo paquete:

```tsx
import { Button, TextInput, Toast } from "@rubenpazch/ui";
```

Antes de crear un componente en una app, busca aquí uno que sirva. Si no existe, agrégalo a la
librería (ver AGENTS.md del repo lbyte-ui-library), no lo copies en la app.

## Índice

| Paquete                                                                 | Categoría                  | Exporta                                                                                   | Qué es                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@rubenpazch/alert`](#rubenpazchalert)                                 | Retroalimentación          | Alert                                                                                     | Aviso dentro de la página (info, success, warning, danger) con título, acción y cierre opcional.                                                                                                                                                       |
| [`@rubenpazch/app-shell`](#rubenpazchapp-shell)                         | Navegación                 | AppShell                                                                                  | Estructura completa de un panel: Sidebar colapsable, cabecera fija con botón ☰ en móvil, título y acciones, enlace "Saltar al contenido" y área principal con ancho máximo.                                                                           |
| [`@rubenpazch/auth-gate`](#rubenpazchauth-gate)                         | Navegación                 | AuthGate, AuthScreen                                                                      | Puerta de sesión: comprueba el token, confirma con el servidor (/me) y solo entonces pinta la app; mientras, una pantalla neutra. Sin sesión, va al login sin mostrar nada.                                                                            |
| [`@rubenpazch/autocomplete`](#rubenpazchautocomplete)                   | Formularios                | Autocomplete                                                                              | Selector con búsqueda sobre una lista de opciones (con descripción, carga y opción de limpiar).                                                                                                                                                        |
| [`@rubenpazch/avatar`](#rubenpazchavatar)                               | Presentación de datos      | Avatar, AvatarGroup                                                                       | Avatar de persona (imagen, iniciales o icono) y AvatarGroup para varios.                                                                                                                                                                               |
| [`@rubenpazch/badge`](#rubenpazchbadge)                                 | Presentación de datos      | Badge                                                                                     | Insignia de estado o categoría (Pagado, Vencido, Borrador) con colores semánticos, variantes soft/solid/outline y punto.                                                                                                                               |
| [`@rubenpazch/button`](#rubenpazchbutton)                               | Acciones                   | Button                                                                                    | Botón con variantes text/contained/outlined, colores, tamaños, estado de carga e iconos; puede renderizar un enlace (href).                                                                                                                            |
| [`@rubenpazch/card`](#rubenpazchcard)                                   | Presentación de datos      | Card, CardHeader, CardBody, CardFooter                                                    | Tarjeta (outlined o elevated) con CardHeader (título, subtítulo, acciones), CardBody y CardFooter; puede ser clicable.                                                                                                                                 |
| [`@rubenpazch/checkbox-input`](#rubenpazchcheckbox-input)               | Formularios                | CheckboxInput                                                                             | Casilla de verificación con etiqueta, ayuda y error.                                                                                                                                                                                                   |
| [`@rubenpazch/chip`](#rubenpazchchip)                                   | Presentación de datos      | Chip                                                                                      | Chip/etiqueta con variantes, icono y acción de borrar.                                                                                                                                                                                                 |
| [`@rubenpazch/confirmation-dialog`](#rubenpazchconfirmation-dialog)     | Retroalimentación          | ConfirmationDialog                                                                        | Diálogo modal de confirmación (aceptar/cancelar).                                                                                                                                                                                                      |
| [`@rubenpazch/data-table`](#rubenpazchdata-table)                       | Datos                      | DataTable                                                                                 | Tabla de datos accesible: columnas con render, orden (aria-sort) en el navegador o en el servidor, carga con Skeleton, estado vacío, filas clicables, encabezado fijo y scroll horizontal en móvil.                                                    |
| [`@rubenpazch/date-input`](#rubenpazchdate-input)                       | Formularios                | DateInput                                                                                 | Campo de fecha con formato local, mínimo/máximo, ayuda y error.                                                                                                                                                                                        |
| [`@rubenpazch/date-picker`](#rubenpazchdate-picker)                     | Formularios                | DatePicker                                                                                | Selector de fecha con calendario desplegable.                                                                                                                                                                                                          |
| [`@rubenpazch/description-list`](#rubenpazchdescription-list)           | Presentación de datos      | DescriptionList                                                                           | Pares etiqueta/valor en columnas: resumen de un registro (datos de un trámite, de un cliente, de un pago).                                                                                                                                             |
| [`@rubenpazch/draggable-list`](#rubenpazchdraggable-list)               | Datos                      | DraggableList                                                                             | Lista reordenable arrastrando (también con teclado), basada en dnd-kit.                                                                                                                                                                                |
| [`@rubenpazch/drawer`](#rubenpazchdrawer)                               | Navegación                 | Drawer                                                                                    | Panel lateral (izquierda/derecha/arriba/abajo) con animación y fondo.                                                                                                                                                                                  |
| [`@rubenpazch/empty-state`](#rubenpazchempty-state)                     | Retroalimentación          | EmptyState                                                                                | Estado vacío con icono, título, descripción y acciones ("No hay convocatorias · Crear").                                                                                                                                                               |
| [`@rubenpazch/file-upload`](#rubenpazchfile-upload)                     | Formularios                | FileUpload, DEFAULT_FILE_UPLOAD_LABELS, aceptaArchivo                                     | Zona para subir uno o varios archivos (arrastrar y soltar o elegir), con validación de tipo, tamaño y cantidad, y lista para quitarlos.                                                                                                                |
| [`@rubenpazch/form-field`](#rubenpazchform-field)                       | Formularios                | FormField, FormRow, FormActions                                                           | FormField (etiqueta, ayuda y error asociados a cualquier control), FormRow (columnas que se apilan en móvil) y FormActions (pie con botones).                                                                                                          |
| [`@rubenpazch/icon-button`](#rubenpazchicon-button)                     | Acciones                   | IconButton                                                                                | Botón de solo icono con variantes, formas, tooltip y etiqueta accesible.                                                                                                                                                                               |
| [`@rubenpazch/icons`](#rubenpazchicons)                                 | Iconos                     | ArrowDetailsIcon, ArchiveIcon, BrandingIcon, BusinessPlanIcon, CalendarIcon, CheckIcon, … | Más de 60 iconos SVG como componentes React (y MaterialIcon para Material Icons).                                                                                                                                                                      |
| [`@rubenpazch/identification-input`](#rubenpazchidentification-input)   | Salud (pacientes y óptica) | IdentificationInput, DEFAULT_IDENTIFICATION_LABELS                                        | Tipo y número de documento peruano (DNI, CE, pasaporte) con validación de longitud y formato.                                                                                                                                                          |
| [`@rubenpazch/image-upload`](#rubenpazchimage-upload)                   | Formularios                | ImageUpload, DEFAULT_IMAGE_UPLOAD_LABELS                                                  | Subida de imagen o PDF con vista previa, arrastrar y soltar, validación de tipo y tamaño.                                                                                                                                                              |
| [`@rubenpazch/info-row`](#rubenpazchinfo-row)                           | Presentación de datos      | InfoRow                                                                                   | Fila de dato con icono, etiqueta y valor (variantes de color, tamaños, acción opcional).                                                                                                                                                               |
| [`@rubenpazch/loading-spinner`](#rubenpazchloading-spinner)             | Retroalimentación          | LoadingSpinner                                                                            | Indicador de carga circular con tamaños y colores.                                                                                                                                                                                                     |
| [`@rubenpazch/menu`](#rubenpazchmenu)                                   | Acciones                   | Menu                                                                                      | Menú de acciones (role="menu") con botón ⋮ por defecto, opciones con icono, peligrosas o deshabilitadas, teclado completo.                                                                                                                             |
| [`@rubenpazch/modal`](#rubenpazchmodal)                                 | Retroalimentación          | Modal                                                                                     | Ventana modal accesible: portal, foco retenido, Escape y clic fuera para cerrar, bloqueo del scroll, título y descripción anunciados.                                                                                                                  |
| [`@rubenpazch/money-input`](#rubenpazchmoney-input)                     | Formularios                | MoneyInput, formatMoney                                                                   | Campo de monto en PEN (S/) o USD (US$) que devuelve un número; acepta punto o coma decimal y muestra 1,250.50 al salir. Incluye formatMoney().                                                                                                         |
| [`@rubenpazch/month-navigator`](#rubenpazchmonth-navigator)             | Navegación                 | MonthNavigator, addMonths, currentMonth                                                   | Navegador de periodos ‹ noviembre de 2026 › con valor "AAAA-MM", mínimo, máximo y botón Hoy; incluye addMonths() y currentMonth().                                                                                                                     |
| [`@rubenpazch/numeric-picker`](#rubenpazchnumeric-picker)               | Formularios                | NumericPicker                                                                             | Campo numérico con mínimo, máximo, paso, decimales y moneda.                                                                                                                                                                                           |
| [`@rubenpazch/numeric-up-picker`](#rubenpazchnumeric-up-picker)         | Formularios                | NumericUpPicker                                                                           | Campo numérico con botones +/-, signo opcional, solo enteros, ayuda, advertencia y error.                                                                                                                                                              |
| [`@rubenpazch/overlay-loader`](#rubenpazchoverlay-loader)               | Retroalimentación          | OverlayLoader, InlineLoader                                                               | OverlayLoader (pantalla completa, controlado por visible) e InlineLoader (dentro de un contenedor).                                                                                                                                                    |
| [`@rubenpazch/page-header`](#rubenpazchpage-header)                     | Navegación                 | PageHeader                                                                                | Cabecera de página: migas de pan, volver, título h1, subtítulo, acciones y contenido extra (filtros); acepta el Link de Next.js.                                                                                                                       |
| [`@rubenpazch/pagination`](#rubenpazchpagination)                       | Navegación                 | Pagination, PaginationItem                                                                | Paginación con variantes, tamaños y formas; incluye PaginationItem.                                                                                                                                                                                    |
| [`@rubenpazch/patient-details`](#rubenpazchpatient-details)             | Salud (pacientes y óptica) | PatientDetails                                                                            | Ficha de paciente: identificación, contacto, contacto de emergencia, ubicación (departamento/provincia/distrito) e historia clínica. Textos por la prop labels.                                                                                        |
| [`@rubenpazch/patient-search`](#rubenpazchpatient-search)               | Salud (pacientes y óptica) | PatientSearch                                                                             | Buscador de pacientes con resultados y selección.                                                                                                                                                                                                      |
| [`@rubenpazch/prescription-card`](#rubenpazchprescription-card)         | Salud (pacientes y óptica) | PrescriptionCard                                                                          | Tarjeta de receta óptica completa (OD/OI: esfera, cilindro, eje, adición, DNP, prisma, altura) con estado y observaciones.                                                                                                                             |
| [`@rubenpazch/prescription-eye-card`](#rubenpazchprescription-eye-card) | Salud (pacientes y óptica) | PrescriptionEyeCard                                                                       | Datos de un ojo de la receta óptica (PrescriptionEyeCard) y campo individual (PrescriptionFieldCard).                                                                                                                                                  |
| [`@rubenpazch/progress-bar`](#rubenpazchprogress-bar)                   | Retroalimentación          | ProgressBar                                                                               | Barra de progreso (role="progressbar") con etiqueta y porcentaje, determinada o indeterminada.                                                                                                                                                         |
| [`@rubenpazch/radio-button`](#rubenpazchradio-button)                   | Formularios                | RadioButton, RadioGroup                                                                   | RadioButton y RadioGroup accesibles con variantes y validación.                                                                                                                                                                                        |
| [`@rubenpazch/segmented-control`](#rubenpazchsegmented-control)         | Formularios                | SegmentedControl                                                                          | Botones unidos para elegir una opción entre pocas (radiogroup con flechas del teclado): Personal \| Empresa, Mes \| Año.                                                                                                                               |
| [`@rubenpazch/select`](#rubenpazchselect)                               | Formularios                | Select                                                                                    | Lista desplegable simple con etiqueta, placeholder y error.                                                                                                                                                                                            |
| [`@rubenpazch/shared`](#rubenpazchshared)                               | Base (tokens y utilidades) | classList, normalizeSize, toLegacySize, useFieldIds, useEscapeKey, useFocusTrap, …        | Utilidades (classList) y tipos comunes; la usan internamente los componentes.                                                                                                                                                                          |
| [`@rubenpazch/sidebar`](#rubenpazchsidebar)                             | Navegación                 | Sidebar                                                                                   | Barra de navegación vertical: secciones, subniveles plegables, insignias y página activa (también subrutas); en escritorio se colapsa a iconos y lo recuerda (storageKey); en móvil es un cajón con foco retenido y Escape. Acepta el Link de Next.js. |
| [`@rubenpazch/skeleton`](#rubenpazchskeleton)                           | Retroalimentación          | Skeleton                                                                                  | Marcador de carga (texto, bloque o círculo) con la forma del contenido; respeta reducir movimiento.                                                                                                                                                    |
| [`@rubenpazch/stepper`](#rubenpazchstepper)                             | Navegación                 | Stepper                                                                                   | Indicador de pasos numerados (opcionalmente clicables) para procesos en etapas.                                                                                                                                                                        |
| [`@rubenpazch/switch`](#rubenpazchswitch)                               | Formularios                | Switch                                                                                    | Interruptor encendido/apagado (role="switch") con etiqueta y descripción.                                                                                                                                                                              |
| [`@rubenpazch/tabs`](#rubenpazchtabs)                                   | Navegación                 | Tabs                                                                                      | Pestañas para alternar entre secciones de una misma vista.                                                                                                                                                                                             |
| [`@rubenpazch/text-input`](#rubenpazchtext-input)                       | Formularios                | TextInput                                                                                 | Campo de texto con etiqueta, ayuda, advertencia, error, iconos y variantes.                                                                                                                                                                            |
| [`@rubenpazch/textarea`](#rubenpazchtextarea)                           | Formularios                | Textarea                                                                                  | Área de texto con etiqueta, ayuda, advertencia, error, contador de caracteres y crecimiento automático.                                                                                                                                                |
| [`@rubenpazch/timeline`](#rubenpazchtimeline)                           | Presentación de datos      | Timeline                                                                                  | Línea de tiempo vertical: historial de un trámite, pedido o expediente (eventos con estado, fecha y descripción).                                                                                                                                      |
| [`@rubenpazch/toast`](#rubenpazchtoast)                                 | Retroalimentación          | ToastBanner, ToastProvider, ToastRegion, useToast                                         | Notificaciones temporales (Toast) y avisos fijos (ToastBanner) con tipos y acciones.                                                                                                                                                                   |
| [`@rubenpazch/tokens`](#rubenpazchtokens)                               | Base (tokens y utilidades) | cssVar, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, …                    | Tokens de diseño (colores, tipografía, espacios, radios, sombras) como variables CSS --lb-*, estilos base y puente para Tailwind 4.                                                                                                                    |
| [`@rubenpazch/tooltip`](#rubenpazchtooltip)                             | Presentación de datos      | Tooltip                                                                                   | Texto de ayuda breve al pasar el mouse o enfocar con teclado (role="tooltip", aria-describedby), se cierra con Escape.                                                                                                                                 |
| [`@rubenpazch/user-card`](#rubenpazchuser-card)                         | Presentación de datos      | UserCard, initials                                                                        | Tarjeta de una persona (usuario, socio, cliente): avatar, nombre, correo u otro dato, etiquetas y acciones; las secundarias van en un menú ⋮.                                                                                                          |

## Base (tokens y utilidades)

### @rubenpazch/shared

Utilidades (classList) y tipos comunes; la usan internamente los componentes.

- **Usar cuando:** Solo si construyes un componente nuevo dentro de la librería.
- **Evitar cuando:** En las apps: no hace falta importarla.

Otras exportaciones: `classList`, `normalizeSize`, `toLegacySize`, `useFieldIds`, `useEscapeKey`, `useFocusTrap`, `useLockBodyScroll`, `useClickOutside`, `mergeRefs`, `useMediaQuery`, `MOBILE_QUERY`, `parseISODate`, `toISODate`, `isDayFirst`, `datePlaceholder`, `parseLocalDate`, `formatLocalDate`, `formatMonthYear`, `isSameDay`.

Tipos: `Size`, `Color`, `Variant`, `ComponentSize`, `LegacySize`, `SizeProp`, `FieldProps`, `FieldIds`.

### @rubenpazch/tokens

Tokens de diseño (colores, tipografía, espacios, radios, sombras) como variables CSS --lb-*, estilos base y puente para Tailwind 4.

- **Usar cuando:** Siempre: importar tokens.css una vez por app; usar var(--lb-_) o las clases de Tailwind lb-_.
- **Evitar cuando:** No escribir colores en hexadecimal en las apps.

Otras exportaciones: `cssVar`, `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `color`, `space`, `radius`, `shadow`, `tokens`.

Tipos: `Tokens`.

## Acciones

### @rubenpazch/button

Botón con variantes text/contained/outlined, colores, tamaños, estado de carga e iconos; puede renderizar un enlace (href).

- **Usar cuando:** Cualquier acción principal o secundaria: guardar, enviar, cancelar, navegar con apariencia de botón.
- **Evitar cuando:** Acciones de solo icono: usa IconButton.

#### Button

```tsx
import { Button } from "@rubenpazch/ui";
```

| Prop               | Tipo                                                                      | Req. | Por defecto | Descripción                                                      |
| ------------------ | ------------------------------------------------------------------------- | ---- | ----------- | ---------------------------------------------------------------- |
| `color`            | `"primary" \| "secondary" \| "success" \| "error" \| "warning" \| "info"` |      |             | Button color theme                                               |
| `component`        | `"button" \| "a"`                                                         |      |             |                                                                  |
| `disabled`         | `boolean`                                                                 |      |             | Disabled state                                                   |
| `disableElevation` | `boolean`                                                                 |      |             | Disable elevation/shadow effects                                 |
| `endIcon`          | `ReactNode`                                                               |      |             | Icon to display after text                                       |
| `fullWidth`        | `boolean`                                                                 |      |             | Whether the button should take full width                        |
| `href`             | `string`                                                                  |      |             |                                                                  |
| `loading`          | `boolean`                                                                 |      |             | Loading state with spinner                                       |
| `size`             | `"small" \| "medium" \| "large" \| "sm" \| "md" \| "lg"`                  |      |             | Tamaño: sm, md (por defecto) o lg; también small, medium, large. |
| `startIcon`        | `ReactNode`                                                               |      |             | Icon to display before text                                      |
| `variant`          | `"text" \| "contained" \| "outlined"`                                     |      |             | Button variant style                                             |

### @rubenpazch/icon-button

Botón de solo icono con variantes, formas, tooltip y etiqueta accesible.

- **Usar cuando:** Acciones compactas en tablas, barras de herramientas o tarjetas (editar, borrar, cerrar).
- **Evitar cuando:** Acciones principales con texto: usa Button.

#### IconButton

```tsx
import { IconButton } from "@rubenpazch/ui";
```

| Prop               | Tipo                                                                                                        | Req. | Por defecto | Descripción |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ---- | ----------- | ----------- |
| `icon`             | `ReactNode`                                                                                                 | sí   |             |             |
| `filled`           | `boolean`                                                                                                   |      | `false`     |             |
| `focusStyleType`   | `"filled" \| "outline" \| "underline"`                                                                      |      | `filled`    |             |
| `focusTriggerType` | `"self" \| "sibling" \| "parent" \| "grandparent"`                                                          |      | `self`      |             |
| `iconPosition`     | `"start" \| "end"`                                                                                          |      | `start`     |             |
| `inverted`         | `boolean`                                                                                                   |      | `false`     |             |
| `label`            | `ReactNode`                                                                                                 |      |             |             |
| `labelPosition`    | `"start" \| "end" \| "top" \| "bottom"`                                                                     |      | `end`       |             |
| `linkStyle`        | `boolean`                                                                                                   |      | `false`     |             |
| `quiet`            | `boolean`                                                                                                   |      | `false`     |             |
| `shape`            | `"rounded" \| "square"`                                                                                     |      | `rounded`   |             |
| `size`             | `"small" \| "medium" \| "sm" \| "md"`                                                                       |      | `medium`    |             |
| `tooltip`          | `ReactNode`                                                                                                 |      |             |             |
| `tooltipPosition`  | `"top" \| "bottom" \| "left" \| "right"`                                                                    |      | `top`       |             |
| `variant`          | `"default" \| "secondary" \| "black" \| "gradient-green" \| "solid-green" \| "blue" \| "pink" \| "warning"` |      | `default`   |             |

Tipos: `IconButtonVariant`, `IconButtonSize`, `IconButtonShape`, `IconButtonFocusStyle`, `IconButtonFocusTrigger`, `IconPosition`, `LabelPosition`, `TooltipPosition`, `IconButtonProps`.

### @rubenpazch/menu

Menú de acciones (role="menu") con botón ⋮ por defecto, opciones con icono, peligrosas o deshabilitadas, teclado completo.

- **Usar cuando:** Acciones secundarias de una fila o tarjeta: Editar, Duplicar, Anular, Eliminar.
- **Evitar cuando:** La acción principal: usa Button. Navegación del sitio: usa AppShell o enlaces.

#### Menu

Menú de acciones (role="menu"): ⋮ con Editar, Duplicar, Eliminar… Flechas, Inicio, Fin,
Enter y Escape; se cierra al elegir o al hacer clic fuera.

```tsx
import { Menu } from "@rubenpazch/ui";
```

| Prop      | Tipo               | Req. | Por defecto    | Descripción                                                                    |
| --------- | ------------------ | ---- | -------------- | ------------------------------------------------------------------------------ |
| `items`   | `MenuItem[]`       | sí   |                | Opciones del menú.                                                             |
| `align`   | `"start" \| "end"` |      | `end`          | Alineación del panel respecto al botón: end (por defecto) o start.             |
| `label`   | `string`           |      | `Más opciones` | Texto accesible del botón por defecto (por defecto "Más opciones").            |
| `trigger` | `ReactNode`        |      |                | Botón que lo abre. Por defecto un botón "⋮" con el texto accesible de `label`. |

Tipos: `MenuProps`, `MenuItem`.

## Formularios

### @rubenpazch/autocomplete

Selector con búsqueda sobre una lista de opciones (con descripción, carga y opción de limpiar).

- **Usar cuando:** Elegir un valor entre muchas opciones (más de ~8) o cuando el usuario necesita filtrar escribiendo.
- **Evitar cuando:** Pocas opciones fijas: usa Select o RadioGroup.

#### Autocomplete

Selector con búsqueda (combobox accesible): filtra mientras se escribe, teclado completo.

```tsx
import { Autocomplete } from "@rubenpazch/ui";
```

| Prop              | Tipo                                                                                  | Req. | Por defecto             | Descripción                                |
| ----------------- | ------------------------------------------------------------------------------------- | ---- | ----------------------- | ------------------------------------------ |
| `onChange`        | `(value: string \| number \| null, option?: AutocompleteOption \| undefined) => void` | sí   |                         |                                            |
| `value`           | `null \| string \| number`                                                            | sí   |                         |                                            |
| `className`       | `string`                                                                              |      | ``                      |                                            |
| `clearable`       | `boolean`                                                                             |      | `true`                  |                                            |
| `createLabel`     | `string`                                                                              |      | `Crear`                 |                                            |
| `debounceMs`      | `number`                                                                              |      | `300`                   |                                            |
| `disabled`        | `boolean`                                                                             |      | `false`                 |                                            |
| `error`           | `string`                                                                              |      |                         |                                            |
| `highlightMatch`  | `boolean`                                                                             |      | `true`                  |                                            |
| `hint`            | `string`                                                                              |      |                         |                                            |
| `icon`            | `ReactNode`                                                                           |      |                         |                                            |
| `id`              | `string`                                                                              |      |                         | id del input; si no se pasa se genera uno. |
| `keepListOpen`    | `boolean`                                                                             |      | `false`                 |                                            |
| `label`           | `string`                                                                              |      |                         |                                            |
| `labels`          | `Partial<{ clear: string; open: string; close: string; }>`                            |      |                         | Textos accesibles de los botones.          |
| `loading`         | `boolean`                                                                             |      | `false`                 |                                            |
| `loadingText`     | `string`                                                                              |      | `Cargando…`             |                                            |
| `maxHeight`       | `string`                                                                              |      | `300px`                 |                                            |
| `minSearchLength` | `number`                                                                              |      | `0`                     |                                            |
| `name`            | `string`                                                                              |      |                         | name del input.                            |
| `noResultsText`   | `string`                                                                              |      | `Sin resultados`        |                                            |
| `onBlur`          | `() => void`                                                                          |      |                         |                                            |
| `onCreate`        | `(searchTerm: string) => void`                                                        |      |                         |                                            |
| `onFocus`         | `() => void`                                                                          |      |                         |                                            |
| `onSearch`        | `(searchTerm: string) => void`                                                        |      |                         |                                            |
| `options`         | `AutocompleteOption[]`                                                                |      | `[]`                    |                                            |
| `placeholder`     | `string`                                                                              |      | `Buscar o seleccionar…` |                                            |
| `position`        | `"bottom" \| "top"`                                                                   |      | `bottom`                |                                            |
| `readOnly`        | `boolean`                                                                             |      | `false`                 |                                            |
| `renderOption`    | `(option: AutocompleteOption, isSelected: boolean) => ReactNode`                      |      |                         |                                            |
| `required`        | `boolean`                                                                             |      | `false`                 |                                            |
| `searchable`      | `boolean`                                                                             |      | `true`                  |                                            |
| `warning`         | `string`                                                                              |      |                         |                                            |

### @rubenpazch/checkbox-input

Casilla de verificación con etiqueta, ayuda y error.

- **Usar cuando:** Opciones sí/no o selección múltiple independiente.
- **Evitar cuando:** Elegir una sola opción entre varias: usa RadioGroup.

#### CheckboxInput

Casilla de verificación con etiqueta, descripción y error.

```tsx
import { CheckboxInput } from "@rubenpazch/ui";
```

| Prop            | Tipo                                                           | Req. | Por defecto | Descripción                                             |
| --------------- | -------------------------------------------------------------- | ---- | ----------- | ------------------------------------------------------- |
| `label`         | `string`                                                       | sí   |             |                                                         |
| `checked`       | `boolean`                                                      |      | `false`     |                                                         |
| `className`     | `string`                                                       |      | ``          |                                                         |
| `description`   | `string`                                                       |      |             |                                                         |
| `disabled`      | `boolean`                                                      |      | `false`     |                                                         |
| `error`         | `string`                                                       |      |             |                                                         |
| `id`            | `string`                                                       |      |             | id del input; si no se pasa se genera uno estable.      |
| `indeterminate` | `boolean`                                                      |      | `false`     |                                                         |
| `name`          | `string`                                                       |      |             | name del input (formularios nativos, react-hook-form…). |
| `onChange`      | `(checked: boolean) => void`                                   |      |             |                                                         |
| `required`      | `boolean`                                                      |      | `false`     |                                                         |
| `size`          | `"sm" \| "md" \| "lg"`                                         |      | `md`        |                                                         |
| `value`         | `string`                                                       |      |             | Valor enviado con el formulario cuando está marcado.    |
| `variant`       | `"default" \| "primary" \| "success" \| "warning" \| "danger"` |      | `default`   |                                                         |

### @rubenpazch/date-input

Campo de fecha con formato local, mínimo/máximo, ayuda y error.

- **Usar cuando:** Ingresar una fecha escribiéndola (fecha de nacimiento, fecha de documento).
- **Evitar cuando:** Elegir en un calendario visual: usa DatePicker.

#### DateInput

Campo de fecha con calendario desplegable. Se escribe en el formato del idioma
(DD/MM/AAAA en español) y devuelve siempre ISO `AAAA-MM-DD`, en hora local.

```tsx
import { DateInput } from "@rubenpazch/ui";
```

| Prop               | Tipo                       | Req. | Por defecto | Descripción                                                                                                                        |
| ------------------ | -------------------------- | ---- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `onChange`         | `(date: string) => void`   | sí   |             | Recibe la fecha en ISO `AAAA-MM-DD` (o "" al limpiar).                                                                             |
| `value`            | `string`                   | sí   |             | Fecha en formato ISO `AAAA-MM-DD`, o cadena vacía.                                                                                 |
| `className`        | `string`                   |      | ``          | Clase extra para el contenedor.                                                                                                    |
| `disabled`         | `boolean`                  |      | `false`     | Campo deshabilitado.                                                                                                               |
| `error`            | `string`                   |      |             | Mensaje de error; marca el campo como inválido.                                                                                    |
| `hint`             | `string`                   |      |             | Texto de ayuda.                                                                                                                    |
| `id`               | `string`                   |      |             | id del input; si no se pasa se genera uno (la etiqueta se asocia sola).                                                            |
| `label`            | `string`                   |      |             | Etiqueta visible.                                                                                                                  |
| `labels`           | `Partial<DateInputLabels>` |      |             | Textos del calendario; por defecto en el idioma de `locale`.                                                                       |
| `locale`           | `string`                   |      | `es`        | Idioma: `es` (por defecto, día/mes) o `en` (mes/día).                                                                              |
| `maxDate`          | `string`                   |      |             | Fecha máxima seleccionable (ISO).                                                                                                  |
| `minDate`          | `string`                   |      |             | Fecha mínima seleccionable (ISO).                                                                                                  |
| `mobileFullScreen` | `boolean`                  |      | `true`      | En pantallas pequeñas (< 640 px) el calendario se abre a pantalla completa y vuelve al campo al elegir la fecha. Por defecto true. |
| `name`             | `string`                   |      |             | name del input (formularios nativos, react-hook-form…).                                                                            |
| `placeholder`      | `string`                   |      |             | Por defecto el formato del idioma: "DD/MM/AAAA" en español.                                                                        |
| `required`         | `boolean`                  |      | `false`     | Campo obligatorio.                                                                                                                 |

### @rubenpazch/date-picker

Selector de fecha con calendario desplegable.

- **Usar cuando:** Elegir una fecha cercana o explorando el calendario (citas, vencimientos).
- **Evitar cuando:** Fechas lejanas que el usuario conoce de memoria: usa DateInput.

#### DatePicker

Selector de fecha con calendario (días, meses y años). Devuelve ISO `AAAA-MM-DD` en hora local.

```tsx
import { DatePicker } from "@rubenpazch/ui";
```

| Prop                | Tipo                     | Req. | Por defecto | Descripción                                                                                                                        |
| ------------------- | ------------------------ | ---- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `onChange`          | `(date: string) => void` | sí   |             |                                                                                                                                    |
| `value`             | `string`                 | sí   |             |                                                                                                                                    |
| `className`         | `string`                 |      | ``          |                                                                                                                                    |
| `disabled`          | `boolean`                |      | `false`     |                                                                                                                                    |
| `error`             | `string`                 |      |             |                                                                                                                                    |
| `hint`              | `string`                 |      |             |                                                                                                                                    |
| `id`                | `string`                 |      |             | id del input; si no se pasa se genera uno (la etiqueta se asocia sola).                                                            |
| `label`             | `string`                 |      |             |                                                                                                                                    |
| `locale`            | `string`                 |      | `es`        |                                                                                                                                    |
| `maxDate`           | `string`                 |      |             |                                                                                                                                    |
| `minDate`           | `string`                 |      |             |                                                                                                                                    |
| `mobileFullScreen`  | `boolean`                |      | `true`      | En pantallas pequeñas (< 640 px) el calendario se abre a pantalla completa y vuelve al campo al elegir la fecha. Por defecto true. |
| `name`              | `string`                 |      |             | name del input.                                                                                                                    |
| `openCalendarLabel` | `string`                 |      |             | Texto del botón que abre el calendario (accesibilidad).                                                                            |
| `placeholder`       | `string`                 |      |             |                                                                                                                                    |
| `readOnly`          | `boolean`                |      | `false`     |                                                                                                                                    |
| `required`          | `boolean`                |      | `false`     |                                                                                                                                    |

### @rubenpazch/file-upload

Zona para subir uno o varios archivos (arrastrar y soltar o elegir), con validación de tipo, tamaño y cantidad, y lista para quitarlos.

- **Usar cuando:** Adjuntar documentos o archivos en un formulario.
- **Evitar cuando:** Una sola imagen con vista previa (logo, foto): usa ImageUpload.

#### FileUpload

Zona para subir uno o varios archivos: arrastrar y soltar o "Elegir archivos" (teclado).
Valida tipo, tamaño, cantidad y duplicados; los rechazados se informan en la zona y por `onReject`.
No sube nada: entrega los `File` a la app, que decide cuándo y cómo enviarlos.

```tsx
import { FileUpload } from "@rubenpazch/ui";
```

| Prop        | Tipo                                    | Req. | Por defecto | Descripción                                                                           |
| ----------- | --------------------------------------- | ---- | ----------- | ------------------------------------------------------------------------------------- |
| `onChange`  | `(files: File[]) => void`               | sí   |             | Nueva lista de archivos (agregados o quitados).                                       |
| `value`     | `File[]`                                | sí   |             | Archivos elegidos (controlado).                                                       |
| `accept`    | `string`                                |      |             | Tipos aceptados como en `<input accept>`: ".pdf,.docx", "image/*", "application/pdf". |
| `className` | `string`                                |      |             |                                                                                       |
| `disabled`  | `boolean`                               |      | `false`     |                                                                                       |
| `error`     | `string`                                |      |             | Error externo (validación del formulario).                                            |
| `hint`      | `string`                                |      |             |                                                                                       |
| `id`        | `string`                                |      |             |                                                                                       |
| `label`     | `string`                                |      |             |                                                                                       |
| `labels`    | `Partial<FileUploadLabels>`             |      |             |                                                                                       |
| `maxFiles`  | `number`                                |      |             | Máximo de archivos (por defecto sin límite).                                          |
| `maxSizeMB` | `number`                                |      |             | Tamaño máximo por archivo en MB.                                                      |
| `multiple`  | `boolean`                               |      | `true`      | Permitir varios archivos (por defecto sí).                                            |
| `name`      | `string`                                |      |             |                                                                                       |
| `onReject`  | `(rejections: FileRejection[]) => void` |      |             | Archivos que no se aceptaron y por qué (para avisar o registrar).                     |
| `required`  | `boolean`                               |      | `false`     |                                                                                       |

#### DEFAULT_FILE_UPLOAD_LABELS

```tsx
import { DEFAULT_FILE_UPLOAD_LABELS } from "@rubenpazch/ui";
```

_Sin props documentadas._

Otras exportaciones: `aceptaArchivo`.

Tipos: `FileRejection`, `FileUploadLabels`, `FileUploadProps`.

### @rubenpazch/form-field

FormField (etiqueta, ayuda y error asociados a cualquier control), FormRow (columnas que se apilan en móvil) y FormActions (pie con botones).

- **Usar cuando:** Armar formularios: FormRow para poner campos lado a lado, FormActions para Cancelar/Guardar, FormField para controles propios o de terceros.
- **Evitar cuando:** Con componentes de la librería (TextInput, Select…) no hace falta FormField: ya traen etiqueta y mensajes.

#### FormField

Envoltorio de campo: etiqueta, ayuda, advertencia y error asociados a cualquier control
(nativo o de terceros). Los componentes de la librería ya lo traen; úsalo para controles propios.

```tsx
import { FormField } from "@rubenpazch/ui";
```

| Prop        | Tipo        | Req. | Por defecto | Descripción                                                                                                                                                                   |
| ----------- | ----------- | ---- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`  | `ReactNode` | sí   |             | El control. Puede ser un elemento (`<input />`, `<select>`) al que se le agregan id y ARIA, o una función que recibe esos atributos: `{(props) => <MiControl {...props} />}`. |
| `className` | `string`    |      |             | Clase extra para el contenedor (márgenes, ancho).                                                                                                                             |
| `disabled`  | `boolean`   |      | `false`     | Campo deshabilitado.                                                                                                                                                          |
| `error`     | `string`    |      |             | Mensaje de error; marca el campo como inválido.                                                                                                                               |
| `hint`      | `string`    |      |             | Texto de ayuda bajo el campo.                                                                                                                                                 |
| `id`        | `string`    |      |             | id del control. Si no se pasa, se genera uno.                                                                                                                                 |
| `label`     | `string`    |      |             | Etiqueta visible del campo (se asocia al control para lectores de pantalla).                                                                                                  |
| `name`      | `string`    |      |             | name del control (formularios nativos y librerías de formularios).                                                                                                            |
| `required`  | `boolean`   |      | `false`     | Campo obligatorio: muestra * y marca el control como requerido.                                                                                                               |
| `warning`   | `string`    |      |             | Advertencia (no bloquea).                                                                                                                                                     |

#### FormRow

Fila de campos en columnas que se apilan en móvil.

```tsx
import { FormRow } from "@rubenpazch/ui";
```

| Prop      | Tipo               | Req. | Por defecto | Descripción                                                       |
| --------- | ------------------ | ---- | ----------- | ----------------------------------------------------------------- |
| `columns` | `1 \| 2 \| 3 \| 4` |      | `2`         | Columnas en pantallas anchas (en móvil siempre 1). Por defecto 2. |

#### FormActions

Pie de formulario con los botones (Cancelar / Guardar).

```tsx
import { FormActions } from "@rubenpazch/ui";
```

| Prop     | Tipo                                        | Req. | Por defecto | Descripción                                                            |
| -------- | ------------------------------------------- | ---- | ----------- | ---------------------------------------------------------------------- |
| `align`  | `"start" \| "end" \| "between" \| "center"` |      | `end`       | Alineación de los botones: end (por defecto), start, between o center. |
| `sticky` | `boolean`                                   |      | `false`     | Fija el pie al fondo de la pantalla en formularios largos.             |

Tipos: `FormFieldProps`, `FormFieldControlProps`, `FormRowProps`, `FormActionsProps`.

### @rubenpazch/image-upload

Subida de imagen o PDF con vista previa, arrastrar y soltar, validación de tipo y tamaño.

- **Usar cuando:** Fotos de perfil, comprobantes, documentos adjuntos (suele enviar a archivos-api).
- **Evitar cuando:** Muchos archivos a la vez sin vista previa.

#### ImageUpload

El `ref` apunta al `<input type="file">`.

```tsx
import { ImageUpload } from "@rubenpazch/ui";
```

| Prop              | Tipo                            | Req. | Por defecto                                    | Descripción                                    |
| ----------------- | ------------------------------- | ---- | ---------------------------------------------- | ---------------------------------------------- |
| `onUpload`        | `(file: File) => Promise<void>` | sí   |                                                |                                                |
| `acceptedFormats` | `string[]`                      |      | `["image/jpeg", "image/png", "image/svg+xml"]` |                                                |
| `className`       | `string`                        |      | ``                                             |                                                |
| `currentImageUrl` | `string`                        |      |                                                |                                                |
| `disabled`        | `boolean`                       |      | `false`                                        |                                                |
| `error`           | `string`                        |      |                                                | Error externo (validación del formulario).     |
| `hint`            | `string`                        |      |                                                | Texto de ayuda bajo el campo.                  |
| `id`              | `string`                        |      |                                                |                                                |
| `label`           | `string`                        |      |                                                |                                                |
| `labels`          | `Partial<ImageUploadLabels>`    |      |                                                | Textos de la interfaz; por defecto en español. |
| `maxSizeMB`       | `number`                        |      | `5`                                            |                                                |
| `name`            | `string`                        |      |                                                |                                                |
| `onRemove`        | `() => Promise<void>`           |      |                                                |                                                |
| `previewHeight`   | `number`                        |      | `200`                                          |                                                |
| `previewWidth`    | `number`                        |      | `200`                                          |                                                |
| `required`        | `boolean`                       |      | `false`                                        |                                                |

#### DEFAULT_IMAGE_UPLOAD_LABELS

```tsx
import { DEFAULT_IMAGE_UPLOAD_LABELS } from "@rubenpazch/ui";
```

_Sin props documentadas._

Tipos: `ImageUploadProps`, `ImageUploadLabels`.

### @rubenpazch/money-input

Campo de monto en PEN (S/) o USD (US$) que devuelve un número; acepta punto o coma decimal y muestra 1,250.50 al salir. Incluye formatMoney().

- **Usar cuando:** Montos de dinero: cuotas, pagos, precios, presupuestos. Usa formatMoney() para mostrar montos en tablas y tarjetas.
- **Evitar cuando:** Cantidades sin moneda: usa NumericPicker. Valores con signo por pasos: usa NumericUpPicker.

#### MoneyInput

Campo de monto en soles o dólares. Mientras se escribe acepta "1250.5" o "1250,5"; al salir
muestra "1,250.50". Devuelve siempre un número (no texto).

```tsx
import { MoneyInput } from "@rubenpazch/ui";
```

| Prop            | Tipo                              | Req. | Por defecto | Descripción                                                                  |
| --------------- | --------------------------------- | ---- | ----------- | ---------------------------------------------------------------------------- |
| `onChange`      | `(value: number \| null) => void` | sí   |             | Recibe el monto como número, o null si se borra.                             |
| `value`         | `null \| number`                  | sí   |             | Monto actual como número (o null si está vacío).                             |
| `allowNegative` | `boolean`                         |      | `false`     | Permite montos negativos (por defecto no).                                   |
| `className`     | `string`                          |      |             | Clase extra para el contenedor (márgenes, ancho).                            |
| `currency`      | `"PEN" \| "USD"`                  |      | `PEN`       | PEN (por defecto, S/) o USD (US$).                                           |
| `decimals`      | `number`                          |      | `2`         | Decimales (por defecto 2).                                                   |
| `disabled`      | `boolean`                         |      | `false`     | Campo deshabilitado.                                                         |
| `error`         | `string`                          |      |             | Mensaje de error; marca el campo como inválido.                              |
| `hint`          | `string`                          |      |             | Texto de ayuda bajo el campo.                                                |
| `id`            | `string`                          |      |             | id del control. Si no se pasa, se genera uno.                                |
| `label`         | `string`                          |      |             | Etiqueta visible del campo (se asocia al control para lectores de pantalla). |
| `max`           | `number`                          |      |             | Máximo.                                                                      |
| `min`           | `number`                          |      | `0`         | Mínimo (por defecto 0).                                                      |
| `name`          | `string`                          |      |             | name del control (formularios nativos y librerías de formularios).           |
| `placeholder`   | `string`                          |      | `0.00`      | Texto de ejemplo.                                                            |
| `required`      | `boolean`                         |      | `false`     | Campo obligatorio: muestra * y marca el control como requerido.              |
| `warning`       | `string`                          |      |             | Advertencia (no bloquea).                                                    |

Otras exportaciones: `formatMoney`.

Tipos: `MoneyInputProps`, `Currency`.

### @rubenpazch/numeric-picker

Campo numérico con mínimo, máximo, paso, decimales y moneda.

- **Usar cuando:** Montos, cantidades y precios.
- **Evitar cuando:** Valores con signo o graduaciones ópticas: usa NumericUpPicker.

#### NumericPicker

Campo numérico para montos, cantidades y precios. Mientras se escribe no se reformatea
(se puede escribir 12, 1250.5…); al salir del campo se aplican mínimo, máximo y decimales.

```tsx
import { NumericPicker } from "@rubenpazch/ui";
```

| Prop          | Tipo                                                 | Req. | Por defecto | Descripción                                                                        |
| ------------- | ---------------------------------------------------- | ---- | ----------- | ---------------------------------------------------------------------------------- |
| `onChange`    | `(value: string) => void`                            | sí   |             | Recibe el valor como texto con punto decimal (p. ej. "12.50"), o "" si está vacío. |
| `value`       | `string \| number`                                   | sí   |             | Valor actual (número o texto numérico con punto decimal).                          |
| `className`   | `string`                                             |      |             | Clase extra para el contenedor.                                                    |
| `currency`    | `string`                                             |      | `S/`        | Símbolo de moneda que se muestra delante. Usa "" para ocultarlo.                   |
| `decimals`    | `number`                                             |      | `2`         | Decimales con los que se formatea al salir del campo.                              |
| `disabled`    | `boolean`                                            |      | `false`     | Campo deshabilitado.                                                               |
| `error`       | `string`                                             |      |             | Mensaje de error; marca el campo como inválido.                                    |
| `hint`        | `string`                                             |      |             | Texto de ayuda.                                                                    |
| `id`          | `string`                                             |      |             | id del input; si no se pasa se genera uno.                                         |
| `label`       | `string`                                             |      |             | Etiqueta visible (se asocia al input).                                             |
| `labels`      | `Partial<{ increment: string; decrement: string; }>` |      |             | Textos accesibles de los botones.                                                  |
| `max`         | `number`                                             |      | `999999`    | Máximo permitido.                                                                  |
| `min`         | `number`                                             |      | `0`         | Mínimo permitido.                                                                  |
| `name`        | `string`                                             |      |             | name del input.                                                                    |
| `placeholder` | `string`                                             |      | `0.00`      | Texto de ejemplo.                                                                  |
| `required`    | `boolean`                                            |      | `false`     | Campo obligatorio.                                                                 |
| `step`        | `number`                                             |      | `1`         | Paso de los botones + y −.                                                         |

### @rubenpazch/numeric-up-picker

Campo numérico con botones +/-, signo opcional, solo enteros, ayuda, advertencia y error.

- **Usar cuando:** Ajustar un valor por pasos (cantidades, graduaciones con signo).
- **Evitar cuando:** Montos de dinero: usa NumericPicker.

#### NumericUpPicker

Campo numérico con botones − y +, signo opcional, solo enteros, ayuda, advertencia y error.

```tsx
import { NumericUpPicker } from "@rubenpazch/ui";
```

| Prop              | Tipo                                                              | Req. | Por defecto | Descripción                                |
| ----------------- | ----------------------------------------------------------------- | ---- | ----------- | ------------------------------------------ |
| `onChange`        | `(value: string) => void`                                         | sí   |             |                                            |
| `value`           | `string \| number`                                                | sí   |             |                                            |
| `alwaysNegative`  | `boolean`                                                         |      | `false`     |                                            |
| `className`       | `string`                                                          |      | ``          |                                            |
| `clearable`       | `boolean`                                                         |      | `false`     |                                            |
| `defaultToZero`   | `boolean`                                                         |      | `false`     |                                            |
| `disabled`        | `boolean`                                                         |      | `false`     |                                            |
| `error`           | `string`                                                          |      |             |                                            |
| `hint`            | `string`                                                          |      |             |                                            |
| `id`              | `string`                                                          |      |             | id del input; si no se pasa se genera uno. |
| `integerOnly`     | `boolean`                                                         |      | `false`     |                                            |
| `label`           | `string`                                                          |      |             |                                            |
| `labels`          | `Partial<{ decrease: string; increase: string; clear: string; }>` |      |             | Textos accesibles de los botones.          |
| `max`             | `number`                                                          |      |             |                                            |
| `min`             | `number`                                                          |      |             |                                            |
| `name`            | `string`                                                          |      |             | name del input.                            |
| `onBlur`          | `() => void`                                                      |      |             |                                            |
| `onClear`         | `() => void`                                                      |      |             |                                            |
| `onFocus`         | `() => void`                                                      |      |             |                                            |
| `placeholder`     | `string`                                                          |      |             |                                            |
| `required`        | `boolean`                                                         |      | `false`     |                                            |
| `showSign`        | `boolean`                                                         |      | `false`     |                                            |
| `size`            | `"sm" \| "md" \| "lg" \| "small" \| "medium" \| "large"`          |      | `md`        | Tamaño: sm, md (por defecto) o lg.         |
| `step`            | `number`                                                          |      | `0.01`      |                                            |
| `useMinAsDefault` | `boolean`                                                         |      | `false`     |                                            |
| `warning`         | `string`                                                          |      |             |                                            |

Tipos: `NumericUpPickerProps`, `NumericUpPickerSize`.

### @rubenpazch/radio-button

RadioButton y RadioGroup accesibles con variantes y validación.

- **Usar cuando:** Elegir una sola opción entre pocas (2 a 6) visibles a la vez.
- **Evitar cuando:** Muchas opciones: usa Select o Autocomplete.

#### RadioButton

```tsx
import { RadioButton } from "@rubenpazch/ui";
```

| Prop          | Tipo                                                           | Req. | Por defecto | Descripción |
| ------------- | -------------------------------------------------------------- | ---- | ----------- | ----------- |
| `label`       | `string`                                                       | sí   |             |             |
| `name`        | `string`                                                       | sí   |             |             |
| `value`       | `string`                                                       | sí   |             |             |
| `checked`     | `boolean`                                                      |      | `false`     |             |
| `className`   | `string`                                                       |      | ``          |             |
| `description` | `string`                                                       |      |             |             |
| `disabled`    | `boolean`                                                      |      | `false`     |             |
| `error`       | `string`                                                       |      |             |             |
| `id`          | `string`                                                       |      |             |             |
| `onChange`    | `(value: string) => void`                                      |      |             |             |
| `required`    | `boolean`                                                      |      | `false`     |             |
| `size`        | `"sm" \| "md" \| "lg"`                                         |      | `md`        |             |
| `variant`     | `"default" \| "primary" \| "success" \| "warning" \| "danger"` |      | `default`   |             |

#### RadioGroup

```tsx
import { RadioGroup } from "@rubenpazch/ui";
```

| Prop                | Tipo                                                           | Req. | Por defecto     | Descripción                                 |
| ------------------- | -------------------------------------------------------------- | ---- | --------------- | ------------------------------------------- |
| `name`              | `string`                                                       | sí   |                 |                                             |
| `onChange`          | `(value: string) => void`                                      | sí   |                 |                                             |
| `options`           | `RadioOption[]`                                                | sí   |                 |                                             |
| `bordered`          | `boolean`                                                      |      | `false`         |                                             |
| `borderLabel`       | `string`                                                       |      |                 |                                             |
| `className`         | `string`                                                       |      | ``              |                                             |
| `disabled`          | `boolean`                                                      |      | `false`         |                                             |
| `error`             | `string`                                                       |      |                 |                                             |
| `groupLabel`        | `string`                                                       |      |                 |                                             |
| `hint`              | `string`                                                       |      |                 | Texto de ayuda bajo el grupo.               |
| `id`                | `string`                                                       |      |                 |                                             |
| `label`             | `string`                                                       |      |                 | Etiqueta del grupo (alias de `groupLabel`). |
| `orientation`       | `"vertical" \| "horizontal"`                                   |      | `vertical`      |                                             |
| `required`          | `boolean`                                                      |      | `false`         |                                             |
| `selectedLabelText` | `string`                                                       |      | `Seleccionado:` |                                             |
| `showSelectedLabel` | `boolean`                                                      |      | `false`         |                                             |
| `size`              | `"sm" \| "md" \| "lg"`                                         |      | `md`            |                                             |
| `value`             | `string`                                                       |      |                 |                                             |
| `variant`           | `"default" \| "primary" \| "success" \| "warning" \| "danger"` |      | `default`       |                                             |

Tipos: `RadioButtonProps`, `RadioSize`, `RadioVariant`, `RadioGroupProps`, `RadioOption`, `RadioGroupOrientation`.

### @rubenpazch/segmented-control

Botones unidos para elegir una opción entre pocas (radiogroup con flechas del teclado): Personal | Empresa, Mes | Año.

- **Usar cuando:** Cambiar la vista o un filtro con 2 a 5 opciones cortas, siempre visibles.
- **Evitar cuando:** Opciones largas o dentro de un formulario con etiqueta: usa RadioGroup. Muchas opciones: usa Select.

#### SegmentedControl

Selector de una opción entre pocas, como botones unidos (role="radiogroup"). Se mueve con
las flechas del teclado. Ej.: Personal | Empresa, Mes | Año.

```tsx
import { SegmentedControl } from "@rubenpazch/ui";
```

| Prop         | Tipo                   | Req. | Por defecto | Descripción                                    |
| ------------ | ---------------------- | ---- | ----------- | ---------------------------------------------- |
| `aria-label` | `string`               | sí   |             | Nombre accesible del grupo: "Ámbito", "Vista". |
| `onChange`   | `(value: T) => void`   | sí   |             | Recibe el valor elegido.                       |
| `options`    | `SegmentedOption<T>[]` | sí   |             | Opciones (2 a 5 funcionan mejor).              |
| `value`      | `string`               | sí   |             | Valor seleccionado.                            |
| `className`  | `string`               |      |             | Clase extra.                                   |
| `fullWidth`  | `boolean`              |      | `false`     | Ocupa todo el ancho.                           |
| `size`       | `"sm" \| "md"`         |      | `md`        | sm o md (por defecto).                         |

Tipos: `SegmentedControlProps`, `SegmentedOption`.

### @rubenpazch/select

Lista desplegable simple con etiqueta, placeholder y error.

- **Usar cuando:** Elegir una opción entre una lista corta y conocida.
- **Evitar cuando:** Listas largas o con búsqueda: usa Autocomplete.

#### Select

```tsx
import { Select } from "@rubenpazch/ui";
```

| Prop          | Tipo                      | Req. | Por defecto | Descripción                   |
| ------------- | ------------------------- | ---- | ----------- | ----------------------------- |
| `onChange`    | `(value: string) => void` | sí   |             |                               |
| `options`     | `SelectOption[]`          | sí   |             |                               |
| `value`       | `string`                  | sí   |             |                               |
| `className`   | `string`                  |      |             |                               |
| `disabled`    | `boolean`                 |      | `false`     |                               |
| `error`       | `string`                  |      |             |                               |
| `hint`        | `string`                  |      |             | Texto de ayuda bajo el campo. |
| `id`          | `string`                  |      |             |                               |
| `label`       | `string`                  |      |             |                               |
| `name`        | `string`                  |      |             |                               |
| `placeholder` | `string`                  |      |             |                               |
| `required`    | `boolean`                 |      | `false`     |                               |

Tipos: `SelectOption`, `SelectProps`.

### @rubenpazch/switch

Interruptor encendido/apagado (role="switch") con etiqueta y descripción.

- **Usar cuando:** Opciones que se activan al instante: notificaciones, módulo activo, mostrar en el sitio.
- **Evitar cuando:** Opciones que se guardan con un botón Enviar o selección múltiple en una lista: usa CheckboxInput.

#### Switch

Interruptor encendido/apagado (role="switch") para opciones que se aplican al instante.

```tsx
import { Switch } from "@rubenpazch/ui";
```

| Prop          | Tipo                         | Req. | Por defecto | Descripción                      |
| ------------- | ---------------------------- | ---- | ----------- | -------------------------------- |
| `checked`     | `boolean`                    | sí   |             | Encendido o apagado.             |
| `label`       | `ReactNode`                  | sí   |             | Etiqueta visible a la derecha.   |
| `onChange`    | `(checked: boolean) => void` | sí   |             | Recibe el nuevo estado.          |
| `className`   | `string`                     |      |             | Clase extra.                     |
| `description` | `ReactNode`                  |      |             | Texto de ayuda bajo la etiqueta. |
| `disabled`    | `boolean`                    |      | `false`     | Deshabilitado.                   |
| `id`          | `string`                     |      |             | id del interruptor.              |
| `name`        | `string`                     |      |             | name, para formularios.          |
| `size`        | `"sm" \| "md"`               |      | `md`        | sm o md (por defecto).           |

Tipos: `SwitchProps`.

### @rubenpazch/text-input

Campo de texto con etiqueta, ayuda, advertencia, error, iconos y variantes.

- **Usar cuando:** Cualquier entrada de texto (nombre, correo, búsqueda simple, contraseña).
- **Evitar cuando:** Números o fechas: usa NumericPicker, NumericUpPicker, DateInput o DatePicker.

#### TextInput

```tsx
import { TextInput } from "@rubenpazch/ui";
```

| Prop                     | Tipo                                                            | Req. | Por defecto | Descripción                                                                                                                                                                                                                                           |
| ------------------------ | --------------------------------------------------------------- | ---- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onChange`               | `(value: string) => void`                                       | sí   |             |                                                                                                                                                                                                                                                       |
| `value`                  | `string`                                                        | sí   |             |                                                                                                                                                                                                                                                       |
| `autoComplete`           | `string`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `className`              | `string`                                                        |      | ``          |                                                                                                                                                                                                                                                       |
| `disabled`               | `boolean`                                                       |      | `false`     |                                                                                                                                                                                                                                                       |
| `emailInvalidMessage`    | `string`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `emailSuggestionMessage` | `string`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `emailValidMessage`      | `string`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `error`                  | `string`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `hint`                   | `string`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `icon`                   | `ReactNode`                                                     |      |             |                                                                                                                                                                                                                                                       |
| `id`                     | `string`                                                        |      |             | id del input; si no se pasa se genera uno (la etiqueta se asocia sola).                                                                                                                                                                               |
| `label`                  | `string`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `max`                    | `number`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `maxLength`              | `number`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `min`                    | `number`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `minLength`              | `number`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `minLengthMessage`       | `string`                                                        |      |             | Inline error shown when the value is non-empty but shorter than `minLength`.                                                                                                                                                                          |
| `name`                   | `string`                                                        |      |             | name del input (formularios nativos, react-hook-form…).                                                                                                                                                                                               |
| `onBlur`                 | `() => void`                                                    |      |             |                                                                                                                                                                                                                                                       |
| `onFocus`                | `() => void`                                                    |      |             |                                                                                                                                                                                                                                                       |
| `onValidityChange`       | `(isValid: boolean) => void`                                    |      |             | Fires whenever the field's overall validity changes (respecting `required`, `validateEmail`, `minLength`, `maxLength`, `pattern` and `error`). Lets the parent gate a submit button on the component's own validation, without duplicating the rules. |
| `pattern`                | `string`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `placeholder`            | `string`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `required`               | `boolean`                                                       |      | `false`     |                                                                                                                                                                                                                                                       |
| `requiredMessage`        | `string`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `requirementsLabels`     | `Partial<PasswordRequirementsLabels>`                           |      |             |                                                                                                                                                                                                                                                       |
| `showPasswordStrength`   | `boolean`                                                       |      | `false`     |                                                                                                                                                                                                                                                       |
| `step`                   | `number`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `strengthLabelPrefix`    | `string`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `strengthLabels`         | `Partial<Record<PasswordStrengthKey, string>>`                  |      |             |                                                                                                                                                                                                                                                       |
| `type`                   | `"number" \| "text" \| "email" \| "tel" \| "password" \| "url"` |      | `text`      |                                                                                                                                                                                                                                                       |
| `validateEmail`          | `boolean`                                                       |      | `false`     |                                                                                                                                                                                                                                                       |
| `warning`                | `string`                                                        |      |             |                                                                                                                                                                                                                                                       |

Tipos: `TextInputProps`, `TextInputNativeProps`.

### @rubenpazch/textarea

Área de texto con etiqueta, ayuda, advertencia, error, contador de caracteres y crecimiento automático.

- **Usar cuando:** Textos de varias líneas: observaciones, motivos de anulación, descripciones.
- **Evitar cuando:** Una sola línea: usa TextInput. Texto con formato (negritas, enlaces, imágenes): usa RichTextEditor.

#### Textarea

Área de texto con etiqueta, ayuda, error, contador y crecimiento automático.

```tsx
import { Textarea } from "@rubenpazch/ui";
```

| Prop         | Tipo                      | Req. | Por defecto | Descripción                                                                  |
| ------------ | ------------------------- | ---- | ----------- | ---------------------------------------------------------------------------- |
| `onChange`   | `(value: string) => void` | sí   |             | Recibe el texto nuevo.                                                       |
| `value`      | `string`                  | sí   |             | Texto actual.                                                                |
| `autoResize` | `boolean`                 |      | `false`     | Crece con el contenido hasta maxRows.                                        |
| `className`  | `string`                  |      |             | Clase extra para el contenedor (márgenes, ancho).                            |
| `disabled`   | `boolean`                 |      | `false`     | Campo deshabilitado.                                                         |
| `error`      | `string`                  |      |             | Mensaje de error; marca el campo como inválido.                              |
| `hint`       | `string`                  |      |             | Texto de ayuda bajo el campo.                                                |
| `id`         | `string`                  |      |             | id del control. Si no se pasa, se genera uno.                                |
| `label`      | `string`                  |      |             | Etiqueta visible del campo (se asocia al control para lectores de pantalla). |
| `maxRows`    | `number`                  |      | `12`        | Máximo de filas al crecer (por defecto 12).                                  |
| `name`       | `string`                  |      |             | name del control (formularios nativos y librerías de formularios).           |
| `required`   | `boolean`                 |      | `false`     | Campo obligatorio: muestra * y marca el control como requerido.              |
| `rows`       | `number`                  |      | `4`         | Filas visibles al inicio (por defecto 4).                                    |
| `showCount`  | `boolean`                 |      | `true`      | Muestra el contador "120/500" cuando hay maxLength.                          |
| `warning`    | `string`                  |      |             | Advertencia (no bloquea).                                                    |

Tipos: `TextareaProps`.

## Navegación

### @rubenpazch/app-shell

Estructura completa de un panel: Sidebar colapsable, cabecera fija con botón ☰ en móvil, título y acciones, enlace "Saltar al contenido" y área principal con ancho máximo.

- **Usar cuando:** Layout raíz de toda app de administración (app/(panel)/layout.tsx en Next.js), con usePathname() como currentPath.
- **Evitar cuando:** Sitios públicos: arma tu propia cabecera. Solo necesitas el menú lateral: usa Sidebar.

#### AppShell

Estructura de un panel: barra lateral (Sidebar), cabecera con ☰ en móvil y contenido.
Es la base de todas las pantallas de administración.

```tsx
import { AppShell } from "@rubenpazch/ui";
```

| Prop                | Tipo                                                    | Req. | Por defecto | Descripción                                                                                                                                                                                |
| ------------------- | ------------------------------------------------------- | ---- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `children`          | `ReactNode`                                             | sí   |             | Contenido de la página.                                                                                                                                                                    |
| `sections`          | `SidebarSection[]`                                      | sí   |             | Secciones del menú.                                                                                                                                                                        |
| `brand`             | `ReactNode`                                             |      |             | Logo o nombre de la app arriba.                                                                                                                                                            |
| `brandCollapsed`    | `ReactNode`                                             |      |             | Versión compacta del logo para el modo colapsado (por defecto se oculta `brand`).                                                                                                          |
| `collapsed`         | `boolean`                                               |      |             | Colapsado (controlado).                                                                                                                                                                    |
| `currentPath`       | `string`                                                |      |             | Ruta actual (p. ej. usePathname() de Next) para marcar la opción activa.                                                                                                                   |
| `defaultCollapsed`  | `boolean`                                               |      |             | Colapsado inicial (no controlado).                                                                                                                                                         |
| `headerActions`     | `ReactNode`                                             |      |             | Acciones a la derecha de la cabecera: notificaciones, usuario.                                                                                                                             |
| `labels`            | `Partial<{ openMenu: string; skipToContent: string; }>` |      |             | Textos accesibles.                                                                                                                                                                         |
| `linkComponent`     | `ElementType<any, keyof IntrinsicElements>`             |      |             | Componente de enlace (Link de Next.js). Por defecto <a>.                                                                                                                                   |
| `loading`           | `boolean`                                               |      | `false`     | Carga del contenido al cambiar de pantalla: solo el área de contenido muestra el indicador (el menú y la cabecera no cambian). Los hijos siguen montados, atenuados y sin interacción.     |
| `loadingLabel`      | `string`                                                |      | `Cargando…` | Texto accesible de la carga.                                                                                                                                                               |
| `maxWidth`          | `"none" \| "md" \| "lg"`                                |      | `lg`        | Ancho máximo del contenido: none, lg (72rem, por defecto) o md (56rem).                                                                                                                    |
| `onCollapsedChange` | `(collapsed: boolean) => void`                          |      |             | Al colapsar o expandir.                                                                                                                                                                    |
| `sidebarFooter`     | `ReactNode`                                             |      |             | Contenido al pie de la barra lateral (usuario, "Cerrar sesión").                                                                                                                           |
| `storageKey`        | `string`                                                |      |             | Clave de localStorage para recordar si estaba colapsado.                                                                                                                                   |
| `title`             | `ReactNode`                                             |      |             | Título en la cabecera (en móvil se ve junto al botón ☰).                                                                                                                                  |
| `toasts`            | `boolean`                                               |      | `true`      | Incluye `ToastProvider`: dentro del panel, `useToast()` muestra los mensajes del servidor como toast bajo la cabecera. Pon `false` solo si la app ya tiene su propio proveedor más arriba. |

Tipos: `AppShellProps`.

### @rubenpazch/auth-gate

Puerta de sesión: comprueba el token, confirma con el servidor (/me) y solo entonces pinta la app; mientras, una pantalla neutra. Sin sesión, va al login sin mostrar nada.

- **Usar cuando:** Raíz de toda app con sesión (paneles, módulos), envolviendo AppShell.
- **Evitar cuando:** Pantallas públicas (login, registro, landing).

#### AuthGate

Puerta de sesión para la raíz de toda app con sesión (decisión 0006 de lbyte-contexto):

1. sin token → al login sin pintar nada de la app;
2. con token → pantalla neutra mientras `verify()` (/me) confirma;
3. confirmada → pinta la app; rechazada → al login.
   Un 401 posterior (`logoutEvent`) oculta la app y va al login.

Es experiencia de usuario, no seguridad: la API sigue respondiendo 401.

```tsx
import { AuthGate } from "@rubenpazch/ui";
```

| Prop                | Tipo                      | Req. | Por defecto   | Descripción                                                                                                                                                                |
| ------------------- | ------------------------- | ---- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`          | `ReactNode`               | sí   |               | La app; recibe lo que devolvió `verify` (usuario, permisos…).                                                                                                              |
| `hasSession`        | `() => boolean`           | sí   |               | Comprobación local inmediata (sin red): ¿hay token o cookie de sesión y no está vencido? Si devuelve false se va al login sin pintar nada de la app.                       |
| `onUnauthenticated` | `() => void`              | sí   |               | Ir al login (p. ej. `window.location.href = AUTH_URL`).                                                                                                                    |
| `verify`            | `() => Promise<T>`        | sí   |               | Confirma la sesión con el servidor (p. ej. `GET /me`). Si rechaza, se va al login.                                                                                         |
| `brand`             | `ReactNode`               |      |               | Marca de la organización sobre el texto (logo o nombre).                                                                                                                   |
| `labels`            | `Partial<AuthGateLabels>` |      |               | Textos; por defecto en español.                                                                                                                                            |
| `logoutEvent`       | `string \| false`         |      | `auth:logout` | Evento global que indica que la sesión terminó (un 401 a mitad de uso). Al recibirlo se oculta la app tras la pantalla neutra y se va al login. Por defecto "auth:logout". |

#### AuthScreen

Pantalla neutra a pantalla completa: sin datos ni estructura de la app.

```tsx
import { AuthScreen } from "@rubenpazch/ui";
```

| Prop    | Tipo        | Req. | Por defecto | Descripción |
| ------- | ----------- | ---- | ----------- | ----------- |
| `label` | `string`    | sí   |             |             |
| `brand` | `ReactNode` |      |             |             |

Tipos: `AuthGateProps`, `AuthGateLabels`.

### @rubenpazch/drawer

Panel lateral (izquierda/derecha/arriba/abajo) con animación y fondo.

- **Usar cuando:** Menús laterales, filtros o formularios de edición que no requieren cambiar de página.
- **Evitar cuando:** Confirmaciones breves: usa ConfirmationDialog.

#### Drawer

```tsx
import { Drawer } from "@rubenpazch/ui";
```

| Prop                  | Tipo                                               | Req. | Por defecto     | Descripción                                                                             |
| --------------------- | -------------------------------------------------- | ---- | --------------- | --------------------------------------------------------------------------------------- |
| `children`            | `ReactNode`                                        | sí   |                 | Content to render in the drawer                                                         |
| `isOpen`              | `boolean`                                          | sí   |                 | Whether the drawer is open                                                              |
| `onClose`             | `() => void`                                       | sí   |                 | Function to close the drawer                                                            |
| `className`           | `string`                                           |      | ``              | Custom className for the drawer content                                                 |
| `closeLabel`          | `string`                                           |      | `Cerrar`        | Texto accesible del botón de cerrar.                                                    |
| `closeOnEscape`       | `boolean`                                          |      | `true`          | Whether pressing Escape closes the drawer                                               |
| `closeOnOverlayClick` | `boolean`                                          |      | `true`          | Whether clicking overlay closes the drawer                                              |
| `contentContained`    | `boolean`                                          |      | `false`         | Whether the content (header, body, footer) should be contained in a max-width container |
| `footer`              | `ReactNode`                                        |      |                 | Footer content (typically action buttons)                                               |
| `footerAlign`         | `"left" \| "right" \| "center" \| "space-between"` |      | `right`         | Footer alignment                                                                        |
| `headerAlign`         | `"left" \| "right" \| "center" \| "space-between"` |      | `space-between` | Header alignment (how to position title and close button)                               |
| `position`            | `"left" \| "right" \| "top" \| "bottom"`           |      | `right`         | Position from which the drawer slides in                                                |
| `showOverlay`         | `boolean`                                          |      | `true`          | Whether to show overlay backdrop                                                        |
| `size`                | `"sm" \| "md" \| "lg" \| "xl" \| "full"`           |      | `md`            | Size of the drawer                                                                      |
| `title`               | `string`                                           |      |                 | Title displayed in the drawer header                                                    |

### @rubenpazch/month-navigator

Navegador de periodos ‹ noviembre de 2026 › con valor "AAAA-MM", mínimo, máximo y botón Hoy; incluye addMonths() y currentMonth().

- **Usar cuando:** Elegir el mes de trabajo: obligaciones, cierres contables, cronogramas, reportes mensuales.
- **Evitar cuando:** Elegir un día: usa DateInput o DatePicker. Un rango libre de fechas: usa DateRangePicker.

#### MonthNavigator

Navegador de periodos: ‹ noviembre de 2026 › para finanzas, contabilidad y cronogramas.

```tsx
import { MonthNavigator } from "@rubenpazch/ui";
```

| Prop        | Tipo                                                          | Req. | Por defecto | Descripción                                         |
| ----------- | ------------------------------------------------------------- | ---- | ----------- | --------------------------------------------------- |
| `onChange`  | `(value: string) => void`                                     | sí   |             | Recibe el nuevo mes "AAAA-MM".                      |
| `value`     | `string`                                                      | sí   |             | Mes actual en formato "AAAA-MM" (p. ej. "2026-11"). |
| `className` | `string`                                                      |      |             | Clase extra.                                        |
| `labels`    | `Partial<{ previous: string; next: string; today: string; }>` |      |             | Textos accesibles.                                  |
| `locale`    | `string`                                                      |      | `es`        | Idioma del nombre del mes (por defecto "es").       |
| `max`       | `string`                                                      |      |             | Último mes permitido "AAAA-MM".                     |
| `min`       | `string`                                                      |      |             | Primer mes permitido "AAAA-MM".                     |
| `showToday` | `boolean`                                                     |      | `false`     | Muestra el botón "Hoy" para volver al mes actual.   |

Otras exportaciones: `addMonths`, `currentMonth`.

Tipos: `MonthNavigatorProps`.

### @rubenpazch/page-header

Cabecera de página: migas de pan, volver, título h1, subtítulo, acciones y contenido extra (filtros); acepta el Link de Next.js.

- **Usar cuando:** Arriba de cada página del panel, dentro de AppShell.
- **Evitar cuando:** Títulos de secciones dentro de una página: usa un h2 o CardHeader.

#### PageHeader

Cabecera de página: migas, volver, título h1, subtítulo y acciones.

```tsx
import { PageHeader } from "@rubenpazch/ui";
```

| Prop            | Tipo                                                                                                | Req. | Por defecto | Descripción                                                     |
| --------------- | --------------------------------------------------------------------------------------------------- | ---- | ----------- | --------------------------------------------------------------- |
| `title`         | `ReactNode`                                                                                         | sí   |             | Título de la página (se renderiza como h1).                     |
| `actions`       | `ReactNode`                                                                                         |      |             | Acciones a la derecha (botones). En móvil pasan abajo.          |
| `back`          | `{ label?: string \| undefined; href?: string \| undefined; onClick?: (() => void) \| undefined; }` |      |             | Enlace o acción "Volver".                                       |
| `breadcrumbs`   | `Breadcrumb[]`                                                                                      |      |             | Migas de pan: Inicio / Convocatorias / Editar.                  |
| `children`      | `ReactNode`                                                                                         |      |             | Contenido extra bajo el título (filtros, pestañas).             |
| `className`     | `string`                                                                                            |      |             | Clase extra.                                                    |
| `linkComponent` | `ElementType<any, keyof IntrinsicElements>`                                                         |      | `a`         | Componente de enlace (p. ej. Link de Next.js). Por defecto <a>. |
| `subtitle`      | `ReactNode`                                                                                         |      |             | Texto secundario bajo el título.                                |

Tipos: `PageHeaderProps`, `Breadcrumb`.

### @rubenpazch/pagination

Paginación con variantes, tamaños y formas; incluye PaginationItem.

- **Usar cuando:** Listados paginados en el servidor (tablas, resultados de búsqueda).
- **Evitar cuando:** Pocas páginas que caben en una sola vista.

#### Pagination

```tsx
import { Pagination } from "@rubenpazch/ui";
```

| Prop              | Tipo                                                           | Req. | Por defecto  | Descripción                                                                         |
| ----------------- | -------------------------------------------------------------- | ---- | ------------ | ----------------------------------------------------------------------------------- |
| `aria-label`      | `string`                                                       |      | `Paginación` | Nombre accesible de la navegación (por defecto "Paginación").                       |
| `boundaryCount`   | `number`                                                       |      | `1`          | Number of always visible pages at the beginning and end                             |
| `count`           | `number`                                                       |      | `1`          | Total number of pages                                                               |
| `defaultPage`     | `number`                                                       |      | `1`          | Default page if uncontrolled                                                        |
| `disabled`        | `boolean`                                                      |      | `false`      | If true, the component is disabled                                                  |
| `hideNextButton`  | `boolean`                                                      |      | `false`      | If true, hide the next-page button                                                  |
| `hidePrevButton`  | `boolean`                                                      |      | `false`      | If true, hide the previous-page button                                              |
| `onChange`        | `(event: ChangeEvent<unknown, Element>, page: number) => void` |      |              | Al cambiar de página, estilo MUI: (evento, página). Se mantiene por compatibilidad. |
| `onPageChange`    | `(page: number) => void`                                       |      |              | Al cambiar de página (recibe solo el número). Preferido sobre onChange.             |
| `page`            | `number`                                                       |      |              | The current page (1-based)                                                          |
| `renderItem`      | `(item: PaginationItemType) => ReactNode`                      |      |              | Custom render function for items                                                    |
| `shape`           | `"rounded" \| "circular"`                                      |      | `rounded`    | The shape of the pagination items                                                   |
| `showFirstButton` | `boolean`                                                      |      | `false`      | If true, show the first-page button                                                 |
| `showLastButton`  | `boolean`                                                      |      | `false`      | If true, show the last-page button                                                  |
| `siblingCount`    | `number`                                                       |      | `1`          | Number of always visible pages before and after the current page                    |
| `size`            | `"small" \| "medium" \| "large" \| "sm" \| "md" \| "lg"`       |      | `medium`     | The size of the pagination component                                                |
| `variant`         | `"text" \| "outlined"`                                         |      | `text`       | The variant to use                                                                  |

#### PaginationItem

```tsx
import { PaginationItem } from "@rubenpazch/ui";
```

| Prop       | Tipo                                                                                        | Req. | Por defecto | Descripción                          |
| ---------- | ------------------------------------------------------------------------------------------- | ---- | ----------- | ------------------------------------ |
| `page`     | `number`                                                                                    | sí   |             | The page number                      |
| `type`     | `"page" \| "next" \| "previous" \| "first" \| "last" \| "start-ellipsis" \| "end-ellipsis"` | sí   |             | The type of pagination item          |
| `selected` | `boolean`                                                                                   |      | `false`     | If true, the item is selected/active |
| `shape`    | `"rounded" \| "circular"`                                                                   |      | `rounded`   | The shape of the pagination items    |
| `size`     | `"small" \| "medium" \| "large" \| "sm" \| "md" \| "lg"`                                    |      | `medium`    | The size of the component            |
| `variant`  | `"text" \| "outlined"`                                                                      |      | `text`      | The variant to use                   |

Tipos: `PaginationProps`, `PaginationShape`, `PaginationSize`, `PaginationVariant`, `PaginationItemType`, `PaginationItemProps`.

### @rubenpazch/sidebar

Barra de navegación vertical: secciones, subniveles plegables, insignias y página activa (también subrutas); en escritorio se colapsa a iconos y lo recuerda (storageKey); en móvil es un cajón con foco retenido y Escape. Acepta el Link de Next.js.

- **Usar cuando:** Menú principal de un panel de administración. Normalmente a través de AppShell; úsala sola si ya tienes tu propia cabecera.
- **Evitar cuando:** Pestañas dentro de una página: usa Tabs. Acciones de un registro: usa Menu.

#### Sidebar

Barra de navegación vertical: secciones, subniveles, insignias y estado activo. En escritorio
se colapsa a iconos (y lo recuerda); en móvil es un cajón con foco retenido y Escape.

```tsx
import { Sidebar } from "@rubenpazch/ui";
```

| Prop                 | Tipo                                        | Req. | Por defecto | Descripción                                                                       |
| -------------------- | ------------------------------------------- | ---- | ----------- | --------------------------------------------------------------------------------- |
| `sections`           | `SidebarSection[]`                          | sí   |             | Secciones del menú.                                                               |
| `brand`              | `ReactNode`                                 |      |             | Logo o nombre de la app arriba.                                                   |
| `brandCollapsed`     | `ReactNode`                                 |      |             | Versión compacta del logo para el modo colapsado (por defecto se oculta `brand`). |
| `className`          | `string`                                    |      |             | Clase extra.                                                                      |
| `collapsed`          | `boolean`                                   |      |             | Colapsado (controlado).                                                           |
| `collapsible`        | `boolean`                                   |      | `true`      | Muestra el botón para colapsar (por defecto sí).                                  |
| `currentPath`        | `string`                                    |      |             | Ruta actual (p. ej. usePathname() de Next) para marcar la opción activa.          |
| `defaultCollapsed`   | `boolean`                                   |      | `false`     | Colapsado inicial (no controlado).                                                |
| `footer`             | `ReactNode`                                 |      |             | Contenido al pie: usuario, "Cerrar sesión".                                       |
| `labels`             | `Partial<SidebarLabels>`                    |      |             | Textos accesibles.                                                                |
| `linkComponent`      | `ElementType<any, keyof IntrinsicElements>` |      | `a`         | Componente de enlace (Link de Next.js). Por defecto <a>.                          |
| `mobileOpen`         | `boolean`                                   |      | `false`     | Abierto en móvil (lo controla el botón ☰ de AppShell o de tu cabecera).          |
| `onCollapsedChange`  | `(collapsed: boolean) => void`              |      |             | Al colapsar o expandir.                                                           |
| `onMobileOpenChange` | `(open: boolean) => void`                   |      |             | Al cerrar en móvil (Escape, fondo, elegir una opción).                            |
| `storageKey`         | `string`                                    |      |             | Clave de localStorage para recordar si estaba colapsado.                          |

Tipos: `SidebarProps`, `SidebarItem`, `SidebarSection`, `SidebarLabels`.

### @rubenpazch/stepper

Indicador de pasos numerados (opcionalmente clicables) para procesos en etapas.

- **Usar cuando:** Asistentes y formularios de varios pasos.
- **Evitar cuando:** Navegación entre secciones independientes: usa Tabs.

#### Stepper

```tsx
import { Stepper } from "@rubenpazch/ui";
```

| Prop            | Tipo                                                     | Req. | Por defecto | Descripción                                                          |
| --------------- | -------------------------------------------------------- | ---- | ----------- | -------------------------------------------------------------------- |
| `currentStep`   | `number`                                                 | sí   |             |                                                                      |
| `steps`         | `Step[]`                                                 | sí   |             |                                                                      |
| `ariaLabel`     | `string`                                                 |      | `Progreso`  | Nombre accesible de la navegación de pasos (por defecto "Progreso"). |
| `className`     | `string`                                                 |      | ``          |                                                                      |
| `onStepChange`  | `(step: number) => void`                                 |      |             |                                                                      |
| `size`          | `"small" \| "medium" \| "large" \| "sm" \| "md" \| "lg"` |      | `medium`    |                                                                      |
| `stepClickable` | `boolean`                                                |      | `false`     |                                                                      |

### @rubenpazch/tabs

Pestañas para alternar entre secciones de una misma vista.

- **Usar cuando:** Separar contenido relacionado en la misma página (datos, historial, archivos).
- **Evitar cuando:** Procesos secuenciales: usa Stepper.

#### Tabs

```tsx
import { Tabs } from "@rubenpazch/ui";
```

| Prop               | Tipo                                       | Req. | Por defecto  | Descripción                                                           |
| ------------------ | ------------------------------------------ | ---- | ------------ | --------------------------------------------------------------------- |
| `tabs`             | `Tab[]`                                    | sí   |              |                                                                       |
| `ariaLabel`        | `string`                                   |      | `Pestañas`   | Nombre accesible del grupo de pestañas (por defecto "Pestañas").      |
| `className`        | `string`                                   |      |              |                                                                       |
| `defaultTab`       | `string`                                   |      |              |                                                                       |
| `lazy`             | `boolean`                                  |      | `false`      | Lazy mode - only calls onLoad when tab is first visited               |
| `loading`          | `boolean`                                  |      | `false`      | Loading state for the active tab content                              |
| `loadingComponent` | `ReactNode`                                |      |              | Custom loading component                                              |
| `onChange`         | `(tabId: string) => void`                  |      |              |                                                                       |
| `onLoad`           | `(tabId: string) => void \| Promise<void>` |      |              | Called when a tab is activated. Use for lazy loading data             |
| `orientation`      | `"horizontal" \| "vertical"`               |      | `horizontal` | Orientation of tabs - horizontal (default) or vertical (left-aligned) |
| `renderContent`    | `(tabId: string) => ReactNode`             |      |              | Render function for tab content (alternative to content prop in Tab)  |

## Retroalimentación

### @rubenpazch/alert

Aviso dentro de la página (info, success, warning, danger) con título, acción y cierre opcional.

- **Usar cuando:** Mensajes que deben quedar visibles en la página: errores de carga, advertencias de un formulario, avisos de estado.
- **Evitar cuando:** Confirmaciones pasajeras ("Guardado"): usa Toast. Pedir una decisión: usa ConfirmationDialog.

#### Alert

Aviso dentro de la página (no flotante): información, éxito, advertencia o error.
`warning` y `danger` se anuncian de inmediato (role="alert"); el resto como estado.

```tsx
import { Alert } from "@rubenpazch/ui";
```

| Prop         | Tipo                                           | Req. | Por defecto    | Descripción                                                                                                                                                                 |
| ------------ | ---------------------------------------------- | ---- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action`     | `ReactNode`                                    |      |                | Acción a la derecha o abajo (p. ej. un Button "Reintentar").                                                                                                                |
| `children`   | `ReactNode`                                    |      |                | Texto del aviso.                                                                                                                                                            |
| `className`  | `string`                                       |      |                | Clase extra.                                                                                                                                                                |
| `closeLabel` | `string`                                       |      | `Cerrar aviso` | Texto accesible del botón ×.                                                                                                                                                |
| `icon`       | `ReactNode`                                    |      |                | Icono propio; `false` para ocultarlo. Por defecto uno según el tipo.                                                                                                        |
| `onClose`    | `() => void`                                   |      |                | Si se pasa, muestra el botón × y se llama al cerrarlo.                                                                                                                      |
| `role`       | `"alert" \| "status" \| "note"`                |      |                | Rol ARIA. Por defecto `alert` (warning/danger) o `status` (info/success), que se anuncian al aparecer. Para un aviso fijo que ya está en la página al cargar, usa `"note"`. |
| `title`      | `ReactNode`                                    |      |                | Título en negrita (opcional).                                                                                                                                               |
| `variant`    | `"info" \| "success" \| "warning" \| "danger"` |      | `info`         | Tipo de mensaje: info (por defecto), success, warning o danger.                                                                                                             |

Tipos: `AlertProps`, `AlertVariant`.

### @rubenpazch/confirmation-dialog

Diálogo modal de confirmación (aceptar/cancelar).

- **Usar cuando:** Confirmar acciones destructivas o irreversibles (eliminar, anular, cerrar periodo).
- **Evitar cuando:** Mostrar formularios o contenido largo: usa Drawer.

#### ConfirmationDialog

Diálogo de confirmación (alertdialog) sobre Modal: foco retenido, Escape para cancelar y
el foco inicial en "Cancelar", la opción segura.

```tsx
import { ConfirmationDialog } from "@rubenpazch/ui";
```

| Prop          | Tipo         | Req. | Por defecto | Descripción                                                          |
| ------------- | ------------ | ---- | ----------- | -------------------------------------------------------------------- |
| `isOpen`      | `boolean`    | sí   |             | Si el diálogo está abierto.                                          |
| `message`     | `ReactNode`  | sí   |             | Explicación de la consecuencia.                                      |
| `onCancel`    | `() => void` | sí   |             | Al cancelar, pulsar Escape o hacer clic fuera (si no está cargando). |
| `onConfirm`   | `() => void` | sí   |             | Al confirmar.                                                        |
| `title`       | `string`     | sí   |             | Pregunta o título: "¿Eliminar la convocatoria?".                     |
| `cancelText`  | `string`     |      | `Cancelar`  | Texto del botón de cancelar (por defecto "Cancelar").                |
| `children`    | `ReactNode`  |      |             | Contenido extra bajo el mensaje (p. ej. un campo "motivo").          |
| `confirmText` | `string`     |      | `Confirmar` | Texto del botón de confirmar (por defecto "Confirmar").              |
| `isDangerous` | `boolean`    |      | `false`     | Acción destructiva: botón rojo.                                      |
| `isLoading`   | `boolean`    |      | `false`     | Muestra el botón de confirmar cargando y bloquea los botones.        |

### @rubenpazch/empty-state

Estado vacío con icono, título, descripción y acciones ("No hay convocatorias · Crear").

- **Usar cuando:** Listas, tablas o búsquedas sin resultados; primera vez que se usa una sección.
- **Evitar cuando:** Errores de carga: usa Alert variant="danger".

#### EmptyState

Estado vacío: lo que se muestra cuando una lista o búsqueda no tiene resultados.

```tsx
import { EmptyState } from "@rubenpazch/ui";
```

| Prop              | Tipo           | Req. | Por defecto | Descripción                                                             |
| ----------------- | -------------- | ---- | ----------- | ----------------------------------------------------------------------- |
| `title`           | `ReactNode`    | sí   |             | Título: "No hay convocatorias".                                         |
| `action`          | `ReactNode`    |      |             | Acción principal: normalmente un Button "Crear…".                       |
| `className`       | `string`       |      |             | Clase extra.                                                            |
| `description`     | `ReactNode`    |      |             | Explicación o siguiente paso.                                           |
| `icon`            | `ReactNode`    |      |             | Icono o ilustración (por defecto una bandeja vacía). `false` lo oculta. |
| `secondaryAction` | `ReactNode`    |      |             | Acción secundaria (enlace o botón de texto).                            |
| `size`            | `"sm" \| "md"` |      | `md`        | sm para dentro de tablas o tarjetas; md (por defecto) para una página.  |

Tipos: `EmptyStateProps`.

### @rubenpazch/loading-spinner

Indicador de carga circular con tamaños y colores.

- **Usar cuando:** Esperas cortas dentro de un botón, tarjeta o sección.
- **Evitar cuando:** Bloquear toda la pantalla: usa OverlayLoader.

#### LoadingSpinner

LoadingSpinner component
Displays a loading indicator with multiple style variants

```tsx
import { LoadingSpinner } from "@rubenpazch/ui";
```

| Prop        | Tipo                                       | Req. | Por defecto | Descripción                                                                                                                                                              |
| ----------- | ------------------------------------------ | ---- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `className` | `string`                                   |      | ``          |                                                                                                                                                                          |
| `color`     | `"primary" \| "gray" \| "white" \| "blue"` |      | `primary`   | primary (por defecto): color de la marca (--lb-color-primary). gray: neutro. white: sobre fondos de color. "blue" es el nombre antiguo de "primary" (sigue funcionando). |
| `inline`    | `boolean`                                  |      | `false`     |                                                                                                                                                                          |
| `message`   | `string`                                   |      |             |                                                                                                                                                                          |
| `size`      | `"sm" \| "md" \| "lg"`                     |      | `md`        |                                                                                                                                                                          |
| `variant`   | `"spinner" \| "dots" \| "pulse" \| "ring"` |      | `spinner`   |                                                                                                                                                                          |

### @rubenpazch/modal

Ventana modal accesible: portal, foco retenido, Escape y clic fuera para cerrar, bloqueo del scroll, título y descripción anunciados.

- **Usar cuando:** Formularios cortos o detalles que requieren atención sin cambiar de página (editar un registro, ver un detalle).
- **Evitar cuando:** Confirmar una acción: usa ConfirmationDialog. Formularios largos o navegación lateral: usa Drawer.

#### Modal

Ventana modal accesible: se monta en un portal, retiene el foco, bloquea el scroll de la
página y se cierra con Escape. Para confirmar acciones usa ConfirmationDialog.

```tsx
import { Modal } from "@rubenpazch/ui";
```

| Prop                  | Tipo                                     | Req. | Por defecto | Descripción                                                                       |
| --------------------- | ---------------------------------------- | ---- | ----------- | --------------------------------------------------------------------------------- |
| `onClose`             | `() => void`                             | sí   |             | Se llama al pedir cierre: botón ×, Escape o clic en el fondo.                     |
| `open`                | `boolean`                                | sí   |             | Si el modal está abierto.                                                         |
| `children`            | `ReactNode`                              |      |             | Contenido del modal.                                                              |
| `className`           | `string`                                 |      |             | Clase extra para la caja del modal.                                               |
| `closeLabel`          | `string`                                 |      | `Cerrar`    | Texto accesible del botón ×.                                                      |
| `closeOnEscape`       | `boolean`                                |      | `true`      | Cerrar con Escape (por defecto sí).                                               |
| `closeOnOverlayClick` | `boolean`                                |      | `true`      | Cerrar al hacer clic en el fondo (por defecto sí).                                |
| `description`         | `ReactNode`                              |      |             | Texto bajo el título (se anuncia como descripción).                               |
| `footer`              | `ReactNode`                              |      |             | Pie: normalmente los botones de acción.                                           |
| `role`                | `"dialog" \| "alertdialog"`              |      | `dialog`    | Rol del diálogo: `alertdialog` para confirmaciones que exigen respuesta.          |
| `showCloseButton`     | `boolean`                                |      | `true`      | Mostrar el botón × (por defecto sí).                                              |
| `size`                | `"sm" \| "md" \| "lg" \| "xl" \| "full"` |      | `md`        | Ancho máximo: sm (400px), md (520px, por defecto), lg (720px), xl (960px) o full. |
| `title`               | `ReactNode`                              |      |             | Título (se anuncia como nombre del diálogo).                                      |

Tipos: `ModalProps`, `ModalSize`.

### @rubenpazch/overlay-loader

OverlayLoader (pantalla completa, controlado por visible) e InlineLoader (dentro de un contenedor).

- **Usar cuando:** Carga inicial de la app, inicio/cierre de sesión u operaciones que bloquean la pantalla.
- **Evitar cuando:** Esperas pequeñas dentro de un elemento: usa LoadingSpinner.

#### OverlayLoader

Presentational full-screen loading overlay. It is fully controlled: the
consumer decides when it is `visible` and which `message` it shows, so the
same component can express every loading state (boot, sign-in, sign-out,…).
It keeps no state and performs no side effects — the fade in/out is CSS only.

```tsx
import { OverlayLoader } from "@rubenpazch/ui";
```

| Prop           | Tipo                                 | Req. | Por defecto | Descripción                                                                               |
| -------------- | ------------------------------------ | ---- | ----------- | ----------------------------------------------------------------------------------------- |
| `visible`      | `boolean`                            | sí   |             | Whether the overlay is shown. When false it fades out and stops capturing pointer events. |
| `className`    | `string`                             |      |             | Extra class applied to the root overlay element.                                          |
| `message`      | `string`                             |      |             | Primary line describing what is happening (e.g. "Estamos cargando la aplicación").        |
| `spinnerLabel` | `string`                             |      |             | Accessible label for the spinner (screen readers). Defaults to the message or "Cargando". |
| `title`        | `string`                             |      |             | Optional emphasized heading rendered above the message.                                   |
| `variant`      | `"default" \| "success" \| "danger"` |      | `default`   | Tone for the spinner accent.                                                              |

#### InlineLoader

Contained, non-blocking loading indicator. Unlike `OverlayLoader` it flows
inside its parent (no fixed positioning), so it can fill just a content
region — e.g. the microfrontend slot while its bundle mounts — without
covering the rest of the shell (the sidebar stays interactive).

```tsx
import { InlineLoader } from "@rubenpazch/ui";
```

| Prop           | Tipo                                 | Req. | Por defecto | Descripción                                                                                                                                                                                                   |
| -------------- | ------------------------------------ | ---- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`    | `string`                             |      |             | Extra class applied to the root element.                                                                                                                                                                      |
| `fill`         | `boolean`                            |      | `false`     | Stretch to fill the available width and height of the parent and center its content, instead of rendering as a compact inline card. Use it when the loader owns a whole region (e.g. a route's content slot). |
| `message`      | `string`                             |      |             | Optional line describing what is loading (e.g. "Cargando módulo…").                                                                                                                                           |
| `spinnerLabel` | `string`                             |      |             | Accessible label for the spinner. Defaults to the message or "Cargando".                                                                                                                                      |
| `variant`      | `"default" \| "success" \| "danger"` |      | `default`   | Tone for the spinner accent.                                                                                                                                                                                  |

Tipos: `OverlayLoaderProps`, `OverlayLoaderVariant`, `InlineLoaderProps`, `InlineLoaderVariant`.

### @rubenpazch/progress-bar

Barra de progreso (role="progressbar") con etiqueta y porcentaje, determinada o indeterminada.

- **Usar cuando:** Subidas de archivos, importaciones, avance de un proceso o de una meta (presupuesto usado).
- **Evitar cuando:** Pasos con nombre: usa Stepper. Esperas sin avance medible y cortas: usa LoadingSpinner.

#### ProgressBar

Barra de progreso accesible (role="progressbar"), determinada o indeterminada.

```tsx
import { ProgressBar } from "@rubenpazch/ui";
```

| Prop        | Tipo                                              | Req. | Por defecto | Descripción                                                             |
| ----------- | ------------------------------------------------- | ---- | ----------- | ----------------------------------------------------------------------- |
| `className` | `string`                                          |      |             | Clase extra.                                                            |
| `color`     | `"primary" \| "success" \| "warning" \| "danger"` |      | `primary`   | primary (por defecto), success, warning o danger.                       |
| `label`     | `string`                                          |      |             | Etiqueta visible: "Subiendo archivos". También es el nombre accesible.  |
| `max`       | `number`                                          |      | `100`       | Máximo (por defecto 100).                                               |
| `showValue` | `boolean`                                         |      | `false`     | Muestra el porcentaje a la derecha de la etiqueta.                      |
| `size`      | `"sm" \| "md" \| "lg"`                            |      | `md`        | sm (4px), md (8px, por defecto) o lg (12px).                            |
| `value`     | `number`                                          |      |             | Valor actual (0 a max). Sin valor = indeterminado (animación continua). |
| `valueText` | `string`                                          |      |             | Texto del valor (por defecto "45 %").                                   |

Tipos: `ProgressBarProps`.

### @rubenpazch/skeleton

Marcador de carga (texto, bloque o círculo) con la forma del contenido; respeta reducir movimiento.

- **Usar cuando:** Mientras cargan tarjetas, filas o perfiles, para que la página no salte al llegar los datos.
- **Evitar cuando:** Operaciones que bloquean la pantalla: usa OverlayLoader. Esperas dentro de un botón: usa LoadingSpinner.

#### Skeleton

Marcador de carga con la forma del contenido. Es decorativo (aria-hidden): anuncia la carga
en el contenedor con aria-busy o un texto oculto.

```tsx
import { Skeleton } from "@rubenpazch/ui";
```

| Prop        | Tipo                           | Req. | Por defecto | Descripción                                                                          |
| ----------- | ------------------------------ | ---- | ----------- | ------------------------------------------------------------------------------------ |
| `className` | `string`                       |      |             | Clase extra.                                                                         |
| `height`    | `string \| number`             |      |             | Alto (número = px o valor CSS). Por defecto según la variante.                       |
| `lines`     | `number`                       |      | `1`         | Con variant="text": cuántas líneas (la última más corta).                            |
| `variant`   | `"text" \| "rect" \| "circle"` |      | `text`      | text (línea de texto, por defecto), rect (bloque) o circle (avatar).                 |
| `width`     | `string \| number`             |      |             | Ancho (número = px o cualquier valor CSS). Por defecto 100% (circle: igual al alto). |

Tipos: `SkeletonProps`.

### @rubenpazch/toast

Notificaciones temporales (Toast) y avisos fijos (ToastBanner) con tipos y acciones.

- **Usar cuando:** Confirmar que algo se guardó o avisar un error sin interrumpir.
- **Evitar cuando:** Pedir una decisión: usa ConfirmationDialog.

#### ToastBanner

```tsx
import { ToastBanner } from "@rubenpazch/ui";
```

| Prop             | Tipo                   | Req. | Por defecto           | Descripción |
| ---------------- | ---------------------- | ---- | --------------------- | ----------- |
| `onClose`        | `(id: string) => void` | sí   |                       |             |
| `toasts`         | `ToastItem[]`          | sí   |                       |             |
| `className`      | `string`               |      |                       |             |
| `closeAriaLabel` | `string`               |      | `Cerrar notificación` |             |

#### ToastProvider

Mensajes del servidor dentro de la app (usuario con sesión). `AppShell` ya lo incluye y los
muestra bajo su cabecera; úsalo directamente solo en un layout propio.

En pantallas públicas (login, registro, recuperación) NO se usa: ahí el mensaje va junto al
formulario. Por eso `useToast()` falla fuera de un proveedor.

```tsx
import { ToastProvider } from "@rubenpazch/ui";
```

| Prop             | Tipo                     | Req. | Por defecto      | Descripción                                                                                                                                                                                             |
| ---------------- | ------------------------ | ---- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `closeAriaLabel` | `string`                 |      | `Cerrar mensaje` | Texto accesible del botón ×.                                                                                                                                                                            |
| `offsetTop`      | `string`                 |      |                  | Distancia desde arriba en modo `floating`.                                                                                                                                                              |
| `placement`      | `"floating" \| "inline"` |      | `floating`       | `floating` (por defecto): flotan arriba a la derecha. `inline`: no se pintan aquí; el layout pone `<ToastRegion />` en su sitio (AppShell lo hace bajo su cabecera, sin tapar el menú ni el contenido). |

#### ToastRegion

Pinta los toasts de un `ToastProvider placement="inline"` en el lugar del layout donde se ponga.

```tsx
import { ToastRegion } from "@rubenpazch/ui";
```

| Prop        | Tipo     | Req. | Por defecto | Descripción |
| ----------- | -------- | ---- | ----------- | ----------- |
| `className` | `string` |      |             |             |

Otras exportaciones: `useToast`.

Tipos: `ToastAction`, `ToastBannerProps`, `ToastItem`, `ToastType`, `ToastApi`, `ToastOptions`, `ToastProviderProps`.

## Presentación de datos

### @rubenpazch/avatar

Avatar de persona (imagen, iniciales o icono) y AvatarGroup para varios.

- **Usar cuando:** Mostrar quién es un usuario, autor o responsable.
- **Evitar cuando:** Logos o imágenes de contenido: usa <img>.

#### Avatar

```tsx
import { Avatar } from "@rubenpazch/ui";
```

| Prop        | Tipo                                        | Req. | Por defecto | Descripción                                       |
| ----------- | ------------------------------------------- | ---- | ----------- | ------------------------------------------------- |
| `alt`       | `string`                                    |      | ``          | Alt text for image                                |
| `children`  | `ReactNode`                                 |      |             | Children - can be text, icon, or fallback content |
| `component` | `ElementType<any, keyof IntrinsicElements>` |      | `div`       | Custom component to use instead of default div    |
| `loading`   | `"eager" \| "lazy"`                         |      |             | Image loading strategy                            |
| `onError`   | `ReactEventHandler<HTMLImageElement>`       |      |             | Callback fired when image fails to load           |
| `onLoad`    | `ReactEventHandler<HTMLImageElement>`       |      |             | Callback fired when image loads successfully      |
| `size`      | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`      |      | `md`        | Size of the avatar                                |
| `sizes`     | `string`                                    |      |             | Custom sizes object for more control              |
| `src`       | `string`                                    |      |             | Image source URL                                  |
| `srcSet`    | `string`                                    |      |             | Image srcset for responsive images                |
| `variant`   | `"circular" \| "rounded" \| "square"`       |      | `circular`  | Shape variant of the avatar                       |

#### AvatarGroup

```tsx
import { AvatarGroup } from "@rubenpazch/ui";
```

| Prop            | Tipo                             | Req. | Por defecto | Descripción                                         |
| --------------- | -------------------------------- | ---- | ----------- | --------------------------------------------------- |
| `children`      | `ReactNode`                      | sí   |             | Avatar children to display                          |
| `max`           | `number`                         |      |             | Maximum number of avatars to show before showing +X |
| `renderSurplus` | `(surplus: number) => ReactNode` |      |             | Custom render function for surplus count            |
| `spacing`       | `number \| "small" \| "medium"`  |      | `medium`    | Spacing between avatars                             |
| `total`         | `number`                         |      |             | Total number of avatars (for showing +X count)      |

Tipos: `AvatarProps`, `AvatarSize`, `AvatarVariant`, `AvatarGroupProps`, `AvatarGroupSpacing`.

### @rubenpazch/badge

Insignia de estado o categoría (Pagado, Vencido, Borrador) con colores semánticos, variantes soft/solid/outline y punto.

- **Usar cuando:** Mostrar el estado de un registro en tablas, tarjetas o detalles; contadores pequeños.
- **Evitar cuando:** Algo que se puede quitar o filtrar: usa Chip.

#### Badge

Insignia de estado o categoría: "Pagado", "Vencido", "Borrador", "3 nuevos".

```tsx
import { Badge } from "@rubenpazch/ui";
```

| Prop         | Tipo                                                                                                       | Req. | Por defecto | Descripción                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------------- | ---- | ----------- | ------------------------------------------------------------------------------------- |
| `children`   | `ReactNode`                                                                                                | sí   |             | Texto del badge.                                                                      |
| `aria-label` | `string`                                                                                                   |      |             | Texto para lectores de pantalla si el visible no basta (p. ej. "Estado: vencido").    |
| `className`  | `string`                                                                                                   |      |             | Clase extra.                                                                          |
| `color`      | `"neutral" \| "primary" \| "success" \| "warning" \| "danger" \| "info" \| "violet" \| "orange" \| "pink"` |      | `neutral`   | Color según el significado: success (pagado), warning (por vencer), danger (vencido)… |
| `dot`        | `boolean`                                                                                                  |      | `false`     | Muestra un punto de color antes del texto.                                            |
| `size`       | `"sm" \| "md"`                                                                                             |      | `sm`        | sm (por defecto) o md.                                                                |
| `variant`    | `"soft" \| "solid" \| "outline"`                                                                           |      | `soft`      | soft (fondo suave, por defecto), solid o outline.                                     |

Tipos: `BadgeProps`, `BadgeColor`, `BadgeVariant`.

### @rubenpazch/card

Tarjeta (outlined o elevated) con CardHeader (título, subtítulo, acciones), CardBody y CardFooter; puede ser clicable.

- **Usar cuando:** Agrupar la información de un registro o una sección del panel: resúmenes, KPIs, fichas.
- **Evitar cuando:** Listas largas de registros comparables: usa DataTable.

#### Card

Contenedor con borde o sombra para agrupar información. Usa CardHeader, CardBody y CardFooter.

```tsx
import { Card } from "@rubenpazch/ui";
```

| Prop      | Tipo                                      | Req. | Por defecto | Descripción                                                                             |
| --------- | ----------------------------------------- | ---- | ----------- | --------------------------------------------------------------------------------------- |
| `as`      | `"div" \| "section" \| "article" \| "li"` |      | `div`       | Etiqueta HTML: div (por defecto), section, article o li.                                |
| `onClick` | `MouseEventHandler<HTMLElement>`          |      |             | Si se pasa, la tarjeta es clicable (sombra al pasar y foco con teclado).                |
| `padding` | `"none" \| "sm" \| "md" \| "lg"`          |      | `none`      | Relleno interno cuando no se usan CardHeader/CardBody: none, sm, md (por defecto) o lg. |
| `variant` | `"outlined" \| "elevated"`                |      | `outlined`  | outlined (borde, por defecto) o elevated (sombra).                                      |

#### CardHeader

Cabecera de Card con título, subtítulo y acciones.

```tsx
import { CardHeader } from "@rubenpazch/ui";
```

| Prop       | Tipo        | Req. | Por defecto | Descripción                            |
| ---------- | ----------- | ---- | ----------- | -------------------------------------- |
| `actions`  | `ReactNode` |      |             | Acciones a la derecha (botones, menú). |
| `subtitle` | `ReactNode` |      |             | Texto secundario bajo el título.       |
| `title`    | `ReactNode` |      |             | Título de la tarjeta.                  |

#### CardBody

Cuerpo de Card.

```tsx
import { CardBody } from "@rubenpazch/ui";
```

_Sin props documentadas._

#### CardFooter

Pie de Card (botones o totales).

```tsx
import { CardFooter } from "@rubenpazch/ui";
```

_Sin props documentadas._

Tipos: `CardProps`, `CardHeaderProps`.

### @rubenpazch/chip

Chip/etiqueta con variantes, icono y acción de borrar.

- **Usar cuando:** Estados, etiquetas, filtros activos o valores seleccionados que se pueden quitar.
- **Evitar cuando:** Acciones principales: usa Button.

#### Chip

```tsx
import { Chip } from "@rubenpazch/ui";
```

| Prop              | Tipo                                                                    | Req. | Por defecto | Descripción                                    |
| ----------------- | ----------------------------------------------------------------------- | ---- | ----------- | ---------------------------------------------- |
| `avatar`          | `ReactNode`                                                             |      |             | Avatar or custom element shown at the start    |
| `clickable`       | `boolean`                                                               |      | `false`     | Whether the chip behaves like a button         |
| `color`           | `"default" \| "primary" \| "success" \| "warning" \| "error" \| "info"` |      | `default`   | Color theme for the chip                       |
| `component`       | `ElementType<any, keyof IntrinsicElements>`                             |      |             | Override root component                        |
| `deleteAriaLabel` | `string`                                                                |      | `Quitar`    | Accessible label for the delete button         |
| `deleteIcon`      | `ReactNode`                                                             |      |             | Custom delete icon element                     |
| `disabled`        | `boolean`                                                               |      | `false`     | Disabled state                                 |
| `icon`            | `ReactNode`                                                             |      |             | Leading icon rendered before the label         |
| `label`           | `ReactNode`                                                             |      |             | Content shown inside the chip                  |
| `onDelete`        | `(event: MouseEvent<HTMLButtonElement, MouseEvent>) => void`            |      |             | Callback fired when the delete icon is clicked |
| `selected`        | `boolean`                                                               |      | `false`     | Selected/pressed state for toggleable chips    |
| `size`            | `"sm" \| "md"`                                                          |      | `md`        | Chip size                                      |
| `variant`         | `"filled" \| "outlined" \| "soft"`                                      |      | `filled`    | Visual style for the chip                      |

Tipos: `ChipVariant`, `ChipColor`, `ChipSize`, `ChipProps`.

### @rubenpazch/description-list

Pares etiqueta/valor en columnas: resumen de un registro (datos de un trámite, de un cliente, de un pago).

- **Usar cuando:** Mostrar varios datos de solo lectura de un registro, con etiquetas.
- **Evitar cuando:** Datos tabulares de muchos registros: usa DataTable. Una sola fila con icono: usa InfoRow.

#### DescriptionList

Pares etiqueta/valor de solo lectura (`<dl>`): resumen de un registro.

```tsx
import { DescriptionList } from "@rubenpazch/ui";
```

| Prop         | Tipo                | Req. | Por defecto  | Descripción                                                       |
| ------------ | ------------------- | ---- | ------------ | ----------------------------------------------------------------- |
| `items`      | `DescriptionItem[]` | sí   |              |                                                                   |
| `className`  | `string`            |      |              |                                                                   |
| `columns`    | `1 \| 2 \| 3`       |      | `2`          | Columnas en pantallas anchas (en móvil siempre 1). Por defecto 2. |
| `emptyText`  | `ReactNode`         |      | `Sin datos.` | Texto si no hay ningún dato.                                      |
| `emptyValue` | `ReactNode`         |      | `—`          | Qué mostrar si un valor está vacío.                               |
| `footnote`   | `ReactNode`         |      |              | Nota al pie (fuente de los datos, aclaraciones).                  |
| `title`      | `ReactNode`         |      |              | Título opcional sobre la lista.                                   |

Tipos: `DescriptionItem`, `DescriptionListProps`.

### @rubenpazch/info-row

Fila de dato con icono, etiqueta y valor (variantes de color, tamaños, acción opcional).

- **Usar cuando:** Vistas de detalle de un registro (contacto, dirección, datos del documento).
- **Evitar cuando:** Tablas con muchas filas comparables.

#### InfoRow

InfoRow component
Displays a row of information with an icon, label, and value
Used in detail views to present structured data

```tsx
import { InfoRow } from "@rubenpazch/ui";
```

| Prop        | Tipo                                                                                    | Req. | Por defecto | Descripción |
| ----------- | --------------------------------------------------------------------------------------- | ---- | ----------- | ----------- |
| `icon`      | `ReactNode`                                                                             | sí   |             |             |
| `label`     | `string`                                                                                | sí   |             |             |
| `value`     | `string`                                                                                | sí   |             |             |
| `action`    | `ReactNode`                                                                             |      |             |             |
| `className` | `string`                                                                                |      | ``          |             |
| `hideIcon`  | `boolean`                                                                               |      | `false`     |             |
| `hideLabel` | `boolean`                                                                               |      | `false`     |             |
| `layout`    | `"vertical" \| "horizontal" \| "inline" \| "compact"`                                   |      | `vertical`  |             |
| `size`      | `"xs" \| "sm" \| "md" \| "lg"`                                                          |      | `md`        |             |
| `variant`   | `"default" \| "blue" \| "yellow" \| "purple" \| "green" \| "red" \| "indigo" \| "gray"` |      | `default`   |             |

### @rubenpazch/timeline

Línea de tiempo vertical: historial de un trámite, pedido o expediente (eventos con estado, fecha y descripción).

- **Usar cuando:** Mostrar el historial o seguimiento de algo en orden cronológico.
- **Evitar cuando:** Pasos de un proceso que el usuario recorre ahora: usa Stepper.

#### Timeline

Línea de tiempo vertical: historial de un trámite, pedido o expediente, en orden.
Genérica: el significado de cada estado lo decide la app (p. ej. un envoltorio local que
convierte los estados del trámite en `items`).

```tsx
import { Timeline } from "@rubenpazch/ui";
```

| Prop            | Tipo             | Req. | Por defecto            | Descripción                                                         |
| --------------- | ---------------- | ---- | ---------------------- | ------------------------------------------------------------------- |
| `items`         | `TimelineItem[]` | sí   |                        |                                                                     |
| `aria-label`    | `string`         |      |                        | Nombre accesible de la lista, p. ej. "Historial del trámite".       |
| `className`     | `string`         |      |                        |                                                                     |
| `dense`         | `boolean`        |      | `false`                | Más compacto (menos espacio entre eventos).                         |
| `emptyText`     | `ReactNode`      |      | `Sin eventos todavía.` | Texto cuando no hay eventos.                                        |
| `highlightLast` | `boolean`        |      | `false`                | El último evento se marca como el estado actual (anillo y negrita). |

Tipos: `TimelineItem`, `TimelineProps`, `TimelineStatus`.

### @rubenpazch/tooltip

Texto de ayuda breve al pasar el mouse o enfocar con teclado (role="tooltip", aria-describedby), se cierra con Escape.

- **Usar cuando:** Explicar un botón de solo icono o un dato abreviado.
- **Evitar cuando:** Información importante o acciones: muéstrala en la página o usa Menu/Modal. En móvil no hay hover: no ocultes ahí lo esencial.

#### Tooltip

Texto de ayuda al pasar el mouse o enfocar con el teclado; se cierra con Escape. Se asocia al
elemento con aria-describedby. No pongas acciones dentro: usa Menu o Modal.

```tsx
import { Tooltip } from "@rubenpazch/ui";
```

| Prop        | Tipo                                                          | Req. | Por defecto | Descripción                                                                        |
| ----------- | ------------------------------------------------------------- | ---- | ----------- | ---------------------------------------------------------------------------------- |
| `children`  | `ReactElement<unknown, string \| JSXElementConstructor<any>>` | sí   |             | Elemento que lo dispara (un botón, un icono con foco). Debe aceptar ref y eventos. |
| `content`   | `ReactNode`                                                   | sí   |             | Texto del tooltip (breve, sin elementos interactivos).                             |
| `delay`     | `number`                                                      |      | `300`       | Espera en ms antes de mostrarse al pasar el mouse (por defecto 300).               |
| `placement` | `"top" \| "bottom" \| "left" \| "right"`                      |      | `top`       | Posición: top (por defecto), bottom, left o right.                                 |

Tipos: `TooltipProps`.

### @rubenpazch/user-card

Tarjeta de una persona (usuario, socio, cliente): avatar, nombre, correo u otro dato, etiquetas y acciones; las secundarias van en un menú ⋮.

- **Usar cuando:** Listas de personas en cuadrícula: usuarios de un panel, socios, clientes, pacientes.
- **Evitar cuando:** Listas largas o con muchas columnas para comparar: usa DataTable.

#### UserCard

Tarjeta de una persona: avatar, nombre, dato secundario, etiquetas y acciones.
Las acciones principales se ven en el pie; las secundarias van en un menú ⋮ para que la
tarjeta no se llene de botones.

```tsx
import { UserCard } from "@rubenpazch/ui";
```

| Prop        | Tipo                         | Req. | Por defecto | Descripción                                                            |
| ----------- | ---------------------------- | ---- | ----------- | ---------------------------------------------------------------------- |
| `name`      | `string`                     | sí   |             | Nombre visible.                                                        |
| `actions`   | `ReactNode`                  |      |             | Acciones principales visibles en el pie (una o dos `Button`).          |
| `as`        | `"article" \| "li" \| "div"` |      | `article`   |                                                                        |
| `avatarSrc` | `string`                     |      |             | Foto. Sin ella se muestran las iniciales del nombre.                   |
| `badges`    | `ReactNode`                  |      |             | Etiquetas (normalmente `Badge`): rol, estado, módulos…                 |
| `children`  | `ReactNode`                  |      |             | Contenido extra entre las etiquetas y el pie.                          |
| `className` | `string`                     |      |             |                                                                        |
| `menuItems` | `MenuItem[]`                 |      |             | Acciones secundarias en el menú ⋮ (editar contraseña, eliminar…).      |
| `menuLabel` | `string`                     |      |             | Texto accesible del botón ⋮. Por defecto "Más acciones para <nombre>". |
| `muted`     | `boolean`                    |      | `false`     | Atenúa la tarjeta (p. ej. usuario inactivo).                           |
| `subtitle`  | `ReactNode`                  |      |             | Dato secundario bajo el nombre: correo, documento, cargo…              |

Otras exportaciones: `initials`.

Tipos: `UserCardProps`.

## Datos

### @rubenpazch/data-table

Tabla de datos accesible: columnas con render, orden (aria-sort) en el navegador o en el servidor, carga con Skeleton, estado vacío, filas clicables, encabezado fijo y scroll horizontal en móvil.

- **Usar cuando:** Listados de registros comparables: obligaciones, cobros, convocatorias, usuarios. Combínala con Pagination y filtros.
- **Evitar cuando:** Pocos datos de un solo registro: usa InfoRow o Card. Listas reordenables: usa DraggableList.

#### DataTable

Tabla de datos accesible: orden por columnas (aria-sort), carga, estado vacío, filas
clicables y scroll horizontal en móvil. Pagina con Pagination debajo.

```tsx
import { DataTable } from "@rubenpazch/ui";
```

| Prop               | Tipo                                | Req. | Por defecto        | Descripción                                                                |
| ------------------ | ----------------------------------- | ---- | ------------------ | -------------------------------------------------------------------------- |
| `caption`          | `string`                            | sí   |                    | Título accesible de la tabla (se lee al entrar). Visible si `showCaption`. |
| `columns`          | `DataTableColumn<T>[]`              | sí   |                    | Columnas.                                                                  |
| `getRowId`         | `(row: T) => string \| number`      | sí   |                    | id único de cada fila.                                                     |
| `rows`             | `T[]`                               | sí   |                    | Filas.                                                                     |
| `className`        | `string`                            |      |                    | Clase extra del contenedor.                                                |
| `dense`            | `boolean`                           |      | `false`            | Filas más compactas.                                                       |
| `emptyAction`      | `ReactNode`                         |      |                    | Acción del estado vacío (Button "Crear…").                                 |
| `emptyDescription` | `ReactNode`                         |      |                    | Explicación del estado vacío.                                              |
| `emptyTitle`       | `ReactNode`                         |      | `No hay registros` | Texto del estado vacío.                                                    |
| `loading`          | `boolean`                           |      | `false`            | Muestra filas de carga.                                                    |
| `loadingRows`      | `number`                            |      | `5`                | Filas de carga a mostrar (por defecto 5).                                  |
| `onRowClick`       | `(row: T) => void`                  |      |                    | Al hacer clic (o Enter) en una fila.                                       |
| `onSortChange`     | `(sort: SortState \| null) => void` |      |                    | Al cambiar el orden (para ordenar en el servidor).                         |
| `showCaption`      | `boolean`                           |      | `false`            | Muestra el caption encima de la tabla.                                     |
| `sort`             | `null \| SortState`                 |      |                    | Orden controlado. Sin él, la tabla ordena sola en el navegador.            |
| `stickyHeader`     | `boolean`                           |      | `false`            | Encabezado fijo al hacer scroll vertical.                                  |

Tipos: `DataTableProps`, `DataTableColumn`, `SortState`, `SortDirection`.

### @rubenpazch/draggable-list

Lista reordenable arrastrando (también con teclado), basada en dnd-kit.

- **Usar cuando:** Que el usuario defina el orden de elementos (prioridades, orden de servicios o menús).
- **Evitar cuando:** Listas de solo lectura: usa una lista normal.

#### DraggableList

```tsx
import { DraggableList } from "@rubenpazch/ui";
```

| Prop            | Tipo                                 | Req. | Por defecto | Descripción |
| --------------- | ------------------------------------ | ---- | ----------- | ----------- |
| `getItemId`     | `(item: T) => string \| number`      | sí   |             |             |
| `items`         | `T[]`                                | sí   |             |             |
| `onReorder`     | `(newItems: T[]) => void`            | sí   |             |             |
| `renderItem`    | `(item: T) => ReactNode`             | sí   |             |             |
| `className`     | `string`                             |      | ``          |             |
| `gap`           | `"sm" \| "md" \| "lg"`               |      | `md`        |             |
| `itemClassName` | `string`                             |      | ``          |             |
| `size`          | `"sm" \| "md" \| "lg"`               |      | `md`        |             |
| `variant`       | `"default" \| "outline" \| "subtle"` |      | `default`   |             |

## Iconos

### @rubenpazch/icons

Más de 60 iconos SVG como componentes React (y MaterialIcon para Material Icons).

- **Usar cuando:** Cualquier icono de la interfaz; combínalos con Button, IconButton, Chip o InfoRow.
- **Evitar cuando:** Ilustraciones grandes o logos de marca.

Iconos disponibles (113): `ArrowDetailsIcon`, `ArchiveIcon`, `BrandingIcon`, `BusinessPlanIcon`, `CalendarIcon`, `CheckIcon`, `CheckOutIcon`, `CheckmarkIcon`, `ChecksIcon`, `ChevronBarIcon`, `ChevronIcon`, `ClinicalNotesIcon`, `CityIcon`, `ClockIcon`, `CloseIcon`, `CopyIcon`, `CoinsHandIcon`, `CoinsAcceptedIcon`, `MenuGridIcon`, `DocumentIcon`, `DownloadIcon`, `DragHandleIcon`, `EditIcon`, `EmailIcon`, `ErrorIcon`, `ExclamationTriangleIcon`, `EyeIcon`, `EyeCheckIcon`, `FilterIcon`, `FoldersIcon`, `GalleryPhotoIcon`, `GlassesIcon`, `HomeIcon`, `InfoIcon`, `LinkIcon`, `LocationIcon`, `ManualIdentifierIcon`, `MapIcon`, `MenuIcon`, `MinusIcon`, `MoreIcon`, `NotificationIcon`, `PatientIcon`, `PatientListIcon`, `PatientsIcon`, `PhoneIcon`, `WhatsAppIcon`, `PlusIcon`, `PrescriptionIcon`, `PresentationChartIcon`, `PrintIcon`, `RefreshIcon`, `SearchIcon`, `SettingsIcon`, `SortIcon`, `SpinnerIcon`, `SystemIdentifierIcon`, `TrashIcon`, `ArrowLeftIcon`, `ArrowRightIcon`, `RobotOffIcon`, `UploadIcon`, `UserManagementIcon`, `UserPlusIcon`, `UserSelectIcon`, `UsersIcon`, `WalletOpenIcon`, `ZoomInIcon`, `ZoomOutIcon`, `RobotIcon`, `TargetIcon`, `MaterialIcon`, `ReceiptIcon`, `LockIcon`, `LockOpenIcon`, `KeyIcon`, `LogInIcon`, `LogOutIcon`, `ShieldCheckIcon`, `FingerprintIcon`, `EyeOffIcon`, `UserCogIcon`, `BankIcon`, `CreditCardIcon`, `BanknoteIcon`, `CalculatorIcon`, `PiggyBankIcon`, `TrendingUpIcon`, `TrendingDownIcon`, `ChartBarIcon`, `ChartPieIcon`, `CircleXIcon`, `HelpIcon`, `ExternalLinkIcon`, `BuildingIcon`, `BriefcaseIcon`, `TagIcon`, `ListIcon`, `DashboardIcon`, `SendIcon`, `SaveIcon`, `StarIcon`, `SunIcon`, `MoonIcon`, `GlobeIcon`, `QrCodeIcon`, `SmartphoneIcon`, `ClipboardListIcon`, `FileTextIcon`, `FileSpreadsheetIcon`, `HistoryIcon`, `PowerIcon`, `PaletteIcon`.

Props habituales: `size`, `className` (y en algunos `color`, `width`, `height`). Ver el tipo de cada icono en su archivo.

## Salud (pacientes y óptica)

### @rubenpazch/identification-input

Tipo y número de documento peruano (DNI, CE, pasaporte) con validación de longitud y formato.

- **Usar cuando:** Registrar el documento de identidad de una persona en Perú.
- **Evitar cuando:** Otros países o identificadores que no son documentos de identidad.

#### IdentificationInput

El `ref` apunta al campo del número de documento.

```tsx
import { IdentificationInput } from "@rubenpazch/ui";
```

| Prop                           | Tipo                                             | Req. | Por defecto | Descripción                                              |
| ------------------------------ | ------------------------------------------------ | ---- | ----------- | -------------------------------------------------------- |
| `documentType`                 | `null \| "dni" \| "ce" \| "passport"`            | sí   |             |                                                          |
| `identificationNumber`         | `string`                                         | sí   |             |                                                          |
| `onDocumentTypeChange`         | `(type: PeruIdentificationType \| null) => void` | sí   |             |                                                          |
| `onIdentificationNumberChange` | `(value: string) => void`                        | sí   |             |                                                          |
| `className`                    | `string`                                         |      | ``          |                                                          |
| `disabled`                     | `boolean`                                        |      | `false`     |                                                          |
| `documentTypeError`            | `string`                                         |      |             |                                                          |
| `id`                           | `string`                                         |      |             | Prefijo de los ids de ambos campos.                      |
| `identificationNumberError`    | `string`                                         |      |             |                                                          |
| `labels`                       | `Partial<IdentificationInputLabels>`             |      |             | Textos de la interfaz; por defecto en español.           |
| `name`                         | `string`                                         |      |             | `name` del campo de número (el tipo usa `${name}-tipo`). |
| `required`                     | `boolean`                                        |      | `false`     |                                                          |

#### DEFAULT_IDENTIFICATION_LABELS

```tsx
import { DEFAULT_IDENTIFICATION_LABELS } from "@rubenpazch/ui";
```

_Sin props documentadas._

### @rubenpazch/patient-details

Ficha de paciente: identificación, contacto, contacto de emergencia, ubicación (departamento/provincia/distrito) e historia clínica. Textos por la prop labels.

- **Usar cuando:** Apps clínicas u ópticas que muestran el detalle de un paciente.
- **Evitar cuando:** Personas que no son pacientes: usa InfoRow.

#### PatientDetails

```tsx
import { PatientDetails } from "@rubenpazch/ui";
```

| Prop                    | Tipo                          | Req. | Por defecto | Descripción |
| ----------------------- | ----------------------------- | ---- | ----------- | ----------- |
| `formatDate`            | `(dateIso: string) => string` | sí   |             |             |
| `formatDateTime`        | `(dateIso: string) => string` | sí   |             |             |
| `labels`                | `PatientDetailsLabels`        | sí   |             |             |
| `onClose`               | `() => void`                  | sí   |             |             |
| `patient`               | `PatientDetailsPatient`       | sí   |             |             |
| `defaultShowMoreInfo`   | `boolean`                     |      | `false`     |             |
| `onEdit`                | `() => void`                  |      |             |             |
| `onViewProfile`         | `() => void`                  |      |             |             |
| `onViewSubscriptions`   | `() => void`                  |      |             |             |
| `showEditButton`        | `boolean`                     |      | `false`     |             |
| `showViewProfileButton` | `boolean`                     |      | `true`      |             |
| `ubigeoResolved`        | `PatientDetailsUbigeo`        |      |             |             |

### @rubenpazch/patient-search

Buscador de pacientes con resultados y selección.

- **Usar cuando:** Elegir un paciente existente en apps clínicas u ópticas.
- **Evitar cuando:** Buscar otro tipo de registros: usa Autocomplete.

#### PatientSearch

```tsx
import { PatientSearch } from "@rubenpazch/ui";
```

| Prop                 | Tipo                                                                                                             | Req. | Por defecto | Descripción |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- | ---- | ----------- | ----------- |
| `labels`             | `PatientSearchLabels`                                                                                            | sí   |             |             |
| `onSelectPatient`    | `(patient: PatientSearchPatient) => void`                                                                        | sí   |             |             |
| `initialSearchTerm`  | `string`                                                                                                         |      | ``          |             |
| `onCreateNewPatient` | `(searchTerm: string) => void`                                                                                   |      |             |             |
| `onSearchPatients`   | `(searchTerm: string) => Promise<{ patients?: PatientSearchPatient[] \| undefined; } \| PatientSearchPatient[]>` |      |             |             |
| `size`               | `"sm" \| "md" \| "lg"`                                                                                           |      | `md`        |             |

### @rubenpazch/prescription-card

Tarjeta de receta óptica completa (OD/OI: esfera, cilindro, eje, adición, DNP, prisma, altura) con estado y observaciones.

- **Usar cuando:** Mostrar recetas ópticas en apps de óptica.
- **Evitar cuando:** Cualquier dato que no sea una receta óptica.

#### PrescriptionCard

```tsx
import { PrescriptionCard } from "@rubenpazch/ui";
```

| Prop             | Tipo                                     | Req. | Por defecto | Descripción |
| ---------------- | ---------------------------------------- | ---- | ----------- | ----------- |
| `formatDateLong` | `(dateIso: string) => string`            | sí   |             |             |
| `labels`         | `PrescriptionCardLabels`                 | sí   |             |             |
| `patientId`      | `string \| number`                       | sí   |             |             |
| `prescription`   | `Prescription`                           | sí   |             |             |
| `canEdit`        | `boolean`                                |      | `false`     |             |
| `onEdit`         | `() => void`                             |      |             |             |
| `onOrderFormat`  | `() => void`                             |      |             |             |
| `onPrintFormat`  | `() => void`                             |      |             |             |
| `onView`         | `() => void`                             |      |             |             |
| `onViewDetails`  | `() => void`                             |      |             |             |
| `onWorkOrder`    | `() => void`                             |      |             |             |
| `patientName`    | `string`                                 |      | ``          |             |
| `statusColors`   | `{ color: string; badgeColor: string; }` |      |             |             |
| `statusLabels`   | `PrescriptionCardStatusLabels`           |      |             |             |

### @rubenpazch/prescription-eye-card

Datos de un ojo de la receta óptica (PrescriptionEyeCard) y campo individual (PrescriptionFieldCard).

- **Usar cuando:** Mostrar o comparar los valores de un ojo en apps de óptica.
- **Evitar cuando:** Cualquier dato que no sea una receta óptica.

#### PrescriptionEyeCard

```tsx
import { PrescriptionEyeCard } from "@rubenpazch/ui";
```

| Prop              | Tipo                                         | Req. | Por defecto | Descripción |
| ----------------- | -------------------------------------------- | ---- | ----------- | ----------- |
| `eye`             | `"OD" \| "OI"`                               | sí   |             |             |
| `eyeInfo`         | `PrescriptionEyeInfo`                        | sí   |             |             |
| `labels`          | `PrescriptionEyeCardLabels`                  | sí   |             |             |
| `prismBaseLookup` | `{ getNameByKey: (key: string) => string; }` | sí   |             |             |
