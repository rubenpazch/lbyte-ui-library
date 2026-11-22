import React from "react";
import styles from "./Collapsible.module.css";

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

export interface CollapsibleProps {
  /** Texto del encabezado que abre y cierra la sección ("Más opciones"). */
  title: React.ReactNode;
  /** Contenido plegable. */
  children: React.ReactNode;
  /** Abierta al montar (por defecto cerrada). */
  defaultOpen?: boolean;
  /** Se llama al abrir o cerrar. */
  onOpenChange?: (open: boolean) => void;
  /** Clase extra para márgenes o posición. */
  className?: string;
}

/**
 * Sección plegable (`<details>`): deja lo opcional oculto para que un formulario o una página
 * sean cortos en el celular. Funciona sin JavaScript y con teclado.
 */
export default function Collapsible({
  title,
  children,
  defaultOpen = false,
  onOpenChange,
  className,
}: CollapsibleProps) {
  return (
    <details
      className={cx(styles.collapsible, className)}
      open={defaultOpen || undefined}
      onToggle={(e) =>
        onOpenChange?.((e.currentTarget as HTMLDetailsElement).open)
      }
    >
      <summary className={styles.summary}>
        <svg
          className={styles.chevron}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
        {title}
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
