# @rubenpazch/button

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Botón con variantes text/contained/outlined, colores, tamaños, estado de carga e iconos; puede renderizar un enlace (href).

- **Usar cuando:** Cualquier acción principal o secundaria: guardar, enviar, cancelar, navegar con apariencia de botón.
- **Evitar cuando:** Acciones de solo icono: usa IconButton.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/button
```

## Button

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

Tipos: `ButtonVariant`, `ButtonColor`, `ButtonSize`, `ButtonSizeProp`, `ButtonProps`.

<!-- catalogo:fin -->
