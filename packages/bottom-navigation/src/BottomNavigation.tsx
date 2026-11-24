import React from "react";
import styles from "./BottomNavigation.module.css";

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

export interface BottomNavigationItem {
  /** Texto bajo el icono (corto: "Partidos"). */
  label: string;
  /** Icono (obligatorio: es lo que se reconoce de un vistazo). */
  icon: React.ReactNode;
  /** Enlace. Si coincide con `currentPath` la opción se marca activa. */
  href?: string;
  /** Acción en lugar de enlace (p. ej. "Más" abre el menú). */
  onClick?: () => void;
  /** Fuerza el estado activo. */
  active?: boolean;
  /** Insignia sobre el icono: "3". */
  badge?: React.ReactNode;
}

export interface BottomNavigationProps {
  /** Opciones (3 a 5). */
  items: BottomNavigationItem[];
  /** Ruta actual, para marcar la opción activa. */
  currentPath?: string;
  /** Componente de enlace (p. ej. Link de Next.js). Por defecto <a>. */
  linkComponent?: React.ElementType;
  /** Nombre accesible de la navegación. */
  "aria-label"?: string;
  /** Desde qué ancho se oculta: md (768 px, por defecto), lg (1024 px) o never (siempre visible). */
  hideFrom?: "md" | "lg" | "never";
  /** Clase extra. */
  className?: string;
}

const isActive = (item: BottomNavigationItem, path?: string): boolean =>
  item.active ??
  Boolean(
    path &&
    item.href &&
    (path === item.href ||
      (item.href !== "/" &&
        item.href !== "#/" &&
        path.startsWith(
          item.href.endsWith("/") ? item.href : `${item.href}/`,
        ))),
  );

/**
 * Barra de navegación fija abajo para el celular: 3 a 5 secciones principales con icono y texto,
 * al alcance del pulgar. En pantallas anchas se oculta (la navegación va en el menú lateral).
 */
export default function BottomNavigation({
  items,
  currentPath,
  linkComponent: LinkComponent = "a",
  "aria-label": ariaLabel = "Navegación principal",
  hideFrom = "md",
  className,
}: BottomNavigationProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cx(
        styles.bar,
        hideFrom !== "never" && styles[`hide-${hideFrom}`],
        className,
      )}
    >
      <ul
        className={styles.list}
        style={{
          gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
        }}
      >
        {items.map((item) => {
          const active = isActive(item, currentPath);
          const body = (
            <>
              <span className={styles.icon} aria-hidden="true">
                {item.icon}
                {item.badge !== undefined && (
                  <span className={styles.badge}>{item.badge}</span>
                )}
              </span>
              <span className={styles.label}>{item.label}</span>
            </>
          );
          const cls = cx(styles.item, active && styles.active);
          return (
            <li key={item.label}>
              {item.href ? (
                <LinkComponent
                  href={item.href}
                  className={cls}
                  aria-current={active ? "page" : undefined}
                  onClick={item.onClick}
                >
                  {body}
                </LinkComponent>
              ) : (
                <button
                  type="button"
                  className={cls}
                  onClick={item.onClick}
                  aria-current={active ? "page" : undefined}
                >
                  {body}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
