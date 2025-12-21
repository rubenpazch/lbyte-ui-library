import { useState, useEffect } from 'react';

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
  currency = 'S/.',
  label,
  required = false,
  disabled = false,
  placeholder = '0.00',
}: NumericPickerProps) {
  const [displayValue, setDisplayValue] = useState<string>(String(value || ''));

  useEffect(() => {
    setDisplayValue(String(value || ''));
  }, [value]);

  const handleInputChange = (newValue: string) => {
    // Remove currency symbol if present
    let cleanValue = newValue.replace(/[^\d.-]/g, '');

    // Validate and format
    if (cleanValue === '' || cleanValue === '-') {
      setDisplayValue(cleanValue);
      onChange('');
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
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-600"> *</span>}
        </label>
      )}

      <div className="relative">
        {/* Currency symbol */}
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium pointer-events-none">
          {currency}
        </span>

        {/* Input field */}
        <input
          type="text"
          value={displayValue}
          onChange={(e) => handleInputChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition"
        />

        {/* Increment/Decrement buttons */}
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col gap-0.5">
          <button
            type="button"
            onClick={increment}
            disabled={disabled || parseFloat(displayValue || '0') >= max}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-sm transition flex items-center justify-center"
            title="Increment"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
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
            disabled={disabled || parseFloat(displayValue || '0') <= min}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-sm transition flex items-center justify-center"
            title="Decrement"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
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
