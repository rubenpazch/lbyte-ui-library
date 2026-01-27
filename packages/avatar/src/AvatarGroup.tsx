import React, { Children, isValidElement } from "react";
import styles from "./AvatarGroup.module.css";

export type AvatarGroupSpacing = "small" | "medium" | number;

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Avatar children to display */
  children: React.ReactNode;
  /** Maximum number of avatars to show before showing +X */
  max?: number;
  /** Total number of avatars (for showing +X count) */
  total?: number;
  /** Spacing between avatars */
  spacing?: AvatarGroupSpacing;
  /** Custom render function for surplus count */
  renderSurplus?: (surplus: number) => React.ReactNode;
}

const classNames = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      max,
      total,
      spacing = "medium",
      renderSurplus,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const childrenArray = Children.toArray(children).filter(isValidElement);
    const totalAvatars = total || childrenArray.length;
    const maxToShow = max || childrenArray.length;
    const visibleChildren = childrenArray.slice(0, maxToShow);
    const surplus = totalAvatars - maxToShow;

    const spacingClass =
      typeof spacing === "number"
        ? styles.customSpacing
        : spacing === "small"
          ? styles.spacingSmall
          : styles.spacingMedium;

    const classes = classNames(styles.root, spacingClass, className);

    const combinedStyle = {
      ...style,
      ...(typeof spacing === "number"
        ? ({ "--avatar-spacing": `${spacing}px` } as React.CSSProperties)
        : {}),
    };

    return (
      <div ref={ref} className={classes} style={combinedStyle} {...props}>
        {visibleChildren.map((child, index) => (
          <div key={index} className={styles.avatar}>
            {child}
          </div>
        ))}
        {surplus > 0 && (
          <div className={`${styles.avatar} ${styles.surplus}`}>
            {renderSurplus ? (
              renderSurplus(surplus)
            ) : (
              <div className={styles.surplusContent}>+{surplus}</div>
            )}
          </div>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";

export default AvatarGroup;
