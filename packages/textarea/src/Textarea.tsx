import React, { useLayoutEffect, useRef } from "react";
import { mergeRefs, useFieldIds } from "@rubenpazch/shared";
import type { FieldProps } from "@rubenpazch/shared";
import styles from "./Textarea.module.css";

export interface TextareaProps
  extends
    FieldProps,
    Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      | "onChange"
      | "value"
      | "id"
      | "name"
      | "required"
      | "disabled"
      | "className"
    > {
  /** Texto actual. */
  value: string;
  /** Recibe el texto nuevo. */
  onChange: (value: string) => void;
  /** Filas visibles al inicio (por defecto 4). */
  rows?: number;
  /** Crece con el contenido hasta maxRows. */
  autoResize?: boolean;
  /** Máximo de filas al crecer (por defecto 12). */
  maxRows?: number;
  /** Muestra el contador "120/500" cuando hay maxLength. */
  showCount?: boolean;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/** Área de texto con etiqueta, ayuda, error, contador y crecimiento automático. */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      hint,
      error,
      warning,
      required = false,
      disabled = false,
      id,
      name,
      className,
      value,
      onChange,
      rows = 4,
      autoResize = false,
      maxRows = 12,
      showCount = true,
      maxLength,
      ...rest
    },
    ref,
  ) {
    const field = useFieldIds({
      id,
      name,
      required,
      error,
      warning: !error ? warning : undefined,
      hint,
    });
    const inner = useRef<HTMLTextAreaElement>(null);

    useLayoutEffect(() => {
      const el = inner.current;
      if (!autoResize || !el) return;
      el.style.height = "auto";
      const line = parseFloat(getComputedStyle(el).lineHeight) || 20;
      el.style.height = `${Math.min(el.scrollHeight, line * maxRows + 16)}px`;
    }, [value, autoResize, maxRows]);

    const near = maxLength ? value.length / maxLength > 0.9 : false;

    return (
      <div className={cx(styles.field, className)}>
        {label && (
          <label htmlFor={field.inputId} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={mergeRefs(inner, ref)}
          {...rest}
          {...field.controlProps}
          name={name}
          required={required}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cx(
            styles.textarea,
            error && styles.invalid,
            autoResize && styles.autoResize,
          )}
        />
        <div className={styles.footer}>
          <div className={styles.messages}>
            {error && (
              <p id={field.errorId} className={styles.error} role="alert">
                {error}
              </p>
            )}
            {!error && warning && (
              <p id={field.warningId} className={styles.warning}>
                {warning}
              </p>
            )}
            {hint && (
              <p id={field.hintId} className={styles.hint}>
                {hint}
              </p>
            )}
          </div>
          {showCount && maxLength && (
            <span
              className={cx(styles.count, near && styles.countNear)}
              aria-live="polite"
            >
              {value.length}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
