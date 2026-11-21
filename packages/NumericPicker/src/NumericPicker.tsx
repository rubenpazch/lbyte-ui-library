import React, { useEffect, useState } from "react";
import { useFieldIds } from "@rubenpazch/shared";
import styles from "./NumericPicker.module.css";

export interface NumericPickerProps {
  /** Valor actual (número o texto numérico con punto decimal). */
  value: string | number;
  /** Recibe el valor como texto con punto decimal (p. ej. "12.50"), o "" si está vacío. */
  onChange: (value: string) => void;
  /** Mínimo permitido. */
  min?: number;
  /** Máximo permitido. */
  max?: number;
  /** Paso de los botones + y −. */
  step?: number;
  /** Decimales con los que se formatea al salir del campo. */
  decimals?: number;
  /** Símbolo de moneda que se muestra delante. Usa "" para ocultarlo. */
  currency?: string;
  /** Etiqueta visible (se asocia al input). */
  label?: string;
  /** Texto de ayuda. */
  hint?: string;
  /** Mensaje de error; marca el campo como inválido. */
  error?: string;
  /** Campo obligatorio. */
  required?: boolean;
  /** Campo deshabilitado. */
  disabled?: boolean;
  /** Texto de ejemplo. */
  placeholder?: string;
  /** id del input; si no se pasa se genera uno. */
  id?: string;
  /** name del input. */
  name?: string;
  /** Clase extra para el contenedor. */
  className?: string;
  /** Textos accesibles de los botones. */
  labels?: Partial<{ increment: string; decrement: string }>;
}

const classNames = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/** Acepta solo dígitos, un signo − al inicio y un punto (o coma) decimal. */
function cleanTyped(text: string, allowNegative: boolean): string {
  let v = text.replace(",", ".").replace(/[^\d.-]/g, "");
  const negative = allowNegative && v.startsWith("-");
  v = v.replace(/-/g, "");
  const [int, ...rest] = v.split(".");
  v = rest.length ? `${int}.${rest.join("")}` : int;
  return negative ? `-${v}` : v;
}

/**
 * Campo numérico para montos, cantidades y precios. Mientras se escribe no se reformatea
 * (se puede escribir 12, 1250.5…); al salir del campo se aplican mínimo, máximo y decimales.
 */
const NumericPicker = React.forwardRef<HTMLInputElement, NumericPickerProps>(
  function NumericPicker(
    {
      value,
      onChange,
      min = 0,
      max = 999999,
      step = 1,
      decimals = 2,
      currency = "S/",
      label,
      hint,
      error,
      required = false,
      disabled = false,
      placeholder = "0.00",
      id,
      name,
      className,
      labels,
    },
    ref,
  ) {
    const text = { increment: "Aumentar", decrement: "Disminuir", ...labels };
    const field = useFieldIds({
      id,
      name,
      required,
      error,
      hint: hint && !error ? hint : undefined,
    });
    const [displayValue, setDisplayValue] = useState<string>(
      value === "" || value === null || value === undefined
        ? ""
        : String(value),
    );
    const editing = React.useRef(false);
    const setEditing = (v: boolean) => {
      editing.current = v;
    };

    // Sincroniza cuando cambia el valor externo (no mientras se escribe, para no mover el cursor).
    useEffect(() => {
      if (!editing.current) {
        setDisplayValue(
          value === "" || value === null || value === undefined
            ? ""
            : String(value),
        );
      }
    }, [value]);

    const clampAndFormat = (n: number) =>
      Math.min(Math.max(n, min), max).toFixed(decimals);

    const handleInputChange = (raw: string) => {
      const clean = cleanTyped(raw, min < 0);
      setDisplayValue(clean);
      if (clean === "" || clean === "-" || clean === "." || clean === "-.") {
        onChange("");
        return;
      }
      const n = Number(clean);
      if (!Number.isNaN(n)) onChange(clean);
    };

    const handleBlur = () => {
      setEditing(false);
      const n = Number(displayValue);
      if (displayValue === "" || Number.isNaN(n)) return;
      const formatted = clampAndFormat(n);
      setDisplayValue(formatted);
      if (formatted !== displayValue) onChange(formatted);
    };

    const stepBy = (delta: number) => {
      const current = Number(displayValue) || 0;
      const formatted = clampAndFormat(current + delta);
      setDisplayValue(formatted);
      onChange(formatted);
    };

    const current = Number(displayValue || "0");

    return (
      <div
        className={classNames(styles.container, className)}
        data-testid="numeric-picker"
      >
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

        <div
          className={classNames(
            styles.inputContainer,
            error && styles.inputError,
          )}
        >
          {currency && (
            <span
              className={styles.currency}
              data-testid="currency-symbol"
              aria-hidden="true"
            >
              {currency}
            </span>
          )}

          <input
            ref={ref}
            {...field.controlProps}
            name={name}
            required={required}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={displayValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setEditing(true)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                stepBy(step);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                stepBy(-step);
              }
            }}
            disabled={disabled}
            placeholder={placeholder}
            className={styles.input}
            data-testid="numeric-input"
          />

          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={() => stepBy(step)}
              disabled={disabled || current >= max}
              className={styles.button}
              aria-label={text.increment}
              title={text.increment}
              tabIndex={-1}
              data-testid="increment-button"
            >
              <svg
                className={styles.buttonIcon}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V15a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => stepBy(-step)}
              disabled={disabled || current <= min}
              className={styles.button}
              aria-label={text.decrement}
              title={text.decrement}
              tabIndex={-1}
              data-testid="decrement-button"
            >
              <svg
                className={styles.buttonIcon}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V5a1 1 0 012 0v9.586l4.293-4.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {hint && !error && (
          <p id={field.hintId} className={styles.hint}>
            {hint}
          </p>
        )}
        {error && (
          <p id={field.errorId} className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

NumericPicker.displayName = "NumericPicker";

export default NumericPicker;
