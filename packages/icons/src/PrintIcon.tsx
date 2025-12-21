import React from 'react';

interface PrintIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

/**
 * PrintIcon Component
 *
 * A reusable printer/print icon component.
 * Commonly used for printing documents or opening print formats.
 *
 * @example
 * <PrintIcon size="md" />
 * <PrintIcon className="w-6 h-6 text-blue-600" />
 */
const PrintIcon: React.FC<PrintIconProps> = ({
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
      aria-label="Print"
    >
      <polyline points="6 9 6 2 18 2 18 9"></polyline>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
      <rect x="6" y="14" width="12" height="8"></rect>
    </svg>
  );
};

export default PrintIcon;
