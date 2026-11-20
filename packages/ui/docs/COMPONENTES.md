<!-- GENERADO por scripts/catalogo.mjs (pnpm catalogo). No editar a mano. -->

# Componentes de @rubenpazch/ui

Todo se importa desde un solo paquete:

```tsx
import { Button, TextInput, Toast } from "@rubenpazch/ui";
```

Antes de crear un componente en una app, busca aquí uno que sirva. Si no existe, agrégalo a la
librería (ver AGENTS.md del repo lbyte-ui-library), no lo copies en la app.

## Índice

| Paquete                                                                 | Categoría                  | Exporta                                                                                   | Qué es                                                                                                                                                          |
| ----------------------------------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@rubenpazch/autocomplete`](#rubenpazchautocomplete)                   | Formularios                | Autocomplete                                                                              | Selector con búsqueda sobre una lista de opciones (con descripción, carga y opción de limpiar).                                                                 |
| [`@rubenpazch/avatar`](#rubenpazchavatar)                               | Presentación de datos      | Avatar, AvatarGroup                                                                       | Avatar de persona (imagen, iniciales o icono) y AvatarGroup para varios.                                                                                        |
| [`@rubenpazch/button`](#rubenpazchbutton)                               | Acciones                   | Button                                                                                    | Botón con variantes text/contained/outlined, colores, tamaños, estado de carga e iconos; puede renderizar un enlace (href).                                     |
| [`@rubenpazch/checkbox-input`](#rubenpazchcheckbox-input)               | Formularios                | CheckboxInput                                                                             | Casilla de verificación con etiqueta, ayuda y error.                                                                                                            |
| [`@rubenpazch/chip`](#rubenpazchchip)                                   | Presentación de datos      | Chip                                                                                      | Chip/etiqueta con variantes, icono y acción de borrar.                                                                                                          |
| [`@rubenpazch/confirmation-dialog`](#rubenpazchconfirmation-dialog)     | Retroalimentación          | ConfirmationDialog                                                                        | Diálogo modal de confirmación (aceptar/cancelar).                                                                                                               |
| [`@rubenpazch/date-input`](#rubenpazchdate-input)                       | Formularios                | DateInput                                                                                 | Campo de fecha con formato local, mínimo/máximo, ayuda y error.                                                                                                 |
| [`@rubenpazch/date-picker`](#rubenpazchdate-picker)                     | Formularios                | DatePicker                                                                                | Selector de fecha con calendario desplegable.                                                                                                                   |
| [`@rubenpazch/draggable-list`](#rubenpazchdraggable-list)               | Datos                      | DraggableList                                                                             | Lista reordenable arrastrando (también con teclado), basada en dnd-kit.                                                                                         |
| [`@rubenpazch/drawer`](#rubenpazchdrawer)                               | Navegación                 | Drawer                                                                                    | Panel lateral (izquierda/derecha/arriba/abajo) con animación y fondo.                                                                                           |
| [`@rubenpazch/icon-button`](#rubenpazchicon-button)                     | Acciones                   | IconButton                                                                                | Botón de solo icono con variantes, formas, tooltip y etiqueta accesible.                                                                                        |
| [`@rubenpazch/icons`](#rubenpazchicons)                                 | Iconos                     | ArrowDetailsIcon, ArchiveIcon, BrandingIcon, BusinessPlanIcon, CalendarIcon, CheckIcon, … | Más de 60 iconos SVG como componentes React (y MaterialIcon para Material Icons).                                                                               |
| [`@rubenpazch/identification-input`](#rubenpazchidentification-input)   | Salud (pacientes y óptica) | IdentificationInput                                                                       | Tipo y número de documento peruano (DNI, CE, pasaporte) con validación de longitud y formato.                                                                   |
| [`@rubenpazch/image-upload`](#rubenpazchimage-upload)                   | Formularios                | ImageUpload                                                                               | Subida de imagen o PDF con vista previa, arrastrar y soltar, validación de tipo y tamaño.                                                                       |
| [`@rubenpazch/info-row`](#rubenpazchinfo-row)                           | Presentación de datos      | InfoRow                                                                                   | Fila de dato con icono, etiqueta y valor (variantes de color, tamaños, acción opcional).                                                                        |
| [`@rubenpazch/loading-spinner`](#rubenpazchloading-spinner)             | Retroalimentación          | LoadingSpinner                                                                            | Indicador de carga circular con tamaños y colores.                                                                                                              |
| [`@rubenpazch/numeric-picker`](#rubenpazchnumeric-picker)               | Formularios                | NumericPicker                                                                             | Campo numérico con mínimo, máximo, paso, decimales y moneda.                                                                                                    |
| [`@rubenpazch/numeric-up-picker`](#rubenpazchnumeric-up-picker)         | Formularios                | NumericUpPicker                                                                           | Campo numérico con botones +/-, signo opcional, solo enteros, ayuda, advertencia y error.                                                                       |
| [`@rubenpazch/overlay-loader`](#rubenpazchoverlay-loader)               | Retroalimentación          | OverlayLoader, InlineLoader                                                               | OverlayLoader (pantalla completa, controlado por visible) e InlineLoader (dentro de un contenedor).                                                             |
| [`@rubenpazch/pagination`](#rubenpazchpagination)                       | Navegación                 | Pagination, PaginationItem                                                                | Paginación con variantes, tamaños y formas; incluye PaginationItem.                                                                                             |
| [`@rubenpazch/patient-details`](#rubenpazchpatient-details)             | Salud (pacientes y óptica) | PatientDetails                                                                            | Ficha de paciente: identificación, contacto, contacto de emergencia, ubicación (departamento/provincia/distrito) e historia clínica. Textos por la prop labels. |
| [`@rubenpazch/patient-search`](#rubenpazchpatient-search)               | Salud (pacientes y óptica) | PatientSearch                                                                             | Buscador de pacientes con resultados y selección.                                                                                                               |
| [`@rubenpazch/prescription-card`](#rubenpazchprescription-card)         | Salud (pacientes y óptica) | PrescriptionCard                                                                          | Tarjeta de receta óptica completa (OD/OI: esfera, cilindro, eje, adición, DNP, prisma, altura) con estado y observaciones.                                      |
| [`@rubenpazch/prescription-eye-card`](#rubenpazchprescription-eye-card) | Salud (pacientes y óptica) | PrescriptionEyeCard                                                                       | Datos de un ojo de la receta óptica (PrescriptionEyeCard) y campo individual (PrescriptionFieldCard).                                                           |
| [`@rubenpazch/radio-button`](#rubenpazchradio-button)                   | Formularios                | RadioButton, RadioGroup                                                                   | RadioButton y RadioGroup accesibles con variantes y validación.                                                                                                 |
| [`@rubenpazch/select`](#rubenpazchselect)                               | Formularios                | Select                                                                                    | Lista desplegable simple con etiqueta, placeholder y error.                                                                                                     |
| [`@rubenpazch/shared`](#rubenpazchshared)                               | Base (tokens y utilidades) | classList                                                                                 | Utilidades (classList) y tipos comunes; la usan internamente los componentes.                                                                                   |
| [`@rubenpazch/stepper`](#rubenpazchstepper)                             | Navegación                 | Stepper                                                                                   | Indicador de pasos numerados (opcionalmente clicables) para procesos en etapas.                                                                                 |
| [`@rubenpazch/tabs`](#rubenpazchtabs)                                   | Navegación                 | Tabs                                                                                      | Pestañas para alternar entre secciones de una misma vista.                                                                                                      |
| [`@rubenpazch/text-input`](#rubenpazchtext-input)                       | Formularios                | TextInput                                                                                 | Campo de texto con etiqueta, ayuda, advertencia, error, iconos y variantes.                                                                                     |
| [`@rubenpazch/toast`](#rubenpazchtoast)                                 | Retroalimentación          | ToastBanner                                                                               | Notificaciones temporales (Toast) y avisos fijos (ToastBanner) con tipos y acciones.                                                                            |
| [`@rubenpazch/tokens`](#rubenpazchtokens)                               | Base (tokens y utilidades) | cssVar, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, …                    | Tokens de diseño (colores, tipografía, espacios, radios, sombras) como variables CSS --lb-*, estilos base y puente para Tailwind 4.                             |

## Base (tokens y utilidades)

### @rubenpazch/shared

Utilidades (classList) y tipos comunes; la usan internamente los componentes.

- **Usar cuando:** Solo si construyes un componente nuevo dentro de la librería.
- **Evitar cuando:** En las apps: no hace falta importarla.

Otras exportaciones: `classList`.

Tipos: `Size`, `Color`, `Variant`.

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

| Prop               | Tipo                                                                      | Req. | Por defecto | Descripción                               |
| ------------------ | ------------------------------------------------------------------------- | ---- | ----------- | ----------------------------------------- |
| `color`            | `"primary" \| "secondary" \| "success" \| "error" \| "warning" \| "info"` |      |             | Button color theme                        |
| `component`        | `"button" \| "a"`                                                         |      |             |                                           |
| `disabled`         | `boolean`                                                                 |      |             | Disabled state                            |
| `disableElevation` | `boolean`                                                                 |      |             | Disable elevation/shadow effects          |
| `endIcon`          | `ReactNode`                                                               |      |             | Icon to display after text                |
| `fullWidth`        | `boolean`                                                                 |      |             | Whether the button should take full width |
| `href`             | `string`                                                                  |      |             |                                           |
| `loading`          | `boolean`                                                                 |      |             | Loading state with spinner                |
| `size`             | `"small" \| "medium" \| "large"`                                          |      |             | Button size                               |
| `startIcon`        | `ReactNode`                                                               |      |             | Icon to display before text               |
| `variant`          | `"text" \| "contained" \| "outlined"`                                     |      |             | Button variant style                      |

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
| `size`             | `"small" \| "medium"`                                                                                       |      | `medium`    |             |
| `tooltip`          | `ReactNode`                                                                                                 |      |             |             |
| `tooltipPosition`  | `"top" \| "bottom" \| "left" \| "right"`                                                                    |      | `top`       |             |
| `variant`          | `"default" \| "secondary" \| "black" \| "gradient-green" \| "solid-green" \| "blue" \| "pink" \| "warning"` |      | `default`   |             |

Tipos: `IconButtonVariant`, `IconButtonSize`, `IconButtonShape`, `IconButtonFocusStyle`, `IconButtonFocusTrigger`, `IconPosition`, `LabelPosition`, `TooltipPosition`, `IconButtonProps`.

## Formularios

### @rubenpazch/autocomplete

Selector con búsqueda sobre una lista de opciones (con descripción, carga y opción de limpiar).

- **Usar cuando:** Elegir un valor entre muchas opciones (más de ~8) o cuando el usuario necesita filtrar escribiendo.
- **Evitar cuando:** Pocas opciones fijas: usa Select o RadioGroup.

#### Autocomplete

```tsx
import { Autocomplete } from "@rubenpazch/ui";
```

| Prop              | Tipo                                                                                  | Req. | Por defecto           | Descripción |
| ----------------- | ------------------------------------------------------------------------------------- | ---- | --------------------- | ----------- |
| `onChange`        | `(value: string \| number \| null, option?: AutocompleteOption \| undefined) => void` | sí   |                       |             |
| `value`           | `null \| string \| number`                                                            | sí   |                       |             |
| `className`       | `string`                                                                              |      | ``                    |             |
| `clearable`       | `boolean`                                                                             |      | `true`                |             |
| `createLabel`     | `string`                                                                              |      | `Create`              |             |
| `debounceMs`      | `number`                                                                              |      | `300`                 |             |
| `disabled`        | `boolean`                                                                             |      | `false`               |             |
| `error`           | `string`                                                                              |      |                       |             |
| `highlightMatch`  | `boolean`                                                                             |      | `true`                |             |
| `hint`            | `string`                                                                              |      |                       |             |
| `icon`            | `ReactNode`                                                                           |      |                       |             |
| `keepListOpen`    | `boolean`                                                                             |      | `false`               |             |
| `label`           | `string`                                                                              |      |                       |             |
| `loading`         | `boolean`                                                                             |      | `false`               |             |
| `loadingText`     | `string`                                                                              |      | `Loading...`          |             |
| `maxHeight`       | `string`                                                                              |      | `300px`               |             |
| `minSearchLength` | `number`                                                                              |      | `0`                   |             |
| `noResultsText`   | `string`                                                                              |      | `No results found`    |             |
| `onBlur`          | `() => void`                                                                          |      |                       |             |
| `onCreate`        | `(searchTerm: string) => void`                                                        |      |                       |             |
| `onFocus`         | `() => void`                                                                          |      |                       |             |
| `onSearch`        | `(searchTerm: string) => void`                                                        |      |                       |             |
| `options`         | `AutocompleteOption[]`                                                                |      | `[]`                  |             |
| `placeholder`     | `string`                                                                              |      | `Search or select...` |             |
| `position`        | `"bottom" \| "top"`                                                                   |      | `bottom`              |             |
| `readOnly`        | `boolean`                                                                             |      | `false`               |             |
| `renderOption`    | `(option: AutocompleteOption, isSelected: boolean) => ReactNode`                      |      |                       |             |
| `required`        | `boolean`                                                                             |      | `false`               |             |
| `searchable`      | `boolean`                                                                             |      | `true`                |             |
| `warning`         | `string`                                                                              |      |                       |             |

### @rubenpazch/checkbox-input

Casilla de verificación con etiqueta, ayuda y error.

- **Usar cuando:** Opciones sí/no o selección múltiple independiente.
- **Evitar cuando:** Elegir una sola opción entre varias: usa RadioGroup.

#### CheckboxInput

```tsx
import { CheckboxInput } from "@rubenpazch/ui";
```

| Prop            | Tipo                                                           | Req. | Por defecto | Descripción |
| --------------- | -------------------------------------------------------------- | ---- | ----------- | ----------- |
| `label`         | `string`                                                       | sí   |             |             |
| `checked`       | `boolean`                                                      |      | `false`     |             |
| `className`     | `string`                                                       |      | ``          |             |
| `description`   | `string`                                                       |      |             |             |
| `disabled`      | `boolean`                                                      |      | `false`     |             |
| `error`         | `string`                                                       |      |             |             |
| `id`            | `string`                                                       |      |             |             |
| `indeterminate` | `boolean`                                                      |      | `false`     |             |
| `onChange`      | `(checked: boolean) => void`                                   |      |             |             |
| `required`      | `boolean`                                                      |      | `false`     |             |
| `size`          | `"sm" \| "md" \| "lg"`                                         |      | `md`        |             |
| `variant`       | `"default" \| "primary" \| "success" \| "warning" \| "danger"` |      | `default`   |             |

### @rubenpazch/date-input

Campo de fecha con formato local, mínimo/máximo, ayuda y error.

- **Usar cuando:** Ingresar una fecha escribiéndola (fecha de nacimiento, fecha de documento).
- **Evitar cuando:** Elegir en un calendario visual: usa DatePicker.

#### DateInput

```tsx
import { DateInput } from "@rubenpazch/ui";
```

| Prop          | Tipo                     | Req. | Por defecto  | Descripción |
| ------------- | ------------------------ | ---- | ------------ | ----------- |
| `onChange`    | `(date: string) => void` | sí   |              |             |
| `value`       | `string`                 | sí   |              |             |
| `className`   | `string`                 |      | ``           |             |
| `disabled`    | `boolean`                |      | `false`      |             |
| `error`       | `string`                 |      |              |             |
| `hint`        | `string`                 |      |              |             |
| `label`       | `string`                 |      |              |             |
| `locale`      | `string`                 |      | `en`         |             |
| `maxDate`     | `string`                 |      |              |             |
| `minDate`     | `string`                 |      |              |             |
| `placeholder` | `string`                 |      | `MM/DD/YYYY` |             |
| `required`    | `boolean`                |      | `false`      |             |

### @rubenpazch/date-picker

Selector de fecha con calendario desplegable.

- **Usar cuando:** Elegir una fecha cercana o explorando el calendario (citas, vencimientos).
- **Evitar cuando:** Fechas lejanas que el usuario conoce de memoria: usa DateInput.

#### DatePicker

```tsx
import { DatePicker } from "@rubenpazch/ui";
```

| Prop          | Tipo                     | Req. | Por defecto | Descripción |
| ------------- | ------------------------ | ---- | ----------- | ----------- |
| `onChange`    | `(date: string) => void` | sí   |             |             |
| `value`       | `string`                 | sí   |             |             |
| `className`   | `string`                 |      | ``          |             |
| `disabled`    | `boolean`                |      | `false`     |             |
| `error`       | `string`                 |      |             |             |
| `hint`        | `string`                 |      |             |             |
| `label`       | `string`                 |      |             |             |
| `locale`      | `string`                 |      | `en`        |             |
| `maxDate`     | `string`                 |      |             |             |
| `minDate`     | `string`                 |      |             |             |
| `placeholder` | `string`                 |      |             |             |
| `readOnly`    | `boolean`                |      | `false`     |             |
| `required`    | `boolean`                |      | `false`     |             |

### @rubenpazch/image-upload

Subida de imagen o PDF con vista previa, arrastrar y soltar, validación de tipo y tamaño.

- **Usar cuando:** Fotos de perfil, comprobantes, documentos adjuntos (suele enviar a archivos-api).
- **Evitar cuando:** Muchos archivos a la vez sin vista previa.

#### ImageUpload

```tsx
import { ImageUpload } from "@rubenpazch/ui";
```

| Prop              | Tipo                            | Req. | Por defecto                                    | Descripción |
| ----------------- | ------------------------------- | ---- | ---------------------------------------------- | ----------- |
| `labels`          | `ImageUploadLabels`             | sí   |                                                |             |
| `onUpload`        | `(file: File) => Promise<void>` | sí   |                                                |             |
| `acceptedFormats` | `string[]`                      |      | `["image/jpeg", "image/png", "image/svg+xml"]` |             |
| `className`       | `string`                        |      | ``                                             |             |
| `currentImageUrl` | `string`                        |      |                                                |             |
| `disabled`        | `boolean`                       |      | `false`                                        |             |
| `label`           | `string`                        |      |                                                |             |
| `maxSizeMB`       | `number`                        |      | `5`                                            |             |
| `onRemove`        | `() => Promise<void>`           |      |                                                |             |
| `previewHeight`   | `number`                        |      | `200`                                          |             |
| `previewWidth`    | `number`                        |      | `200`                                          |             |

### @rubenpazch/numeric-picker

Campo numérico con mínimo, máximo, paso, decimales y moneda.

- **Usar cuando:** Montos, cantidades y precios.
- **Evitar cuando:** Valores con signo o graduaciones ópticas: usa NumericUpPicker.

#### NumericPicker

```tsx
import { NumericPicker } from "@rubenpazch/ui";
```

| Prop          | Tipo                      | Req. | Por defecto | Descripción |
| ------------- | ------------------------- | ---- | ----------- | ----------- |
| `onChange`    | `(value: string) => void` | sí   |             |             |
| `value`       | `string \| number`        | sí   |             |             |
| `currency`    | `string`                  |      | `S/.`       |             |
| `decimals`    | `number`                  |      | `2`         |             |
| `disabled`    | `boolean`                 |      | `false`     |             |
| `label`       | `string`                  |      |             |             |
| `max`         | `number`                  |      | `999999`    |             |
| `min`         | `number`                  |      | `0`         |             |
| `placeholder` | `string`                  |      | `0.00`      |             |
| `required`    | `boolean`                 |      | `false`     |             |
| `step`        | `number`                  |      | `1`         |             |

### @rubenpazch/numeric-up-picker

Campo numérico con botones +/-, signo opcional, solo enteros, ayuda, advertencia y error.

- **Usar cuando:** Ajustar un valor por pasos (cantidades, graduaciones con signo).
- **Evitar cuando:** Montos de dinero: usa NumericPicker.

#### NumericUpPicker

```tsx
import { NumericUpPicker } from "@rubenpazch/ui";
```

| Prop              | Tipo                             | Req. | Por defecto | Descripción |
| ----------------- | -------------------------------- | ---- | ----------- | ----------- |
| `onChange`        | `(value: string) => void`        | sí   |             |             |
| `value`           | `string \| number`               | sí   |             |             |
| `alwaysNegative`  | `boolean`                        |      | `false`     |             |
| `className`       | `string`                         |      | ``          |             |
| `clearable`       | `boolean`                        |      | `false`     |             |
| `defaultToZero`   | `boolean`                        |      | `false`     |             |
| `disabled`        | `boolean`                        |      | `false`     |             |
| `error`           | `string`                         |      |             |             |
| `hint`            | `string`                         |      |             |             |
| `integerOnly`     | `boolean`                        |      | `false`     |             |
| `label`           | `string`                         |      |             |             |
| `max`             | `number`                         |      |             |             |
| `min`             | `number`                         |      |             |             |
| `onBlur`          | `() => void`                     |      |             |             |
| `onClear`         | `() => void`                     |      |             |             |
| `onFocus`         | `() => void`                     |      |             |             |
| `placeholder`     | `string`                         |      |             |             |
| `required`        | `boolean`                        |      | `false`     |             |
| `showSign`        | `boolean`                        |      | `false`     |             |
| `size`            | `"small" \| "medium" \| "large"` |      | `medium`    |             |
| `step`            | `number`                         |      | `0.01`      |             |
| `useMinAsDefault` | `boolean`                        |      | `false`     |             |
| `warning`         | `string`                         |      |             |             |

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

| Prop                | Tipo                                                           | Req. | Por defecto | Descripción |
| ------------------- | -------------------------------------------------------------- | ---- | ----------- | ----------- |
| `name`              | `string`                                                       | sí   |             |             |
| `onChange`          | `(value: string) => void`                                      | sí   |             |             |
| `options`           | `RadioOption[]`                                                | sí   |             |             |
| `bordered`          | `boolean`                                                      |      | `false`     |             |
| `borderLabel`       | `string`                                                       |      |             |             |
| `className`         | `string`                                                       |      | ``          |             |
| `disabled`          | `boolean`                                                      |      | `false`     |             |
| `error`             | `string`                                                       |      |             |             |
| `groupLabel`        | `string`                                                       |      |             |             |
| `orientation`       | `"vertical" \| "horizontal"`                                   |      | `vertical`  |             |
| `required`          | `boolean`                                                      |      | `false`     |             |
| `selectedLabelText` | `string`                                                       |      | `Selected:` |             |
| `showSelectedLabel` | `boolean`                                                      |      | `false`     |             |
| `size`              | `"sm" \| "md" \| "lg"`                                         |      | `md`        |             |
| `value`             | `string`                                                       |      |             |             |
| `variant`           | `"default" \| "primary" \| "success" \| "warning" \| "danger"` |      | `default`   |             |

Tipos: `RadioButtonProps`, `RadioSize`, `RadioVariant`, `RadioGroupProps`, `RadioOption`, `RadioGroupOrientation`.

### @rubenpazch/select

Lista desplegable simple con etiqueta, placeholder y error.

- **Usar cuando:** Elegir una opción entre una lista corta y conocida.
- **Evitar cuando:** Listas largas o con búsqueda: usa Autocomplete.

#### Select

```tsx
import { Select } from "@rubenpazch/ui";
```

| Prop          | Tipo                      | Req. | Por defecto | Descripción |
| ------------- | ------------------------- | ---- | ----------- | ----------- |
| `onChange`    | `(value: string) => void` | sí   |             |             |
| `options`     | `SelectOption[]`          | sí   |             |             |
| `value`       | `string`                  | sí   |             |             |
| `className`   | `string`                  |      |             |             |
| `disabled`    | `boolean`                 |      | `false`     |             |
| `error`       | `string`                  |      |             |             |
| `id`          | `string`                  |      |             |             |
| `label`       | `string`                  |      |             |             |
| `name`        | `string`                  |      |             |             |
| `placeholder` | `string`                  |      |             |             |
| `required`    | `boolean`                 |      | `false`     |             |

Tipos: `SelectOption`, `SelectProps`.

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
| `label`                  | `string`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `max`                    | `number`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `maxLength`              | `number`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `min`                    | `number`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `minLength`              | `number`                                                        |      |             |                                                                                                                                                                                                                                                       |
| `minLengthMessage`       | `string`                                                        |      |             | Inline error shown when the value is non-empty but shorter than `minLength`.                                                                                                                                                                          |
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

## Navegación

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

### @rubenpazch/pagination

Paginación con variantes, tamaños y formas; incluye PaginationItem.

- **Usar cuando:** Listados paginados en el servidor (tablas, resultados de búsqueda).
- **Evitar cuando:** Pocas páginas que caben en una sola vista.

#### Pagination

```tsx
import { Pagination } from "@rubenpazch/ui";
```

| Prop              | Tipo                                                           | Req. | Por defecto | Descripción                                                      |
| ----------------- | -------------------------------------------------------------- | ---- | ----------- | ---------------------------------------------------------------- |
| `boundaryCount`   | `number`                                                       |      | `1`         | Number of always visible pages at the beginning and end          |
| `count`           | `number`                                                       |      | `1`         | Total number of pages                                            |
| `defaultPage`     | `number`                                                       |      | `1`         | Default page if uncontrolled                                     |
| `disabled`        | `boolean`                                                      |      | `false`     | If true, the component is disabled                               |
| `hideNextButton`  | `boolean`                                                      |      | `false`     | If true, hide the next-page button                               |
| `hidePrevButton`  | `boolean`                                                      |      | `false`     | If true, hide the previous-page button                           |
| `onChange`        | `(event: ChangeEvent<unknown, Element>, page: number) => void` |      |             | Callback when page changes                                       |
| `page`            | `number`                                                       |      |             | The current page (1-based)                                       |
| `renderItem`      | `(item: PaginationItemType) => ReactNode`                      |      |             | Custom render function for items                                 |
| `shape`           | `"rounded" \| "circular"`                                      |      | `rounded`   | The shape of the pagination items                                |
| `showFirstButton` | `boolean`                                                      |      | `false`     | If true, show the first-page button                              |
| `showLastButton`  | `boolean`                                                      |      | `false`     | If true, show the last-page button                               |
| `siblingCount`    | `number`                                                       |      | `1`         | Number of always visible pages before and after the current page |
| `size`            | `"small" \| "medium" \| "large"`                               |      | `medium`    | The size of the pagination component                             |
| `variant`         | `"text" \| "outlined"`                                         |      | `text`      | The variant to use                                               |

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
| `size`     | `"small" \| "medium" \| "large"`                                                            |      | `medium`    | The size of the component            |
| `variant`  | `"text" \| "outlined"`                                                                      |      | `text`      | The variant to use                   |

Tipos: `PaginationProps`, `PaginationShape`, `PaginationSize`, `PaginationVariant`, `PaginationItemType`, `PaginationItemProps`.

### @rubenpazch/stepper

Indicador de pasos numerados (opcionalmente clicables) para procesos en etapas.

- **Usar cuando:** Asistentes y formularios de varios pasos.
- **Evitar cuando:** Navegación entre secciones independientes: usa Tabs.

#### Stepper

```tsx
import { Stepper } from "@rubenpazch/ui";
```

| Prop            | Tipo                             | Req. | Por defecto | Descripción |
| --------------- | -------------------------------- | ---- | ----------- | ----------- |
| `currentStep`   | `number`                         | sí   |             |             |
| `steps`         | `Step[]`                         | sí   |             |             |
| `className`     | `string`                         |      | ``          |             |
| `onStepChange`  | `(step: number) => void`         |      |             |             |
| `size`          | `"small" \| "medium" \| "large"` |      | `medium`    |             |
| `stepClickable` | `boolean`                        |      | `false`     |             |

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

### @rubenpazch/confirmation-dialog

Diálogo modal de confirmación (aceptar/cancelar).

- **Usar cuando:** Confirmar acciones destructivas o irreversibles (eliminar, anular, cerrar periodo).
- **Evitar cuando:** Mostrar formularios o contenido largo: usa Drawer.

#### ConfirmationDialog

```tsx
import { ConfirmationDialog } from "@rubenpazch/ui";
```

| Prop          | Tipo         | Req. | Por defecto | Descripción |
| ------------- | ------------ | ---- | ----------- | ----------- |
| `isOpen`      | `boolean`    | sí   |             |             |
| `message`     | `string`     | sí   |             |             |
| `onCancel`    | `() => void` | sí   |             |             |
| `onConfirm`   | `() => void` | sí   |             |             |
| `title`       | `string`     | sí   |             |             |
| `cancelText`  | `string`     |      | `Cancel`    |             |
| `confirmText` | `string`     |      | `Confirm`   |             |
| `isDangerous` | `boolean`    |      | `false`     |             |
| `isLoading`   | `boolean`    |      | `false`     |             |

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

| Prop        | Tipo                                       | Req. | Por defecto | Descripción |
| ----------- | ------------------------------------------ | ---- | ----------- | ----------- |
| `className` | `string`                                   |      | ``          |             |
| `color`     | `"blue" \| "gray" \| "white"`              |      | `blue`      |             |
| `inline`    | `boolean`                                  |      | `false`     |             |
| `message`   | `string`                                   |      |             |             |
| `size`      | `"sm" \| "md" \| "lg"`                     |      | `md`        |             |
| `variant`   | `"spinner" \| "dots" \| "pulse" \| "ring"` |      | `spinner`   |             |

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

### @rubenpazch/toast

Notificaciones temporales (Toast) y avisos fijos (ToastBanner) con tipos y acciones.

- **Usar cuando:** Confirmar que algo se guardó o avisar un error sin interrumpir.
- **Evitar cuando:** Pedir una decisión: usa ConfirmationDialog.

#### ToastBanner

```tsx
import { ToastBanner } from "@rubenpazch/ui";
```

| Prop             | Tipo                   | Req. | Por defecto          | Descripción |
| ---------------- | ---------------------- | ---- | -------------------- | ----------- |
| `onClose`        | `(id: string) => void` | sí   |                      |             |
| `toasts`         | `ToastItem[]`          | sí   |                      |             |
| `className`      | `string`               |      |                      |             |
| `closeAriaLabel` | `string`               |      | `Close notification` |             |

Tipos: `ToastAction`, `ToastBannerProps`, `ToastItem`, `ToastType`.

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

### @rubenpazch/chip

Chip/etiqueta con variantes, icono y acción de borrar.

- **Usar cuando:** Estados, etiquetas, filtros activos o valores seleccionados que se pueden quitar.
- **Evitar cuando:** Acciones principales: usa Button.

#### Chip

```tsx
import { Chip } from "@rubenpazch/ui";
```

| Prop              | Tipo                                                                    | Req. | Por defecto   | Descripción                                    |
| ----------------- | ----------------------------------------------------------------------- | ---- | ------------- | ---------------------------------------------- |
| `avatar`          | `ReactNode`                                                             |      |               | Avatar or custom element shown at the start    |
| `clickable`       | `boolean`                                                               |      | `false`       | Whether the chip behaves like a button         |
| `color`           | `"default" \| "primary" \| "success" \| "warning" \| "error" \| "info"` |      | `default`     | Color theme for the chip                       |
| `component`       | `ElementType<any, keyof IntrinsicElements>`                             |      |               | Override root component                        |
| `deleteAriaLabel` | `string`                                                                |      | `Remove chip` | Accessible label for the delete button         |
| `deleteIcon`      | `ReactNode`                                                             |      |               | Custom delete icon element                     |
| `disabled`        | `boolean`                                                               |      | `false`       | Disabled state                                 |
| `icon`            | `ReactNode`                                                             |      |               | Leading icon rendered before the label         |
| `label`           | `ReactNode`                                                             |      |               | Content shown inside the chip                  |
| `onDelete`        | `(event: MouseEvent<HTMLButtonElement, MouseEvent>) => void`            |      |               | Callback fired when the delete icon is clicked |
| `selected`        | `boolean`                                                               |      | `false`       | Selected/pressed state for toggleable chips    |
| `size`            | `"sm" \| "md"`                                                          |      | `md`          | Chip size                                      |
| `variant`         | `"filled" \| "outlined" \| "soft"`                                      |      | `filled`      | Visual style for the chip                      |

Tipos: `ChipVariant`, `ChipColor`, `ChipSize`, `ChipProps`.

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

## Datos

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

Iconos disponibles (72): `ArrowDetailsIcon`, `ArchiveIcon`, `BrandingIcon`, `BusinessPlanIcon`, `CalendarIcon`, `CheckIcon`, `CheckOutIcon`, `CheckmarkIcon`, `ChecksIcon`, `ChevronBarIcon`, `ChevronIcon`, `ClinicalNotesIcon`, `CityIcon`, `ClockIcon`, `CloseIcon`, `CopyIcon`, `CoinsHandIcon`, `CoinsAcceptedIcon`, `MenuGridIcon`, `DocumentIcon`, `DownloadIcon`, `DragHandleIcon`, `EditIcon`, `EmailIcon`, `ErrorIcon`, `ExclamationTriangleIcon`, `EyeIcon`, `EyeCheckIcon`, `FilterIcon`, `FoldersIcon`, `GalleryPhotoIcon`, `GlassesIcon`, `HomeIcon`, `InfoIcon`, `LinkIcon`, `LocationIcon`, `ManualIdentifierIcon`, `MapIcon`, `MenuIcon`, `MinusIcon`, `MoreIcon`, `NotificationIcon`, `PatientIcon`, `PatientListIcon`, `PatientsIcon`, `PhoneIcon`, `WhatsAppIcon`, `PlusIcon`, `PrescriptionIcon`, `PresentationChartIcon`, `PrintIcon`, `RefreshIcon`, `SearchIcon`, `SettingsIcon`, `SortIcon`, `SpinnerIcon`, `SystemIdentifierIcon`, `TrashIcon`, `ArrowLeftIcon`, `ArrowRightIcon`, `RobotOffIcon`, `UploadIcon`, `UserManagementIcon`, `UserPlusIcon`, `UserSelectIcon`, `UsersIcon`, `WalletOpenIcon`, `ZoomInIcon`, `ZoomOutIcon`, `RobotIcon`, `TargetIcon`, `MaterialIcon`.

Props habituales: `size`, `className` (y en algunos `color`, `width`, `height`). Ver el tipo de cada icono en su archivo.

## Salud (pacientes y óptica)

### @rubenpazch/identification-input

Tipo y número de documento peruano (DNI, CE, pasaporte) con validación de longitud y formato.

- **Usar cuando:** Registrar el documento de identidad de una persona en Perú.
- **Evitar cuando:** Otros países o identificadores que no son documentos de identidad.

#### IdentificationInput

```tsx
import { IdentificationInput } from "@rubenpazch/ui";
```

| Prop                           | Tipo                                             | Req. | Por defecto | Descripción |
| ------------------------------ | ------------------------------------------------ | ---- | ----------- | ----------- |
| `documentType`                 | `null \| "dni" \| "ce" \| "passport"`            | sí   |             |             |
| `identificationNumber`         | `string`                                         | sí   |             |             |
| `labels`                       | `IdentificationInputLabels`                      | sí   |             |             |
| `onDocumentTypeChange`         | `(type: PeruIdentificationType \| null) => void` | sí   |             |             |
| `onIdentificationNumberChange` | `(value: string) => void`                        | sí   |             |             |
| `className`                    | `string`                                         |      | ``          |             |
| `disabled`                     | `boolean`                                        |      | `false`     |             |
| `documentTypeError`            | `string`                                         |      |             |             |
| `identificationNumberError`    | `string`                                         |      |             |             |
| `required`                     | `boolean`                                        |      | `false`     |             |

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
