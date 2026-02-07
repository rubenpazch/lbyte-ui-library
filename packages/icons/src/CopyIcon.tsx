import React from "react";

export type IconSize = "sm" | "md" | "lg" | "xl";

interface CopyIconProps {
  size?: IconSize;
  className?: string;
}

const sizeMap: Record<IconSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

/**
 * CopyIcon component
 * Displays a copy icon
 */
const CopyIcon: React.FC<CopyIconProps> = ({ size = "md", className = "" }) => {
  return (
    <svg
      className={`${sizeMap[size]} ${className}`}
      fill="currentColor"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Copy"
    >
      <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" />
    </svg>
  );
};

export default CopyIcon;
