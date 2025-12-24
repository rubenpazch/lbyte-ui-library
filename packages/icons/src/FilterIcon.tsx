import React from "react";

interface FilterIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * FilterIcon Component
 *
 * A reusable filter/funnel icon component.
 * Commonly used for filter actions and filtering controls.
 *
 * @example
 * <FilterIcon size="md" />
 * <FilterIcon className="w-6 h-6 text-blue-600" />
 */
const FilterIcon: React.FC<FilterIconProps> = ({
  className = "",
  size = "md",
}) => {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
};

export default FilterIcon;
