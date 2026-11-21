# RadioButton

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

RadioButton y RadioGroup accesibles con variantes y validación.

- **Usar cuando:** Elegir una sola opción entre pocas (2 a 6) visibles a la vez.
- **Evitar cuando:** Muchas opciones: usa Select o Autocomplete.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/radio-button
```

## RadioButton

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

## RadioGroup

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

<!-- catalogo:fin -->
