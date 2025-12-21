import React from 'react';

interface UsersIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * UsersIcon Component
 *
 * A reusable users/people icon component showing multiple users.
 * Commonly used for viewing lists of users or patients.
 *
 * @example
 * <UsersIcon size="md" />
 * <UsersIcon className="w-6 h-6 text-blue-600" />
 */
const UsersIcon: React.FC<UsersIconProps> = ({ className = '', size = 'md' }) => {
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
      aria-label="Users"
    >
      {/* First user (left) */}
      <circle cx="6" cy="7" r="2.5" />
      <path d="M4 14c-1.1 0-2 .9-2 2v2c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2c0-1.1-.9-2-2-2H4z" />

      {/* Second user (center) */}
      <circle cx="12" cy="6" r="2.5" />
      <path d="M10 13c-1.1 0-2 .9-2 2v3c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-3c0-1.1-.9-2-2-2h-4z" />

      {/* Third user (right) */}
      <circle cx="18" cy="7" r="2.5" />
      <path d="M16 14c-1.1 0-2 .9-2 2v2c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2c0-1.1-.9-2-2-2h-4z" />
    </svg>
  );
};

export default UsersIcon;
