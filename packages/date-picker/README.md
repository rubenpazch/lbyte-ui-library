# DatePicker

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Selector de fecha con calendario desplegable.

- **Usar cuando:** Elegir una fecha cercana o explorando el calendario (citas, vencimientos).
- **Evitar cuando:** Fechas lejanas que el usuario conoce de memoria: usa DateInput.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/date-picker
```

## DatePicker

Selector de fecha con calendario (días, meses y años). Devuelve ISO `AAAA-MM-DD` en hora local.

| Prop                | Tipo                     | Req. | Por defecto | Descripción                                                             |
| ------------------- | ------------------------ | ---- | ----------- | ----------------------------------------------------------------------- |
| `onChange`          | `(date: string) => void` | sí   |             |                                                                         |
| `value`             | `string`                 | sí   |             |                                                                         |
| `className`         | `string`                 |      | ``          |                                                                         |
| `disabled`          | `boolean`                |      | `false`     |                                                                         |
| `error`             | `string`                 |      |             |                                                                         |
| `hint`              | `string`                 |      |             |                                                                         |
| `id`                | `string`                 |      |             | id del input; si no se pasa se genera uno (la etiqueta se asocia sola). |
| `label`             | `string`                 |      |             |                                                                         |
| `locale`            | `string`                 |      | `es`        |                                                                         |
| `maxDate`           | `string`                 |      |             |                                                                         |
| `minDate`           | `string`                 |      |             |                                                                         |
| `name`              | `string`                 |      |             | name del input.                                                         |
| `openCalendarLabel` | `string`                 |      |             | Texto del botón que abre el calendario (accesibilidad).                 |
| `placeholder`       | `string`                 |      |             |                                                                         |
| `readOnly`          | `boolean`                |      | `false`     |                                                                         |
| `required`          | `boolean`                |      | `false`     |                                                                         |

<!-- catalogo:fin -->
