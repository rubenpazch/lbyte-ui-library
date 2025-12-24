import { ReactNode } from "react";

export type ButtonVariant = "filled" | "outline" | "ghost" | "link";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps {
  children?: ReactNode;
  /**
   * Button variant style
   * @default "filled"
   */
  variant?: ButtonVariant;
  /**
   * Button color theme
   * @default "primary"
   */
  color?: ButtonColor;
  /**
   * Button size
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the button should take full width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Loading state with spinner
   * @default false
   */
  loading?: boolean;
  /**
   * Icon to display before text
   */
  leftIcon?: ReactNode;
  /**
   * Icon to display after text
   */
  rightIcon?: ReactNode;
  /**
   * Whether text should wrap
   * @default false
   */
  wrap?: boolean;
  /**
   * @deprecated Use variant="ghost" instead
   */
  quiet?: boolean;
  /**
   * @deprecated Use variant="outline" instead
   */
  outline?: boolean;
}
