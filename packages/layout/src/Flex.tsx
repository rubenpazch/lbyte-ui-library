import React from "react";
import {
  cx,
  mapResponsive,
  paddingClasses,
  rc,
  styles,
  type Align,
  type Direction,
  type Justify,
  type LayoutElement,
  type PaddingProps,
  type Responsive,
  type Space,
} from "./responsive";

type Wrap = boolean | "wrap" | "nowrap" | "wrap-reverse";

export interface FlexProps
  extends PaddingProps, Omit<React.HTMLAttributes<HTMLElement>, "wrap"> {
  /** Etiqueta HTML que se renderiza: `div` (por defecto), `section`, `ul`, `nav`, `header`… */
  as?: LayoutElement;
  /** Dirección de los hijos: `row` (horizontal) o `column` (vertical). Acepta valores por punto de quiebre: `{ base: "column", md: "row" }`. */
  direction?: Responsive<Direction>;
  /** Espacio entre hijos (escala `--lb-space-*`: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16). */
  gap?: Responsive<Space>;
  /** Alineación en el eje cruzado: en una fila es la vertical, en una columna la horizontal. */
  align?: Responsive<Align>;
  /** Distribución en el eje principal: `start`, `center`, `end`, `between`, `around`, `evenly`. */
  justify?: Responsive<Justify>;
  /** Permite que los hijos pasen a la siguiente línea. `true` = `wrap`. */
  wrap?: Responsive<Wrap>;
  /** Se comporta como elemento en línea (`inline-flex`). */
  inline?: boolean;
  /** Ocupa el espacio libre cuando está dentro de otro Flex/Stack/Inline. */
  grow?: boolean;
  /** Oculta el contenedor (útil por punto de quiebre: `hide={{ base: true, md: false }}`). */
  hide?: Responsive<boolean>;
  /** Referencia al elemento del DOM. */
  ref?: React.Ref<HTMLElement>;
}

const normWrap = (w: Wrap) =>
  w === true ? "wrap" : w === false ? "nowrap" : w;

/**
 * Contenedor flexible: alinea y distribuye a sus hijos en fila o en columna solo con props
 * (sin escribir CSS). Base de Stack (vertical) e Inline (horizontal).
 */
export default function Flex({
  as = "div",
  direction,
  gap,
  align,
  justify,
  wrap,
  inline = false,
  grow = false,
  hide,
  padding,
  paddingX,
  paddingY,
  className,
  children,
  ...rest
}: FlexProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={cx(
        inline ? styles.inlineFlex : styles.flex,
        ...rc("dir", direction),
        ...rc("gap", gap),
        ...rc("align", align),
        ...rc("justify", justify),
        ...rc("wrap", mapResponsive(wrap, normWrap)),
        ...rc("hide", hide),
        ...paddingClasses({ padding, paddingX, paddingY }),
        grow && styles.grow,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export type StackProps = Omit<FlexProps, "direction">;

/**
 * Apila a los hijos en vertical con un espacio uniforme (columna). Por defecto `gap={4}`.
 * `align="center"` los centra horizontalmente.
 */
export function Stack({ gap = 4, ...props }: StackProps) {
  return <Flex direction="column" gap={gap} {...props} />;
}

export interface InlineProps extends Omit<FlexProps, "direction"> {
  /** Invierte el orden visual (`row-reverse`). */
  reverse?: boolean;
}

/**
 * Pone a los hijos en fila (botones, chips, etiquetas) y los pasa a la siguiente línea si no
 * caben. Por defecto `gap={2}`, `align="center"` y `wrap`.
 */
export function Inline({
  gap = 2,
  align = "center",
  wrap = true,
  reverse = false,
  ...props
}: InlineProps) {
  return (
    <Flex
      direction={reverse ? "row-reverse" : "row"}
      gap={gap}
      align={align}
      wrap={wrap}
      {...props}
    />
  );
}

export interface SpacerProps {
  /** Clase extra. */
  className?: string;
}

/**
 * Espacio elástico dentro de un Flex/Inline: empuja a los hijos siguientes al otro extremo
 * (p. ej. logo a la izquierda y botones a la derecha).
 */
export function Spacer({ className }: SpacerProps) {
  return <div aria-hidden="true" className={cx(styles.spacer, className)} />;
}
