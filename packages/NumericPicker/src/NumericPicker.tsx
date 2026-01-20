import { useState, useEffect } from "react";
import styles from "./NumericPicker.module.css";

export interface NumericPickerProps {
  value: string | number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  decimals?: number;
  currency?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function NumericPicker({
  value,
  onChange,
  min = 0,
  max = 999999,
  step = 1,
  decimals = 2,
  currency = "S/.",
  label,
  required = false,
  disabled = false,
  placeholder = "0.00",
}: NumericPickerProps) {
  const [displayValue, setDisplayValue] = useState<string>(String(value || ""));

  useEffect(() => {
    setDisplayValue(String(value || ""));
  }, [value]);

  const handleInputChange = (newValue: string) => {
    // Remove currency symbol if present
    let cleanValue = newValue.replace(/[^\d.-]/g, "");

    // Validate and format
    if (cleanValue === "" || cleanValue === "-") {
      setDisplayValue(cleanValue);
      onChange("");
      return;
    }

    const numValue = parseFloat(cleanValue);

    // Validate range
    if (isNaN(numValue)) {
      return;
    }

    if (numValue < min) {
      setDisplayValue(String(min));
      onChange(String(min));
      return;
    }

    if (numValue > max) {
      setDisplayValue(String(max));
      onChange(String(max));
      return;
    }

    // Format with decimals
    const formatted = numValue.toFixed(decimals);
    setDisplayValue(formatted);
    onChange(formatted);
  };

  const increment = () => {
    const currentValue = parseFloat(displayValue) || 0;
    const newValue = Math.min(currentValue + step, max);
    const formatted = newValue.toFixed(decimals);
    setDisplayValue(formatted);
    onChange(formatted);
  };

  const decrement = () => {
    const currentValue = parseFloat(displayValue) || 0;
    const newValue = Math.max(currentValue - step, min);
    const formatted = newValue.toFixed(decimals);
    setDisplayValue(formatted);
    onChange(formatted);
  };

  return (
    <div className={styles.container} data-testid="numeric-picker">
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      <div className={styles.inputContainer}>
        {/* Currency symbol */}
        <span className={styles.currency} data-testid="currency-symbol">
          {currency}
        </span>

        {/* Input field */}
        <input
          type="text"
          value={displayValue}
          onChange={(e) => handleInputChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={styles.input}
          data-testid="numeric-input"
        />

        {/* Increment/Decrement buttons */}
        <div className={styles.buttonContainer}>
          <button
            type="button"
            onClick={increment}
            disabled={disabled || parseFloat(displayValue || "0") >= max}
            className={styles.button}
            title="Increment"
            data-testid="increment-button"
          >
            <svg
              className={styles.buttonIcon}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V15a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={decrement}
            disabled={disabled || parseFloat(displayValue || "0") <= min}
            className={styles.button}
            title="Decrement"
            data-testid="decrement-button"
          >
            <svg
              className={styles.buttonIcon}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V5a1 1 0 012 0v9.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
