import React from "react";
import {
  cx,
  paddingClasses,
  rc,
  styles,
  type LayoutElement,
  type PaddingProps,
  type Responsive,
  type Space,
} from "./responsive";

export interface CenterProps
  extends PaddingProps, React.HTMLAttributes<HTMLElement> {
  /** Etiqueta HTML que se renderiza (`div` por defecto; `main` para una pantalla completa). */
  as?: LayoutElement;
  /** En qué eje centra: `both` (por defecto), `horizontal` o `vertical`. */
  axis?: "both" | "horizontal" | "vertical";
  /**
   * Alto mínimo, para que el centrado vertical tenga espacio: `screen` (alto de la ventana),
   * `full` (alto del padre) o un valor CSS (`"20rem"`).
   */
  minHeight?: "screen" | "full" | string;
  /** Espacio entre hijos (se apilan en vertical). */
  gap?: Responsive<Space>;
  /** Centra también el texto. */
  centerText?: boolean;
  /** Referencia al elemento del DOM. */
  ref?: React.Ref<HTMLElement>;
}

/**
 * Centra a sus hijos en horizontal, en vertical o en ambos ejes (p. ej. una tarjeta de login en
 * medio de la pantalla). Los hijos se apilan en columna.
 */
export function Center({
  as = "div",
  axis = "both",
  minHeight,
  gap,
  centerText = false,
  padding,
  paddingX,
  paddingY,
  className,
  style,
  children,
  ...rest
}: CenterProps) {
  const Tag = as as React.ElementType;
  const horizontal = axis !== "vertical";
  const vertical = axis !== "horizontal";
  const minhClase =
    minHeight === "screen"
      ? styles["minh-screen"]
      : minHeight === "full"
        ? styles["minh-full"]
        : undefined;
  return (
    <Tag
      className={cx(
        styles.flex,
        styles["dir-column"],
        horizontal && styles["align-center"],
        vertical && styles["justify-center"],
        minhClase,
        ...rc("gap", gap),
        ...paddingClasses({ padding, paddingX, paddingY }),
        className,
      )}
      style={{
        ...(minHeight && !minhClase ? { minHeight } : undefined),
        ...(centerText ? { textAlign: "center" } : undefined),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
