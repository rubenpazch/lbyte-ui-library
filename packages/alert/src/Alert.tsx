import React from "react";
import styles from "./Alert.module.css";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps {
  /** Tipo de mensaje: info (por defecto), success, warning o danger. */
  variant?: AlertVariant;
  /** Título en negrita (opcional). */
  title?: React.ReactNode;
  /** Texto del aviso. */
  children?: React.ReactNode;
  /** Si se pasa, muestra el botón × y se llama al cerrarlo. */
  onClose?: () => void;
  /** Acción a la derecha o abajo (p. ej. un Button "Reintentar"). */
  action?: React.ReactNode;
  /** Icono propio; `false` para ocultarlo. Por defecto uno según el tipo. */
  icon?: React.ReactNode | false;
  /** Texto accesible del botón ×. */
  closeLabel?: string;
  /** Clase extra. */
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

const ICONS: Record<AlertVariant, string> = {
  info: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.25 9a.75.75 0 0 1 1.5 0v4.25a.75.75 0 0 1-1.5 0V9Z",
  success:
    "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.86-9.81a.75.75 0 0 0-1.22-.88l-3.24 4.5-1.62-1.62a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.09l3.75-5.22Z",
  warning:
    "M8.48 2.94c.66-1.17 2.38-1.17 3.04 0l5.6 9.95c.65 1.16-.18 2.61-1.52 2.61H4.4c-1.34 0-2.17-1.45-1.52-2.61l5.6-9.95ZM10 6.5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0v-3.5A.75.75 0 0 0 10 6.5Zm0 7.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  danger:
    "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z",
};

/**
 * Aviso dentro de la página (no flotante): información, éxito, advertencia o error.
 * `warning` y `danger` se anuncian de inmediato (role="alert"); el resto como estado.
 */
export default function Alert({
  variant = "info",
  title,
  children,
  onClose,
  action,
  icon,
  closeLabel = "Cerrar aviso",
  className,
}: AlertProps) {
  const urgent = variant === "warning" || variant === "danger";
  return (
    <div
      role={urgent ? "alert" : "status"}
      className={cx(styles.alert, styles[variant], className)}
      data-variant={variant}
    >
      {icon !== false && (
        <span className={styles.icon} aria-hidden="true">
          {icon ?? (
            <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
              <path fillRule="evenodd" clipRule="evenodd" d={ICONS[variant]} />
            </svg>
          )}
        </span>
      )}
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <div className={styles.text}>{children}</div>}
        {action && <div className={styles.action}>{action}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label={closeLabel}
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
