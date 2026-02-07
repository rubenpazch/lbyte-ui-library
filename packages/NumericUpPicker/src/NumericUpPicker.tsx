import {
  useState,
  useMemo,
  KeyboardEvent,
  FocusEvent,
  ChangeEvent,
} from "react";
import { MinusIcon, PlusIcon, CheckIcon, CloseIcon } from "@rubenpazch/icons";
import styles from "./NumericUpPicker.module.css";

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

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

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
  const [hasBeenBlurred, setHasBeenBlurred] = useState(false);
  const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;

  // Size-based styling
  const sizeClasses = {
    container: {
      small: styles.stepperSmall,
      medium: styles.stepperMedium,
      large: styles.stepperLarge,
    },
    input: {
      small: styles.inputSmall,
      medium: styles.inputMedium,
      large: styles.inputLarge,
    },
    button: {
      small: styles.buttonSmall,
      medium: styles.buttonMedium,
      large: styles.buttonLarge,
    },
    icon: {
      small: "sm",
      medium: "md",
      large: "lg",
    },
    label: {
      small: styles.labelSmall,
      medium: styles.labelMedium,
      large: styles.labelLarge,
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
    setHasBeenBlurred(true);
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

  const parsedValue =
    typeof value === "string" ? parseFloat(value.replace(/^\+/, "")) : value;
  const isNumericValue = !Number.isNaN(parsedValue);

  const isWithinRange = (() => {
    if (!isNumericValue) return false;
    if (alwaysNegative) {
      const absMin = Math.abs(max ?? -0.25);
      const absMax = Math.abs(min ?? -10.0);
      const absValue = Math.abs(parsedValue);
      return absValue >= absMin && absValue <= absMax;
    }
    if (min !== undefined && parsedValue < min) return false;
    if (max !== undefined && parsedValue > max) return false;
    return true;
  })();

  const showSuccess =
    hasBeenBlurred &&
    !disabled &&
    !error &&
    !warning &&
    !isEmpty &&
    isNumericValue &&
    isWithinRange;

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
    <div className={className} data-testid="numeric-up-picker">
      <style>{hideSpinnersStyle}</style>
      {/* Top Label */}
      {label && (
        <label
          className={classNames(
            styles.label,
            labelSize,
            error ? styles.labelError : styles.labelNormal,
          )}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* Stepper Container - Compact */}
      <div
        className={classNames(
          styles.stepper,
          containerSize,
          error && styles.stepperError,
          disabled && styles.stepperDisabled,
          !error &&
            !disabled &&
            (showSuccess ? styles.stepperSuccess : styles.stepperNormal),
        )}
        data-testid="stepper-container"
        data-error={!!error}
        data-disabled={disabled}
      >
        {/* Minus Button */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || isAtMin}
          className={classNames(
            styles.button,
            styles.buttonLeft,
            buttonSize,
            error ? styles.buttonError : styles.buttonNormal,
          )}
          title="Decrease value"
          aria-label="Decrease"
          data-testid="decrement-button"
        >
          <MinusIcon size={iconSize} />
        </button>

        {/* Center Display Area */}
        <div className={styles.inputWrapper}>
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
            className={classNames(
              styles.input,
              inputSize,
              error
                ? styles.inputError
                : showSuccess
                  ? styles.inputSuccess
                  : styles.inputNormal,
              clearable && !isEmpty && styles.inputWithClear,
            )}
            style={{
              WebkitAppearance: "none",
              MozAppearance: "textfield",
              appearance: "none",
            }}
            data-testid="numeric-up-input"
          />

          {/* Clear Button - appears when clearable and has value */}
          {clearable && !isEmpty && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className={styles.clearButton}
              title="Clear value"
              aria-label="Clear"
              data-testid="clear-button"
            >
              <CloseIcon size="sm" className={styles.clearIcon} />
            </button>
          )}
        </div>

        {/* Plus Button */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || isAtMax}
          className={classNames(
            styles.button,
            styles.buttonRight,
            buttonSize,
            error ? styles.buttonError : styles.buttonNormal,
          )}
          title="Increase value"
          aria-label="Increase"
          data-testid="increment-button"
        >
          <PlusIcon size={iconSize} />
        </button>
      </div>

      {/* Bottom Messages: Error has priority */}
      {error && (
        <div className={classNames(styles.message, styles.errorMessage)}>
          <CheckIcon size="sm" className={styles.messageIcon} />
          <p className={styles.messageText}>{error}</p>
        </div>
      )}

      {/* Warning message (shows if no error) */}
      {warning && !error && (
        <div className={classNames(styles.message, styles.warningMessage)}>
          <div className={styles.messageIcon}>
            <span>!</span>
          </div>
          <p className={styles.messageText}>{warning}</p>
        </div>
      )}

      {/* Hint message (shows if no error or warning) */}
      {hint && !error && !warning && (
        <div className={classNames(styles.message, styles.hintMessage)}>
          <p className={styles.messageText}>{hint}</p>
        </div>
      )}
    </div>
  );
}
