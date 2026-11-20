# NumericUpPicker

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Campo numérico con botones +/-, signo opcional, solo enteros, ayuda, advertencia y error.

- **Usar cuando:** Ajustar un valor por pasos (cantidades, graduaciones con signo).
- **Evitar cuando:** Montos de dinero: usa NumericPicker.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/numeric-up-picker
```

## NumericUpPicker

Campo numérico con botones − y +, signo opcional, solo enteros, ayuda, advertencia y error.

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

<!-- catalogo:fin -->
