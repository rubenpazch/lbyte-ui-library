import React from "react";

interface CheckmarkIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * CheckmarkIcon Component
 *
 * A simple checkmark icon (without circle).
 * Used for list items, feature highlights, and confirmation states.
 *
 * @example
 * <CheckmarkIcon size="md" />
 * <CheckmarkIcon className="w-5 h-5 text-white" />
 */
const CheckmarkIcon: React.FC<CheckmarkIconProps> = ({
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  // Tamaño en px como atributo SVG: funciona sin Tailwind y cualquier clase CSS lo sobrescribe.
  const sizePx: Record<string, number> = { sm: 16, md: 20, lg: 24 };

  const combinedClasses = `${sizeClasses[size]} ${className}`.trim();

  return (
    <svg
      width={sizePx[size]}
      height={sizePx[size]}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className={combinedClasses}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
};

export default CheckmarkIcon;
