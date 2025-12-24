import React, { useState } from "react";

export type IconButtonVariant =
  | "default"
  | "secondary"
  | "black"
  | "gradient-green"
  | "solid-green"
  | "blue"
  | "pink"
  | "warning";
export type IconButtonSize = "small" | "medium";
export type IconButtonFocusStyle = "filled" | "outline" | "underline";
export type IconButtonFocusTrigger =
  | "self"
  | "sibling"
  | "parent"
  | "grandparent";
export type IconPosition = "start" | "end";
export type LabelPosition = "start" | "end" | "top" | "bottom";
export type TooltipPosition = "top" | "bottom" | "left" | "right";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  filled?: boolean;
  quiet?: boolean;
  inverted?: boolean;
  linkStyle?: boolean; // New prop for link-style button with underline on hover
  focusStyleType?: IconButtonFocusStyle;
  focusTriggerType?: IconButtonFocusTrigger;
  iconPosition?: IconPosition;
  label?: React.ReactNode;
  labelPosition?: LabelPosition;
  tooltip?: React.ReactNode;
  tooltipPosition?: TooltipPosition;
  children?: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = "default",
      size = "medium",
      filled = false,
      quiet = false,
      inverted = false,
      linkStyle = false,
      focusStyleType = "filled",
      focusTriggerType = "self",
      iconPosition = "start",
      label,
      labelPosition = "end",
      tooltip,
      tooltipPosition = "top",
      className,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [showTooltip, setShowTooltip] = useState(false);
    // Size classes for icon-only buttons
    const sizeClasses = {
      small: "p-2 w-8 h-8",
      medium: "p-2.5 w-10 h-10",
    };

    // Icon size based on button size
    const iconSizeClasses = {
      small: "w-4 h-4",
      medium: "w-5 h-5",
    };

    // Tooltip positioning classes
    const tooltipPositionClasses = {
      top: "bottom-full mb-2 left-1/2 -translate-x-1/2 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-900",
      bottom:
        "top-full mt-2 left-1/2 -translate-x-1/2 after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-b-gray-900",
      left: "right-full mr-2 top-1/2 -translate-y-1/2 after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-transparent after:border-l-gray-900",
      right:
        "left-full ml-2 top-1/2 -translate-y-1/2 after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-transparent after:border-r-gray-900",
    };

    // Base variant colors
    const variantColors = {
      default: {
        outlined: "text-blue-600 border-2 border-blue-600 hover:bg-blue-50",
        filled: "bg-blue-600 text-white hover:bg-blue-700",
        quiet: "text-blue-600 hover:text-blue-700 hover:bg-blue-50",
      },
      secondary: {
        outlined: "text-gray-600 border-2 border-gray-600 hover:bg-gray-50",
        filled: "bg-gray-600 text-white hover:bg-gray-700",
        quiet: "text-gray-600 hover:text-gray-800 hover:bg-gray-50",
      },
      black: {
        outlined: "text-black border-2 border-black hover:bg-gray-100",
        filled: "bg-black text-white hover:bg-gray-900",
        quiet: "text-black hover:text-gray-900 hover:bg-gray-100",
      },
      "gradient-green": {
        outlined:
          "text-emerald-400 border-2 border-emerald-400 hover:bg-emerald-50",
        filled:
          "bg-gradient-to-r from-emerald-400 to-cyan-400 text-white hover:opacity-90",
        quiet: "text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50",
      },
      "solid-green": {
        outlined:
          "text-emerald-500 border-2 border-emerald-500 hover:bg-emerald-50",
        filled: "bg-emerald-500 text-white hover:bg-emerald-600",
        quiet: "text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50",
      },
      blue: {
        outlined: "text-blue-500 border-2 border-blue-500 hover:bg-blue-50",
        filled: "bg-blue-500 text-white hover:bg-blue-600",
        quiet: "text-blue-500 hover:text-blue-600 hover:bg-blue-50",
      },
      pink: {
        outlined: "text-pink-500 border-2 border-pink-500 hover:bg-pink-50",
        filled: "bg-pink-500 text-white hover:bg-pink-600",
        quiet: "text-pink-500 hover:text-pink-600 hover:bg-pink-50",
      },
      warning: {
        outlined:
          "text-orange-500 border-2 border-orange-500 hover:bg-orange-50",
        filled: "bg-orange-500 text-white hover:bg-orange-600",
        quiet: "text-orange-500 hover:text-orange-600 hover:bg-orange-50",
      },
    };

    // Disabled state - remove all hover/focus effects
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    // Inverted styles (outline becomes filled and vice versa)
    const isFilledStyle = inverted ? !filled : filled;

    // Get the appropriate color classes
    let colorClasses = "";
    if (disabled) {
      // No hover states when disabled
      colorClasses = quiet
        ? "text-gray-600 focus:outline-none"
        : variantColors[variant][isFilledStyle ? "filled" : "outlined"].replace(
            /\s*hover:[^\s]*/g,
            "",
          );
    } else if (quiet) {
      colorClasses = variantColors[variant].quiet;
    } else {
      const variantStyle = variantColors[variant];
      colorClasses = isFilledStyle
        ? variantStyle.filled
        : variantStyle.outlined;
    }

    // Link-style classes for underline on hover (only when linkStyle is true)
    const linkStyleClasses = linkStyle && !disabled ? "hover:underline" : "";

    // Focus style classes - don't apply focus when disabled
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
      rounded-full
      ${disabledClasses}
      ${focusClasses}
      ${linkStyleClasses}
      transition-all duration-200
      inline-flex
      items-center
      justify-center
      gap-2
      ${className || ""}
    `
      .replace(/\s+/g, " ")
      .trim();

    // If icon-only button (no children, no label)
    if (!children && !label) {
      return (
        <div className="relative inline-flex">
          <button
            ref={ref}
            disabled={disabled}
            className={allClasses}
            data-focus-trigger={focusTriggerType}
            onMouseEnter={() => tooltip && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => tooltip && setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            {...props}
          >
            <span
              className={`${iconSizeClasses[size]} flex items-center justify-center`}
            >
              {icon}
            </span>
          </button>
          {tooltip && showTooltip && (
            <div
              className={`absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap pointer-events-none ${tooltipPositionClasses[tooltipPosition]}`}
            >
              {tooltip}
            </div>
          )}
        </div>
      );
    }

    // Icon button with text
    const textButtonClasses = `
      ${size === "small" ? "px-3 py-1.5 text-xs font-medium" : "px-4 py-2 text-sm font-medium"}
      ${colorClasses}
      rounded-lg
      ${disabledClasses}
      ${focusClasses}
      ${linkStyleClasses}
      transition-all duration-200
      inline-flex
      items-center
      justify-center
      gap-2
      whitespace-nowrap
      ${className || ""}
    `
      .replace(/\s+/g, " ")
      .trim();

    // Arrange icon and text based on position
    const iconElement = (
      <span
        className={`${iconSizeClasses[size]} flex items-center justify-center`}
      >
        {icon}
      </span>
    );
    const textElement = children || label;

    const content =
      iconPosition === "start" ? (
        <>
          {iconElement}
          {textElement}
        </>
      ) : (
        <>
          {textElement}
          {iconElement}
        </>
      );

    return (
      <div className="relative inline-flex">
        <button
          ref={ref}
          disabled={disabled}
          className={textButtonClasses}
          data-focus-trigger={focusTriggerType}
          onMouseEnter={() => tooltip && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => tooltip && setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          {...props}
          type={type}
        >
          {content}
        </button>
        {tooltip && showTooltip && (
          <div
            className={`absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap pointer-events-none ${tooltipPositionClasses[tooltipPosition]}`}
          >
            {tooltip}
          </div>
        )}
      </div>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
