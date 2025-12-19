import { classList } from "@rubenpazch/shared";
import React, { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";

export type IconButtonSize = "small" | "medium" | "large" | "x-large";

export type ButtonStyleColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "IconButton";

export type IconButtonProps = {
  size?: IconButtonSize;
  outline?: boolean;
  color: ButtonStyleColor;
  icon?: ReactNode;
  quiet?: boolean;
};

export type IconButtonHTMLAttributesProps = ButtonHTMLAttributes<HTMLElement> &
  IconButtonProps;

/**
 * Default icon button
 */
const IconButton = ({
  size,
  outline,
  color,
  icon,
  quiet,
  onClick,
}: IconButtonHTMLAttributesProps) => {
  const IconButtonClassname = classList(
    styles.base,
    styles[`${color}`],
    styles[`${size}`],
    styles[`${size}-wrapper`],
    outline && styles[`outline-${color}`],
    outline && styles["outline"],
    quiet && styles["quiet"],
  );

  return (
    <button className={IconButtonClassname} role="button" onClick={onClick}>
      {icon}
    </button>
  );
};

export default IconButton;
