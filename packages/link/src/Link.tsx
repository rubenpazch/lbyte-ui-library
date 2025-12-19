import { classList } from "@rubenpazch/shared";
import React, { ReactNode } from "react";
import styles from "./Link.module.css";

export type LinkSize = "small" | "medium" | "large";

export type ButtonStyleColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link";

export type LinkProps = {
  children?: ReactNode;
  href: string;
  size?: LinkSize;
  outline?: boolean;
  styleColor: ButtonStyleColor;
};

/**
 * Default button
 */
const Link = ({ children, href, size, outline, styleColor }: LinkProps) => {
  const linkClassname = classList(
    styles.base,
    styles[`${styleColor}`],
    styles[`storybook-button--${size}`],
    outline && styles[`outline-${styleColor}`],
    outline && styles["outline"],
  );

  return (
    <a href={href} role="link" className={linkClassname}>
      {children}
    </a>
  );
};

export default Link;
