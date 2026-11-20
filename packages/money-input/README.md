# @rubenpazch/money-input

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Campo de monto en PEN (S/) o USD (US$) que devuelve un número; acepta punto o coma decimal y muestra 1,250.50 al salir. Incluye formatMoney().

- **Usar cuando:** Montos de dinero: cuotas, pagos, precios, presupuestos. Usa formatMoney() para mostrar montos en tablas y tarjetas.
- **Evitar cuando:** Cantidades sin moneda: usa NumericPicker. Valores con signo por pasos: usa NumericUpPicker.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/money-input
```

## MoneyInput

Campo de monto en soles o dólares. Mientras se escribe acepta "1250.5" o "1250,5"; al salir
muestra "1,250.50". Devuelve siempre un número (no texto).

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

<!-- catalogo:fin -->
