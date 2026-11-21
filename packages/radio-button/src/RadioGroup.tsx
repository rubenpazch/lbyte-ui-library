import React from "react";
import RadioButton, { RadioSize, RadioVariant } from "./RadioButton";
import styles from "./RadioGroup.module.css";

export type RadioGroupOrientation = "vertical" | "horizontal";

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  orientation?: RadioGroupOrientation;
  size?: RadioSize;
  variant?: RadioVariant;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  /** Texto de ayuda bajo el grupo. */
  hint?: string;
  /** Etiqueta del grupo (alias de `groupLabel`). */
  label?: string;
  id?: string;
  className?: string;
  showSelectedLabel?: boolean;
  selectedLabelText?: string;
  groupLabel?: string;
  bordered?: boolean;
  borderLabel?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      name,
      options,
      value,
      onChange,
      orientation = "vertical",
      size = "md",
      variant = "default",
      disabled = false,
      required = false,
      error,
      hint,
      label,
      id,
      className = "",
      showSelectedLabel = false,
      selectedLabelText = "Seleccionado:",
      groupLabel,
      bordered = false,
      borderLabel,
    },
    ref,
  ) {
    const generatedId = React.useId();
    const baseId = id ?? `${name}-${generatedId}`;
    const titulo = groupLabel ?? label;
    const labelId = `${baseId}-etiqueta`;
    const hintId = `${baseId}-ayuda`;
    const errorId = `${baseId}-error`;
    const describedBy =
      [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;
    const orientationClasses = {
      vertical: styles.groupVertical,
      horizontal: styles.groupHorizontal,
    };

    const selectedOption = options.find((option) => option.value === value);

    const radioGroupContent = (
      <div
        ref={ref}
        id={baseId}
        className={orientationClasses[orientation]}
        role="radiogroup"
        aria-labelledby={titulo ? labelId : undefined}
        aria-label={!titulo ? borderLabel : undefined}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
      >
        {options.map((option) => (
          <RadioButton
            key={option.value}
            name={name}
            label={option.label}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            description={option.description}
            disabled={disabled || option.disabled}
            required={required}
            size={size}
            variant={variant}
          />
        ))}
      </div>
    );

    return (
      <div className={className}>
        {titulo && (
          <div
            id={labelId}
            className={`${styles.groupLabel} ${
              required && !value ? styles.groupLabelInvalid : ""
            }`}
          >
            {titulo}
          </div>
        )}
        {bordered ? (
          <fieldset
            className={`${styles.fieldset} ${
              required && !value ? styles.fieldsetInvalid : ""
            }`}
          >
            {borderLabel && (
              <legend
                className={`${styles.legend} ${
                  required && !value ? styles.legendInvalid : ""
                }`}
              >
                {borderLabel}
              </legend>
            )}
            {radioGroupContent}
          </fieldset>
        ) : (
          radioGroupContent
        )}
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
        {showSelectedLabel && (
          <div className={styles.selectedLabel}>
            <strong>{selectedLabelText}</strong>{" "}
            {selectedOption?.label || value || "Ninguno"}
          </div>
        )}
      </div>
    );
  },
);

export default RadioGroup;
