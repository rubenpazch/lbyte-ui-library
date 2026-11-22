import React from "react";
import {
  cx,
  paddingClasses,
  rc,
  styles,
  type Align,
  type LayoutElement,
  type PaddingProps,
  type Responsive,
  type Space,
} from "./responsive";

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridProps
  extends PaddingProps, React.HTMLAttributes<HTMLElement> {
  /** Etiqueta HTML que se renderiza (`div` por defecto; `ul` para listas de tarjetas). */
  as?: LayoutElement;
  /** Número de columnas iguales (1 a 12). Por punto de quiebre: `{ base: 1, md: 2, lg: 4 }`. */
  columns?: Responsive<GridColumns>;
  /**
   * Ancho mínimo de cada celda (`"16rem"`, `"240px"`): crea tantas columnas como quepan, sin
   * puntos de quiebre. Si se usa, `columns` se ignora.
   */
  minItemWidth?: string;
  /** Con `minItemWidth`: `fill` deja huecos vacíos al final; `fit` estira las celdas para llenar la fila. */
  autoMode?: "fill" | "fit";
  /** Espacio entre celdas. Por defecto 4. */
  gap?: Responsive<Space>;
  /** Alineación vertical del contenido de cada celda. */
  align?: Responsive<Align>;
  /** Alineación horizontal del contenido de cada celda. */
  justifyItems?: Responsive<"start" | "center" | "end" | "stretch">;
  /** Oculta la grilla (útil por punto de quiebre). */
  hide?: Responsive<boolean>;
  /** Referencia al elemento del DOM. */
  ref?: React.Ref<HTMLElement>;
}

/**
 * Grilla de columnas: fija (`columns`) o automática (`minItemWidth`). Para tableros, listas de
 * tarjetas y formularios de varias columnas.
 */
export function Grid({
  as = "div",
  columns,
  minItemWidth,
  autoMode = "fill",
  gap = 4,
  align,
  justifyItems,
  hide,
  padding,
  paddingX,
  paddingY,
  className,
  style,
  children,
  ...rest
}: GridProps) {
  const Tag = as as React.ElementType;
  const auto = minItemWidth !== undefined;
  return (
    <Tag
      className={cx(
        styles.grid,
        auto ? styles.autoCols : undefined,
        ...(auto ? [] : rc("cols", columns ?? 1)),
        ...rc("gap", gap),
        ...rc("align", align),
        ...rc("ji", justifyItems),
        ...rc("hide", hide),
        ...paddingClasses({ padding, paddingX, paddingY }),
        className,
      )}
      style={
        auto
          ? ({
              "--lb-grid-min": minItemWidth,
              "--lb-grid-fill": autoMode === "fit" ? "auto-fit" : "auto-fill",
              ...style,
            } as React.CSSProperties)
          : style
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}

export interface GridItemProps extends React.HTMLAttributes<HTMLElement> {
  /** Etiqueta HTML que se renderiza (`div` por defecto; `li` dentro de un Grid `ul`). */
  as?: LayoutElement;
  /** Columnas que ocupa (1 a 12) o `full` (toda la fila). Por punto de quiebre: `{ base: "full", md: 2 }`. */
  span?: Responsive<GridColumns | "full">;
  /** Oculta la celda (útil por punto de quiebre). */
  hide?: Responsive<boolean>;
  /** Referencia al elemento del DOM. */
  ref?: React.Ref<HTMLElement>;
}

/** Celda de un Grid que ocupa varias columnas. */
export function GridItem({
  as = "div",
  span,
  hide,
  className,
  children,
  ...rest
}: GridItemProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={cx(
        styles.gridItem,
        ...rc("span", span),
        ...rc("hide", hide),
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
