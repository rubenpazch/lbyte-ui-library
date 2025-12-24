import React from "react";

export type ButtonVariant =
  | "default"
  | "secondary"
  | "black"
  | "gradient-green"
  | "solid-green"
  | "blue"
  | "pink"
  | "warning";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonFocusStyle = "filled" | "outline" | "underline";
export type ButtonFocusTrigger = "self" | "sibling" | "parent" | "grandparent";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  filled?: boolean;
  quiet?: boolean;
  circled?: boolean;
  inverted?: boolean;
  focusStyleType?: ButtonFocusStyle;
  focusTriggerType?: ButtonFocusTrigger;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      filled = false,
      quiet = false,
      circled = false,
      inverted = false,
      focusStyleType = "filled",
      focusTriggerType = "self",
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    // Size classes
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs font-medium",
      md: "px-4 py-2 text-sm font-medium",
      lg: "px-6 py-3 text-base font-medium",
    };

    // Base variant colors
    const variantColors = {
      default: {
        outlined: "text-blue-600 border-2 border-blue-600 hover:bg-blue-50",
        filled: "bg-blue-600 text-white hover:bg-blue-700",
      },
      secondary: {
        outlined: "text-gray-600 border-2 border-gray-600 hover:bg-gray-50",
        filled: "bg-gray-600 text-white hover:bg-gray-700",
      },
      black: {
        outlined: "text-black border-2 border-black hover:bg-gray-100",
        filled: "bg-black text-white hover:bg-gray-900",
      },
      "gradient-green": {
        outlined:
          "text-emerald-400 border-2 border-emerald-400 hover:bg-emerald-50",
        filled:
          "bg-gradient-to-r from-emerald-400 to-cyan-400 text-white hover:opacity-90",
      },
      "solid-green": {
        outlined:
          "text-emerald-500 border-2 border-emerald-500 hover:bg-emerald-50",
        filled: "bg-emerald-500 text-white hover:bg-emerald-600",
      },
      blue: {
        outlined: "text-blue-500 border-2 border-blue-500 hover:bg-blue-50",
        filled: "bg-blue-500 text-white hover:bg-blue-600",
      },
      pink: {
        outlined: "text-pink-500 border-2 border-pink-500 hover:bg-pink-50",
        filled: "bg-pink-500 text-white hover:bg-pink-600",
      },
      warning: {
        outlined:
          "text-orange-500 border-2 border-orange-500 hover:bg-orange-50",
        filled: "bg-orange-500 text-white hover:bg-orange-600",
      },
    };

    // Quiet variant styling
    const quietClasses =
      "text-gray-600 hover:text-gray-800 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500";

    // Disabled state - clear visual indication that button is not interactive
    const disabledClasses = disabled
      ? "bg-gray-300 text-gray-500 cursor-not-allowed border-0 hover:bg-gray-300 hover:text-gray-500"
      : "";

    // Circled border radius
    const roundedClasses = circled ? "rounded-full" : "rounded-lg";

    // Inverted styles (outline becomes filled and vice versa)
    const isFilledStyle = inverted ? !filled : filled;

    // Get the appropriate color classes - only if not disabled
    let colorClasses = "";
    if (disabled) {
      colorClasses = disabledClasses;
    } else if (quiet) {
      colorClasses = quietClasses;
    } else {
      const variantStyle = variantColors[variant];
      colorClasses = isFilledStyle
        ? variantStyle.filled
        : variantStyle.outlined;
    }

    // Focus style classes - not applied when disabled
    const focusClasses = disabled
      ? ""
      : {
          filled:
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current",
          outline:
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current",
          underline: "focus:outline-none focus:underline",
        }[focusStyleType];

    // Combine all classes
    const allClasses = `
      ${sizeClasses[size]}
      ${colorClasses}
      ${roundedClasses}
      ${focusClasses}
      transition-all duration-200
      font-medium
      inline-flex
      items-center
      justify-center
      gap-2
      whitespace-nowrap
      ${className || ""}
    `
      .replace(/\s+/g, " ")
      .trim();

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={allClasses}
        data-focus-trigger={focusTriggerType}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
