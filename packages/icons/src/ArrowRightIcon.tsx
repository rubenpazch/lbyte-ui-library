import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 28,
};

export const ArrowRightIcon: React.FC<IconProps> = ({
  size = "md",
  ...props
}) => (
  <svg
    width={sizeMap[size]}
    height={sizeMap[size]}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M7.707 4.293a1 1 0 010 1.414L4.414 9H16a1 1 0 110 2H4.414l3.293 3.293a1 1 0 11-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default ArrowRightIcon;
