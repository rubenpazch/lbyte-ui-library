import {
  useState,
  useMemo,
  KeyboardEvent,
  FocusEvent,
  ChangeEvent,
} from "react";
import { MinusIcon, PlusIcon, CheckIcon, CloseIcon } from "@rubenpazch/icons";

// CSS to hide native number input spinners
const hideSpinnersStyle = `
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

export type NumericUpPickerSize = "small" | "medium" | "large";

export interface NumericUpPickerProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  hint?: string;
  warning?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  useMinAsDefault?: boolean;
  alwaysNegative?: boolean; // Flag to always display values as negative
  integerOnly?: boolean; // Flag to only allow integer values (no decimals)
  showSign?: boolean; // Flag to always show +/- sign
  defaultToZero?: boolean; // Flag to start at 0 instead of min/max when empty
  clearable?: boolean; // Flag to show clear button when value exists
  onClear?: () => void; // Callback when clear button is clicked
  size?: NumericUpPickerSize; // Size variation: small, medium, large
}

export default function NumericUpPicker({
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  min,
  max,
  step = 0.01,
  error,
  hint,
  warning,
  disabled = false,
  className = "",
  required = false,
  useMinAsDefault = false,
  alwaysNegative = false,
  integerOnly = false,
  showSign = false,
  defaultToZero = false,
  clearable = false,
  onClear,
  size = "medium",
}: NumericUpPickerProps) {
  // Track if the field has been touched (user has focused on it)
  const [hasBeenTouched, setHasBeenTouched] = useState(false);
  const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;

  // Size-based styling
  const sizeClasses = {
    container: {
      small: "h-8",
      medium: "h-12",
      large: "h-16",
    },
    input: {
      small: "text-xs",
      medium: "text-lg",
      large: "text-2xl",
    },
    button: {
      small: "w-8",
      medium: "w-12",
      large: "w-16",
    },
    icon: {
      small: "sm",
      medium: "md",
      large: "lg",
    },
    label: {
      small: "text-xs",
      medium: "text-sm",
      large: "text-base",
    },
  };

  const containerSize = sizeClasses.container[size];
  const inputSize = sizeClasses.input[size];
  const buttonSize = sizeClasses.button[size];
  const iconSize = sizeClasses.icon[size] as "sm" | "md" | "lg";
  const labelSize = sizeClasses.label[size];

  // Format display value with sign if showSign is true
  const displayValue = useMemo(() => {
    if (
      !showSign ||
      value === "" ||
      value === "-" ||
      value === null ||
      value === undefined
    )
      return value || "";
    const strValue = value.toString();
    const numVal = parseFloat(strValue);
    if (isNaN(numVal)) return value;
    if (numVal > 0 && !strValue.startsWith("+")) {
      return `+${strValue}`;
    }
    return value;
  }, [value, showSign]);

  const handleIncrement = () => {
    // If value is empty or invalid, start from 0 if defaultToZero, otherwise from min (or 0 if no min)
    if (
      value === "" ||
      value === "-" ||
      value === null ||
      value === undefined
    ) {
      const startValue = defaultToZero ? 0 : min !== undefined ? min : 0;
      if (integerOnly) {
        onChange(Math.round(startValue).toString());
      } else {
        onChange(startValue.toFixed(2));
      }
      return;
    }

    const newValue = numValue + step;
    if (max === undefined || newValue <= max) {
      if (integerOnly) {
        onChange(Math.round(newValue).toString());
      } else {
        const formattedValue = newValue.toFixed(2);
        // If alwaysNegative, ensure the value has a negative sign
        onChange(
          alwaysNegative && newValue > 0
            ? `-${formattedValue}`
            : formattedValue,
        );
      }
    }
  };

  const handleDecrement = () => {
    // If value is empty or invalid, start from 0 if defaultToZero, otherwise from max (or 0 if no max)
    if (
      value === "" ||
      value === "-" ||
      value === null ||
      value === undefined
    ) {
      const startValue = defaultToZero ? 0 : max !== undefined ? max : 0;
      if (integerOnly) {
        onChange(Math.round(startValue).toString());
      } else {
        onChange(startValue.toFixed(2));
      }
      return;
    }

    const newValue = numValue - step;
    if (min === undefined || newValue >= min) {
      if (integerOnly) {
        onChange(Math.round(newValue).toString());
      } else if (alwaysNegative) {
        // For alwaysNegative fields, work with absolute value
        const formattedValue = Math.abs(newValue).toFixed(2);
        onChange(`-${formattedValue}`);
      } else {
        onChange(newValue.toFixed(2));
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Handle arrow up/down keys for incrementing/decrementing
    if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent cursor movement
      handleIncrement();
    } else if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent cursor movement
      handleDecrement();
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    // Mark field as touched when user focuses on it
    setHasBeenTouched(true);
    // Auto-select all content when focusing
    e.target.select();
    onFocus?.();
  };

  const handleDirectInput = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // For showSign, remove the plus sign before processing
    if (showSign) {
      inputValue = inputValue.replace(/^\+/, "");
    }

    // For alwaysNegative fields, ensure value always starts with minus sign
    if (alwaysNegative) {
      // Remove any existing minus signs
      inputValue = inputValue.replace(/-/g, "");

      // Allow empty input
      if (inputValue === "") {
        onChange("-");
        return;
      }

      // Add minus sign at the beginning
      inputValue = `-${inputValue}`;
    }

    // Allow empty input (user deleted content)
    if (inputValue === "" || inputValue === "-") {
      onChange(inputValue);
      return;
    }

    // Allow typing decimals and negative signs
    onChange(inputValue);
  };

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  const handleBlurWithValidation = () => {
    const inputValue = value.toString();

    // If empty, handle based on required and useMinAsDefault flags
    if (inputValue === "" || inputValue === "-") {
      // For optional fields (!required), allow empty values
      if (!required) {
        onChange("");
        onBlur?.();
        return;
      }

      // For required fields, only apply useMinAsDefault if the field has been touched
      if (useMinAsDefault && hasBeenTouched && min !== undefined) {
        if (integerOnly) {
          onChange(Math.round(min).toString());
        } else {
          const formattedValue = Math.abs(min).toFixed(2);
          onChange(alwaysNegative ? `-${formattedValue}` : min.toFixed(2));
        }
      } else if (!useMinAsDefault && min !== undefined) {
        // For required fields without useMinAsDefault, set to min
        if (integerOnly) {
          onChange(Math.round(min).toString());
        } else {
          const formattedValue = Math.abs(min).toFixed(2);
          onChange(alwaysNegative ? `-${formattedValue}` : min.toFixed(2));
        }
      } else if (!hasBeenTouched) {
        // If never touched, keep it empty
        onChange("");
      } else {
        onChange(integerOnly ? "0" : alwaysNegative ? "-0.00" : "0.00");
      }
      onBlur?.();
      return;
    }

    // Parse the input value (remove negative sign if present for alwaysNegative fields)
    let numericValue = alwaysNegative
      ? parseFloat(inputValue.replace(/^-/, ""))
      : parseFloat(inputValue);

    // If not a valid number, reset to min or 0
    if (isNaN(numericValue)) {
      if (useMinAsDefault && min !== undefined) {
        if (integerOnly) {
          onChange(Math.round(min).toString());
        } else {
          const formattedValue = Math.abs(min).toFixed(2);
          onChange(alwaysNegative ? `-${formattedValue}` : min.toFixed(2));
        }
      } else if (min !== undefined) {
        if (integerOnly) {
          onChange(Math.round(min).toString());
        } else {
          const formattedValue = Math.abs(min).toFixed(2);
          onChange(alwaysNegative ? `-${formattedValue}` : min.toFixed(2));
        }
      } else {
        onChange(integerOnly ? "0" : alwaysNegative ? "-0.00" : "0.00");
      }
      onBlur?.();
      return;
    }

    // For alwaysNegative fields, work with absolute values for min/max comparison
    if (alwaysNegative) {
      // Clamp the absolute value within the absolute range
      const absMin = Math.abs(max ?? -0.25); // max is the least negative (closest to 0)
      const absMax = Math.abs(min ?? -10.0); // min is the most negative (farthest from 0)

      if (numericValue < absMin) {
        numericValue = absMin;
      }
      if (numericValue > absMax) {
        numericValue = absMax;
      }

      onChange(`-${numericValue.toFixed(2)}`);
      onBlur?.();
      return;
    }

    // Apply useMinAsDefault logic: if value is below min, set to min
    if (useMinAsDefault && min !== undefined && numericValue < min) {
      onChange(integerOnly ? Math.round(min).toString() : min.toFixed(2));
      onBlur?.();
      return;
    }

    // Clamp the value within the range
    let constrainedValue = numericValue;

    if (min !== undefined && constrainedValue < min) {
      constrainedValue = min;
    }

    if (max !== undefined && constrainedValue > max) {
      constrainedValue = max;
    }

    // Format and send the constrained value
    if (integerOnly) {
      onChange(Math.round(constrainedValue).toString());
    } else {
      onChange(constrainedValue.toFixed(2));
    }
    onBlur?.();
  };

  // Disable buttons only if value is not empty and at min/max
  // When value is empty, allow both buttons (they will set to min/max)
  const isEmpty =
    value === "" || value === "-" || value === null || value === undefined;

  // For alwaysNegative fields, we compare absolute values
  const isAtMin =
    !isEmpty &&
    (alwaysNegative
      ? min !== undefined && Math.abs(numValue) >= Math.abs(min)
      : min !== undefined && numValue <= min);

  const isAtMax =
    !isEmpty &&
    (alwaysNegative
      ? max !== undefined && Math.abs(numValue) <= Math.abs(max)
      : max !== undefined && numValue >= max);

  return (
    <div className={className}>
      <style>{hideSpinnersStyle}</style>
      {/* Top Label */}
      {label && (
        <label
          className={`block font-medium mb-2 ${labelSize} ${error ? "text-red-700" : "text-gray-700"}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Stepper Container - Compact */}
      <div
        className={`flex items-center justify-between ${containerSize} rounded-lg border-2 transition-all ${
          error
            ? "border-red-500 bg-red-50"
            : disabled
              ? "border-gray-300 bg-gray-100 opacity-50 cursor-not-allowed"
              : "border-gray-300 bg-gray-50"
        }`}
      >
        {/* Minus Button */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || isAtMin}
          className={`flex-shrink-0 ${buttonSize} h-full flex items-center justify-center border-r border-gray-300 transition-all ${
            error
              ? "text-red-500"
              : disabled || isAtMin
                ? "opacity-40 cursor-not-allowed text-gray-400"
                : "hover:bg-gray-100 active:bg-gray-200 text-gray-600"
          }`}
          title="Decrease value"
          aria-label="Decrease"
        >
          <MinusIcon size={iconSize} />
        </button>

        {/* Center Display Area */}
        <div className="flex-1 flex items-center justify-center">
          {/* Value Display Only */}
          <input
            type="text"
            step={step}
            min={min}
            max={max}
            value={displayValue}
            onChange={handleDirectInput}
            onBlur={handleBlurWithValidation}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={`text-center bg-transparent font-semibold placeholder-gray-400 focus:outline-none border-none ${inputSize} ${
              error ? "text-red-700" : "text-gray-900"
            } w-full`}
            style={{
              WebkitAppearance: "none",
              MozAppearance: "textfield",
              appearance: "none",
            }}
          />
        </div>

        {/* Clear Button - appears when clearable and has value */}
        {clearable && !isEmpty && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="flex-shrink-0 w-6 h-6 mr-2 flex items-center justify-center rounded-full transition-all hover:bg-gray-200 active:bg-gray-300 text-gray-500 hover:text-gray-700"
            title="Clear value"
            aria-label="Clear"
          >
            <CloseIcon size="sm" />
          </button>
        )}

        {/* Plus Button */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || isAtMax}
          className={`flex-shrink-0 ${buttonSize} h-full flex items-center justify-center border-l border-gray-300 transition-all ${
            error
              ? "text-red-500"
              : disabled || isAtMax
                ? "opacity-40 cursor-not-allowed text-gray-400"
                : "hover:bg-gray-100 active:bg-gray-200 text-gray-600"
          }`}
          title="Increase value"
          aria-label="Increase"
        >
          <PlusIcon size={iconSize} />
        </button>
      </div>

      {/* Bottom Messages: Error has priority */}
      {error && (
        <div className="mt-2 flex items-start gap-1.5">
          <CheckIcon size="sm" className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Warning message (shows if no error) */}
      {warning && !error && (
        <div className="mt-2 flex items-start gap-1.5">
          <div className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5 flex items-center justify-center">
            <span className="text-xs font-bold">!</span>
          </div>
          <p className="text-sm text-amber-700">{warning}</p>
        </div>
      )}

      {/* Hint message (shows if no error or warning) */}
      {hint && !error && !warning && (
        <p className="mt-2 text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
}
