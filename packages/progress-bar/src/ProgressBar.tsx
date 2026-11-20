import { useId } from "react";
import styles from "./ProgressBar.module.css";

export interface ProgressBarProps {
  /** Valor actual (0 a max). Sin valor = indeterminado (animación continua). */
  value?: number;
  /** Máximo (por defecto 100). */
  max?: number;
  /** Etiqueta visible: "Subiendo archivos". También es el nombre accesible. */
  label?: string;
  /** Muestra el porcentaje a la derecha de la etiqueta. */
  showValue?: boolean;
  /** Texto del valor (por defecto "45 %"). */
  valueText?: string;
  /** primary (por defecto), success, warning o danger. */
  color?: "primary" | "success" | "warning" | "danger";
  /** sm (4px), md (8px, por defecto) o lg (12px). */
  size?: "sm" | "md" | "lg";
  /** Clase extra. */
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/** Barra de progreso accesible (role="progressbar"), determinada o indeterminada. */
export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  valueText,
  color = "primary",
  size = "md",
  className,
}: ProgressBarProps) {
  const id = useId();
  const indeterminate = value === undefined || value === null;
  const pct = indeterminate
    ? 0
    : Math.round((Math.min(Math.max(value, 0), max) / max) * 100);
  const text = valueText ?? `${pct} %`;
  return (
    <div className={cx(styles.wrapper, className)}>
      {(label || (showValue && !indeterminate)) && (
        <div className={styles.labels}>
          {label && (
            <span id={`${id}-label`} className={styles.label}>
              {label}
            </span>
          )}
          {showValue && !indeterminate && (
            <span className={styles.value} aria-hidden="true">
              {text}
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={
          indeterminate ? undefined : Math.min(Math.max(value, 0), max)
        }
        aria-valuetext={indeterminate ? undefined : text}
        aria-busy={indeterminate || undefined}
        className={cx(styles.track, styles[size])}
      >
        <div
          className={cx(
            styles.bar,
            styles[color],
            indeterminate && styles.indeterminate,
          )}
          style={indeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
