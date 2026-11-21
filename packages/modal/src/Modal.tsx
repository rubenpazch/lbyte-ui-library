import React, { useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  useEscapeKey,
  useFocusTrap,
  useLockBodyScroll,
} from "@rubenpazch/shared";
import styles from "./Modal.module.css";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  /** Si el modal está abierto. */
  open: boolean;
  /** Se llama al pedir cierre: botón ×, Escape o clic en el fondo. */
  onClose: () => void;
  /** Título (se anuncia como nombre del diálogo). */
  title?: React.ReactNode;
  /** Texto bajo el título (se anuncia como descripción). */
  description?: React.ReactNode;
  /** Contenido del modal. */
  children?: React.ReactNode;
  /** Pie: normalmente los botones de acción. */
  footer?: React.ReactNode;
  /** Ancho máximo: sm (400px), md (520px, por defecto), lg (720px), xl (960px) o full. */
  size?: ModalSize;
  /** Cerrar al hacer clic en el fondo (por defecto sí). */
  closeOnOverlayClick?: boolean;
  /** Cerrar con Escape (por defecto sí). */
  closeOnEscape?: boolean;
  /** Mostrar el botón × (por defecto sí). */
  showCloseButton?: boolean;
  /** Rol del diálogo: `alertdialog` para confirmaciones que exigen respuesta. */
  role?: "dialog" | "alertdialog";
  /** Clase extra para la caja del modal. */
  className?: string;
  /** Texto accesible del botón ×. */
  closeLabel?: string;
}

const suscribirNada = () => () => {};

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/**
 * Ventana modal accesible: se monta en un portal, retiene el foco, bloquea el scroll de la
 * página y se cierra con Escape. Para confirmar acciones usa ConfirmationDialog.
 */
export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  role = "dialog",
  className,
  closeLabel = "Cerrar",
}: ModalProps) {
  const id = useId();
  const titleId = `${id}-titulo`;
  const descId = `${id}-descripcion`;
  const dialogRef = useRef<HTMLDivElement>(null);
  // El portal necesita document: se monta después del primer render (seguro con SSR).
  const mounted = useSyncExternalStore(
    suscribirNada,
    () => true,
    () => false,
  );

  useEscapeKey(onClose, open && closeOnEscape);
  useFocusTrap(dialogRef, open && mounted);
  useLockBodyScroll(open);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className={styles.overlay}
      data-testid="modal-overlay"
      onMouseDown={(e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role={role}
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cx(styles.dialog, styles[`size-${size}`], className)}
      >
        {(title || showCloseButton) && (
          <div className={styles.header}>
            <div className={styles.headings}>
              {title && (
                <h2 id={titleId} className={styles.title}>
                  {title}
                </h2>
              )}
              {description && (
                <p id={descId} className={styles.description}>
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                className={styles.close}
                onClick={onClose}
                aria-label={closeLabel}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            )}
          </div>
        )}
        {children !== undefined && (
          <div className={styles.body}>{children}</div>
        )}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
