import React from "react";

interface TrashIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

/**
 * TrashIcon Component
 *
 * A reusable trash/delete icon component.
 * Commonly used for delete or remove actions.
 *
 * @example
 * <TrashIcon size="md" />
 * <TrashIcon className="w-6 h-6 text-red-600" />
 */
const TrashIcon: React.FC<TrashIconProps> = ({
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
      aria-label="Delete"
    >
      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
};

export default TrashIcon;
