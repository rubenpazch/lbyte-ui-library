import React from "react";

export type IconSize = "sm" | "md" | "lg" | "xl";

interface CoinsAcceptedIconProps {
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
 * CoinsAcceptedIcon component
 * Displays a coins accepted icon
 */
const CoinsAcceptedIcon: React.FC<CoinsAcceptedIconProps> = ({
  size = "md",
  className = "",
}) => {
  return (
    <svg
      className={`${sizeMap[size]} ${className}`}
      fill="currentColor"
      viewBox="0 -960 960 960"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Coins Accepted"
    >
      <path d="M570-531 406-695l43-43 121 122 234-233 42 41-276 277ZM295-200l307 90 248-78q0-20-15.5-33.5T798-235H589q-16 0-31.5-2.5T527-245l-96-29 19-61 94 32q11 4 22.5 6t22.5 2h56q0-21-14-36.5T597-355l-218-83h-84v238ZM80-80v-418h298q5 0 10.5 1t10.5 3l218 82q38 14 64.5 45t26.5 72h90q51 0 86.5 37t35.5 88v26L607-48l-312-89v57H80Zm60-60h94v-298h-94v298Z" />
    </svg>
  );
};

export default CoinsAcceptedIcon;
