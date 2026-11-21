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

Campo numérico para montos, cantidades y precios. Mientras se escribe no se reformatea
(se puede escribir 12, 1250.5…); al salir del campo se aplican mínimo, máximo y decimales.

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

Tipos: `NumericPickerProps`.

<!-- catalogo:fin -->
