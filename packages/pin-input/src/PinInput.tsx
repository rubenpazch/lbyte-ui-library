import React, { useEffect, useRef } from "react";
import { useFieldIds } from "@rubenpazch/shared";
import styles from "./PinInput.module.css";

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

export interface PinInputProps {
  /** Código escrito hasta ahora (sin huecos: "12" son las dos primeras casillas). */
  value: string;
  /** Recibe el código cada vez que cambia. */
  onChange: (value: string) => void;
  /** Se llama una vez cuando se completan todas las casillas (p. ej. para enviar). */
  onComplete?: (value: string) => void;
  /** Número de casillas. Por defecto 6. */
  length?: number;
  /** `numeric` (solo dígitos, teclado numérico) o `alphanumeric` (letras y números, en mayúsculas). */
  type?: "numeric" | "alphanumeric";
  /** Oculta lo escrito como en una contraseña (PIN). */
  mask?: boolean;
  /** Etiqueta del grupo ("Código de verificación"). */
  label?: string;
  /** Texto de ayuda ("Te lo enviamos por correo"). */
  hint?: string;
  /** Mensaje de error; marca las casillas en rojo. */
  error?: string;
  /** name de un input oculto con el código completo (formularios nativos). */
  name?: string;
  /** id de la primera casilla (la etiqueta apunta a ella). */
  id?: string;
  /** Deshabilita las casillas. */
  disabled?: boolean;
  /** Campo obligatorio. */
  required?: boolean;
  /** Pone el foco en la primera casilla vacía al montar. */
  autoFocus?: boolean;
  /** Separa las casillas en grupos de este tamaño (3 → `123 – 456`). */
  groupSize?: number;
  /** Tamaño de las casillas. */
  size?: "sm" | "md" | "lg";
  /** Nombre accesible de cada casilla. Por defecto "Carácter 1 de 6". */
  boxLabel?: (index: number, length: number) => string;
  /** Clase extra del contenedor. */
  className?: string;
}

/**
 * Código de verificación (OTP) o PIN en casillas: avanza solo al escribir, retrocede con
 * borrar, acepta pegar el código completo y el autocompletado del SMS en móviles.
 */
export default function PinInput({
  value,
  onChange,
  onComplete,
  length = 6,
  type = "numeric",
  mask = false,
  label,
  hint,
  error,
  name,
  id,
  disabled = false,
  required = false,
  autoFocus = false,
  groupSize,
  size = "md",
  boxLabel = (i, n) => `Carácter ${i + 1} de ${n}`,
  className,
}: PinInputProps) {
  const field = useFieldIds({ id, name, hint, error, required });
  const labelId = `${field.inputId}-etiqueta`;
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const valido = type === "numeric" ? /[0-9]/ : /[a-zA-Z0-9]/;

  const limpiar = (texto: string) =>
    Array.from(texto)
      .filter((c) => valido.test(c))
      .join("")
      .toUpperCase();

  const actual = limpiar(value).slice(0, length);
  const chars = Array.from({ length }, (_, i) => actual[i] ?? "");

  const enfocar = (i: number) => {
    const el = refs.current[Math.max(0, Math.min(i, length - 1))];
    el?.focus();
    el?.select();
  };

  useEffect(() => {
    if (autoFocus) enfocar(actual.length);
    // Solo al montar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emitir = (nuevo: string) => {
    const final = nuevo.slice(0, length);
    if (final === actual) return;
    onChange(final);
    if (final.length === length) onComplete?.(final);
  };

  /** Escribe `texto` desde la casilla `i` (sin dejar huecos). */
  const escribir = (i: number, texto: string) => {
    const nuevos = limpiar(texto);
    if (!nuevos) return;
    const desde = Math.min(i, actual.length);
    const nuevo = (
      actual.slice(0, desde) +
      nuevos +
      actual.slice(desde + nuevos.length)
    ).slice(0, length);
    emitir(nuevo);
    enfocar(desde + nuevos.length);
  };

  const borrar = (i: number) => {
    if (i >= actual.length) return;
    emitir(actual.slice(0, i) + actual.slice(i + 1));
  };

  const onKeyDown =
    (i: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Backspace":
          e.preventDefault();
          if (chars[i]) {
            borrar(i);
          } else if (i > 0) {
            borrar(i - 1);
            enfocar(i - 1);
          }
          break;
        case "Delete":
          e.preventDefault();
          borrar(i);
          break;
        case "ArrowLeft":
          e.preventDefault();
          enfocar(i - 1);
          break;
        case "ArrowRight":
          e.preventDefault();
          enfocar(Math.min(i + 1, actual.length));
          break;
        case "Home":
          e.preventDefault();
          enfocar(0);
          break;
        case "End":
          e.preventDefault();
          enfocar(actual.length);
          break;
      }
    };

  const onInput = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const escrito = e.target.value;
    // Al escribir sobre una casilla llena llegan dos caracteres: se queda el nuevo.
    const texto =
      chars[i] && escrito.length === 2 && escrito.startsWith(chars[i])
        ? escrito.slice(1)
        : escrito;
    if (!texto) {
      borrar(i);
      return;
    }
    escribir(i, texto);
  };

  const onPaste =
    (i: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      escribir(i, e.clipboardData.getData("text"));
    };

  const describedBy = field.controlProps["aria-describedby"];

  return (
    <div className={cx(styles.container, className)}>
      {label && (
        <label id={labelId} htmlFor={field.inputId} className={styles.label}>
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
        role="group"
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={describedBy}
        className={styles.boxes}
      >
        {chars.map((c, i) => (
          <React.Fragment key={i}>
            {groupSize && i > 0 && i % groupSize === 0 && (
              <span className={styles.separator} aria-hidden="true">
                –
              </span>
            )}
            <input
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={i === 0 ? field.inputId : `${field.inputId}-${i}`}
              className={cx(
                styles.box,
                styles[size],
                Boolean(error) && styles.boxError,
                Boolean(c) && styles.boxFilled,
              )}
              type={mask ? "password" : "text"}
              inputMode={type === "numeric" ? "numeric" : "text"}
              autoComplete={i === 0 ? "one-time-code" : "off"}
              autoCapitalize={type === "alphanumeric" ? "characters" : "off"}
              autoCorrect="off"
              spellCheck={false}
              // El primer input admite el código entero (autocompletado del SMS en iOS).
              maxLength={i === 0 ? length : 2}
              value={c}
              aria-label={boxLabel(i, length)}
              aria-invalid={error ? true : undefined}
              aria-required={required || undefined}
              aria-describedby={describedBy}
              disabled={disabled}
              onChange={onInput(i)}
              onKeyDown={onKeyDown(i)}
              onPaste={onPaste(i)}
              onFocus={(e) => e.target.select()}
              data-testid={`pin-${i}`}
            />
          </React.Fragment>
        ))}
      </div>
      {name && <input type="hidden" name={name} value={actual} />}
      {hint && (
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
}
