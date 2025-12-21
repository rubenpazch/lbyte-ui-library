import React from 'react';

interface ErrorIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ErrorIcon Component
 *
 * A reusable error icon component showing an X inside a circle.
 * Commonly used for error states, validation failures, and alert messages.
 *
 * @example
 * <ErrorIcon size="md" />
 * <ErrorIcon className="text-red-400" />
 */
const ErrorIcon: React.FC<ErrorIconProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const defaultClasses = `${sizeClasses[size]} ${className}`;

  return (
    <svg className={defaultClasses} viewBox="0 0 20 20" fill="currentColor" aria-label="Error">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default ErrorIcon;
