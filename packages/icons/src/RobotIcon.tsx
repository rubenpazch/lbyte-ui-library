import * as React from "react";

export interface RobotIconProps extends React.SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const RobotIcon: React.FC<RobotIconProps> = ({
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
      className={`icon icon-tabler icons-tabler-outline icon-tabler-robot ${className}`.trim()}
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
      <path d="M12 2v2" />
      <path d="M9 12v9" />
      <path d="M15 12v9" />
      <path d="M5 16l4 -2" />
      <path d="M15 14l4 2" />
      <path d="M9 18h6" />
      <path d="M10 8v.01" />
      <path d="M14 8v.01" />
    </svg>
  );
};

RobotIcon.displayName = "RobotIcon";
