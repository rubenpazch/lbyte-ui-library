import { classList } from "@rubenpazch/shared";
import React, { InputHTMLAttributes } from "react";
import styles from "./TextInput.module.css";

export type TextInputColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link";

export type TextInputSize = "small" | "medium" | "large";

interface TextInputProps {
  color?: TextInputColor;
  placeholder?: string;
  formSize?: TextInputSize;
  onClick?: () => void;
  value: string;
  labelText?: string;
}

export type InputHTMLAttributesProps = InputHTMLAttributes<HTMLElement> &
  TextInputProps;

const TextInput = ({
  color,
  formSize,
  value,
  onClick,
  placeholder,
  labelText,
}: InputHTMLAttributesProps) => {
  const inputClassName = classList(
    styles.base,
    styles[`${color}`],
    styles[`${formSize}`],
  );
  const placeHolderDefault = "type something here...";
  const labelTextDefault = "input field";
  const placeHolderInput = placeholder ? placeholder : placeHolderDefault;
  const labelTextInput = labelText ? labelText : labelTextDefault;

  return (
    <>
      <label className={styles.labelForm}>{labelTextInput}</label>
      <input
        type="text"
        role="textbox"
        className={inputClassName}
        defaultValue={value}
        onClick={onClick}
        placeholder={placeHolderInput}
      />
      <label className={styles.descriptionForm}>{labelTextInput}</label>
    </>
  );
};

export default TextInput;
