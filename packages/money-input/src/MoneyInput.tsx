import React, { useEffect, useRef, useState } from "react";
import { useFieldIds } from "@rubenpazch/shared";
import type { FieldProps } from "@rubenpazch/shared";
import styles from "./MoneyInput.module.css";

export type Currency = "PEN" | "USD";

const SYMBOL: Record<Currency, string> = { PEN: "S/", USD: "US$" };

/**
 * Formatea un monto como en Perú: `formatMoney(1250.5, "PEN")` -> "S/ 1,250.50".
 * Usa coma de miles y punto decimal (es-PE).
 */
export function formatMoney(
  amount: number | null | undefined,
  currency: Currency = "PEN",
  decimals = 2,
): string {
  if (amount === null || amount === undefined || Number.isNaN(amount))
    return "";
  const n = new Intl.NumberFormat("es-PE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
  return `${SYMBOL[currency]} ${n}`;
}

const toText = (n: number | null | undefined, decimals: number) =>
  n === null || n === undefined || Number.isNaN(n)
    ? ""
    : new Intl.NumberFormat("es-PE", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(n);

/** "1,250.50" / "1250,5" / "S/ 1 250.50" -> 1250.5 ; "" -> null */
function parseAmount(text: string): number | null {
  let t = text.replace(/[^\d.,-]/g, "");
  if (!t || t === "-") return null;
  const lastComma = t.lastIndexOf(",");
  const lastDot = t.lastIndexOf(".");
  // El separador decimal es el último que aparece, si tiene 1 o 2 dígitos detrás.
  const decSep = lastComma > lastDot ? "," : ".";
  const decIdx = decSep === "," ? lastComma : lastDot;
  if (decIdx >= 0 && t.length - decIdx - 1 <= 2) {
    t = t.slice(0, decIdx).replace(/[.,]/g, "") + "." + t.slice(decIdx + 1);
  } else {
    t = t.replace(/[.,]/g, "");
  }
  const n = Number(t);
  return Number.isNaN(n) ? null : n;
}

export interface MoneyInputProps extends FieldProps {
  /** Monto actual como número (o null si está vacío). */
  value: number | null;
  /** Recibe el monto como número, o null si se borra. */
  onChange: (value: number | null) => void;
  /** PEN (por defecto, S/) o USD (US$). */
  currency?: Currency;
  /** Decimales (por defecto 2). */
  decimals?: number;
  /** Mínimo (por defecto 0). */
  min?: number;
  /** Máximo. */
  max?: number;
  /** Permite montos negativos (por defecto no). */
  allowNegative?: boolean;
  /** Texto de ejemplo. */
  placeholder?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/**
 * Campo de monto en soles o dólares. Mientras se escribe acepta "1250.5" o "1250,5"; al salir
 * muestra "1,250.50". Devuelve siempre un número (no texto).
 */
const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  function MoneyInput(
    {
      value,
      onChange,
      currency = "PEN",
      decimals = 2,
      min = 0,
      max,
      allowNegative = false,
      placeholder = "0.00",
      label,
      hint,
      error,
      warning,
      required = false,
      disabled = false,
      id,
      name,
      className,
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
    const [text, setText] = useState(() => toText(value, decimals));
    const editing = useRef(false);

    useEffect(() => {
      if (!editing.current) setText(toText(value, decimals));
    }, [value, decimals]);

    const clamp = (n: number) => {
      let v = n;
      if (!allowNegative && v < 0) v = Math.abs(v);
      if (min !== undefined && !(allowNegative && min === 0) && v < min)
        v = min;
      if (max !== undefined && v > max) v = max;
      return Number(v.toFixed(decimals));
    };

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
        <div
          className={cx(
            styles.box,
            error && styles.invalid,
            disabled && styles.disabled,
          )}
        >
          <span className={styles.symbol} aria-hidden="true">
            {SYMBOL[currency]}
          </span>
          <input
            ref={ref}
            {...field.controlProps}
            aria-label={
              label
                ? undefined
                : `Monto en ${currency === "PEN" ? "soles" : "dólares"}`
            }
            name={name}
            required={required}
            disabled={disabled}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder={placeholder}
            value={text}
            className={styles.input}
            onFocus={() => {
              editing.current = true;
              // Sin separadores de miles para editar cómodo.
              setText(
                value === null || value === undefined ? "" : String(value),
              );
            }}
            onChange={(e) => {
              const raw = allowNegative
                ? e.target.value
                : e.target.value.replace(/-/g, "");
              setText(raw);
              const n = parseAmount(raw);
              onChange(n === null ? null : n);
            }}
            onBlur={() => {
              editing.current = false;
              const n = parseAmount(text);
              if (n === null) {
                setText("");
                if (value !== null) onChange(null);
                return;
              }
              const v = clamp(n);
              setText(toText(v, decimals));
              if (v !== value) onChange(v);
            }}
          />
          <span className={styles.code} aria-hidden="true">
            {currency}
          </span>
        </div>
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
    );
  },
);

MoneyInput.displayName = "MoneyInput";

export default MoneyInput;
