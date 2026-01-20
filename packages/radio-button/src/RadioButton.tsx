import React from "react";
import styles from "./RadioButton.module.css";

export type RadioSize = "sm" | "md" | "lg";
export type RadioVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger";

export interface RadioButtonProps {
  id?: string;
  name: string;
  label: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  description?: string;
  error?: string;
  className?: string;
  required?: boolean;
  size?: RadioSize;
  variant?: RadioVariant;
}

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const sizeClasses: Record<
  RadioSize,
  { radio: string; label: string; description: string; container: string }
> = {
  sm: {
    radio: styles.radioSm,
    label: styles.labelSm,
    description: styles.descriptionSm,
    container: styles.containerSm,
  },
  md: {
    radio: styles.radioMd,
    label: styles.labelMd,
    description: styles.descriptionMd,
    container: styles.containerMd,
  },
  lg: {
    radio: styles.radioLg,
    label: styles.labelLg,
    description: styles.descriptionLg,
    container: styles.containerLg,
  },
};

const variantClasses: Record<RadioVariant, { checked: string; focus: string }> =
  {
    default: {
      checked: styles.radioDefault,
      focus: styles.radioFocusDefault,
    },
    primary: {
      checked: styles.radioPrimary,
      focus: styles.radioFocusPrimary,
    },
    success: {
      checked: styles.radioSuccess,
      focus: styles.radioFocusSuccess,
    },
    warning: {
      checked: styles.radioWarning,
      focus: styles.radioFocusWarning,
    },
    danger: {
      checked: styles.radioDanger,
      focus: styles.radioFocusDanger,
    },
  };

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  label,
  value,
  checked = false,
  onChange,
  disabled = false,
  description,
  error,
  className = "",
  required = false,
  size = "md",
  variant = "default",
}) => {
  const radioId = id || `radio-${name}-${value}`;
  const sizes = sizeClasses[size];
  const variants = variantClasses[variant];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(event.target.value);
    }
  };

  const radioClasses = classNames(
    styles.radio,
    sizes.radio,
    sizes.container,
    variants.checked,
    variants.focus,
    required && !checked
      ? styles.radioBorderRequired
      : styles.radioBorderDefault,
    disabled && styles.radioDisabled,
  );

  const labelClasses = classNames(
    styles.label,
    sizes.label,
    disabled
      ? styles.labelDisabled
      : required && !checked
        ? styles.labelRequired
        : styles.labelDefault,
  );

  const descriptionClasses = classNames(styles.description, sizes.description);

  const errorClasses = classNames(
    styles.error,
    size === "sm"
      ? styles.errorSm
      : size === "lg"
        ? styles.errorLg
        : styles.errorMd,
  );

  return (
    <div
      className={classNames(styles.container, className)}
      data-testid="radio-button-container"
      data-size={size}
      data-variant={variant}
      data-checked={checked}
      data-disabled={disabled}
      data-error={!!error}
    >
      <div className={classNames(styles.radioWrapper, sizes.container)}>
        <input
          id={radioId}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={radioClasses}
          aria-describedby={description ? `${radioId}-description` : undefined}
          aria-invalid={!!error}
        />
      </div>
      <div className={styles.contentWrapper}>
        <label htmlFor={radioId} className={labelClasses}>
          {label}
        </label>
        {description && (
          <p id={`${radioId}-description`} className={descriptionClasses}>
            {description}
          </p>
        )}
        {error && <p className={errorClasses}>{error}</p>}
      </div>
    </div>
  );
};

export default RadioButton;
