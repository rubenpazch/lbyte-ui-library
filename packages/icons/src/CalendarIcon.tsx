import React from 'react';

interface CalendarIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * CalendarIcon Component
 *
 * A reusable calendar icon component.
 * Commonly used for date pickers, scheduling features, and appointment management.
 *
 * @example
 * <CalendarIcon size="md" />
 * <CalendarIcon className="w-5 h-5 text-blue-600" />
 */
const CalendarIcon: React.FC<CalendarIconProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const defaultClasses = `${sizeClasses[size]} ${className}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={defaultClasses}
      aria-label="Calendar"
    >
      <path
        fillRule="evenodd"
        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default CalendarIcon;
