# NumericPicker

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Campo numérico con mínimo, máximo, paso, decimales y moneda.

- **Usar cuando:** Montos, cantidades y precios.
- **Evitar cuando:** Valores con signo o graduaciones ópticas: usa NumericUpPicker.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/numeric-picker
```

## NumericPicker

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

<!-- catalogo:fin -->
