import React from "react";
import styles from "./Button.module.css";

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

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const sizeClassMap: Record<ButtonSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const focusClassMap: Record<ButtonFocusStyle, string> = {
  filled: styles.focusFilled,
  outline: styles.focusOutline,
  underline: styles.focusUnderline,
};

const variantClassMap: Record<
  ButtonVariant,
  { filled: string; outlined: string }
> = {
  default: {
    filled: styles.variantDefaultFilled,
    outlined: styles.variantDefaultOutlined,
  },
  secondary: {
    filled: styles.variantSecondaryFilled,
    outlined: styles.variantSecondaryOutlined,
  },
  black: {
    filled: styles.variantBlackFilled,
    outlined: styles.variantBlackOutlined,
  },
  "gradient-green": {
    filled: styles.variantGradientGreenFilled,
    outlined: styles.variantGradientGreenOutlined,
  },
  "solid-green": {
    filled: styles.variantSolidGreenFilled,
    outlined: styles.variantSolidGreenOutlined,
  },
  blue: {
    filled: styles.variantBlueFilled,
    outlined: styles.variantBlueOutlined,
  },
  pink: {
    filled: styles.variantPinkFilled,
    outlined: styles.variantPinkOutlined,
  },
  warning: {
    filled: styles.variantWarningFilled,
    outlined: styles.variantWarningOutlined,
  },
};

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
    const isFilledStyle = inverted ? !filled : filled;
    const styleKey = quiet ? "quiet" : isFilledStyle ? "filled" : "outlined";

    const variantClass = quiet
      ? styles.quiet
      : variantClassMap[variant][styleKey as "filled" | "outlined"];

    const focusClass = disabled ? undefined : focusClassMap[focusStyleType];

    const classes = classNames(
      styles.root,
      styles.interactive,
      sizeClassMap[size],
      circled ? styles.roundedFull : styles.roundedLg,
      variantClass,
      focusClass,
      disabled ? styles.disabled : undefined,
      className,
    );

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={classes}
        data-size={size}
        data-variant={variant}
        data-style={styleKey}
        data-shape={circled ? "circle" : "rounded"}
        data-focus-style={focusStyleType}
        data-focus-trigger={focusTriggerType}
        data-disabled={disabled ? "true" : "false"}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
