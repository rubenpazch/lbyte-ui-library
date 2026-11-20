# @rubenpazch/month-navigator

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Navegador de periodos ‹ noviembre de 2026 › con valor "AAAA-MM", mínimo, máximo y botón Hoy; incluye addMonths() y currentMonth().

- **Usar cuando:** Elegir el mes de trabajo: obligaciones, cierres contables, cronogramas, reportes mensuales.
- **Evitar cuando:** Elegir un día: usa DateInput o DatePicker. Un rango libre de fechas: usa DateRangePicker.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/month-navigator
```

## MonthNavigator

Navegador de periodos: ‹ noviembre de 2026 › para finanzas, contabilidad y cronogramas.

| Prop        | Tipo                                                          | Req. | Por defecto | Descripción                                         |
| ----------- | ------------------------------------------------------------- | ---- | ----------- | --------------------------------------------------- |
| `onChange`  | `(value: string) => void`                                     | sí   |             | Recibe el nuevo mes "AAAA-MM".                      |
| `value`     | `string`                                                      | sí   |             | Mes actual en formato "AAAA-MM" (p. ej. "2026-11"). |
| `className` | `string`                                                      |      |             | Clase extra.                                        |
| `labels`    | `Partial<{ previous: string; next: string; today: string; }>` |      |             | Textos accesibles.                                  |
| `locale`    | `string`                                                      |      | `es`        | Idioma del nombre del mes (por defecto "es").       |
| `max`       | `string`                                                      |      |             | Último mes permitido "AAAA-MM".                     |
| `min`       | `string`                                                      |      |             | Primer mes permitido "AAAA-MM".                     |
| `showToday` | `boolean`                                                     |      | `false`     | Muestra el botón "Hoy" para volver al mes actual.   |

Otras exportaciones: `addMonths`, `currentMonth`.

Tipos: `MonthNavigatorProps`.

<!-- catalogo:fin -->
