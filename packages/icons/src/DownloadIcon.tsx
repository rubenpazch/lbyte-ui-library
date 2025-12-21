import React from 'react';

interface DownloadIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const DownloadIcon: React.FC<DownloadIconProps> = ({
  className = '',
  size = 'md',
  color = 'currentColor',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <svg
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
};

export default DownloadIcon;
