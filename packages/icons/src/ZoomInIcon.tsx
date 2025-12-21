import React from 'react';

interface ZoomInIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const ZoomInIcon: React.FC<ZoomInIconProps> = ({
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
      aria-label="Zoom In"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
};

export default ZoomInIcon;
