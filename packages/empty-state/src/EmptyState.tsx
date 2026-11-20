import React from "react";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
  /** Título: "No hay convocatorias". */
  title: React.ReactNode;
  /** Explicación o siguiente paso. */
  description?: React.ReactNode;
  /** Icono o ilustración (por defecto una bandeja vacía). `false` lo oculta. */
  icon?: React.ReactNode | false;
  /** Acción principal: normalmente un Button "Crear…". */
  action?: React.ReactNode;
  /** Acción secundaria (enlace o botón de texto). */
  secondaryAction?: React.ReactNode;
  /** sm para dentro de tablas o tarjetas; md (por defecto) para una página. */
  size?: "sm" | "md";
  /** Clase extra. */
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/** Estado vacío: lo que se muestra cuando una lista o búsqueda no tiene resultados. */
export default function EmptyState({
  title,
  description,
  icon,
  action,
  secondaryAction,
  size = "md",
  className,
}: EmptyStateProps) {
  return (
    <div className={cx(styles.empty, styles[size], className)} role="status">
      {icon !== false && (
        <div className={styles.icon} aria-hidden="true">
          {icon ?? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              width="40"
              height="40"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M2.25 13.5V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.5M2.25 13.5l2.4-7.2A2.25 2.25 0 0 1 6.784 4.75h10.432a2.25 2.25 0 0 1 2.134 1.55l2.4 7.2"
              />
            </svg>
          )}
        </div>
      )}
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {(action || secondaryAction) && (
        <div className={styles.actions}>
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
