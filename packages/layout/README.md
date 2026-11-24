# @rubenpazch/layout

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Maquetación solo con props (sin escribir CSS): Flex (fila o columna con gap, align y justify), Stack (vertical), Inline (horizontal que se ajusta), Center (centrar en uno o ambos ejes), Grid/GridItem (columnas fijas o automáticas), Container (ancho máximo de página) y Spacer. Todas las props aceptan valores por punto de quiebre: { base, sm, md, lg, xl }.

- **Usar cuando:** Ubicar y alinear bloques de una pantalla: apilar secciones (Stack), barras de botones o filtros (Inline + Spacer), centrar un login (Center minHeight="screen"), tableros y listas de tarjetas (Grid), el ancho de la página (Container).
- **Evitar cuando:** Para filas de campos de formulario usa FormRow y para el pie de botones FormActions; para la estructura con menú lateral y encabezado usa AppShell.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/layout
```

## Flex

Contenedor flexible: alinea y distribuye a sus hijos en fila o en columna solo con props
(sin escribir CSS). Base de Stack (vertical) e Inline (horizontal).

| Prop        | Tipo                                                                                                               | Req. | Por defecto | Descripción                                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------ | ---- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `align`     | `"center" \| "start" \| "end" \| "stretch" \| "baseline" \| Partial<Record<LayoutBreakpoint, Align>>`              |      |             | Alineación en el eje cruzado: en una fila es la vertical, en una columna la horizontal.                                                 |
| `as`        | `keyof IntrinsicElements`                                                                                          |      | `div`       | Etiqueta HTML que se renderiza: `div` (por defecto), `section`, `ul`, `nav`, `header`…                                                  |
| `direction` | `"row" \| "column" \| "row-reverse" \| "column-reverse" \| Partial<Record<LayoutBreakpoint, Direction>>`           |      |             | Dirección de los hijos: `row` (horizontal) o `column` (vertical). Acepta valores por punto de quiebre: `{ base: "column", md: "row" }`. |
| `gap`       | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio entre hijos (escala `--lb-space-*`: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16).                                                        |
| `grow`      | `boolean`                                                                                                          |      | `false`     | Ocupa el espacio libre cuando está dentro de otro Flex/Stack/Inline.                                                                    |
| `hide`      | `boolean \| Partial<Record<LayoutBreakpoint, boolean>>`                                                            |      |             | Oculta el contenedor (útil por punto de quiebre: `hide={{ base: true, md: false }}`).                                                   |
| `inline`    | `boolean`                                                                                                          |      | `false`     | Se comporta como elemento en línea (`inline-flex`).                                                                                     |
| `justify`   | `"center" \| "start" \| "end" \| "between" \| "around" \| "evenly" \| Partial<Record<LayoutBreakpoint, Justify>>`  |      |             | Distribución en el eje principal: `start`, `center`, `end`, `between`, `around`, `evenly`.                                              |
| `padding`   | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio interno en los cuatro lados (escala `--lb-space-*`).                                                                            |
| `paddingX`  | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio interno a izquierda y derecha.                                                                                                  |
| `paddingY`  | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio interno arriba y abajo.                                                                                                         |
| `ref`       | `null \| (instance: HTMLElement \| null) => void \| (() => VoidOrUndefinedOnly) \| RefObject<HTMLElement \| null>` |      |             | Referencia al elemento del DOM.                                                                                                         |
| `wrap`      | `boolean \| "wrap" \| "nowrap" \| "wrap-reverse" \| Partial<Record<LayoutBreakpoint, Wrap>>`                       |      |             | Permite que los hijos pasen a la siguiente línea. `true` = `wrap`.                                                                      |

## Stack

Apila a los hijos en vertical con un espacio uniforme (columna). Por defecto `gap={4}`.
`align="center"` los centra horizontalmente.

| Prop       | Tipo                                                                                                               | Req. | Por defecto | Descripción                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | ---- | ----------- | ------------------------------------------------------------------------------------------ |
| `align`    | `"center" \| "start" \| "end" \| "stretch" \| "baseline" \| Partial<Record<LayoutBreakpoint, Align>>`              |      |             | Alineación en el eje cruzado: en una fila es la vertical, en una columna la horizontal.    |
| `as`       | `keyof IntrinsicElements`                                                                                          |      |             | Etiqueta HTML que se renderiza: `div` (por defecto), `section`, `ul`, `nav`, `header`…     |
| `gap`      | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      | `4`         | Espacio entre hijos (escala `--lb-space-*`: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16).           |
| `grow`     | `boolean`                                                                                                          |      |             | Ocupa el espacio libre cuando está dentro de otro Flex/Stack/Inline.                       |
| `hide`     | `boolean \| Partial<Record<LayoutBreakpoint, boolean>>`                                                            |      |             | Oculta el contenedor (útil por punto de quiebre: `hide={{ base: true, md: false }}`).      |
| `inline`   | `boolean`                                                                                                          |      |             | Se comporta como elemento en línea (`inline-flex`).                                        |
| `justify`  | `"center" \| "start" \| "end" \| "between" \| "around" \| "evenly" \| Partial<Record<LayoutBreakpoint, Justify>>`  |      |             | Distribución en el eje principal: `start`, `center`, `end`, `between`, `around`, `evenly`. |
| `padding`  | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio interno en los cuatro lados (escala `--lb-space-*`).                               |
| `paddingX` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio interno a izquierda y derecha.                                                     |
| `paddingY` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio interno arriba y abajo.                                                            |
| `ref`      | `null \| (instance: HTMLElement \| null) => void \| (() => VoidOrUndefinedOnly) \| RefObject<HTMLElement \| null>` |      |             | Referencia al elemento del DOM.                                                            |
| `wrap`     | `boolean \| "wrap" \| "nowrap" \| "wrap-reverse" \| Partial<Record<LayoutBreakpoint, Wrap>>`                       |      |             | Permite que los hijos pasen a la siguiente línea. `true` = `wrap`.                         |

## Inline

Pone a los hijos en fila (botones, chips, etiquetas) y los pasa a la siguiente línea si no
caben. Por defecto `gap={2}`, `align="center"` y `wrap`.

| Prop       | Tipo                                                                                                               | Req. | Por defecto | Descripción                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | ---- | ----------- | ------------------------------------------------------------------------------------------ |
| `align`    | `"center" \| "start" \| "end" \| "stretch" \| "baseline" \| Partial<Record<LayoutBreakpoint, Align>>`              |      | `center`    | Alineación en el eje cruzado: en una fila es la vertical, en una columna la horizontal.    |
| `as`       | `keyof IntrinsicElements`                                                                                          |      |             | Etiqueta HTML que se renderiza: `div` (por defecto), `section`, `ul`, `nav`, `header`…     |
| `gap`      | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      | `2`         | Espacio entre hijos (escala `--lb-space-*`: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16).           |
| `grow`     | `boolean`                                                                                                          |      |             | Ocupa el espacio libre cuando está dentro de otro Flex/Stack/Inline.                       |
| `hide`     | `boolean \| Partial<Record<LayoutBreakpoint, boolean>>`                                                            |      |             | Oculta el contenedor (útil por punto de quiebre: `hide={{ base: true, md: false }}`).      |
| `inline`   | `boolean`                                                                                                          |      |             | Se comporta como elemento en línea (`inline-flex`).                                        |
| `justify`  | `"center" \| "start" \| "end" \| "between" \| "around" \| "evenly" \| Partial<Record<LayoutBreakpoint, Justify>>`  |      |             | Distribución en el eje principal: `start`, `center`, `end`, `between`, `around`, `evenly`. |
| `padding`  | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio interno en los cuatro lados (escala `--lb-space-*`).                               |
| `paddingX` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio interno a izquierda y derecha.                                                     |
| `paddingY` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio interno arriba y abajo.                                                            |
| `ref`      | `null \| (instance: HTMLElement \| null) => void \| (() => VoidOrUndefinedOnly) \| RefObject<HTMLElement \| null>` |      |             | Referencia al elemento del DOM.                                                            |
| `reverse`  | `boolean`                                                                                                          |      | `false`     | Invierte el orden visual (`row-reverse`).                                                  |
| `wrap`     | `boolean \| "wrap" \| "nowrap" \| "wrap-reverse" \| Partial<Record<LayoutBreakpoint, Wrap>>`                       |      | `true`      | Permite que los hijos pasen a la siguiente línea. `true` = `wrap`.                         |

## Spacer

Espacio elástico dentro de un Flex/Inline: empuja a los hijos siguientes al otro extremo
(p. ej. logo a la izquierda y botones a la derecha).

| Prop        | Tipo     | Req. | Por defecto | Descripción  |
| ----------- | -------- | ---- | ----------- | ------------ |
| `className` | `string` |      |             | Clase extra. |

## Grid

Grilla de columnas: fija (`columns`) o automática (`minItemWidth`). Para tableros, listas de
tarjetas y formularios de varias columnas.

| Prop           | Tipo                                                                                                                        | Req. | Por defecto | Descripción                                                                                                                                 |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- | ---- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `align`        | `"center" \| "start" \| "end" \| "stretch" \| "baseline" \| Partial<Record<LayoutBreakpoint, Align>>`                       |      |             | Alineación vertical del contenido de cada celda.                                                                                            |
| `as`           | `keyof IntrinsicElements`                                                                                                   |      | `div`       | Etiqueta HTML que se renderiza (`div` por defecto; `ul` para listas de tarjetas).                                                           |
| `autoMode`     | `"fill" \| "fit"`                                                                                                           |      | `fill`      | Con `minItemWidth`: `fill` deja huecos vacíos al final; `fit` estira las celdas para llenar la fila.                                        |
| `columns`      | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 7 \| 9 \| 11 \| Partial<Record<LayoutBreakpoint, GridColumns>>`             |      |             | Número de columnas iguales (1 a 12). Por punto de quiebre: `{ base: 1, md: 2, lg: 4 }`.                                                     |
| `gap`          | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`                        |      | `4`         | Espacio entre celdas. Por defecto 4.                                                                                                        |
| `hide`         | `boolean \| Partial<Record<LayoutBreakpoint, boolean>>`                                                                     |      |             | Oculta la grilla (útil por punto de quiebre).                                                                                               |
| `justifyItems` | `"center" \| "start" \| "end" \| "stretch" \| Partial<Record<LayoutBreakpoint, "center" \| "start" \| "end" \| "stretch">>` |      |             | Alineación horizontal del contenido de cada celda.                                                                                          |
| `minItemWidth` | `string`                                                                                                                    |      |             | Ancho mínimo de cada celda (`"16rem"`, `"240px"`): crea tantas columnas como quepan, sin puntos de quiebre. Si se usa, `columns` se ignora. |
| `padding`      | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`                        |      |             | Espacio interno en los cuatro lados (escala `--lb-space-*`).                                                                                |
| `paddingX`     | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`                        |      |             | Espacio interno a izquierda y derecha.                                                                                                      |
| `paddingY`     | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`                        |      |             | Espacio interno arriba y abajo.                                                                                                             |
| `ref`          | `null \| (instance: HTMLElement \| null) => void \| (() => VoidOrUndefinedOnly) \| RefObject<HTMLElement \| null>`          |      |             | Referencia al elemento del DOM.                                                                                                             |

## GridItem

Celda de un Grid que ocupa varias columnas.

| Prop   | Tipo                                                                                                                                | Req. | Por defecto | Descripción                                                                                           |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------- | ---- | ----------- | ----------------------------------------------------------------------------------------------------- |
| `as`   | `keyof IntrinsicElements`                                                                                                           |      | `div`       | Etiqueta HTML que se renderiza (`div` por defecto; `li` dentro de un Grid `ul`).                      |
| `hide` | `boolean \| Partial<Record<LayoutBreakpoint, boolean>>`                                                                             |      |             | Oculta la celda (útil por punto de quiebre).                                                          |
| `ref`  | `null \| (instance: HTMLElement \| null) => void \| (() => VoidOrUndefinedOnly) \| RefObject<HTMLElement \| null>`                  |      |             | Referencia al elemento del DOM.                                                                       |
| `span` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 7 \| 9 \| 11 \| "full" \| Partial<Record<LayoutBreakpoint, GridColumns \| "full">>` |      |             | Columnas que ocupa (1 a 12) o `full` (toda la fila). Por punto de quiebre: `{ base: "full", md: 2 }`. |

## Center

Centra a sus hijos en horizontal, en vertical o en ambos ejes (p. ej. una tarjeta de login en
medio de la pantalla). Los hijos se apilan en columna.

| Prop         | Tipo                                                                                                               | Req. | Por defecto | Descripción                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------ | ---- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`         | `keyof IntrinsicElements`                                                                                          |      | `div`       | Etiqueta HTML que se renderiza (`div` por defecto; `main` para una pantalla completa).                                                       |
| `axis`       | `"both" \| "horizontal" \| "vertical"`                                                                             |      | `both`      | En qué eje centra: `both` (por defecto), `horizontal` o `vertical`.                                                                          |
| `centerText` | `boolean`                                                                                                          |      | `false`     | Centra también el texto.                                                                                                                     |
| `gap`        | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio entre hijos (se apilan en vertical).                                                                                                 |
| `minHeight`  | `string`                                                                                                           |      |             | Alto mínimo, para que el centrado vertical tenga espacio: `screen` (alto de la ventana), `full` (alto del padre) o un valor CSS (`"20rem"`). |
| `padding`    | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio interno en los cuatro lados (escala `--lb-space-*`).                                                                                 |
| `paddingX`   | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio interno a izquierda y derecha.                                                                                                       |
| `paddingY`   | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`               |      |             | Espacio interno arriba y abajo.                                                                                                              |
| `ref`        | `null \| (instance: HTMLElement \| null) => void \| (() => VoidOrUndefinedOnly) \| RefObject<HTMLElement \| null>` |      |             | Referencia al elemento del DOM.                                                                                                              |

## Container

Contenido de página centrado con ancho máximo y márgenes laterales que se ajustan al tamaño
de la pantalla.

| Prop       | Tipo                                                                                                                                                  | Req. | Por defecto          | Descripción                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------------------- | ---------------------------------------------------------------------------------------- |
| `as`       | `keyof IntrinsicElements`                                                                                                                             |      | `div`                | Etiqueta HTML que se renderiza (`div` por defecto; `main`, `section`…).                  |
| `hide`     | `boolean \| Partial<Record<LayoutBreakpoint, boolean>>`                                                                                               |      |                      | Oculta el contenedor (útil por punto de quiebre).                                        |
| `maxWidth` | `string`                                                                                                                                              |      |                      | Ancho máximo libre (`"72rem"`); reemplaza a `size`.                                      |
| `padding`  | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`                                                  |      |                      | Espacio interno en los cuatro lados (escala `--lb-space-*`).                             |
| `paddingX` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16>>` |      | `{ base: 4, md: 6 }` | Espacio a los lados. Por defecto `{ base: 4, md: 6 }`.                                   |
| `paddingY` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| Partial<Record<LayoutBreakpoint, Space>>`                                                  |      |                      | Espacio interno arriba y abajo.                                                          |
| `ref`      | `null \| (instance: HTMLElement \| null) => void \| (() => VoidOrUndefinedOnly) \| RefObject<HTMLElement \| null>`                                    |      |                      | Referencia al elemento del DOM.                                                          |
| `size`     | `"sm" \| "md" \| "lg" \| "xl" \| "full" \| "2xl"`                                                                                                     |      | `lg`                 | Ancho máximo: sm 640px, md 768px, lg 1024px (por defecto), xl 1280px, 2xl 1536px o full. |

Tipos: `FlexProps`, `StackProps`, `InlineProps`, `SpacerProps`, `GridProps`, `GridItemProps`, `GridColumns`, `CenterProps`, `ContainerProps`, `ContainerSize`, `Responsive`, `LayoutBreakpoint`, `Space`, `Align`, `Justify`, `Direction`, `LayoutElement`, `PaddingProps`.

<!-- catalogo:fin -->
