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

Campo de fecha con calendario desplegable. Se escribe en el formato del idioma
(DD/MM/AAAA en español) y devuelve siempre ISO `AAAA-MM-DD`, en hora local.

| Prop               | Tipo                       | Req. | Por defecto | Descripción                                                                                                                        |
| ------------------ | -------------------------- | ---- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `onChange`         | `(date: string) => void`   | sí   |             | Recibe la fecha en ISO `AAAA-MM-DD` (o "" al limpiar).                                                                             |
| `value`            | `string`                   | sí   |             | Fecha en formato ISO `AAAA-MM-DD`, o cadena vacía.                                                                                 |
| `className`        | `string`                   |      | ``          | Clase extra para el contenedor.                                                                                                    |
| `disabled`         | `boolean`                  |      | `false`     | Campo deshabilitado.                                                                                                               |
| `error`            | `string`                   |      |             | Mensaje de error; marca el campo como inválido.                                                                                    |
| `hint`             | `string`                   |      |             | Texto de ayuda.                                                                                                                    |
| `id`               | `string`                   |      |             | id del input; si no se pasa se genera uno (la etiqueta se asocia sola).                                                            |
| `label`            | `string`                   |      |             | Etiqueta visible.                                                                                                                  |
| `labels`           | `Partial<DateInputLabels>` |      |             | Textos del calendario; por defecto en el idioma de `locale`.                                                                       |
| `locale`           | `string`                   |      | `es`        | Idioma: `es` (por defecto, día/mes) o `en` (mes/día).                                                                              |
| `maxDate`          | `string`                   |      |             | Fecha máxima seleccionable (ISO).                                                                                                  |
| `minDate`          | `string`                   |      |             | Fecha mínima seleccionable (ISO).                                                                                                  |
| `mobileFullScreen` | `boolean`                  |      | `true`      | En pantallas pequeñas (< 640 px) el calendario se abre a pantalla completa y vuelve al campo al elegir la fecha. Por defecto true. |
| `name`             | `string`                   |      |             | name del input (formularios nativos, react-hook-form…).                                                                            |
| `placeholder`      | `string`                   |      |             | Por defecto el formato del idioma: "DD/MM/AAAA" en español.                                                                        |
| `required`         | `boolean`                  |      | `false`     | Campo obligatorio.                                                                                                                 |

Tipos: `DateInputLabels`, `DateInputProps`.

<!-- catalogo:fin -->
