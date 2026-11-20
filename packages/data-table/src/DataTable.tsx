import React, { useMemo, useState } from "react";
import EmptyState from "@rubenpazch/empty-state";
import Skeleton from "@rubenpazch/skeleton";
import styles from "./DataTable.module.css";

export type SortDirection = "asc" | "desc";
export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface DataTableColumn<T> {
  /** Identificador de la columna (y propiedad de la fila si no hay render/accessor). */
  key: string;
  /** Encabezado. */
  header: React.ReactNode;
  /** Contenido de la celda. Por defecto `row[key]`. */
  render?: (row: T) => React.ReactNode;
  /** Valor para ordenar (número, texto o fecha ISO). Por defecto `row[key]`. */
  accessor?: (row: T) => string | number | null | undefined;
  /** Se puede ordenar haciendo clic en el encabezado. */
  sortable?: boolean;
  /** Alineación: left (por defecto), center o right (montos). */
  align?: "left" | "center" | "right";
  /** Ancho CSS ("8rem", "20%"). */
  width?: string;
  /** Ocultar en pantallas pequeñas: sm (<640px) o md (<768px). */
  hideBelow?: "sm" | "md";
}

export interface DataTableProps<T> {
  /** Columnas. */
  columns: DataTableColumn<T>[];
  /** Filas. */
  rows: T[];
  /** id único de cada fila. */
  getRowId: (row: T) => string | number;
  /** Título accesible de la tabla (se lee al entrar). Visible si `showCaption`. */
  caption: string;
  /** Muestra el caption encima de la tabla. */
  showCaption?: boolean;
  /** Orden controlado. Sin él, la tabla ordena sola en el navegador. */
  sort?: SortState | null;
  /** Al cambiar el orden (para ordenar en el servidor). */
  onSortChange?: (sort: SortState | null) => void;
  /** Muestra filas de carga. */
  loading?: boolean;
  /** Filas de carga a mostrar (por defecto 5). */
  loadingRows?: number;
  /** Texto del estado vacío. */
  emptyTitle?: React.ReactNode;
  /** Explicación del estado vacío. */
  emptyDescription?: React.ReactNode;
  /** Acción del estado vacío (Button "Crear…"). */
  emptyAction?: React.ReactNode;
  /** Al hacer clic (o Enter) en una fila. */
  onRowClick?: (row: T) => void;
  /** Filas más compactas. */
  dense?: boolean;
  /** Encabezado fijo al hacer scroll vertical. */
  stickyHeader?: boolean;
  /** Clase extra del contenedor. */
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");
const collator = new Intl.Collator("es", {
  numeric: true,
  sensitivity: "base",
});

/**
 * Tabla de datos accesible: orden por columnas (aria-sort), carga, estado vacío, filas
 * clicables y scroll horizontal en móvil. Pagina con Pagination debajo.
 */
export default function DataTable<T>({
  columns,
  rows,
  getRowId,
  caption,
  showCaption = false,
  sort: sortProp,
  onSortChange,
  loading = false,
  loadingRows = 5,
  emptyTitle = "No hay registros",
  emptyDescription,
  emptyAction,
  onRowClick,
  dense = false,
  stickyHeader = false,
  className,
}: DataTableProps<T>) {
  const controlled = sortProp !== undefined;
  const [internalSort, setInternalSort] = useState<SortState | null>(null);
  const sort = controlled ? sortProp : internalSort;

  const valueOf = (col: DataTableColumn<T>, row: T) =>
    col.accessor
      ? col.accessor(row)
      : (row as Record<string, unknown>)[col.key];

  const sortedRows = useMemo(() => {
    if (!sort || onSortChange) return rows; // con onSortChange ordena quien llama (servidor)
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;
    const dir = sort.direction === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const va = valueOf(col, a);
      const vb = valueOf(col, b);
      if (va === vb) return 0;
      if (va === null || va === undefined) return 1;
      if (vb === null || vb === undefined) return -1;
      if (typeof va === "number" && typeof vb === "number")
        return (va - vb) * dir;
      return collator.compare(String(va), String(vb)) * dir;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, sort, columns, onSortChange]);

  const toggleSort = (key: string) => {
    const next: SortState | null =
      !sort || sort.key !== key
        ? { key, direction: "asc" }
        : sort.direction === "asc"
          ? { key, direction: "desc" }
          : null;
    if (!controlled) setInternalSort(next);
    onSortChange?.(next);
  };

  const colClass = (c: DataTableColumn<T>) =>
    cx(
      styles[`align-${c.align ?? "left"}`],
      c.hideBelow && styles[`hide-${c.hideBelow}`],
    );

  const empty = !loading && rows.length === 0;

  return (
    <div className={cx(styles.wrapper, className)}>
      <div
        className={cx(styles.scroll, stickyHeader && styles.sticky)}
        tabIndex={0}
        role="region"
        aria-label={caption}
      >
        <table
          className={cx(styles.table, dense && styles.dense)}
          aria-busy={loading || undefined}
        >
          <caption className={showCaption ? styles.caption : styles.srOnly}>
            {caption}
          </caption>
          <thead>
            <tr>
              {columns.map((c) => {
                const active = sort?.key === c.key;
                const ariaSort = active
                  ? sort!.direction === "asc"
                    ? "ascending"
                    : "descending"
                  : c.sortable
                    ? "none"
                    : undefined;
                return (
                  <th
                    key={c.key}
                    scope="col"
                    aria-sort={ariaSort}
                    style={c.width ? { width: c.width } : undefined}
                    className={colClass(c)}
                  >
                    {c.sortable ? (
                      <button
                        type="button"
                        className={styles.sortButton}
                        onClick={() => toggleSort(c.key)}
                      >
                        {c.header}
                        <span
                          className={cx(
                            styles.sortIcon,
                            active && styles.sortActive,
                          )}
                          aria-hidden="true"
                        >
                          {active
                            ? sort!.direction === "asc"
                              ? "▲"
                              : "▼"
                            : "↕"}
                        </span>
                      </button>
                    ) : (
                      c.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: loadingRows }, (_, i) => (
                <tr key={`carga-${i}`}>
                  {columns.map((c) => (
                    <td key={c.key} className={colClass(c)}>
                      <Skeleton />
                    </td>
                  ))}
                </tr>
              ))}
            {!loading &&
              sortedRows.map((row) => (
                <tr
                  key={getRowId(row)}
                  className={onRowClick ? styles.clickable : undefined}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={
                    onRowClick
                      ? (e) => {
                          if (e.key === "Enter" && e.target === e.currentTarget)
                            onRowClick(row);
                        }
                      : undefined
                  }
                >
                  {columns.map((c) => (
                    <td key={c.key} className={colClass(c)}>
                      {c.render
                        ? c.render(row)
                        : (valueOf(c, row) as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {loading && (
          <span className={styles.srOnly} role="status">
            Cargando…
          </span>
        )}
      </div>
      {empty && (
        <EmptyState
          size="sm"
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
        />
      )}
    </div>
  );
}
