# @rubenpazch/data-table

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Tabla de datos accesible: columnas con render, orden (aria-sort) en el navegador o en el servidor, carga con Skeleton, estado vacío, filas clicables, encabezado fijo y scroll horizontal en móvil.

- **Usar cuando:** Listados de registros comparables: obligaciones, cobros, convocatorias, usuarios. Combínala con Pagination y filtros.
- **Evitar cuando:** Pocos datos de un solo registro: usa InfoRow o Card. Listas reordenables: usa DraggableList.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/data-table
```

## DataTable

Tabla de datos accesible: orden por columnas (aria-sort), carga, estado vacío, filas
clicables y scroll horizontal en móvil. Pagina con Pagination debajo.

| Prop               | Tipo                                | Req. | Por defecto        | Descripción                                                                |
| ------------------ | ----------------------------------- | ---- | ------------------ | -------------------------------------------------------------------------- |
| `caption`          | `string`                            | sí   |                    | Título accesible de la tabla (se lee al entrar). Visible si `showCaption`. |
| `columns`          | `DataTableColumn<T>[]`              | sí   |                    | Columnas.                                                                  |
| `getRowId`         | `(row: T) => string \| number`      | sí   |                    | id único de cada fila.                                                     |
| `rows`             | `T[]`                               | sí   |                    | Filas.                                                                     |
| `className`        | `string`                            |      |                    | Clase extra del contenedor.                                                |
| `dense`            | `boolean`                           |      | `false`            | Filas más compactas.                                                       |
| `emptyAction`      | `ReactNode`                         |      |                    | Acción del estado vacío (Button "Crear…").                                 |
| `emptyDescription` | `ReactNode`                         |      |                    | Explicación del estado vacío.                                              |
| `emptyTitle`       | `ReactNode`                         |      | `No hay registros` | Texto del estado vacío.                                                    |
| `loading`          | `boolean`                           |      | `false`            | Muestra filas de carga.                                                    |
| `loadingRows`      | `number`                            |      | `5`                | Filas de carga a mostrar (por defecto 5).                                  |
| `onRowClick`       | `(row: T) => void`                  |      |                    | Al hacer clic (o Enter) en una fila.                                       |
| `onSortChange`     | `(sort: SortState \| null) => void` |      |                    | Al cambiar el orden (para ordenar en el servidor).                         |
| `showCaption`      | `boolean`                           |      | `false`            | Muestra el caption encima de la tabla.                                     |
| `sort`             | `null \| SortState`                 |      |                    | Orden controlado. Sin él, la tabla ordena sola en el navegador.            |
| `stickyHeader`     | `boolean`                           |      | `false`            | Encabezado fijo al hacer scroll vertical.                                  |

Tipos: `DataTableProps`, `DataTableColumn`, `SortState`, `SortDirection`.

<!-- catalogo:fin -->
