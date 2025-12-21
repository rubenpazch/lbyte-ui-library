
interface PlusIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * PlusIcon Component
 *
 * A reusable plus/add icon component.
 * Commonly used for actions like creating new items or adding records.
 *
 * @example
 * <PlusIcon size="md" />
 * <PlusIcon className="w-6 h-6 text-green-600" />
 */
export default function PlusIcon({ className = '', size = 'md' }: PlusIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const defaultClasses = `${sizeClasses[size]} ${className}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={defaultClasses}
      aria-label="Plus"
    >
      <path d="M12 4v16m8-8H4" />
    </svg>
  );
};

