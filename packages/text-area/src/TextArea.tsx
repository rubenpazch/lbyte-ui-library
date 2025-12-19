import React, { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";
import { classList } from "@rubenpazch/shared";

export type TextAreaColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link";

export type TextAreaSize = "small" | "medium" | "large";

export type TextAreaProps = {
  color?: TextAreaColor;
  placeholder?: string;
  size?: TextAreaSize;
};

export type TextareaHTMLAttributesProps = TextareaHTMLAttributes<HTMLElement> &
  TextAreaProps;

const TextAreaInput = ({
  color,
  size,
  value,
  onClick,
  placeholder,
  id,
}: TextareaHTMLAttributesProps) => {
  const inputClassName = classList(
    styles.base,
    styles[`${color}`],
    styles[`${size}`],
  );
  const placeHolderDefault = "type something here...";
  const placeHolderInput = placeholder ? placeholder : placeHolderDefault;

  return (
    <textarea
      role="textbox"
      className={inputClassName}
      defaultValue={value}
      onClick={onClick}
      id={id}
      placeholder={placeHolderInput}
    />
  );
};

export default TextAreaInput;
