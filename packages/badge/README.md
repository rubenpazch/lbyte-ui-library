# @rubenpazch/badge

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Insignia de estado o categoría (Pagado, Vencido, Borrador) con colores semánticos, variantes soft/solid/outline y punto.

- **Usar cuando:** Mostrar el estado de un registro en tablas, tarjetas o detalles; contadores pequeños.
- **Evitar cuando:** Algo que se puede quitar o filtrar: usa Chip.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/badge
```

## Badge

Insignia de estado o categoría: "Pagado", "Vencido", "Borrador", "3 nuevos".

| Prop         | Tipo                                                                                                       | Req. | Por defecto | Descripción                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------------- | ---- | ----------- | ------------------------------------------------------------------------------------- |
| `children`   | `ReactNode`                                                                                                | sí   |             | Texto del badge.                                                                      |
| `aria-label` | `string`                                                                                                   |      |             | Texto para lectores de pantalla si el visible no basta (p. ej. "Estado: vencido").    |
| `className`  | `string`                                                                                                   |      |             | Clase extra.                                                                          |
| `color`      | `"neutral" \| "primary" \| "success" \| "warning" \| "danger" \| "info" \| "violet" \| "orange" \| "pink"` |      | `neutral`   | Color según el significado: success (pagado), warning (por vencer), danger (vencido)… |
| `dot`        | `boolean`                                                                                                  |      | `false`     | Muestra un punto de color antes del texto.                                            |
| `size`       | `"sm" \| "md"`                                                                                             |      | `sm`        | sm (por defecto) o md.                                                                |
| `variant`    | `"soft" \| "solid" \| "outline"`                                                                           |      | `soft`      | soft (fondo suave, por defecto), solid o outline.                                     |

Tipos: `BadgeProps`, `BadgeColor`, `BadgeVariant`.

<!-- catalogo:fin -->
