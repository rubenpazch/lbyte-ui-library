# @rubenpazch/list

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Lista vertical de filas (icono, título, detalle y estado a la derecha), clicables o enlaces.

- **Usar cuando:** Listados cortos o en el celular: partidos, socios, registros de un catálogo, resultados de una búsqueda.
- **Evitar cuando:** Datos con varias columnas para comparar u ordenar: usa DataTable. Pares etiqueta/valor de un registro: usa DescriptionList.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/list
```

## List

Lista vertical de filas con separadores (`<ul>`): partidos, socios, registros de un catálogo.
Cada fila es un `ListItem`.

| Prop         | Tipo                    | Req. | Por defecto | Descripción                                                                            |
| ------------ | ----------------------- | ---- | ----------- | -------------------------------------------------------------------------------------- |
| `children`   | `ReactNode`             | sí   |             | Filas: componentes `ListItem`.                                                         |
| `aria-label` | `string`                |      |             | Nombre accesible de la lista ("Próximos partidos").                                    |
| `className`  | `string`                |      |             | Clase extra para márgenes o posición.                                                  |
| `variant`    | `"outlined" \| "plain"` |      | `outlined`  | outlined (tarjeta con borde, por defecto) o plain (sin borde, dentro de otra tarjeta). |

## ListItem

Fila de una `List`: icono, título y detalle a la izquierda; estado o acciones a la derecha.

| Prop            | Tipo                                        | Req. | Por defecto | Descripción                                                                                                                   |
| --------------- | ------------------------------------------- | ---- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `title`         | `ReactNode`                                 | sí   |             | Texto principal de la fila.                                                                                                   |
| `aria-label`    | `string`                                    |      |             | Nombre accesible si el título no basta.                                                                                       |
| `children`      | `ReactNode`                                 |      |             | Contenido extra bajo el detalle (chips, barra de avance).                                                                     |
| `className`     | `string`                                    |      |             | Clase extra.                                                                                                                  |
| `description`   | `ReactNode`                                 |      |             | Detalle bajo el título (fecha, correo, resumen).                                                                              |
| `href`          | `string`                                    |      |             | Hace la fila un enlace.                                                                                                       |
| `leading`       | `ReactNode`                                 |      |             | Icono, avatar o imagen a la izquierda.                                                                                        |
| `linkComponent` | `ElementType<any, keyof IntrinsicElements>` |      | `a`         | Componente de enlace (p. ej. Link de Next.js). Por defecto <a>.                                                               |
| `muted`         | `boolean`                                   |      | `false`     | Atenúa la fila (registro inactivo u oculto).                                                                                  |
| `onClick`       | `() => void`                                |      |             | Hace la fila clicable (botón). Si la fila lleva botones propios, no la hagas clicable: pon un `<li>` propio dentro de `List`. |
| `trailing`      | `ReactNode`                                 |      |             | Contenido a la derecha: estado (Badge), monto, acciones.                                                                      |

Tipos: `ListProps`, `ListItemProps`.

<!-- catalogo:fin -->
