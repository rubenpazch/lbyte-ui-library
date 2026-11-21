# LoadingSpinner

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Indicador de carga circular con tamaños y colores.

- **Usar cuando:** Esperas cortas dentro de un botón, tarjeta o sección.
- **Evitar cuando:** Bloquear toda la pantalla: usa OverlayLoader.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/loading-spinner
```

## LoadingSpinner

LoadingSpinner component
Displays a loading indicator with multiple style variants

| Prop        | Tipo                                       | Req. | Por defecto | Descripción                                                                                                                                                              |
| ----------- | ------------------------------------------ | ---- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `className` | `string`                                   |      | ``          |                                                                                                                                                                          |
| `color`     | `"primary" \| "gray" \| "white" \| "blue"` |      | `primary`   | primary (por defecto): color de la marca (--lb-color-primary). gray: neutro. white: sobre fondos de color. "blue" es el nombre antiguo de "primary" (sigue funcionando). |
| `inline`    | `boolean`                                  |      | `false`     |                                                                                                                                                                          |
| `message`   | `string`                                   |      |             |                                                                                                                                                                          |
| `size`      | `"sm" \| "md" \| "lg"`                     |      | `md`        |                                                                                                                                                                          |
| `variant`   | `"spinner" \| "dots" \| "pulse" \| "ring"` |      | `spinner`   |                                                                                                                                                                          |

<!-- catalogo:fin -->
