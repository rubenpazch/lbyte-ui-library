import * as React from "react";

interface ChevronBarIconProps extends React.SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
  direction?: "left" | "right";
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 28,
};

const ChevronBarIcon: React.FC<ChevronBarIconProps> = ({
  size = "md",
  direction = "right",
  ...props
}) => {
  const dimension = sizeMap[size];
  const isLeft = direction === "left";

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <g transform={isLeft ? "scale(-1,1) translate(-20,0)" : undefined}>
        <path d="M7.22 5.22a.75.75 0 011.06 0l4 4a.75.75 0 010 1.06l-4 4a.75.75 0 11-1.06-1.06L10.94 10 7.22 6.28a.75.75 0 010-1.06z" />
        <path d="M15.25 4a.75.75 0 10-1.5 0v12a.75.75 0 101.5 0V4z" />
      </g>
    </svg>
  );
};

export default ChevronBarIcon;
