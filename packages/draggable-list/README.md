# DraggableList

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Lista reordenable arrastrando (también con teclado), basada en dnd-kit.

- **Usar cuando:** Que el usuario defina el orden de elementos (prioridades, orden de servicios o menús).
- **Evitar cuando:** Listas de solo lectura: usa una lista normal.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/draggable-list
```

## DraggableList

| Prop            | Tipo                                 | Req. | Por defecto | Descripción |
| --------------- | ------------------------------------ | ---- | ----------- | ----------- |
| `getItemId`     | `(item: T) => string \| number`      | sí   |             |             |
| `items`         | `T[]`                                | sí   |             |             |
| `onReorder`     | `(newItems: T[]) => void`            | sí   |             |             |
| `renderItem`    | `(item: T) => ReactNode`             | sí   |             |             |
| `className`     | `string`                             |      | ``          |             |
| `gap`           | `"sm" \| "md" \| "lg"`               |      | `md`        |             |
| `itemClassName` | `string`                             |      | ``          |             |
| `size`          | `"sm" \| "md" \| "lg"`               |      | `md`        |             |
| `variant`       | `"default" \| "outline" \| "subtle"` |      | `default`   |             |

Tipos: `DraggableListProps`.

<!-- catalogo:fin -->
