import React from "react";

interface DocumentIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * DocumentIcon Component
 *
 * A reusable document/file icon component.
 * Commonly used for viewing documents, prescriptions, or records.
 *
 * @example
 * <DocumentIcon size="md" />
 * <DocumentIcon className="w-6 h-6 text-pink-600" />
 */
const DocumentIcon: React.FC<DocumentIconProps> = ({
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const defaultClasses = `${sizeClasses[size]} ${className}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={defaultClasses}
      aria-label="Document"
    >
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
};

export default DocumentIcon;
