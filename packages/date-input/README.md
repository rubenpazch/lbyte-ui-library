# DateInput

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Campo de fecha con formato local, mínimo/máximo, ayuda y error.

- **Usar cuando:** Ingresar una fecha escribiéndola (fecha de nacimiento, fecha de documento).
- **Evitar cuando:** Elegir en un calendario visual: usa DatePicker.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/date-input
```

## DateInput

| Prop          | Tipo                     | Req. | Por defecto  | Descripción |
| ------------- | ------------------------ | ---- | ------------ | ----------- |
| `onChange`    | `(date: string) => void` | sí   |              |             |
| `value`       | `string`                 | sí   |              |             |
| `className`   | `string`                 |      | ``           |             |
| `disabled`    | `boolean`                |      | `false`      |             |
| `error`       | `string`                 |      |              |             |
| `hint`        | `string`                 |      |              |             |
| `label`       | `string`                 |      |              |             |
| `locale`      | `string`                 |      | `en`         |             |
| `maxDate`     | `string`                 |      |              |             |
| `minDate`     | `string`                 |      |              |             |
| `placeholder` | `string`                 |      | `MM/DD/YYYY` |             |
| `required`    | `boolean`                |      | `false`      |             |

<!-- catalogo:fin -->
