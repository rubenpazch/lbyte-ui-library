import React from 'react';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

interface ClockIconProps {
  size?: IconSize;
  className?: string;
}

const sizeMap: Record<IconSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

/**
 * ClockIcon component
 * Displays a clock icon for time/date-related UI elements
 */
const ClockIcon: React.FC<ClockIconProps> = ({ size = 'md', className = '' }) => {
  return (
    <svg
      className={`${sizeMap[size]} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default ClockIcon;
