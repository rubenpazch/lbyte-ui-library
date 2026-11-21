import React from "react";
import { useFieldIds } from "@rubenpazch/shared";
import type { FieldProps } from "@rubenpazch/shared";
import styles from "./FormField.module.css";

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/** Atributos que FormField pasa al control (id y ARIA). */
export interface FormFieldControlProps {
  id: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
  "aria-required"?: true;
}

export interface FormFieldProps extends FieldProps {
  /**
   * El control. Puede ser un elemento (`<input />`, `<select>`) al que se le agregan id y ARIA,
   * o una función que recibe esos atributos: `{(props) => <MiControl {...props} />}`.
   */
  children:
    React.ReactElement | ((control: FormFieldControlProps) => React.ReactNode);
}

/**
 * Envoltorio de campo: etiqueta, ayuda, advertencia y error asociados a cualquier control
 * (nativo o de terceros). Los componentes de la librería ya lo traen; úsalo para controles propios.
 */
export default function FormField({
  label,
  hint,
  error,
  warning,
  required = false,
  disabled = false,
  id,
  name,
  className,
  children,
}: FormFieldProps) {
  const field = useFieldIds({
    id,
    name,
    required,
    error,
    warning: !error ? warning : undefined,
    hint,
  });
  const control: FormFieldControlProps = {
    ...field.controlProps,
    name,
    required,
    disabled,
  };
  const content =
    typeof children === "function"
      ? children(control)
      : React.cloneElement(
          children as React.ReactElement<Record<string, unknown>>,
          control as unknown as Record<string, unknown>,
        );

  return (
    <div className={cx(styles.field, disabled && styles.disabled, className)}>
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
      {content}
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
}

export interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Columnas en pantallas anchas (en móvil siempre 1). Por defecto 2. */
  columns?: 1 | 2 | 3 | 4;
}

/** Fila de campos en columnas que se apilan en móvil. */
export function FormRow({
  columns = 2,
  className,
  style,
  ...rest
}: FormRowProps) {
  return (
    <div
      className={cx(styles.row, className)}
      style={{ ...style, ["--lb-form-cols" as string]: columns }}
      {...rest}
    />
  );
}

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alineación de los botones: end (por defecto), start, between o center. */
  align?: "start" | "end" | "between" | "center";
  /** Fija el pie al fondo de la pantalla en formularios largos. */
  sticky?: boolean;
}

/** Pie de formulario con los botones (Cancelar / Guardar). */
export function FormActions({
  align = "end",
  sticky = false,
  className,
  ...rest
}: FormActionsProps) {
  return (
    <div
      className={cx(
        styles.actions,
        styles[`align-${align}`],
        sticky && styles.sticky,
        className,
      )}
      {...rest}
    />
  );
}
