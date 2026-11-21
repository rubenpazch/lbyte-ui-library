import React, { useId, useState } from "react";
import Sidebar from "@rubenpazch/sidebar";
import type { SidebarProps } from "@rubenpazch/sidebar";
import { ToastProvider, ToastRegion } from "@rubenpazch/toast";
import styles from "./AppShell.module.css";

export interface AppShellProps extends Pick<
  SidebarProps,
  | "sections"
  | "currentPath"
  | "brand"
  | "brandCollapsed"
  | "linkComponent"
  | "storageKey"
  | "defaultCollapsed"
  | "collapsed"
  | "onCollapsedChange"
> {
  /** Contenido al pie de la barra lateral (usuario, "Cerrar sesión"). */
  sidebarFooter?: React.ReactNode;
  /** Título en la cabecera (en móvil se ve junto al botón ☰). */
  title?: React.ReactNode;
  /** Acciones a la derecha de la cabecera: notificaciones, usuario. */
  headerActions?: React.ReactNode;
  /** Contenido de la página. */
  children: React.ReactNode;
  /** Ancho máximo del contenido: none, lg (72rem, por defecto) o md (56rem). */
  maxWidth?: "none" | "md" | "lg";
  /** Textos accesibles. */
  labels?: Partial<{ openMenu: string; skipToContent: string }>;
  /**
   * Incluye `ToastProvider`: dentro del panel, `useToast()` muestra los mensajes del servidor como
   * toast bajo la cabecera. Pon `false` solo si la app ya tiene su propio proveedor más arriba.
   */
  toasts?: boolean;
  /**
   * Carga del contenido al cambiar de pantalla: solo el área de contenido muestra el indicador
   * (el menú y la cabecera no cambian). Los hijos siguen montados, atenuados y sin interacción.
   */
  loading?: boolean;
  /** Texto accesible de la carga. */
  loadingLabel?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/**
 * Estructura de un panel: barra lateral (Sidebar), cabecera con ☰ en móvil y contenido.
 * Es la base de todas las pantallas de administración.
 */
export default function AppShell({
  sections,
  currentPath,
  brand,
  brandCollapsed,
  linkComponent,
  storageKey,
  defaultCollapsed,
  collapsed,
  onCollapsedChange,
  sidebarFooter,
  title,
  headerActions,
  children,
  maxWidth = "lg",
  labels,
  toasts = true,
  loading = false,
  loadingLabel = "Cargando…",
}: AppShellProps) {
  const text = {
    openMenu: "Abrir menú",
    skipToContent: "Saltar al contenido",
    ...labels,
  };
  const mainId = `${useId()}-contenido`;
  const [mobileOpen, setMobileOpen] = useState(false);

  const shell = (
    <div className={styles.shell}>
      <a href={`#${mainId}`} className={styles.skip}>
        {text.skipToContent}
      </a>
      <Sidebar
        sections={sections}
        currentPath={currentPath}
        brand={brand}
        brandCollapsed={brandCollapsed}
        linkComponent={linkComponent}
        storageKey={storageKey}
        defaultCollapsed={defaultCollapsed}
        collapsed={collapsed}
        onCollapsedChange={onCollapsedChange}
        footer={sidebarFooter}
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
      />
      <div className={styles.column}>
        {/* Bloque fijo: cabecera + mensajes. Ocupa solo la columna del contenido: no tapa el menú
            y empuja el contenido en vez de superponerse. */}
        <div className={styles.top}>
          <header className={styles.header}>
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setMobileOpen(true)}
              aria-label={text.openMenu}
              aria-expanded={mobileOpen}
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {title && <div className={styles.title}>{title}</div>}
            {headerActions && (
              <div className={styles.actions}>{headerActions}</div>
            )}
          </header>
          {toasts && <ToastRegion className={styles.toasts} />}
        </div>
        <main id={mainId} tabIndex={-1} className={styles.main}>
          <div
            className={cx(
              styles.content,
              styles[`max-${maxWidth}`],
              loading && styles.contentLoading,
            )}
            aria-busy={loading || undefined}
          >
            {children}
          </div>
          {loading && (
            <div className={styles.loading} role="status">
              <span className={styles.spinner} aria-hidden="true" />
              <span>{loadingLabel}</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
  return toasts ? (
    <ToastProvider placement="inline">{shell}</ToastProvider>
  ) : (
    shell
  );
}
