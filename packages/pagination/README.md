# Pagination

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Paginación con variantes, tamaños y formas; incluye PaginationItem.

- **Usar cuando:** Listados paginados en el servidor (tablas, resultados de búsqueda).
- **Evitar cuando:** Pocas páginas que caben en una sola vista.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/pagination
```

## Pagination

| Prop              | Tipo                                                           | Req. | Por defecto  | Descripción                                                                         |
| ----------------- | -------------------------------------------------------------- | ---- | ------------ | ----------------------------------------------------------------------------------- |
| `aria-label`      | `string`                                                       |      | `Paginación` | Nombre accesible de la navegación (por defecto "Paginación").                       |
| `boundaryCount`   | `number`                                                       |      | `1`          | Number of always visible pages at the beginning and end                             |
| `count`           | `number`                                                       |      | `1`          | Total number of pages                                                               |
| `defaultPage`     | `number`                                                       |      | `1`          | Default page if uncontrolled                                                        |
| `disabled`        | `boolean`                                                      |      | `false`      | If true, the component is disabled                                                  |
| `hideNextButton`  | `boolean`                                                      |      | `false`      | If true, hide the next-page button                                                  |
| `hidePrevButton`  | `boolean`                                                      |      | `false`      | If true, hide the previous-page button                                              |
| `onChange`        | `(event: ChangeEvent<unknown, Element>, page: number) => void` |      |              | Al cambiar de página, estilo MUI: (evento, página). Se mantiene por compatibilidad. |
| `onPageChange`    | `(page: number) => void`                                       |      |              | Al cambiar de página (recibe solo el número). Preferido sobre onChange.             |
| `page`            | `number`                                                       |      |              | The current page (1-based)                                                          |
| `renderItem`      | `(item: PaginationItemType) => ReactNode`                      |      |              | Custom render function for items                                                    |
| `shape`           | `"rounded" \| "circular"`                                      |      | `rounded`    | The shape of the pagination items                                                   |
| `showFirstButton` | `boolean`                                                      |      | `false`      | If true, show the first-page button                                                 |
| `showLastButton`  | `boolean`                                                      |      | `false`      | If true, show the last-page button                                                  |
| `siblingCount`    | `number`                                                       |      | `1`          | Number of always visible pages before and after the current page                    |
| `size`            | `"small" \| "medium" \| "large" \| "sm" \| "md" \| "lg"`       |      | `medium`     | The size of the pagination component                                                |
| `variant`         | `"text" \| "outlined"`                                         |      | `text`       | The variant to use                                                                  |

## PaginationItem

| Prop       | Tipo                                                                                        | Req. | Por defecto | Descripción                          |
| ---------- | ------------------------------------------------------------------------------------------- | ---- | ----------- | ------------------------------------ |
| `page`     | `number`                                                                                    | sí   |             | The page number                      |
| `type`     | `"page" \| "next" \| "previous" \| "first" \| "last" \| "start-ellipsis" \| "end-ellipsis"` | sí   |             | The type of pagination item          |
| `selected` | `boolean`                                                                                   |      | `false`     | If true, the item is selected/active |
| `shape`    | `"rounded" \| "circular"`                                                                   |      | `rounded`   | The shape of the pagination items    |
| `size`     | `"small" \| "medium" \| "large" \| "sm" \| "md" \| "lg"`                                    |      | `medium`    | The size of the component            |
| `variant`  | `"text" \| "outlined"`                                                                      |      | `text`      | The variant to use                   |

Tipos: `PaginationProps`, `PaginationShape`, `PaginationSize`, `PaginationVariant`, `PaginationItemType`, `PaginationItemProps`.

<!-- catalogo:fin -->
