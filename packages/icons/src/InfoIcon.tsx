import React from "react";

interface InfoIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * InfoIcon Component
 *
 * A reusable info/information icon component.
 * Commonly used to display help text, tips, or additional information.
 *
 * @example
 * <InfoIcon size="md" />
 * <InfoIcon className="w-6 h-6 text-blue-600" />
 */
const InfoIcon: React.FC<InfoIconProps> = ({ className = "", size = "md" }) => {
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
      aria-label="Info"
    >
      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

export default InfoIcon;
