// @ts-ignore - React import needed for Jest transforms
import * as React from "react";

/**
 * MaterialIcon renders Material Symbols (Outlined/Rounded/Sharp) via the Google Fonts webfont.
 * Docs: https://mui.com/material-ui/material-icons/
 * Note: You must have network access to fonts.googleapis.com/fonts.gstatic.com
 */
export type MaterialIconVariant = "outlined" | "rounded" | "sharp";
export type MaterialIconSize = "sm" | "md" | "lg" | number;

export interface MaterialIconProps extends React.HTMLAttributes<HTMLElement> {
  /** Icon name, e.g. "search", "home", "close" */
  name: string;
  /** Style family */
  variant?: MaterialIconVariant;
  /** Icon size preset or pixel size */
  size?: MaterialIconSize;
  /** Fill glyphs: 0 outline, 1 filled */
  fill?: 0 | 1;
  /** Weight 100-700 */
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  /** Grade -25 to 200 (commonly -25, 0, 200) */
  grade?: -25 | 0 | 200;
  /** Optical size in px (20-48 typical) */
  opticalSize?: 20 | 24 | 40 | 48 | number;
}

const familyClassMap: Record<MaterialIconVariant, string> = {
  outlined: "material-symbols-outlined",
  rounded: "material-symbols-rounded",
  sharp: "material-symbols-sharp",
};

const sizeToPx = (size: MaterialIconSize) =>
  typeof size === "number"
    ? size
    : size === "sm"
      ? 16
      : size === "md"
        ? 20
        : 24; // lg

const MaterialIcon = React.forwardRef<HTMLSpanElement, MaterialIconProps>(
  (
    {
      name,
      variant = "outlined",
      size = "md",
      fill = 0,
      weight = 400,
      grade = 0,
      opticalSize = 24,
      style,
      className,
      ...rest
    },
    ref,
  ) => {
    const px = sizeToPx(size);

    const fontVariationSettings = `"FILL" ${fill}, "wght" ${weight}, "GRAD" ${grade}, "opsz" ${opticalSize}`;

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={familyClassMap[variant] + (className ? ` ${className}` : "")}
        style={{
          fontVariationSettings,
          fontSize: px,
          lineHeight: 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          verticalAlign: "middle",
          ...style,
        }}
        {...rest}
      >
        {name}
      </span>
    );
  },
);

MaterialIcon.displayName = "MaterialIcon";

export default MaterialIcon;
