import React from "react";

export type IconSize = "sm" | "md" | "lg" | "xl";

interface LocationIconProps {
  size?: IconSize;
  className?: string;
}

const sizeMap: Record<IconSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

/**
 * LocationIcon component
 * Displays a map pin/location icon for address-related UI elements
 */
const LocationIcon: React.FC<LocationIconProps> = ({
  size = "md",
  className = "",
}) => {
  return (
    <svg
      className={`${sizeMap[size]} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};

export default LocationIcon;
