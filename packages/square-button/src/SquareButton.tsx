import { classList } from "@rubenpazch/shared";
import React, { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./SquareButton.module.css";

export type SquareButtonSize = "small" | "medium" | "large" | "x-large";

export type ButtonStyleColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "SquareButton";

export type SquareButtonProps = {
  size?: SquareButtonSize;
  outline?: boolean;
  color: ButtonStyleColor;
  icon?: ReactNode;
  quiet?: boolean;
  className?: string;
};

export type SquareButtonHTMLAttributesProps =
  ButtonHTMLAttributes<HTMLElement> & SquareButtonProps;

/**
 * Default icon button
 */
const SquareButton = ({
  size,
  outline,
  color,
  icon,
  quiet,
  onClick,
  className,
}: SquareButtonHTMLAttributesProps) => {
  const SquareButtonClassname = classList(
    styles.base,
    styles[`${color}`],
    styles[`${size}`],
    styles[`${size}-wrapper`],
    outline && styles[`outline-${color}`],
    outline && styles["outline"],
    quiet && styles["quiet"],
    className,
  );

  return (
    <button className={SquareButtonClassname} role="button" onClick={onClick}>
      {icon}
    </button>
  );
};

export default SquareButton;
