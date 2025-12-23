import React from "react";

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

const sizeClasses: Record<
  RadioSize,
  { radio: string; label: string; description: string; container: string }
> = {
  sm: {
    radio: "w-3 h-3",
    label: "text-xs",
    description: "text-[10px]",
    container: "h-4",
  },
  md: {
    radio: "w-4 h-4",
    label: "text-sm",
    description: "text-xs",
    container: "h-5",
  },
  lg: {
    radio: "w-5 h-5",
    label: "text-base",
    description: "text-sm",
    container: "h-6",
  },
};

const variantClasses: Record<RadioVariant, { checked: string; focus: string }> =
  {
    default: {
      checked: "text-blue-600",
      focus: "focus:ring-blue-500",
    },
    primary: {
      checked: "text-indigo-600",
      focus: "focus:ring-indigo-500",
    },
    success: {
      checked: "text-green-600",
      focus: "focus:ring-green-500",
    },
    warning: {
      checked: "text-yellow-600",
      focus: "focus:ring-yellow-500",
    },
    danger: {
      checked: "text-red-600",
      focus: "focus:ring-red-500",
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

  return (
    <div className={`flex ${className}`}>
      <div className={`flex items-start ${sizes.container}`}>
        <input
          id={radioId}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={`
            ${sizes.radio}
            ${required && !checked ? "border-red-500" : "border-gray-300"}
            ${variants.checked}
            ${variants.focus}
            focus:ring-2
            focus:ring-offset-0
            disabled:opacity-50
            disabled:cursor-not-allowed
            cursor-pointer
            transition-colors
          `}
          aria-describedby={description ? `${radioId}-description` : undefined}
          aria-invalid={!!error}
        />
      </div>
      <div className="ml-3 flex-1">
        <label
          htmlFor={radioId}
          className={`
            ${sizes.label}
            font-medium
            ${disabled ? "text-gray-400 cursor-not-allowed" : required && !checked ? "text-red-600 cursor-pointer" : "text-gray-700 cursor-pointer"}
            block
          `}
        >
          {label}
        </label>
        {description && (
          <p
            id={`${radioId}-description`}
            className={`${sizes.description} text-gray-500 mt-0.5`}
          >
            {description}
          </p>
        )}
        {error && (
          <p className={`${sizes.description} text-red-600 mt-0.5`}>{error}</p>
        )}
      </div>
    </div>
  );
};

export default RadioButton;
