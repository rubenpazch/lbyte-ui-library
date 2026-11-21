import React from "react";

interface ManualIdentifierIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * ManualIdentifierIcon Component
 *
 * A reusable icon component representing manually-entered identifiers.
 * The icon shows a pen/pencil symbol to represent user input and manual entry.
 *
 * @example
 * <ManualIdentifierIcon size="md" />
 * <ManualIdentifierIcon className="w-6 h-6 text-orange-600" />
 */
const ManualIdentifierIcon: React.FC<ManualIdentifierIconProps> = ({
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
      className={defaultClasses}
      fill="currentColor"
      viewBox="0 0 21 21"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Edit text bar icon - represents manual text entry */}
      <path
        d="M327.2,654 L325.1,654 L325.1,646 L327.2,646 L327.2,644 L323,644 L323,656 L327.2,656 L327.2,654 Z M333.5,644 L333.5,646 L341.9,646 L341.9,654 L333.5,654 L333.5,656 L344,656 L344,644 L333.5,644 Z M331.4,658 L333.5,658 L333.5,660 L327.2,660 L327.2,658 L329.3,658 L329.3,642 L327.2,642 L327.2,640 L333.5,640 L333.5,642 L331.4,642 L331.4,658 Z"
        transform="translate(-323, -640)"
      />
    </svg>
  );
};

export default ManualIdentifierIcon;
