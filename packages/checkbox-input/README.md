# CheckboxInput

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Casilla de verificación con etiqueta, ayuda y error.

- **Usar cuando:** Opciones sí/no o selección múltiple independiente.
- **Evitar cuando:** Elegir una sola opción entre varias: usa RadioGroup.

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

<!-- catalogo:fin -->
