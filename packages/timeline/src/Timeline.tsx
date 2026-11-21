import React from "react";
import styles from "./Timeline.module.css";

export type TimelineStatus =
  "default" | "primary" | "success" | "warning" | "danger" | "info";

export interface TimelineItem {
  /** Clave estable (por defecto, la posición). */
  id?: string | number;
  /** Qué pasó: "Documento derivado", "Pago registrado". */
  title: React.ReactNode;
  /** Detalle opcional: quién, a dónde, observaciones. */
  description?: React.ReactNode;
  /** Cuándo. Texto ya formateado o fecha ISO (se muestra tal cual en `<time>`). */
  date?: string;
  /** Valor ISO para `<time dateTime>` si `date` es texto ya formateado. */
  dateTime?: string;
  /** Color del punto según el significado del evento. */
  status?: TimelineStatus;
  /** Icono dentro del punto (en lugar del punto simple). */
  icon?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  /** Nombre accesible de la lista, p. ej. "Historial del trámite". */
  "aria-label"?: string;
  /** Texto cuando no hay eventos. */
  emptyText?: React.ReactNode;
  /** Más compacto (menos espacio entre eventos). */
  dense?: boolean;
  /** El último evento se marca como el estado actual (anillo y negrita). */
  highlightLast?: boolean;
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/**
 * Línea de tiempo vertical: historial de un trámite, pedido o expediente, en orden.
 * Genérica: el significado de cada estado lo decide la app (p. ej. un envoltorio local que
 * convierte los estados del trámite en `items`).
 */
export default function Timeline({
  items,
  "aria-label": ariaLabel,
  emptyText = "Sin eventos todavía.",
  dense = false,
  highlightLast = false,
  className,
}: TimelineProps) {
  if (items.length === 0) {
    return <p className={cx(styles.empty, className)}>{emptyText}</p>;
  }
  return (
    <ol
      className={cx(styles.timeline, dense && styles.dense, className)}
      aria-label={ariaLabel}
    >
      {items.map((item, i) => {
        const actual = highlightLast && i === items.length - 1;
        return (
          <li
            key={item.id ?? i}
            className={cx(styles.item, actual && styles.current)}
            aria-current={actual ? "step" : undefined}
          >
            <span
              className={cx(
                styles.marker,
                styles[item.status ?? "default"],
                item.icon ? styles.withIcon : undefined,
              )}
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <div className={styles.body}>
              <div className={styles.head}>
                <span className={styles.title}>{item.title}</span>
                {item.date && (
                  <time
                    className={styles.date}
                    dateTime={item.dateTime ?? item.date}
                  >
                    {item.date}
                  </time>
                )}
              </div>
              {item.description && (
                <div className={styles.description}>{item.description}</div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
