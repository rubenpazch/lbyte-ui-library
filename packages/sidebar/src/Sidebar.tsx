import React, { useEffect, useId, useRef, useState } from "react";
import {
  useEscapeKey,
  useFocusTrap,
  useLockBodyScroll,
} from "@rubenpazch/shared";
import styles from "./Sidebar.module.css";

export interface SidebarItem {
  /** Texto de la opción. */
  label: string;
  /** Enlace. Si coincide con `currentPath` la opción se marca activa. */
  href?: string;
  /** Icono (recomendado: en modo colapsado solo se ve el icono). */
  icon?: React.ReactNode;
  /** Fuerza el estado activo. */
  active?: boolean;
  /** Insignia a la derecha: "3", "Nuevo". */
  badge?: React.ReactNode;
  /** Acción en lugar de enlace. */
  onClick?: () => void;
  /** Subopciones (un nivel). El grupo se abre solo si una subopción está activa. */
  children?: SidebarItem[];
}

export interface SidebarSection {
  /** Título de la sección ("Gestión"). Se oculta en modo colapsado. */
  title?: string;
  items: SidebarItem[];
}

export interface SidebarLabels {
  collapse: string;
  expand: string;
  close: string;
  navigation: string;
}

export interface SidebarProps {
  /** Secciones del menú. */
  sections: SidebarSection[];
  /** Ruta actual (p. ej. usePathname() de Next) para marcar la opción activa. */
  currentPath?: string;
  /** Logo o nombre de la app arriba. */
  brand?: React.ReactNode;
  /** Versión compacta del logo para el modo colapsado (por defecto se oculta `brand`). */
  brandCollapsed?: React.ReactNode;
  /** Contenido al pie: usuario, "Cerrar sesión". */
  footer?: React.ReactNode;
  /** Colapsado (controlado). */
  collapsed?: boolean;
  /** Colapsado inicial (no controlado). */
  defaultCollapsed?: boolean;
  /** Al colapsar o expandir. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Muestra el botón para colapsar (por defecto sí). */
  collapsible?: boolean;
  /** Clave de localStorage para recordar si estaba colapsado. */
  storageKey?: string;
  /** Abierto en móvil (lo controla el botón ☰ de AppShell o de tu cabecera). */
  mobileOpen?: boolean;
  /** Al cerrar en móvil (Escape, fondo, elegir una opción). */
  onMobileOpenChange?: (open: boolean) => void;
  /** Componente de enlace (Link de Next.js). Por defecto <a>. */
  linkComponent?: React.ElementType;
  /** Textos accesibles. */
  labels?: Partial<SidebarLabels>;
  /** Clase extra. */
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

const isActive = (item: SidebarItem, path?: string): boolean =>
  item.active ??
  Boolean(
    path &&
    item.href &&
    (path === item.href ||
      (item.href !== "/" &&
        path.startsWith(
          item.href.endsWith("/") ? item.href : `${item.href}/`,
        ))),
  );
const hasActiveChild = (item: SidebarItem, path?: string) =>
  (item.children ?? []).some((c) => isActive(c, path));

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className={cx(styles.chevron, open && styles.chevronOpen)}
    viewBox="0 0 20 20"
    fill="currentColor"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.17 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Barra de navegación vertical: secciones, subniveles, insignias y estado activo. En escritorio
 * se colapsa a iconos (y lo recuerda); en móvil es un cajón con foco retenido y Escape.
 */
export default function Sidebar({
  sections,
  currentPath,
  brand,
  brandCollapsed,
  footer,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  collapsible = true,
  storageKey,
  mobileOpen = false,
  onMobileOpenChange,
  linkComponent: Link = "a",
  labels,
  className,
}: SidebarProps) {
  const text: SidebarLabels = {
    collapse: "Contraer menú",
    expand: "Expandir menú",
    close: "Cerrar menú",
    navigation: "Navegación principal",
    ...labels,
  };
  const baseId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const controlled = collapsedProp !== undefined;
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const collapsed = controlled ? collapsedProp : internalCollapsed;

  // Preferencia recordada (solo en el navegador, después del primer render: seguro con SSR).
  useEffect(() => {
    if (controlled || !storageKey) return;
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved !== null) setInternalCollapsed(saved === "1");
    } catch {
      /* almacenamiento no disponible */
    }
  }, [controlled, storageKey]);

  const setCollapsed = (v: boolean) => {
    if (!controlled) setInternalCollapsed(v);
    onCollapsedChange?.(v);
    if (storageKey) {
      try {
        window.localStorage.setItem(storageKey, v ? "1" : "0");
      } catch {
        /* almacenamiento no disponible */
      }
    }
  };

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const groupKey = (s: number, i: number) => `${s}-${i}`;
  const isGroupOpen = (key: string, item: SidebarItem) =>
    openGroups[key] ?? hasActiveChild(item, currentPath);

  const closeMobile = () => onMobileOpenChange?.(false);
  useEscapeKey(closeMobile, mobileOpen);
  useFocusTrap(panelRef, mobileOpen);
  useLockBodyScroll(mobileOpen);

  const renderLink = (item: SidebarItem, nested: boolean) => {
    const active = isActive(item, currentPath);
    const content = (
      <>
        {item.icon && (
          <span className={styles.icon} aria-hidden="true">
            {item.icon}
          </span>
        )}
        {!item.icon && !nested && (
          <span className={styles.iconPlaceholder} aria-hidden="true">
            {item.label.charAt(0)}
          </span>
        )}
        <span className={styles.label}>{item.label}</span>
        {item.badge !== undefined && item.badge !== null && (
          <span className={styles.badge}>{item.badge}</span>
        )}
      </>
    );
    const common = {
      className: cx(
        styles.link,
        nested && styles.nested,
        active && styles.active,
      ),
      "aria-current": active ? ("page" as const) : undefined,
      title: collapsed && !nested ? item.label : undefined,
      onClick: () => {
        item.onClick?.();
        closeMobile();
      },
    };
    return item.href ? (
      <Link href={item.href} {...common}>
        {content}
      </Link>
    ) : (
      <button type="button" {...common}>
        {content}
      </button>
    );
  };

  return (
    <>
      {mobileOpen && (
        <div
          className={styles.backdrop}
          onClick={closeMobile}
          data-testid="sidebar-backdrop"
        />
      )}
      <aside
        ref={panelRef}
        className={cx(
          styles.sidebar,
          collapsed && styles.collapsed,
          mobileOpen && styles.mobileOpen,
          className,
        )}
        data-collapsed={collapsed}
      >
        <div className={styles.top}>
          {brand && (
            <div className={styles.brand}>
              {collapsed ? (brandCollapsed ?? null) : brand}
            </div>
          )}
          {mobileOpen && (
            <button
              type="button"
              className={cx(styles.iconButton, styles.closeMobile)}
              onClick={closeMobile}
              aria-label={text.close}
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          )}
        </div>

        <nav className={styles.nav} aria-label={text.navigation}>
          {sections.map((section, s) => (
            <div key={s} className={styles.section}>
              {section.title && (
                <p className={styles.sectionTitle} id={`${baseId}-sec-${s}`}>
                  {section.title}
                </p>
              )}
              <ul
                className={styles.list}
                aria-labelledby={
                  section.title ? `${baseId}-sec-${s}` : undefined
                }
              >
                {section.items.map((item, i) => {
                  if (!item.children?.length)
                    return <li key={i}>{renderLink(item, false)}</li>;
                  const key = groupKey(s, i);
                  const open = isGroupOpen(key, item) && !collapsed;
                  const listId = `${baseId}-grupo-${key}`;
                  const childActive = hasActiveChild(item, currentPath);
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        className={cx(
                          styles.link,
                          childActive && styles.activeParent,
                        )}
                        aria-expanded={open}
                        aria-controls={listId}
                        title={collapsed ? item.label : undefined}
                        onClick={() => {
                          if (collapsed) {
                            setCollapsed(false);
                            setOpenGroups((g) => ({ ...g, [key]: true }));
                          } else {
                            setOpenGroups((g) => ({ ...g, [key]: !open }));
                          }
                        }}
                      >
                        {item.icon ? (
                          <span className={styles.icon} aria-hidden="true">
                            {item.icon}
                          </span>
                        ) : (
                          <span
                            className={styles.iconPlaceholder}
                            aria-hidden="true"
                          >
                            {item.label.charAt(0)}
                          </span>
                        )}
                        <span className={styles.label}>{item.label}</span>
                        <Chevron open={open} />
                      </button>
                      {open && (
                        <ul id={listId} className={styles.sublist}>
                          {item.children.map((child, c) => (
                            <li key={c}>{renderLink(child, true)}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {(footer || collapsible) && (
          <div className={styles.bottom}>
            {footer && <div className={styles.footer}>{footer}</div>}
            {collapsible && (
              <button
                type="button"
                className={cx(styles.iconButton, styles.collapseButton)}
                onClick={() => setCollapsed(!collapsed)}
                aria-label={collapsed ? text.expand : text.collapse}
                aria-expanded={!collapsed}
              >
                <svg
                  className={cx(styles.collapseIcon, collapsed && styles.flip)}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.79 14.77a.75.75 0 0 1-1.06.02l-4.5-4.25a.75.75 0 0 1 0-1.08l4.5-4.25a.75.75 0 1 1 1.04 1.08L11.832 10l3.938 3.71a.75.75 0 0 1 .02 1.06Zm-6 0a.75.75 0 0 1-1.06.02l-4.5-4.25a.75.75 0 0 1 0-1.08l4.5-4.25a.75.75 0 1 1 1.04 1.08L5.832 10l3.938 3.71a.75.75 0 0 1 .02 1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
