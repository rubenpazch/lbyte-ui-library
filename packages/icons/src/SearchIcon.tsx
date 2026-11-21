import React from "react";

interface SearchIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * SearchIcon Component
 *
 * A reusable search/magnifying glass icon component.
 * Commonly used in search inputs and filter actions.
 *
 * @example
 * <SearchIcon size="md" />
 * <SearchIcon className="w-6 h-6 text-blue-600" />
 */
const SearchIcon: React.FC<SearchIconProps> = ({
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  // Tamaño en px como atributo SVG: funciona sin Tailwind y cualquier clase CSS lo sobrescribe.
  const sizePx: Record<string, number> = { sm: 16, md: 20, lg: 24 };

  const defaultClasses = `${sizeClasses[size]} ${className}`;

  return (
    <svg
      width={sizePx[size]}
      height={sizePx[size]}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={defaultClasses}
      aria-hidden="true"
    >
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
};

export default SearchIcon;
