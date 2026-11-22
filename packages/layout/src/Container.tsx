import React from "react";
import {
  cx,
  paddingClasses,
  rc,
  styles,
  type LayoutElement,
  type PaddingProps,
  type Responsive,
} from "./responsive";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps
  extends PaddingProps, React.HTMLAttributes<HTMLElement> {
  /** Etiqueta HTML que se renderiza (`div` por defecto; `main`, `section`…). */
  as?: LayoutElement;
  /** Ancho máximo: sm 640px, md 768px, lg 1024px (por defecto), xl 1280px, 2xl 1536px o full. */
  size?: ContainerSize;
  /** Ancho máximo libre (`"72rem"`); reemplaza a `size`. */
  maxWidth?: string;
  /** Espacio a los lados. Por defecto `{ base: 4, md: 6 }`. */
  paddingX?: Responsive<0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16>;
  /** Oculta el contenedor (útil por punto de quiebre). */
  hide?: Responsive<boolean>;
  /** Referencia al elemento del DOM. */
  ref?: React.Ref<HTMLElement>;
}

/**
 * Contenido de página centrado con ancho máximo y márgenes laterales que se ajustan al tamaño
 * de la pantalla.
 */
export function Container({
  as = "div",
  size = "lg",
  maxWidth,
  padding,
  paddingX = { base: 4, md: 6 },
  paddingY,
  hide,
  className,
  style,
  children,
  ...rest
}: ContainerProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={cx(
        styles.container,
        !maxWidth && styles[`size-${size}`],
        ...rc("hide", hide),
        ...paddingClasses({ padding, paddingX, paddingY }),
        className,
      )}
      style={
        maxWidth
          ? ({
              "--lb-container-max": maxWidth,
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
