import React, { useState } from "react";
import styles from "./IconButton.module.css";

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
export type IconButtonShape = "rounded" | "square";
export type IconButtonFocusStyle = "filled" | "outline" | "underline";
export type IconButtonFocusTrigger =
  | "self"
  | "sibling"
  | "parent"
  | "grandparent";
export type IconPosition = "start" | "end";
export type LabelPosition = "start" | "end" | "top" | "bottom";
export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  shape?: IconButtonShape;
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
      shape = "rounded",
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

    // Inverted styles (outline becomes filled and vice versa)
    const isFilledStyle = inverted ? !filled : filled;

    // Determine variant class
    const getVariantClass = () => {
      if (disabled && quiet) {
        return styles.disabledQuiet;
      }

      const variantKey = variant.replace(/-./g, (m) => m[1].toUpperCase());
      const capitalizedVariant =
        variantKey.charAt(0).toUpperCase() + variantKey.slice(1);

      let styleType;
      if (quiet) {
        styleType = "Quiet";
      } else if (isFilledStyle) {
        styleType = "Filled";
      } else {
        styleType = "Outlined";
      }

      return styles[`variant${capitalizedVariant}${styleType}`];
    };

    const variantClass = getVariantClass();
    const sizeClass = size === "small" ? styles.sizeSmall : styles.sizeMedium;
    const textSizeClass =
      size === "small" ? styles.textSmall : styles.textMedium;
    const shapeClass =
      shape === "square" ? styles.shapeSquare : styles.shapeRounded;
    const iconSizeClass =
      size === "small" ? styles.iconSmall : styles.iconMedium;
    const focusClass =
      styles[
        `focus${focusStyleType.charAt(0).toUpperCase() + focusStyleType.slice(1)}`
      ];
    const tooltipPosClass =
      styles[
        `tooltip${tooltipPosition.charAt(0).toUpperCase() + tooltipPosition.slice(1)}`
      ];

    // If icon-only button (no children, no label)
    if (!children && !label) {
      const buttonClasses = [
        styles.button,
        sizeClass,
        variantClass,
        shapeClass,
        disabled && styles.disabled,
        focusClass,
        linkStyle && !disabled && styles.linkStyle,
        className,
      ]
        .filter(Boolean)
        .join(" ");

      return (
        <div className={styles.root}>
          <button
            ref={ref}
            disabled={disabled}
            className={buttonClasses}
            data-focus-trigger={focusTriggerType}
            onMouseEnter={() => tooltip && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => tooltip && setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            {...props}
          >
            <span className={iconSizeClass}>{icon}</span>
          </button>
          {tooltip && showTooltip && (
            <div className={`${styles.tooltip} ${tooltipPosClass}`}>
              {tooltip}
            </div>
          )}
        </div>
      );
    }

    // Icon button with text
    const textButtonClasses = [
      styles.button,
      textSizeClass,
      variantClass,
      styles.roundedLg,
      disabled && styles.disabled,
      focusClass,
      linkStyle && !disabled && styles.linkStyle,
      styles.whitespaceNowrap,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Arrange icon and text based on position
    const iconElement = <span className={iconSizeClass}>{icon}</span>;
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
      <div className={styles.root}>
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
          <div className={`${styles.tooltip} ${tooltipPosClass}`}>
            {tooltip}
          </div>
        )}
      </div>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
