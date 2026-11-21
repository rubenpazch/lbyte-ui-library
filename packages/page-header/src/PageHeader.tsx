import React from "react";
import styles from "./PageHeader.module.css";

export interface Breadcrumb {
  label: React.ReactNode;
  /** Enlace; el último (página actual) normalmente no lo lleva. */
  href?: string;
}

export interface PageHeaderProps {
  /** Título de la página (se renderiza como h1). */
  title: React.ReactNode;
  /** Texto secundario bajo el título. */
  subtitle?: React.ReactNode;
  /** Migas de pan: Inicio / Convocatorias / Editar. */
  breadcrumbs?: Breadcrumb[];
  /** Enlace o acción "Volver". */
  back?: { label?: string; href?: string; onClick?: () => void };
  /** Acciones a la derecha (botones). En móvil pasan abajo. */
  actions?: React.ReactNode;
  /** Contenido extra bajo el título (filtros, pestañas). */
  children?: React.ReactNode;
  /** Componente de enlace (p. ej. Link de Next.js). Por defecto <a>. */
  linkComponent?: React.ElementType;
  /** Clase extra. */
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/** Cabecera de página: migas, volver, título h1, subtítulo y acciones. */
export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  back,
  actions,
  children,
  linkComponent: Link = "a",
  className,
}: PageHeaderProps) {
  return (
    <header className={cx(styles.header, className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Ruta de navegación" className={styles.crumbs}>
          <ol>
            {breadcrumbs.map((b, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <li key={i}>
                  {b.href && !last ? (
                    <Link href={b.href} className={styles.crumbLink}>
                      {b.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined}>
                      {b.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
      {back &&
        (back.href ? (
          <Link href={back.href} className={styles.back}>
            ← {back.label ?? "Volver"}
          </Link>
        ) : (
          <button type="button" onClick={back.onClick} className={styles.back}>
            ← {back.label ?? "Volver"}
          </button>
        ))}
      <div className={styles.row}>
        <div className={styles.headings}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {children && <div className={styles.extra}>{children}</div>}
    </header>
  );
}
