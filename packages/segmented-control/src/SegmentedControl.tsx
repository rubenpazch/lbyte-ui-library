import React, { useRef } from "react";
import styles from "./SegmentedControl.module.css";

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  /** Icono opcional antes del texto. */
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  /** Opciones (2 a 5 funcionan mejor). */
  options: SegmentedOption<T>[];
  /** Valor seleccionado. */
  value: T;
  /** Recibe el valor elegido. */
  onChange: (value: T) => void;
  /** Nombre accesible del grupo: "Ámbito", "Vista". */
  "aria-label": string;
  /** sm o md (por defecto). */
  size?: "sm" | "md";
  /** Ocupa todo el ancho. */
  fullWidth?: boolean;
  /** Clase extra. */
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/**
 * Selector de una opción entre pocas, como botones unidos (role="radiogroup"). Se mueve con
 * las flechas del teclado. Ej.: Personal | Empresa, Mes | Año.
 */
export default function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  size = "md",
  fullWidth = false,
  className,
}: SegmentedControlProps<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const enabled = options
    .map((o, i) => ({ o, i }))
    .filter(({ o }) => !o.disabled);

  const move = (from: number, delta: number) => {
    const pos = enabled.findIndex(({ i }) => i === from);
    const next = enabled[(pos + delta + enabled.length) % enabled.length];
    if (!next) return;
    onChange(next.o.value);
    refs.current[next.i]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cx(
        styles.group,
        styles[size],
        fullWidth && styles.full,
        className,
      )}
    >
      {options.map((opt, i) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            disabled={opt.disabled}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                move(i, 1);
              } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                move(i, -1);
              }
            }}
            className={cx(styles.segment, selected && styles.selected)}
          >
            {opt.icon && (
              <span className={styles.icon} aria-hidden="true">
                {opt.icon}
              </span>
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
