import React from 'react';

interface ChevronIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ChevronIcon: React.FC<ChevronIconProps> = ({
  className = '',
  size = 'md',
  color = 'currentColor',
  direction = 'down',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const rotationClasses = {
    up: 'rotate-180',
    down: '',
    left: 'rotate-90',
    right: '-rotate-90',
  };

  return (
    <svg
      className={`${sizeClasses[size]} ${rotationClasses[direction]} ${className}`}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );
};

export default ChevronIcon;
