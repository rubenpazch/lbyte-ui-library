# Drawer

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Panel lateral (izquierda/derecha/arriba/abajo) con animación y fondo.

- **Usar cuando:** Menús laterales, filtros o formularios de edición que no requieren cambiar de página.
- **Evitar cuando:** Confirmaciones breves: usa ConfirmationDialog.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/drawer
```

## Drawer

| Prop                  | Tipo                                               | Req. | Por defecto     | Descripción                                                                             |
| --------------------- | -------------------------------------------------- | ---- | --------------- | --------------------------------------------------------------------------------------- |
| `children`            | `ReactNode`                                        | sí   |                 | Content to render in the drawer                                                         |
| `isOpen`              | `boolean`                                          | sí   |                 | Whether the drawer is open                                                              |
| `onClose`             | `() => void`                                       | sí   |                 | Function to close the drawer                                                            |
| `className`           | `string`                                           |      | ``              | Custom className for the drawer content                                                 |
| `closeOnEscape`       | `boolean`                                          |      | `true`          | Whether pressing Escape closes the drawer                                               |
| `closeOnOverlayClick` | `boolean`                                          |      | `true`          | Whether clicking overlay closes the drawer                                              |
| `contentContained`    | `boolean`                                          |      | `false`         | Whether the content (header, body, footer) should be contained in a max-width container |
| `footer`              | `ReactNode`                                        |      |                 | Footer content (typically action buttons)                                               |
| `footerAlign`         | `"left" \| "right" \| "center" \| "space-between"` |      | `right`         | Footer alignment                                                                        |
| `headerAlign`         | `"left" \| "right" \| "center" \| "space-between"` |      | `space-between` | Header alignment (how to position title and close button)                               |
| `position`            | `"left" \| "right" \| "top" \| "bottom"`           |      | `right`         | Position from which the drawer slides in                                                |
| `showOverlay`         | `boolean`                                          |      | `true`          | Whether to show overlay backdrop                                                        |
| `size`                | `"sm" \| "md" \| "lg" \| "xl" \| "full"`           |      | `md`            | Size of the drawer                                                                      |
| `title`               | `string`                                           |      |                 | Title displayed in the drawer header                                                    |

<!-- catalogo:fin -->
