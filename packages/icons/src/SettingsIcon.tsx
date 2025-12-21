import React from 'react';

interface SettingsIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const SettingsIcon: React.FC<SettingsIconProps> = ({
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
    <svg className={`${sizeClasses[size]} ${className}`} fill={color} viewBox="0 0 24 24">
      {/* Outer gear circle with 12 teeth */}
      <g>
        {/* Center hub */}
        <circle cx="12" cy="12" r="3" fill={color} />

        {/* Outer ring */}
        <circle cx="12" cy="12" r="7" fill="none" stroke={color} strokeWidth="1.5" />

        {/* 12 teeth around the wheel */}
        {/* Top */}
        <rect x="11" y="2" width="2" height="2.5" fill={color} />
        {/* Top-right 30° */}
        <rect
          x="15.2"
          y="3.5"
          width="2.2"
          height="2"
          fill={color}
          transform="rotate(30 16.3 4.5)"
        />
        {/* Right-top 60° */}
        <rect
          x="18.5"
          y="7.2"
          width="2"
          height="2.2"
          fill={color}
          transform="rotate(60 19.5 8.3)"
        />
        {/* Right */}
        <rect x="20.5" y="11" width="2.5" height="2" fill={color} />
        {/* Right-bottom 120° */}
        <rect
          x="18.5"
          y="14.8"
          width="2"
          height="2.2"
          fill={color}
          transform="rotate(120 19.5 15.9)"
        />
        {/* Bottom-right 150° */}
        <rect
          x="15.2"
          y="18.5"
          width="2.2"
          height="2"
          fill={color}
          transform="rotate(150 16.3 19.5)"
        />
        {/* Bottom */}
        <rect x="11" y="20.5" width="2" height="2.5" fill={color} />
        {/* Bottom-left 210° */}
        <rect
          x="6.6"
          y="18.5"
          width="2.2"
          height="2"
          fill={color}
          transform="rotate(210 7.7 19.5)"
        />
        {/* Left-bottom 240° */}
        <rect
          x="3.5"
          y="14.8"
          width="2"
          height="2.2"
          fill={color}
          transform="rotate(240 4.5 15.9)"
        />
        {/* Left */}
        <rect x="1" y="11" width="2.5" height="2" fill={color} />
        {/* Left-top 300° */}
        <rect x="3.5" y="7.2" width="2" height="2.2" fill={color} transform="rotate(300 4.5 8.3)" />
        {/* Top-left 330° */}
        <rect x="6.6" y="3.5" width="2.2" height="2" fill={color} transform="rotate(330 7.7 4.5)" />
      </g>
    </svg>
  );
};

export default SettingsIcon;
