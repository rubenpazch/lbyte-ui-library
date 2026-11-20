import React, { useRef, useEffect } from "react";
import { mergeRefs, useFieldIds } from "@rubenpazch/shared";
import styles from "./CheckboxInput.module.css";

type CheckboxSize = "sm" | "md" | "lg";
type CheckboxVariant = "default" | "primary" | "success" | "warning" | "danger";

export interface CheckboxInputProps {
  /** id del input; si no se pasa se genera uno estable. */
  id?: string;
  /** name del input (formularios nativos, react-hook-form…). */
  name?: string;
  /** Valor enviado con el formulario cuando está marcado. */
  value?: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  description?: string;
  error?: string;
  className?: string;
  required?: boolean;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  indeterminate?: boolean;
}

const sizeClasses: Record<
  CheckboxSize,
  {
    checkbox: string;
    label: string;
    description: string;
    container: string;
  }
> = {
  sm: {
    checkbox: styles.checkboxSm,
    label: styles.labelSm,
    description: styles.descriptionSm,
    container: styles.containerSm,
  },
  md: {
    checkbox: styles.checkboxMd,
    label: styles.labelMd,
    description: styles.descriptionMd,
    container: styles.containerMd,
  },
  lg: {
    checkbox: styles.checkboxLg,
    label: styles.labelLg,
    description: styles.descriptionLg,
    container: styles.containerLg,
  },
};

const variantClasses: Record<CheckboxVariant, string> = {
  default: styles.variantDefault,
  primary: styles.variantPrimary,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
  danger: styles.variantDanger,
};

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

/** Casilla de verificación con etiqueta, descripción y error. */
const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxInputProps>(
  function CheckboxInput(
    {
      id,
      name,
      value,
      label,
      checked = false,
      onChange,
      disabled = false,
      description,
      error,
      className = "",
      required = false,
      size = "md",
      variant = "default",
      indeterminate = false,
    },
    ref,
  ) {
    const field = useFieldIds({ id, name, required, error, hint: description });
    const sizeConfig = sizeClasses[size];
    const variantConfig = variantClasses[variant];
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className={classNames(styles.wrapper, className)}>
        <div
          className={classNames(styles.checkboxContainer, sizeConfig.container)}
        >
          <input
            ref={mergeRefs(checkboxRef, ref)}
            {...field.controlProps}
            name={name}
            value={value}
            type="checkbox"
            checked={checked}
            aria-checked={indeterminate ? "mixed" : undefined}
            onChange={(e) => {
              if (disabled) {
                return;
              }
              onChange?.(e.target.checked);
            }}
            disabled={disabled}
            className={classNames(
              styles.checkbox,
              sizeConfig.checkbox,
              variantConfig,
              disabled && styles.checkboxDisabled,
              error && styles.checkboxError,
            )}
            required={required}
          />
        </div>
        <div className={styles.content}>
          <label
            htmlFor={field.inputId}
            className={classNames(
              styles.label,
              sizeConfig.label,
              disabled ? styles.labelDisabled : styles.labelNormal,
            )}
          >
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
          {description && (
            <p
              id={field.hintId}
              className={classNames(styles.description, sizeConfig.description)}
            >
              {description}
            </p>
          )}
          {error && (
            <p id={field.errorId} className={styles.errorText} role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  },
);

CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
