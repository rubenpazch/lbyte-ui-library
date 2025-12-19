import { SVGAttributes } from "react";

export type IconColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link";

export type SVGAttributesProps = SVGAttributes<HTMLElement> & {
  height?: number | string | undefined;
  width?: number | string | undefined;
  color?: IconColor;
  size?: "small" | "medium" | "large" | "x-large";
};
