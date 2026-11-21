import React from "react";
import styles from "./Badge.module.css";

export type BadgeColor =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "violet"
  | "orange"
  | "pink";
export type BadgeVariant = "soft" | "solid" | "outline";

export interface BadgeProps {
  /** Color según el significado: success (pagado), warning (por vencer), danger (vencido)… */
  color?: BadgeColor;
  /** soft (fondo suave, por defecto), solid o outline. */
  variant?: BadgeVariant;
  /** sm (por defecto) o md. */
  size?: "sm" | "md";
  /** Muestra un punto de color antes del texto. */
  dot?: boolean;
  /** Texto del badge. */
  children: React.ReactNode;
  /** Clase extra. */
  className?: string;
  /** Texto para lectores de pantalla si el visible no basta (p. ej. "Estado: vencido"). */
  "aria-label"?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/** Insignia de estado o categoría: "Pagado", "Vencido", "Borrador", "3 nuevos". */
export default function Badge({
  color = "neutral",
  variant = "soft",
  size = "sm",
  dot = false,
  children,
  className,
  "aria-label": ariaLabel,
}: BadgeProps) {
  return (
    <span
      className={cx(
        styles.badge,
        styles[color],
        styles[variant],
        styles[size],
        className,
      )}
      aria-label={ariaLabel}
      data-color={color}
    >
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
