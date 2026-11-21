import React from "react";
import styles from "./DescriptionList.module.css";

export interface DescriptionItem {
  /** Etiqueta: "Remitente", "Fecha de ingreso". */
  label: React.ReactNode;
  /** Valor. Vacío (null, undefined o "") muestra `emptyValue`. */
  value?: React.ReactNode;
  /** Resalta el valor (p. ej. un dato importante o inferido). */
  highlight?: boolean;
  /** Ocupa toda la fila (textos largos: asunto, observaciones). */
  fullWidth?: boolean;
}

export interface DescriptionListProps {
  items: DescriptionItem[];
  /** Título opcional sobre la lista. */
  title?: React.ReactNode;
  /** Columnas en pantallas anchas (en móvil siempre 1). Por defecto 2. */
  columns?: 1 | 2 | 3;
  /** Qué mostrar si un valor está vacío. */
  emptyValue?: React.ReactNode;
  /** Texto si no hay ningún dato. */
  emptyText?: React.ReactNode;
  /** Nota al pie (fuente de los datos, aclaraciones). */
  footnote?: React.ReactNode;
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");
const vacio = (v: React.ReactNode) => v === null || v === undefined || v === "";

/** Pares etiqueta/valor de solo lectura (`<dl>`): resumen de un registro. */
export default function DescriptionList({
  items,
  title,
  columns = 2,
  emptyValue = "—",
  emptyText = "Sin datos.",
  footnote,
  className,
}: DescriptionListProps) {
  return (
    <section className={cx(styles.wrapper, className)}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {items.length === 0 ? (
        <p className={styles.empty}>{emptyText}</p>
      ) : (
        <dl className={cx(styles.list, styles[`cols${columns}`])}>
          {items.map((item, i) => (
            <div
              key={i}
              className={cx(styles.item, item.fullWidth && styles.full)}
            >
              <dt className={styles.label}>{item.label}</dt>
              <dd
                className={cx(
                  styles.value,
                  item.highlight && styles.highlight,
                  vacio(item.value) && styles.missing,
                )}
              >
                {vacio(item.value) ? emptyValue : item.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {footnote && <p className={styles.footnote}>{footnote}</p>}
    </section>
  );
}
