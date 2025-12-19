import { classList } from "@rubenpazch/shared";
import React, { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./InputButton.module.css";

export type InputButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link";

type InputButtonProps = {
  children?: ReactNode;
  outline?: boolean;
  color?: InputButtonColor;
  size?: InputButtonSize;
  wrap?: boolean;
  quiet?: boolean;
};

export type InputButtonHTMLAttributesProps = ButtonHTMLAttributes<HTMLElement> &
  InputButtonProps;

export type InputButtonSize = "small" | "medium" | "large";

/**
 * Default button
 */
const InputButton = ({
  color,
  size,
  wrap,
  value,
  outline,
  quiet,
  onClick,
  type,
  id,
}: InputButtonHTMLAttributesProps) => {
  const buttonClassName = classList(
    styles.base,
    styles[`${color}`],
    size && styles[`${size}`],
    wrap && styles["wrap"],
    outline && styles[`outline-${color}`],
    outline && styles["outline"],
    quiet && styles["quiet"],
  );

  return (
    <input
      type={type ? type : "button"}
      role="button"
      className={buttonClassName}
      defaultValue={value}
      onClick={onClick}
      id={id}
    />
  );
};

export default InputButton;
