import * as React from "react";

export interface ChecksIconProps extends React.SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const ChecksIcon: React.FC<ChecksIconProps> = ({
  size = "md",
  color = "currentColor",
  className = "",
  ...props
}) => {
  const dimension = typeof size === "string" ? sizeMap[size] || 24 : size;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon icon-tabler icons-tabler-outline icon-tabler-checks ${className}`.trim()}
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 12l5 5l10 -10" />
      <path d="M2 12l5 5m5 -5l5 -5" />
    </svg>
  );
};

ChecksIcon.displayName = "ChecksIcon";
