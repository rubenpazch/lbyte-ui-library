import type React from "react";
import styles from "./Layout.module.css";

/** Puntos de quiebre (ancho mínimo): sm 640px, md 768px, lg 1024px, xl 1280px. */
export type LayoutBreakpoint = "base" | "sm" | "md" | "lg" | "xl";

/**
 * Un valor fijo o un valor por punto de quiebre (mobile first):
 * `gap={4}` o `gap={{ base: 2, md: 6 }}`.
 */
export type Responsive<T> = T | Partial<Record<LayoutBreakpoint, T>>;

/** Escala de espacios: corresponde a los tokens `--lb-space-*`. */
export type Space = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

/** Alineación en el eje cruzado (vertical en una fila, horizontal en una columna). */
export type Align = "start" | "center" | "end" | "stretch" | "baseline";

/** Distribución en el eje principal. */
export type Justify =
  "start" | "center" | "end" | "between" | "around" | "evenly";

export type Direction = "row" | "column" | "row-reverse" | "column-reverse";

/** Etiqueta HTML que se renderiza (`div` por defecto). */
export type LayoutElement = keyof React.JSX.IntrinsicElements;

/** Espaciado interno, común a todos los contenedores de maquetación. */
export interface PaddingProps {
  /** Espacio interno en los cuatro lados (escala `--lb-space-*`). */
  padding?: Responsive<Space>;
  /** Espacio interno a izquierda y derecha. */
  paddingX?: Responsive<Space>;
  /** Espacio interno arriba y abajo. */
  paddingY?: Responsive<Space>;
}

const cssStyles = styles as Record<string, string>;

export const cx = (...c: Array<string | false | undefined | null>) =>
  c.filter(Boolean).join(" ");

/** Convierte un valor (fijo o por punto de quiebre) en las clases del CSS de maquetación. */
export function rc<T extends string | number | boolean>(
  prefijo: string,
  valor: Responsive<T> | undefined,
): string[] {
  if (valor === undefined || valor === null) return [];
  const pares: Array<[LayoutBreakpoint, T]> =
    typeof valor === "object"
      ? (Object.entries(valor) as Array<[LayoutBreakpoint, T]>)
      : [["base", valor]];
  return pares
    .filter(([, v]) => v !== undefined && v !== null)
    .map(
      ([bp, v]) =>
        cssStyles[`${bp === "base" ? "" : `${bp}_`}${prefijo}-${String(v)}`],
    )
    .filter(Boolean);
}

/** Aplica una función a cada valor de una prop responsive. */
export function mapResponsive<T, U>(
  valor: Responsive<T> | undefined,
  fn: (v: T) => U,
): Responsive<U> | undefined {
  if (valor === undefined) return undefined;
  if (typeof valor === "object" && valor !== null)
    return Object.fromEntries(
      Object.entries(valor).map(([k, v]) => [k, fn(v as T)]),
    ) as Partial<Record<LayoutBreakpoint, U>>;
  return fn(valor as T);
}

export function paddingClasses({ padding, paddingX, paddingY }: PaddingProps) {
  return [...rc("p", padding), ...rc("px", paddingX), ...rc("py", paddingY)];
}

export { cssStyles as styles };
