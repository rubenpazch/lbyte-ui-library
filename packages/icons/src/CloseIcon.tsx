// @ts-expect-error React import needed for Jest transforms
import * as React from "react";

interface CloseIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

export default function CloseIcon({
  className = "",
  size = "md",
  color = "currentColor",
}: CloseIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  // Tamaño en px como atributo SVG: funciona sin Tailwind y cualquier clase CSS lo sobrescribe.
  const sizePx: Record<string, number> = { sm: 16, md: 20, lg: 24 };

  return (
    <svg
      width={sizePx[size]}
      height={sizePx[size]}
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
