# CheckboxInput

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Casilla de verificación con etiqueta, ayuda y error (CheckboxInput) y grupo de casillas con título, "Seleccionar todos" y máximo (CheckboxGroup).

- **Usar cuando:** Opciones sí/no (CheckboxInput) o elegir varias opciones de una lista corta: permisos, días, especialidades (CheckboxGroup).
- **Evitar cuando:** Elegir una sola opción entre varias: usa RadioGroup. Listas largas o con búsqueda: usa Autocomplete. Activar/desactivar algo al instante: usa Switch.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/checkbox-input
```

## CheckboxInput

Casilla de verificación con etiqueta, descripción y error.

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

## CheckboxGroup

Grupo de casillas con título (`fieldset`/`legend`), ayuda y error: para elegir varias
opciones de una lista corta (permisos, días, especialidades).

| Prop          | Tipo                                                           | Req. | Por defecto | Descripción                                                                                                                                   |
| ------------- | -------------------------------------------------------------- | ---- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`       | `string`                                                       | sí   |             | Título del grupo (se muestra como `<legend>` del `<fieldset>`).                                                                               |
| `onChange`    | `(value: string[]) => void`                                    | sí   |             | Recibe la nueva lista de valores marcados (en el orden de `options`).                                                                         |
| `options`     | `CheckboxOption[]`                                             | sí   |             | Opciones del grupo.                                                                                                                           |
| `value`       | `string[]`                                                     | sí   |             | Valores marcados.                                                                                                                             |
| `className`   | `string`                                                       |      |             | Clase extra del contenedor.                                                                                                                   |
| `columns`     | `2 \| 3 \| 4`                                                  |      |             | Columnas en pantallas desde 640px (en móvil siempre 1). Ignora `orientation`.                                                                 |
| `disabled`    | `boolean`                                                      |      | `false`     | Deshabilita todo el grupo.                                                                                                                    |
| `error`       | `string`                                                       |      |             | Mensaje de error del grupo.                                                                                                                   |
| `hideLabel`   | `boolean`                                                      |      | `false`     | Ocultar el título visualmente (sigue disponible para lectores de pantalla).                                                                   |
| `hint`        | `string`                                                       |      |             | Texto de ayuda bajo el título.                                                                                                                |
| `id`          | `string`                                                       |      |             | id del fieldset; si no se pasa se genera uno.                                                                                                 |
| `maxSelected` | `number`                                                       |      |             | Máximo de opciones marcadas: al llegar, las demás se deshabilitan.                                                                            |
| `name`        | `string`                                                       |      |             | name de cada casilla (formularios nativos: se envía una vez por valor marcado).                                                               |
| `orientation` | `"vertical" \| "horizontal"`                                   |      | `vertical`  | `vertical` (por defecto) o `horizontal` (se ajusta a la siguiente línea).                                                                     |
| `required`    | `boolean`                                                      |      | `false`     | Marca el grupo como obligatorio (muestra *); la validación "al menos uno" va en `error`.                                                      |
| `selectAll`   | `boolean \| string`                                            |      | `false`     | Agrega una casilla "Seleccionar todos" (queda indeterminada si hay algunas marcadas). `true` usa el texto por defecto; un texto lo reemplaza. |
| `size`        | `"sm" \| "md" \| "lg"`                                         |      | `md`        | Tamaño de las casillas.                                                                                                                       |
| `variant`     | `"default" \| "primary" \| "success" \| "warning" \| "danger"` |      | `primary`   | Color de las casillas marcadas.                                                                                                               |

Tipos: `CheckboxInputProps`, `CheckboxGroupProps`, `CheckboxOption`.

<!-- catalogo:fin -->
