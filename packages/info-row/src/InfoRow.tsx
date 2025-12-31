import React from "react";

type InfoRowVariant =
  | "default"
  | "blue"
  | "yellow"
  | "purple"
  | "green"
  | "red"
  | "indigo"
  | "gray";

type InfoRowSize = "xs" | "sm" | "md" | "lg";
type InfoRowLayout = "vertical" | "horizontal" | "inline" | "compact";

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  variant?: InfoRowVariant;
  size?: InfoRowSize;
  layout?: InfoRowLayout;
  hideIcon?: boolean;
  hideLabel?: boolean;
  className?: string;
  action?: React.ReactNode; // Optional action element (link, button, icon button)
}

/**
 * InfoRow component
 * Displays a row of information with an icon, label, and value
 * Used in detail views to present structured data
 *
 * @param variant - Color variant for the background. Options:
 *   - 'default': No background color (gray text)
 *   - 'blue': Blue background (for far/distance vision)
 *   - 'yellow': Yellow background (for near vision)
 *   - 'purple': Purple background (for both vision types)
 *   - 'green': Green background
 *   - 'red': Red background
 *   - 'indigo': Indigo background
 *   - 'gray': Gray background
 *
 * @param size - Size variant. Options: 'xs' | 'sm' | 'md' | 'lg'
 * @param layout - Layout variant. Options:
 *   - 'vertical': Icon and text stacked (default)
 *   - 'horizontal': All elements in one line
 *   - 'inline': Compact single line without much spacing
 *   - 'compact': Minimal spacing for dense layouts
 * @param hideIcon - Hide the icon (useful for responsive layouts)
 * @param hideLabel - Hide the label, show only value (useful for mobile)
 * @param className - Additional CSS classes
 * @param action - Optional actionable element (link, button, icon button) positioned on the right
 */
const InfoRow: React.FC<InfoRowProps> = ({
  icon,
  label,
  value,
  variant = "default",
  size = "md",
  layout = "vertical",
  hideIcon = false,
  hideLabel = false,
  className = "",
  action,
}) => {
  const variantClasses: Record<
    InfoRowVariant,
    { bg: string; border: string; iconColor: string; labelColor: string }
  > = {
    default: {
      bg: "",
      border: "",
      iconColor: "text-gray-400",
      labelColor: "text-gray-500",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border border-blue-200",
      iconColor: "text-blue-500",
      labelColor: "text-blue-700",
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border border-yellow-200",
      iconColor: "text-yellow-600",
      labelColor: "text-yellow-700",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border border-purple-200",
      iconColor: "text-purple-500",
      labelColor: "text-purple-700",
    },
    green: {
      bg: "bg-green-50",
      border: "border border-green-200",
      iconColor: "text-green-500",
      labelColor: "text-green-700",
    },
    red: {
      bg: "bg-red-50",
      border: "border border-red-200",
      iconColor: "text-red-500",
      labelColor: "text-red-700",
    },
    indigo: {
      bg: "bg-indigo-50",
      border: "border border-indigo-200",
      iconColor: "text-indigo-500",
      labelColor: "text-indigo-700",
    },
    gray: {
      bg: "bg-gray-50",
      border: "border border-gray-200",
      iconColor: "text-gray-500",
      labelColor: "text-gray-700",
    },
  };

  const classes = variantClasses[variant];

  // Size configurations
  const sizeClasses: Record<
    InfoRowSize,
    {
      padding: string;
      iconSize: string;
      labelText: string;
      valueText: string;
      spacing: string;
    }
  > = {
    xs: {
      padding: "p-1",
      iconSize: "w-3 h-3",
      labelText: "text-xs",
      valueText: "text-xs font-medium",
      spacing: "space-x-1",
    },
    sm: {
      padding: "p-1.5",
      iconSize: "w-4 h-4",
      labelText: "text-xs",
      valueText: "text-sm font-medium",
      spacing: "space-x-2",
    },
    md: {
      padding: "p-2",
      iconSize: "w-5 h-5",
      labelText: "text-sm",
      valueText: "text-sm font-medium",
      spacing: "space-x-3",
    },
    lg: {
      padding: "p-3",
      iconSize: "w-6 h-6",
      labelText: "text-base",
      valueText: "text-base font-semibold",
      spacing: "space-x-4",
    },
  };

  const sizeConfig = sizeClasses[size];

  // Layout configurations
  const getLayoutClasses = () => {
    switch (layout) {
      case "horizontal":
        // All elements in one horizontal line with better spacing
        return {
          container: `flex items-center ${sizeConfig.spacing}`,
          content: "flex items-center gap-3",
          labelValueWrapper: "flex items-center gap-3",
        };
      case "inline":
        // Compact single line
        return {
          container: "flex items-center space-x-1.5",
          content: "flex items-center space-x-1",
          labelValueWrapper: "flex items-center space-x-1",
        };
      case "compact":
        // Minimal spacing for dense layouts
        return {
          container: "flex items-start space-x-1.5",
          content: "flex-1 min-w-0",
          labelValueWrapper: "space-y-0.5",
        };
      case "vertical":
      default:
        // Traditional vertical layout - label on top, value below
        return {
          container: `flex items-start ${sizeConfig.spacing}`,
          content: "flex-1",
          labelValueWrapper: "flex flex-col space-y-0.5",
        };
    }
  };

  const layoutClasses = getLayoutClasses();

  // Build container classes
  const containerClasses = [
    layoutClasses.container,
    variant === "default"
      ? sizeConfig.padding
      : `${sizeConfig.padding} rounded-lg ${classes.bg} ${classes.border}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Render icon conditionally
  const renderIcon = () => {
    if (hideIcon) return null;
    return (
      <div
        className={`${classes.iconColor} ${layout === "horizontal" || layout === "inline" ? "flex-shrink-0" : "mt-0.5"}`}
      >
        {icon}
      </div>
    );
  };

  // Render label conditionally
  const renderLabel = () => {
    if (hideLabel) return null;
    return (
      <span className={`${sizeConfig.labelText} ${classes.labelColor}`}>
        {label}
      </span>
    );
  };

  // Render value
  const renderValue = () => {
    return (
      <span className={`${sizeConfig.valueText} text-gray-900`}>{value}</span>
    );
  };

  // Render content based on layout
  const renderContent = () => {
    if (layout === "horizontal") {
      // Horizontal layout: label and value on same line with better separation
      return (
        <div className={layoutClasses.content}>
          {!hideLabel && renderLabel()}
          {renderValue()}
        </div>
      );
    }

    if (layout === "inline") {
      // Inline layout: compact with colon separator
      return (
        <div className={layoutClasses.content}>
          {!hideLabel && renderLabel()}
          {!hideLabel && <span className="text-gray-400">:</span>}
          {renderValue()}
        </div>
      );
    }

    // Vertical and compact layouts: label on top, value below
    return (
      <div className={layoutClasses.content}>
        <div className={layoutClasses.labelValueWrapper}>
          {!hideLabel && renderLabel()}
          {renderValue()}
        </div>
      </div>
    );
  };

  return (
    <div className={containerClasses}>
      {renderIcon()}
      {renderContent()}
      {action && <div className="ml-auto flex-shrink-0">{action}</div>}
    </div>
  );
};

export default InfoRow;
