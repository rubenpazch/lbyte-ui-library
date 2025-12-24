interface CheckIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * CheckIcon Component
 *
 * A reusable checkmark/check circle icon component.
 * Commonly used for success states, task completion, and list items.
 *
 * @example
 * <CheckIcon size="md" />
 * <CheckIcon className="w-5 h-5 text-green-600" />
 */
export default function CheckIcon({
  className = "",
  size = "md",
}: CheckIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const defaultClasses = `${sizeClasses[size]} ${className}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={defaultClasses}
      aria-label="Check"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}
