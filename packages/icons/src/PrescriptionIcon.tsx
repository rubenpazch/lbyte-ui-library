import React from "react";

interface PrescriptionIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const PrescriptionIcon: React.FC<PrescriptionIconProps> = ({
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
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12h6m-6 4h6m2-13H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
      <path d="M9 3v2m6-2v2" />
    </svg>
  );
};

export default PrescriptionIcon;
