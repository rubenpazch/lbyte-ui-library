import React from "react";

interface RefreshIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

/**
 * RefreshIcon Component
 *
 * A reusable refresh/restore icon component.
 * Commonly used for refresh, reload, or restore actions.
 *
 * @example
 * <RefreshIcon size="md" />
 * <RefreshIcon className="w-6 h-6 text-green-600" />
 */
const RefreshIcon: React.FC<RefreshIconProps> = ({
  className = "",
  size = "md",
  color = "currentColor",
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
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={defaultClasses}
      aria-label="Refresh"
    >
      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
};

export default RefreshIcon;
