import React from 'react';

interface UploadIconProps {
  /**
   * Size of the icon in pixels or as a Tailwind CSS class
   * @default 'h-12 w-12'
   */
  size?: string;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Accessible label for screen readers
   */
  ariaLabel?: string;
}

/**
 * UploadIcon Component
 *
 * A reusable upload/image icon component typically used for file upload interfaces.
 * Shows an image frame with an upload indicator.
 *
 * @example
 * // Default usage
 * <UploadIcon />
 *
 * @example
 * // With custom size
 * <UploadIcon size="h-16 w-16" />
 *
 * @example
 * // With custom styling
 * <UploadIcon className="text-blue-500" />
 */
const UploadIcon: React.FC<UploadIconProps> = ({
  size = 'h-12 w-12',
  className = 'text-gray-400',
  ariaLabel = 'Upload',
}) => {
  return (
    <svg
      className={`${size} ${className}`}
      stroke="currentColor"
      fill="none"
      viewBox="0 0 48 48"
      aria-hidden="true"
      aria-label={ariaLabel}
    >
      <path
        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UploadIcon;
