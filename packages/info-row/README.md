# InfoRow

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Fila de dato con icono, etiqueta y valor (variantes de color, tamaños, acción opcional).

- **Usar cuando:** Vistas de detalle de un registro (contacto, dirección, datos del documento).
- **Evitar cuando:** Tablas con muchas filas comparables.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/info-row
```

## InfoRow

InfoRow component
Displays a row of information with an icon, label, and value
Used in detail views to present structured data

| Prop        | Tipo                                                                                    | Req. | Por defecto | Descripción |
| ----------- | --------------------------------------------------------------------------------------- | ---- | ----------- | ----------- |
| `icon`      | `ReactNode`                                                                             | sí   |             |             |
| `label`     | `string`                                                                                | sí   |             |             |
| `value`     | `string`                                                                                | sí   |             |             |
| `action`    | `ReactNode`                                                                             |      |             |             |
| `className` | `string`                                                                                |      | ``          |             |
| `hideIcon`  | `boolean`                                                                               |      | `false`     |             |
| `hideLabel` | `boolean`                                                                               |      | `false`     |             |
| `layout`    | `"vertical" \| "horizontal" \| "inline" \| "compact"`                                   |      | `vertical`  |             |
| `size`      | `"xs" \| "sm" \| "md" \| "lg"`                                                          |      | `md`        |             |
| `variant`   | `"default" \| "blue" \| "yellow" \| "purple" \| "green" \| "red" \| "indigo" \| "gray"` |      | `default`   |             |

<!-- catalogo:fin -->
