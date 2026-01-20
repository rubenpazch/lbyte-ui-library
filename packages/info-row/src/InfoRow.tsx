import React from "react";
import styles from "./InfoRow.module.css";

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

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
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
  // Get variant classes
  const variantClass =
    styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`];
  const iconColorClass =
    styles[`iconColor${variant.charAt(0).toUpperCase() + variant.slice(1)}`];
  const labelColorClass =
    styles[`labelColor${variant.charAt(0).toUpperCase() + variant.slice(1)}`];

  // Get size classes
  const paddingClass =
    styles[`padding${size.charAt(0).toUpperCase() + size.slice(1)}`];
  const spacingClass =
    styles[`spacing${size.charAt(0).toUpperCase() + size.slice(1)}`];
  const labelSizeClass =
    styles[`label${size.charAt(0).toUpperCase() + size.slice(1)}`];
  const valueSizeClass =
    styles[`value${size.charAt(0).toUpperCase() + size.slice(1)}`];

  // Get layout classes
  const layoutClass =
    styles[`layout${layout.charAt(0).toUpperCase() + layout.slice(1)}`];

  // Build container classes
  const containerClasses = classNames(
    styles.container,
    layoutClass,
    spacingClass,
    variant !== "default" ? variantClass : undefined,
    variant !== "default" ? styles.rounded : undefined,
    variant !== "default" ? paddingClass : paddingClass,
    className,
  );

  // Render icon conditionally
  const renderIcon = () => {
    if (hideIcon) return null;
    const iconContainerClass =
      layout === "horizontal" || layout === "inline"
        ? styles.iconContainerHorizontal
        : styles.iconContainer;

    return (
      <div
        className={classNames(iconContainerClass, iconColorClass)}
        data-testid="info-row-icon"
      >
        {icon}
      </div>
    );
  };

  // Render label conditionally
  const renderLabel = () => {
    if (hideLabel) return null;
    return (
      <span
        className={classNames(styles.label, labelSizeClass, labelColorClass)}
        data-testid="info-row-label"
      >
        {label}
      </span>
    );
  };

  // Render value
  const renderValue = () => {
    return (
      <span
        className={classNames(styles.value, valueSizeClass)}
        data-testid="info-row-value"
      >
        {value}
      </span>
    );
  };

  // Render content based on layout
  const renderContent = () => {
    if (layout === "horizontal") {
      return (
        <div className={styles.contentHorizontal}>
          {!hideLabel && renderLabel()}
          {renderValue()}
        </div>
      );
    }

    if (layout === "inline") {
      return (
        <div className={styles.contentInline}>
          {!hideLabel && renderLabel()}
          {!hideLabel && <span className={styles.separator}>:</span>}
          {renderValue()}
        </div>
      );
    }

    // Vertical and compact layouts
    return (
      <div className={styles.content}>
        <div className={styles.labelValueWrapper}>
          {!hideLabel && renderLabel()}
          {renderValue()}
        </div>
      </div>
    );
  };

  return (
    <div
      className={containerClasses}
      data-testid="info-row"
      data-variant={variant}
      data-size={size}
      data-layout={layout}
    >
      {renderIcon()}
      {renderContent()}
      {action && (
        <div className={styles.action} data-testid="info-row-action">
          {action}
        </div>
      )}
    </div>
  );
};

export default InfoRow;
