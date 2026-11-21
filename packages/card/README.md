# @rubenpazch/card

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Tarjeta (outlined o elevated) con CardHeader (título, subtítulo, acciones), CardBody y CardFooter; puede ser clicable.

- **Usar cuando:** Agrupar la información de un registro o una sección del panel: resúmenes, KPIs, fichas.
- **Evitar cuando:** Listas largas de registros comparables: usa DataTable.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/card
```

## Card

Contenedor con borde o sombra para agrupar información. Usa CardHeader, CardBody y CardFooter.

| Prop      | Tipo                                      | Req. | Por defecto | Descripción                                                                             |
| --------- | ----------------------------------------- | ---- | ----------- | --------------------------------------------------------------------------------------- |
| `as`      | `"div" \| "section" \| "article" \| "li"` |      | `div`       | Etiqueta HTML: div (por defecto), section, article o li.                                |
| `onClick` | `MouseEventHandler<HTMLElement>`          |      |             | Si se pasa, la tarjeta es clicable (sombra al pasar y foco con teclado).                |
| `padding` | `"none" \| "sm" \| "md" \| "lg"`          |      | `none`      | Relleno interno cuando no se usan CardHeader/CardBody: none, sm, md (por defecto) o lg. |
| `variant` | `"outlined" \| "elevated"`                |      | `outlined`  | outlined (borde, por defecto) o elevated (sombra).                                      |

## CardHeader

Cabecera de Card con título, subtítulo y acciones.

| Prop       | Tipo        | Req. | Por defecto | Descripción                            |
| ---------- | ----------- | ---- | ----------- | -------------------------------------- |
| `actions`  | `ReactNode` |      |             | Acciones a la derecha (botones, menú). |
| `subtitle` | `ReactNode` |      |             | Texto secundario bajo el título.       |
| `title`    | `ReactNode` |      |             | Título de la tarjeta.                  |

## CardBody

Cuerpo de Card.

_Sin props documentadas._

## CardFooter

Pie de Card (botones o totales).

_Sin props documentadas._

Tipos: `CardProps`, `CardHeaderProps`.

<!-- catalogo:fin -->
