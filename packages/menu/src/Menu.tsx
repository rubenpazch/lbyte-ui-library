import React, { useId, useRef, useState } from "react";
import { useClickOutside, useEscapeKey } from "@rubenpazch/shared";
import styles from "./Menu.module.css";

export interface MenuItem {
  /** Texto de la opción. */
  label: React.ReactNode;
  /** Al elegirla. */
  onSelect?: () => void;
  /** Si es un enlace. */
  href?: string;
  /** Icono a la izquierda. */
  icon?: React.ReactNode;
  /** Acción destructiva (en rojo). */
  danger?: boolean;
  disabled?: boolean;
}

export interface MenuProps {
  /** Opciones del menú. */
  items: MenuItem[];
  /** Botón que lo abre. Por defecto un botón "⋮" con el texto accesible de `label`. */
  trigger?: React.ReactElement;
  /** Texto accesible del botón por defecto (por defecto "Más opciones"). */
  label?: string;
  /** Alineación del panel respecto al botón: end (por defecto) o start. */
  align?: "start" | "end";
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/**
 * Menú de acciones (role="menu"): ⋮ con Editar, Duplicar, Eliminar… Flechas, Inicio, Fin,
 * Enter y Escape; se cierra al elegir o al hacer clic fuera.
 */
export default function Menu({
  items,
  trigger,
  label = "Más opciones",
  align = "end",
}: MenuProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const close = (focusTrigger = true) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  };
  useClickOutside(root, () => setOpen(false), open);
  useEscapeKey(() => close(), open);

  const enabledIdx = items
    .map((it, i) => (it.disabled ? -1 : i))
    .filter((i) => i >= 0);
  const focusItem = (i: number) => itemRefs.current[i]?.focus();
  const openAndFocus = (which: "first" | "last") => {
    setOpen(true);
    requestAnimationFrame(() =>
      focusItem(
        which === "first" ? enabledIdx[0] : enabledIdx[enabledIdx.length - 1],
      ),
    );
  };

  const triggerProps = {
    ref: (el: HTMLElement | null) => {
      triggerRef.current = el;
    },
    "aria-haspopup": "menu" as const,
    "aria-expanded": open,
    "aria-controls": open ? id : undefined,
    onClick: () => (open ? close(false) : openAndFocus("first")),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        openAndFocus("first");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        openAndFocus("last");
      }
    },
  };

  const onItemKey = (e: React.KeyboardEvent, i: number) => {
    const pos = enabledIdx.indexOf(i);
    let target: number | undefined;
    if (e.key === "ArrowDown")
      target = enabledIdx[(pos + 1) % enabledIdx.length];
    else if (e.key === "ArrowUp")
      target = enabledIdx[(pos - 1 + enabledIdx.length) % enabledIdx.length];
    else if (e.key === "Home") target = enabledIdx[0];
    else if (e.key === "End") target = enabledIdx[enabledIdx.length - 1];
    else if (e.key === "Tab") setOpen(false);
    if (target !== undefined) {
      e.preventDefault();
      focusItem(target);
    }
  };

  return (
    <div ref={root} className={styles.root}>
      {trigger ? (
        React.cloneElement(
          trigger as React.ReactElement<Record<string, unknown>>,
          triggerProps,
        )
      ) : (
        <button
          type="button"
          className={styles.trigger}
          aria-label={label}
          {...triggerProps}
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            width="18"
            height="18"
            aria-hidden="true"
          >
            <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm1.5 7a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
          </svg>
        </button>
      )}
      {open && (
        <div id={id} role="menu" className={cx(styles.menu, styles[align])}>
          {items.map((item, i) => {
            const common = {
              ref: (el: HTMLElement | null) => {
                itemRefs.current[i] = el;
              },
              role: "menuitem",
              tabIndex: -1,
              "aria-disabled": item.disabled || undefined,
              className: cx(
                styles.item,
                item.danger && styles.danger,
                item.disabled && styles.disabled,
              ),
              onKeyDown: (e: React.KeyboardEvent) => onItemKey(e, i),
              onClick: (e: React.MouseEvent) => {
                if (item.disabled) {
                  e.preventDefault();
                  return;
                }
                item.onSelect?.();
                close();
              },
            };
            const body = (
              <>
                {item.icon && (
                  <span className={styles.icon} aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </>
            );
            return item.href ? (
              <a key={i} href={item.href} {...common}>
                {body}
              </a>
            ) : (
              <button key={i} type="button" {...common}>
                {body}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
