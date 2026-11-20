import React from "react";
import { useFieldIds } from "@rubenpazch/shared";
import styles from "./Switch.module.css";

export interface SwitchProps {
  /** Encendido o apagado. */
  checked: boolean;
  /** Recibe el nuevo estado. */
  onChange: (checked: boolean) => void;
  /** Etiqueta visible a la derecha. */
  label: React.ReactNode;
  /** Texto de ayuda bajo la etiqueta. */
  description?: React.ReactNode;
  /** Deshabilitado. */
  disabled?: boolean;
  /** sm o md (por defecto). */
  size?: "sm" | "md";
  /** id del interruptor. */
  id?: string;
  /** name, para formularios. */
  name?: string;
  /** Clase extra. */
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/** Interruptor encendido/apagado (role="switch") para opciones que se aplican al instante. */
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked,
    onChange,
    label,
    description,
    disabled = false,
    size = "md",
    id,
    name,
    className,
  },
  ref,
) {
  const field = useFieldIds({ id, name });
  return (
    <div className={cx(styles.wrapper, disabled && styles.disabled, className)}>
      <button
        ref={ref}
        type="button"
        role="switch"
        id={field.inputId}
        name={name}
        aria-checked={checked}
        aria-labelledby={`${field.inputId}-etiqueta`}
        aria-describedby={description ? field.hintId : undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cx(styles.track, styles[size], checked && styles.on)}
      >
        <span className={styles.thumb} aria-hidden="true" />
      </button>
      <div className={styles.text}>
        <label
          id={`${field.inputId}-etiqueta`}
          htmlFor={field.inputId}
          className={styles.label}
        >
          {label}
        </label>
        {description && (
          <p id={field.hintId} className={styles.description}>
            {description}
          </p>
        )}
      </div>
      {name && <input type="hidden" name={name} value={checked ? "on" : ""} />}
    </div>
  );
});

Switch.displayName = "Switch";

export default Switch;
