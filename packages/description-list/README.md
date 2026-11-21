# @rubenpazch/description-list

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Pares etiqueta/valor en columnas: resumen de un registro (datos de un trámite, de un cliente, de un pago).

- **Usar cuando:** Mostrar varios datos de solo lectura de un registro, con etiquetas.
- **Evitar cuando:** Datos tabulares de muchos registros: usa DataTable. Una sola fila con icono: usa InfoRow.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/description-list
```

## DescriptionList

Pares etiqueta/valor de solo lectura (`<dl>`): resumen de un registro.

| Prop         | Tipo                | Req. | Por defecto  | Descripción                                                       |
| ------------ | ------------------- | ---- | ------------ | ----------------------------------------------------------------- |
| `items`      | `DescriptionItem[]` | sí   |              |                                                                   |
| `className`  | `string`            |      |              |                                                                   |
| `columns`    | `1 \| 2 \| 3`       |      | `2`          | Columnas en pantallas anchas (en móvil siempre 1). Por defecto 2. |
| `emptyText`  | `ReactNode`         |      | `Sin datos.` | Texto si no hay ningún dato.                                      |
| `emptyValue` | `ReactNode`         |      | `—`          | Qué mostrar si un valor está vacío.                               |
| `footnote`   | `ReactNode`         |      |              | Nota al pie (fuente de los datos, aclaraciones).                  |
| `title`      | `ReactNode`         |      |              | Título opcional sobre la lista.                                   |

Tipos: `DescriptionItem`, `DescriptionListProps`.

<!-- catalogo:fin -->
