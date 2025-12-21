import React from 'react';

interface ArrowDetailsIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

/**
 * ArrowDetailsIcon Component
 *
 * A reusable arrow-in-circle icon component.
 * Commonly used for viewing more details or expanding information.
 *
 * @example
 * <ArrowDetailsIcon size="md" />
 * <ArrowDetailsIcon className="w-6 h-6 text-blue-600" />
 */
const ArrowDetailsIcon: React.FC<ArrowDetailsIconProps> = ({
  className = '',
  size = 'md',
  color = 'currentColor',
}) => {
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
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={defaultClasses}
      aria-label="View Details"
    >
      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

export default ArrowDetailsIcon;
