import React from "react";

interface ExclamationTriangleIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const ExclamationTriangleIcon: React.FC<ExclamationTriangleIconProps> = ({
  className = "",
  size = "md",
  color = "currentColor",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  return (
    <svg
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ExclamationTriangle"
    >
      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  );
};

ExclamationTriangleIcon.displayName = "ExclamationTriangleIcon";
export default ExclamationTriangleIcon;
