interface TargetIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

/**
 * TargetIcon Component
 *
 * A target/crosshair icon for selection, focus, or goal indication.
 *
 * @example
 * <TargetIcon size="md" />
 * <TargetIcon className="w-6 h-6 text-blue-600" />
 */
const TargetIcon: React.FC<TargetIconProps> = ({
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
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Target"
    >
      <path d="M16 8V5L19 2L20 4L22 5L19 8H16ZM16 8L12 11.9999M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7" />
    </svg>
  );
};

TargetIcon.displayName = "TargetIcon";
export default TargetIcon;
