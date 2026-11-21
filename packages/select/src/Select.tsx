import React from "react";
import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  /** Texto de ayuda bajo el campo. */
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    value,
    onChange,
    options,
    placeholder,
    hint,
    error,
    required = false,
    disabled = false,
    id,
    name,
    className,
  },
  ref,
) {
  const generatedId = React.useId();
  const selectId = id ?? name ?? generatedId;
  const errorId = `${selectId}-error`;
  const hintId = `${selectId}-ayuda`;
  const describedBy =
    [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={classNames(styles.field, className)}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}

      <select
        ref={ref}
        id={selectId}
        name={name}
        className={classNames(styles.select, error && styles.selectError)}
        value={value}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Select;
