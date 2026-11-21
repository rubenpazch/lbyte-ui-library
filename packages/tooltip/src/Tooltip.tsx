import React, { useId, useRef, useState } from "react";
import { useEscapeKey } from "@rubenpazch/shared";
import styles from "./Tooltip.module.css";

export interface TooltipProps {
  /** Texto del tooltip (breve, sin elementos interactivos). */
  content: React.ReactNode;
  /** Elemento que lo dispara (un botón, un icono con foco). Debe aceptar ref y eventos. */
  children: React.ReactElement;
  /** Posición: top (por defecto), bottom, left o right. */
  placement?: "top" | "bottom" | "left" | "right";
  /** Espera en ms antes de mostrarse al pasar el mouse (por defecto 300). */
  delay?: number;
}

/**
 * Texto de ayuda al pasar el mouse o enfocar con el teclado; se cierra con Escape. Se asocia al
 * elemento con aria-describedby. No pongas acciones dentro: usa Menu o Modal.
 */
export default function Tooltip({
  content,
  children,
  placement = "top",
  delay = 300,
}: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEscapeKey(() => setOpen(false), open);

  const show = (wait: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), wait);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  };

  const child = children as React.ReactElement<Record<string, unknown>>;
  const props = child.props as Record<string, (e: unknown) => void> & {
    "aria-describedby"?: string;
  };
  const trigger = React.cloneElement(child, {
    "aria-describedby":
      [props["aria-describedby"], open ? id : undefined]
        .filter(Boolean)
        .join(" ") || undefined,
    onMouseEnter: (e: unknown) => {
      props.onMouseEnter?.(e);
      show(delay);
    },
    onMouseLeave: (e: unknown) => {
      props.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e: unknown) => {
      props.onFocus?.(e);
      show(0);
    },
    onBlur: (e: unknown) => {
      props.onBlur?.(e);
      hide();
    },
  });

  return (
    <span className={styles.wrapper}>
      {trigger}
      {open && (
        <span
          role="tooltip"
          id={id}
          className={`${styles.tooltip} ${styles[placement]}`}
        >
          {content}
        </span>
      )}
    </span>
  );
}
