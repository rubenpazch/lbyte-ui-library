import React from "react";

interface SortIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * SortIcon Component
 *
 * A reusable sort icon component showing ascending/descending arrows.
 * Commonly used for sorting actions and controls.
 *
 * @example
 * <SortIcon size="md" />
 * <SortIcon className="w-6 h-6 text-blue-600" />
 */
const SortIcon: React.FC<SortIconProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const defaultClasses = `${sizeClasses[size]} ${className}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={defaultClasses}
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  );
};

export default SortIcon;
