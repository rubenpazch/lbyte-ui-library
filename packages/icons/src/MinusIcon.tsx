
interface MinusIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function MinusIcon({
  className = '',
  size = 'md',
  color = 'currentColor',
}: MinusIconProps) {
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
      <path d="M5 12h14" />
    </svg>
  );
};

