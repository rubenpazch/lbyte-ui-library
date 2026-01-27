import React, { useState, ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

export type AvatarVariant = "circular" | "rounded" | "square";
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Image source URL */
  src?: string;
  /** Image srcset for responsive images */
  srcSet?: string;
  /** Alt text for image */
  alt?: string;
  /** Children - can be text, icon, or fallback content */
  children?: React.ReactNode;
  /** Shape variant of the avatar */
  variant?: AvatarVariant;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Custom sizes object for more control */
  sizes?: string;
  /** Image loading strategy */
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  /** Callback fired when image fails to load */
  onError?: React.ReactEventHandler<HTMLImageElement>;
  /** Callback fired when image loads successfully */
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  /** Custom component to use instead of default div */
  component?: React.ElementType;
}

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const sizeClassMap: Record<AvatarSize, string> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
};

const variantClassMap: Record<AvatarVariant, string> = {
  circular: styles.variantCircular,
  rounded: styles.variantRounded,
  square: styles.variantSquare,
};

/**
 * Extracts initials from a name string
 */
function getInitials(name: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Generates a consistent color based on string hash
 */
function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ];

  return colors[Math.abs(hash) % colors.length];
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      srcSet,
      alt = "",
      children,
      variant = "circular",
      size = "md",
      sizes,
      loading,
      onError,
      onLoad,
      className,
      component: Component = "div",
      style,
      ...props
    },
    ref,
  ) => {
    const [hasImageError, setHasImageError] = useState(false);

    const handleImageError = (
      event: React.SyntheticEvent<HTMLImageElement>,
    ) => {
      setHasImageError(true);
      onError?.(event);
    };

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      onLoad?.(event);
    };

    // Determine what to display
    const hasValidImage = src && !hasImageError;
    const shouldShowImage = hasValidImage;

    // Fallback hierarchy: children -> first letter of alt -> generic icon
    let fallbackContent = children;
    if (!fallbackContent && alt) {
      fallbackContent = getInitials(alt);
    }
    if (!fallbackContent) {
      fallbackContent = (
        <svg
          className={styles.fallbackIcon}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      );
    }

    // Generate color for letter avatars
    const isLetterAvatar =
      !hasValidImage && typeof fallbackContent === "string";
    const letterColor = isLetterAvatar && alt ? stringToColor(alt) : undefined;

    const classes = classNames(
      styles.root,
      sizeClassMap[size],
      variantClassMap[variant],
      isLetterAvatar ? styles.colorful : undefined,
      className,
    );

    const combinedStyle = {
      ...style,
      ...(letterColor ? { backgroundColor: letterColor } : {}),
    };

    return (
      <Component ref={ref} className={classes} style={combinedStyle} {...props}>
        {shouldShowImage ? (
          <img
            src={src}
            srcSet={srcSet}
            alt={alt}
            sizes={sizes}
            loading={loading}
            onError={handleImageError}
            onLoad={handleImageLoad}
            className={styles.img}
          />
        ) : (
          fallbackContent
        )}
      </Component>
    );
  },
);

Avatar.displayName = "Avatar";

export default Avatar;
