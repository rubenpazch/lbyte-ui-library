import React from "react";
import styles from "./List.module.css";

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

export interface ListProps {
  /** Filas: componentes `ListItem`. */
  children: React.ReactNode;
  /** outlined (tarjeta con borde, por defecto) o plain (sin borde, dentro de otra tarjeta). */
  variant?: "outlined" | "plain";
  /** Nombre accesible de la lista ("Próximos partidos"). */
  "aria-label"?: string;
  /** Clase extra para márgenes o posición. */
  className?: string;
}

/**
 * Lista vertical de filas con separadores (`<ul>`): partidos, socios, registros de un catálogo.
 * Cada fila es un `ListItem`.
 */
export default function List({
  children,
  variant = "outlined",
  "aria-label": ariaLabel,
  className,
}: ListProps) {
  return (
    <ul
      className={cx(styles.list, styles[variant], className)}
      aria-label={ariaLabel}
    >
      {children}
    </ul>
  );
}

export interface ListItemProps {
  /** Texto principal de la fila. */
  title: React.ReactNode;
  /** Detalle bajo el título (fecha, correo, resumen). */
  description?: React.ReactNode;
  /** Icono, avatar o imagen a la izquierda. */
  leading?: React.ReactNode;
  /** Contenido a la derecha: estado (Badge), monto, acciones. */
  trailing?: React.ReactNode;
  /** Contenido extra bajo el detalle (chips, barra de avance). */
  children?: React.ReactNode;
  /** Hace la fila clicable (botón). Si la fila lleva botones propios, no la hagas clicable: pon un `<li>` propio dentro de `List`. */
  onClick?: () => void;
  /** Hace la fila un enlace. */
  href?: string;
  /** Componente de enlace (p. ej. Link de Next.js). Por defecto <a>. */
  linkComponent?: React.ElementType;
  /** Atenúa la fila (registro inactivo u oculto). */
  muted?: boolean;
  /** Nombre accesible si el título no basta. */
  "aria-label"?: string;
  /** Clase extra. */
  className?: string;
}

/** Fila de una `List`: icono, título y detalle a la izquierda; estado o acciones a la derecha. */
export function ListItem({
  title,
  description,
  leading,
  trailing,
  children,
  onClick,
  href,
  linkComponent: LinkComponent = "a",
  muted = false,
  "aria-label": ariaLabel,
  className,
}: ListItemProps) {
  const body = (
    <>
      {leading !== undefined && (
        <span className={styles.leading} aria-hidden="true">
          {leading}
        </span>
      )}
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
        {children}
      </span>
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </>
  );
  const rowClass = cx(
    styles.row,
    (onClick || href) && styles.interactive,
    muted && styles.muted,
  );
  return (
    <li className={cx(styles.item, className)}>
      {href ? (
        <LinkComponent href={href} className={rowClass} aria-label={ariaLabel}>
          {body}
        </LinkComponent>
      ) : onClick ? (
        <button
          type="button"
          onClick={onClick}
          className={rowClass}
          aria-label={ariaLabel}
        >
          {body}
        </button>
      ) : (
        <div className={rowClass}>{body}</div>
      )}
    </li>
  );
}
