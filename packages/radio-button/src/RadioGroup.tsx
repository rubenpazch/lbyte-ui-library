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
  className?: string;
  showSelectedLabel?: boolean;
  selectedLabelText?: string;
  groupLabel?: string;
  bordered?: boolean;
  borderLabel?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
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
  className = "",
  showSelectedLabel = false,
  selectedLabelText = "Selected:",
  groupLabel,
  bordered = false,
  borderLabel,
}) => {
  const orientationClasses = {
    vertical: styles.groupVertical,
    horizontal: styles.groupHorizontal,
  };

  const selectedOption = options.find((option) => option.value === value);

  const radioGroupContent = (
    <div className={orientationClasses[orientation]} role="radiogroup">
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
      {groupLabel && (
        <div
          className={`${styles.groupLabel} ${
            required && !value ? styles.groupLabelInvalid : ""
          }`}
        >
          {groupLabel}
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
      {error && <p className={styles.error}>{error}</p>}
      {showSelectedLabel && (
        <div className={styles.selectedLabel}>
          <strong>{selectedLabelText}</strong>{" "}
          {selectedOption?.label || value || "None"}
        </div>
      )}
    </div>
  );
};

export default RadioGroup;
