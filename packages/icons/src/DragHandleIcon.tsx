import React from 'react';

interface DragHandleIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * DragHandleIcon Component
 *
 * A reusable drag handle icon component showing grip dots.
 * Commonly used to indicate draggable items.
 *
 * @example
 * <DragHandleIcon size="md" />
 * <DragHandleIcon className="w-6 h-6 text-gray-400" />
 */
const DragHandleIcon: React.FC<DragHandleIconProps> = ({ className = '', size = 'md' }) => {
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
      fill="currentColor"
      className={defaultClasses}
      aria-hidden="true"
    >
      <path d="M10 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm8-6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
    </svg>
  );
};

export default DragHandleIcon;
