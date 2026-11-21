import React from "react";

interface PatientIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const PatientIcon: React.FC<PatientIconProps> = ({
  className = "",
  size = "md",
  color = "currentColor",
}) => {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

export default PatientIcon;
