import React, { useRef, useEffect } from "react";
import styles from "./CheckboxInput.module.css";

type CheckboxSize = "sm" | "md" | "lg";
type CheckboxVariant = "default" | "primary" | "success" | "warning" | "danger";

interface CheckboxInputProps {
  id?: string;
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

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  id,
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
}) => {
  const inputId = id || `checkbox-${Math.random().toString(36).slice(2, 9)}`;
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
          ref={checkboxRef}
          id={inputId}
          type="checkbox"
          checked={checked}
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
          htmlFor={inputId}
          className={classNames(
            styles.label,
            sizeConfig.label,
            disabled ? styles.labelDisabled : styles.labelNormal,
          )}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        {description && (
          <p className={classNames(styles.description, sizeConfig.description)}>
            {description}
          </p>
        )}
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    </div>
  );
};

export default CheckboxInput;
