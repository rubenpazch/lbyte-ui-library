# @rubenpazch/form-field

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

FormField (etiqueta, ayuda y error asociados a cualquier control), FormRow (columnas que se apilan en móvil) y FormActions (pie con botones).

- **Usar cuando:** Armar formularios: FormRow para poner campos lado a lado, FormActions para Cancelar/Guardar, FormField para controles propios o de terceros.
- **Evitar cuando:** Con componentes de la librería (TextInput, Select…) no hace falta FormField: ya traen etiqueta y mensajes.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/form-field
```

## FormField

Envoltorio de campo: etiqueta, ayuda, advertencia y error asociados a cualquier control
(nativo o de terceros). Los componentes de la librería ya lo traen; úsalo para controles propios.

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

## FormRow

Fila de campos en columnas que se apilan en móvil.

| Prop      | Tipo               | Req. | Por defecto | Descripción                                                       |
| --------- | ------------------ | ---- | ----------- | ----------------------------------------------------------------- |
| `columns` | `1 \| 2 \| 3 \| 4` |      | `2`         | Columnas en pantallas anchas (en móvil siempre 1). Por defecto 2. |

## FormActions

Pie de formulario con los botones (Cancelar / Guardar).

| Prop     | Tipo                                        | Req. | Por defecto | Descripción                                                            |
| -------- | ------------------------------------------- | ---- | ----------- | ---------------------------------------------------------------------- |
| `align`  | `"start" \| "end" \| "between" \| "center"` |      | `end`       | Alineación de los botones: end (por defecto), start, between o center. |
| `sticky` | `boolean`                                   |      | `false`     | Fija el pie al fondo de la pantalla en formularios largos.             |

Tipos: `FormFieldProps`, `FormFieldControlProps`, `FormRowProps`, `FormActionsProps`.

<!-- catalogo:fin -->
