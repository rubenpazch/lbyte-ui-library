import React from "react";

export type IconSize = "sm" | "md" | "lg" | "xl";

interface MoreIconProps {
  size?: IconSize;
  className?: string;
}

const sizeMap: Record<IconSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};
// Tamaño en px como atributo SVG: funciona sin Tailwind y cualquier clase CSS lo sobrescribe.
const sizePx: Record<string, number> = { sm: 16, md: 20, lg: 24, xl: 32 };

/**
 * MoreIcon component
 * Displays a vertical three-dot menu icon for more options/actions
 */
const MoreIcon: React.FC<MoreIconProps> = ({ size = "md", className = "" }) => {
  return (
    <svg
      width={sizePx[size]}
      height={sizePx[size]}
      className={`${sizeMap[size]} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      />
    </svg>
  );
};

export default MoreIcon;
