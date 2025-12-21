import React from 'react';

interface EditIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

/**
 * EditIcon Component
 *
 * A reusable pencil/edit icon component.
 * Commonly used for edit or modify actions.
 *
 * @example
 * <EditIcon size="md" />
 * <EditIcon className="w-6 h-6 text-blue-600" />
 */
const EditIcon: React.FC<EditIconProps> = ({
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
      aria-label="Edit"
    >
      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
};

export default EditIcon;
