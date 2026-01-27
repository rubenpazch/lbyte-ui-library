import * as React from "react";
import { CloseIcon } from "@rubenpazch/icons";
import styles from "./Chip.module.css";

export type ChipVariant = "filled" | "outlined" | "soft";
export type ChipColor =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type ChipSize = "sm" | "md";

export interface ChipProps extends React.HTMLAttributes<HTMLElement> {
  /** Content shown inside the chip */
  label?: React.ReactNode;
  /** Visual style for the chip */
  variant?: ChipVariant;
  /** Color theme for the chip */
  color?: ChipColor;
  /** Chip size */
  size?: ChipSize;
  /** Leading icon rendered before the label */
  icon?: React.ReactNode;
  /** Avatar or custom element shown at the start */
  avatar?: React.ReactNode;
  /** Callback fired when the delete icon is clicked */
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Custom delete icon element */
  deleteIcon?: React.ReactNode;
  /** Accessible label for the delete button */
  deleteAriaLabel?: string;
  /** Whether the chip behaves like a button */
  clickable?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Selected/pressed state for toggleable chips */
  selected?: boolean;
  /** Override root component */
  component?: React.ElementType;
}

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const sizeClassMap: Record<ChipSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
};

const variantClassMap: Record<ChipVariant, string> = {
  filled: styles.variantFilled,
  outlined: styles.variantOutlined,
  soft: styles.variantSoft,
};

const colorClassMap: Record<ChipColor, string> = {
  default: styles.colorDefault,
  primary: styles.colorPrimary,
  success: styles.colorSuccess,
  warning: styles.colorWarning,
  error: styles.colorError,
  info: styles.colorInfo,
};

const Chip = React.forwardRef<HTMLElement, ChipProps>(
  (
    {
      label,
      variant = "filled",
      color = "default",
      size = "md",
      icon,
      avatar,
      onDelete,
      deleteIcon,
      deleteAriaLabel = "Remove chip",
      clickable = false,
      disabled = false,
      selected = false,
      component,
      className,
      onClick,
      onKeyDown,
      role,
      tabIndex,
      ...rest
    },
    ref,
  ) => {
    // Avoid rendering button inside button when deletable+clickable
    const shouldUseButton = component
      ? component === "button"
      : clickable && !onDelete;

    const Component = component || (shouldUseButton ? "button" : "div");
    const isButtonElement = Component === "button";

    const classes = classNames(
      styles.root,
      styles.interactive,
      sizeClassMap[size],
      variantClassMap[variant],
      colorClassMap[color],
      clickable ? styles.clickable : undefined,
      disabled ? styles.disabled : undefined,
      selected ? styles.selected : undefined,
      className,
    );

    const computedTabIndex =
      clickable && !isButtonElement ? (tabIndex ?? 0) : tabIndex;

    const roleProp =
      role ?? (clickable && !isButtonElement ? "button" : undefined);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(event);

      if (
        clickable &&
        !isButtonElement &&
        !disabled &&
        !event.defaultPrevented &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        onClick?.(
          event as unknown as React.MouseEvent<HTMLElement, MouseEvent>,
        );
      }
    };

    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        className={classes}
        type={isButtonElement ? "button" : undefined}
        role={roleProp}
        tabIndex={computedTabIndex}
        aria-pressed={clickable ? selected : undefined}
        aria-disabled={disabled ? "true" : undefined}
        data-variant={variant}
        data-color={color}
        data-size={size}
        data-clickable={clickable ? "true" : "false"}
        data-disabled={disabled ? "true" : "false"}
        data-selected={selected ? "true" : "false"}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {avatar && <span className={styles.avatar}>{avatar}</span>}
        {icon && !avatar && <span className={styles.icon}>{icon}</span>}
        {label && <span className={styles.label}>{label}</span>}
        {onDelete && (
          <button
            type="button"
            className={styles.deleteButton}
            aria-label={deleteAriaLabel}
            onClick={(event) => {
              if (disabled) return;
              event.stopPropagation();
              onDelete(event);
            }}
            data-testid="chip-delete"
          >
            {deleteIcon || <CloseIcon size="sm" />}
          </button>
        )}
      </Component>
    );
  },
);

Chip.displayName = "Chip";

export default Chip;
