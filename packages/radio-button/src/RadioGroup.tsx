import React from "react";
import RadioButton, { RadioSize, RadioVariant } from "./RadioButton";

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
    vertical: "flex flex-col space-y-3",
    horizontal: "flex flex-row flex-wrap gap-4",
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
          className={`font-semibold mb-3 ${required && !value ? "text-red-600" : "text-gray-900"}`}
        >
          {groupLabel}
        </div>
      )}
      {bordered ? (
        <fieldset
          className={`rounded-lg p-4 ${required && !value ? "border-2 border-red-500" : "border border-gray-300"}`}
        >
          {borderLabel && (
            <legend
              className={`px-2 text-sm font-medium ${required && !value ? "text-red-600" : "text-gray-700"}`}
            >
              {borderLabel}
            </legend>
          )}
          {radioGroupContent}
        </fieldset>
      ) : (
        radioGroupContent
      )}
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      {showSelectedLabel && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <strong>{selectedLabelText}</strong>{" "}
          {selectedOption?.label || value || "None"}
        </div>
      )}
    </div>
  );
};

export default RadioGroup;
