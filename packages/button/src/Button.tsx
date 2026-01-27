import React from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "text" | "contained" | "outlined";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";
export type ButtonSize = "small" | "medium" | "large";

type ButtonBaseProps = {
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button color theme */
  color?: ButtonColor;
  /** Button size */
  size?: ButtonSize;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state with spinner */
  loading?: boolean;
  /** Icon to display before text */
  startIcon?: React.ReactNode;
  /** Icon to display after text */
  endIcon?: React.ReactNode;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Disable elevation/shadow effects */
  disableElevation?: boolean;
  children?: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    component?: "button";
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    component?: "a";
    href?: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const sizeClassMap: Record<ButtonSize, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

const getColorVariantClass = (
  color: ButtonColor,
  variant: ButtonVariant,
): string => {
  const key =
    `${variant}${color.charAt(0).toUpperCase()}${color.slice(1)}` as keyof typeof styles;
  return styles[key] || "";
};

const LoadingSpinner: React.FC<{ size: ButtonSize }> = ({ size }) => {
  const sizeMap = { small: 14, medium: 18, large: 22 };
  const spinnerSize = sizeMap[size];

  return (
    <svg
      className={styles.spinner}
      width={spinnerSize}
      height={spinnerSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={styles.spinnerCircle}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    variant = "text",
    color = "primary",
    size = "medium",
    component,
    className,
    loading = false,
    startIcon,
    endIcon,
    fullWidth = false,
    disableElevation = false,
    children,
    ...rest
  } = props;

  const disabled = "disabled" in props ? props.disabled : false;
  const href = "href" in props ? props.href : undefined;
  const Component = component || ((href ? "a" : "button") as any);
  const isDisabled = disabled || loading;

  const classes = classNames(
    styles.root,
    styles[variant],
    getColorVariantClass(color, variant),
    sizeClassMap[size],
    isDisabled ? styles.disabled : undefined,
    fullWidth ? styles.fullWidth : undefined,
    disableElevation ? styles.noElevation : undefined,
    loading ? styles.loading : undefined,
    className,
  );

  const buttonProps = Component === "button" ? { disabled: isDisabled } : {};
  const linkProps =
    Component === "a" ? { href, "aria-disabled": isDisabled } : {};

  return (
    <Component
      ref={ref}
      className={classes}
      {...buttonProps}
      {...linkProps}
      {...rest}
    >
      {loading && (
        <span className={styles.loadingWrapper}>
          <LoadingSpinner size={size} />
        </span>
      )}
      <span
        className={classNames(
          styles.content,
          loading ? styles.contentHidden : undefined,
        )}
      >
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        {children}
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </span>
    </Component>
  );
});

Button.displayName = "Button";

export default Button;
