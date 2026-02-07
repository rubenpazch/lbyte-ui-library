import React from "react";

export type IconSize = "sm" | "md" | "lg" | "xl";

interface PatientListIconProps {
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
 * PatientListIcon component
 * Displays a patient list icon
 */
const PatientListIcon: React.FC<PatientListIconProps> = ({
  size = "md",
  className = "",
}) => {
  return (
    <svg
      className={`${sizeMap[size]} ${className}`}
      fill="currentColor"
      viewBox="0 -960 960 960"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Patient List"
    >
      <path d="M555.5-436.5Q522-470 522-521t33.5-84.5Q589-639 640-639t84.5 33.5Q758-572 758-521t-33.5 84.5Q691-403 640-403t-84.5-33.5ZM400-160v-66q0-19 9-36t24-24q45-32 98.5-47.5T640-349q55 0 108 17t99 46q14 10 23.5 25.5T880-226v66H400Zm55-71v11h370v-11q-39-26-90-42t-95-16q-44 0-95.5 16T455-231Zm227-248q16-16 16-42t-16-42q-16-16-42-16t-42 16q-16 16-16 42t16 42q16 16 42 16t42-16Zm-42-42Zm0 301ZM120-410v-60h306v60H120Zm0-330v-60h473v60H120Zm349 165H120v-60h380q-11 13-18.5 28T469-575Z" />
    </svg>
  );
};

export default PatientListIcon;
