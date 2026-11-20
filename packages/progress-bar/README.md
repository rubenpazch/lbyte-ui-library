# @rubenpazch/progress-bar

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Barra de progreso (role="progressbar") con etiqueta y porcentaje, determinada o indeterminada.

- **Usar cuando:** Subidas de archivos, importaciones, avance de un proceso o de una meta (presupuesto usado).
- **Evitar cuando:** Pasos con nombre: usa Stepper. Esperas sin avance medible y cortas: usa LoadingSpinner.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/progress-bar
```

## ProgressBar

Barra de progreso accesible (role="progressbar"), determinada o indeterminada.

| Prop        | Tipo                                              | Req. | Por defecto | Descripción                                                             |
| ----------- | ------------------------------------------------- | ---- | ----------- | ----------------------------------------------------------------------- |
| `className` | `string`                                          |      |             | Clase extra.                                                            |
| `color`     | `"primary" \| "success" \| "warning" \| "danger"` |      | `primary`   | primary (por defecto), success, warning o danger.                       |
| `label`     | `string`                                          |      |             | Etiqueta visible: "Subiendo archivos". También es el nombre accesible.  |
| `max`       | `number`                                          |      | `100`       | Máximo (por defecto 100).                                               |
| `showValue` | `boolean`                                         |      | `false`     | Muestra el porcentaje a la derecha de la etiqueta.                      |
| `size`      | `"sm" \| "md" \| "lg"`                            |      | `md`        | sm (4px), md (8px, por defecto) o lg (12px).                            |
| `value`     | `number`                                          |      |             | Valor actual (0 a max). Sin valor = indeterminado (animación continua). |
| `valueText` | `string`                                          |      |             | Texto del valor (por defecto "45 %").                                   |

Tipos: `ProgressBarProps`.

<!-- catalogo:fin -->
