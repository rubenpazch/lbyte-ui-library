import styles from "./Skeleton.module.css";

export interface SkeletonProps {
  /** text (línea de texto, por defecto), rect (bloque) o circle (avatar). */
  variant?: "text" | "rect" | "circle";
  /** Ancho (número = px o cualquier valor CSS). Por defecto 100% (circle: igual al alto). */
  width?: number | string;
  /** Alto (número = px o valor CSS). Por defecto según la variante. */
  height?: number | string;
  /** Con variant="text": cuántas líneas (la última más corta). */
  lines?: number;
  /** Clase extra. */
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");
const css = (v: number | string | undefined) =>
  typeof v === "number" ? `${v}px` : v;

/**
 * Marcador de carga con la forma del contenido. Es decorativo (aria-hidden): anuncia la carga
 * en el contenedor con aria-busy o un texto oculto.
 */
export default function Skeleton({
  variant = "text",
  width,
  height,
  lines = 1,
  className,
}: SkeletonProps) {
  if (variant === "text" && lines > 1) {
    return (
      <span className={cx(styles.stack, className)} aria-hidden="true">
        {Array.from({ length: lines }, (_, i) => (
          <span
            key={i}
            className={cx(styles.skeleton, styles.text)}
            style={{
              width: i === lines - 1 ? "60%" : css(width),
              height: css(height),
            }}
          />
        ))}
      </span>
    );
  }
  const size = variant === "circle" ? (height ?? width ?? 40) : undefined;
  return (
    <span
      aria-hidden="true"
      className={cx(styles.skeleton, styles[variant], className)}
      style={{
        width: css(variant === "circle" ? size : width),
        height: css(variant === "circle" ? size : height),
      }}
    />
  );
}
