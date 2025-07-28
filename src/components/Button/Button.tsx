import classList from "classnames";
import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

export type ButtonHTMLAttributesProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ButtonProps
> &
  ButtonProps;

/**
 * Modern, accessible button component with multiple variants and states
 */
const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributesProps>(
  (
    {
      children,
      variant = "filled",
      color = "primary",
      size = "md",
      disabled = false,
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      wrap = false,
      // Deprecated props - maintain backward compatibility
      quiet,
      outline,
      className,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Handle deprecated props
    const resolvedVariant = outline ? "outline" : quiet ? "ghost" : variant;

    const buttonClassName = classList(
      styles.base,
      styles[`variant-${resolvedVariant}`],
      styles[`color-${color}`],
      styles[`size-${size}`],
      {
        [styles.disabled]: disabled || loading,
        [styles.loading]: loading,
        [styles.fullWidth]: fullWidth,
        [styles.wrap]: wrap,
        [styles.hasLeftIcon]: !!leftIcon,
        [styles.hasRightIcon]: !!rightIcon,
      },
      className
    );

    const content = (
      <>
        {loading && (
          <span className={styles.spinner} aria-hidden="true">
            <svg viewBox="0 0 24 24" className={styles.spinnerIcon}>
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="32"
                strokeDashoffset="32"
              />
            </svg>
          </span>
        )}
        {!loading && leftIcon && (
          <span className={styles.leftIcon} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children && <span className={styles.content}>{children}</span>}
        {!loading && rightIcon && (
          <span className={styles.rightIcon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </>
    );

    return (
      <button
        ref={ref}
        className={buttonClassName}
        disabled={disabled || loading}
        type={type}
        aria-busy={loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
