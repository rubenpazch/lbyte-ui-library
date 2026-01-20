import React, { useEffect, useRef, useState } from "react";
import { CloseIcon } from "@rubenpazch/icons";
import styles from "./Drawer.module.css";

const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export type DrawerPosition = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";
export type DrawerAlign = "left" | "center" | "right" | "space-between";

export interface DrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Function to close the drawer */
  onClose: () => void;
  /** Position from which the drawer slides in */
  position?: DrawerPosition;
  /** Size of the drawer */
  size?: DrawerSize;
  /** Title displayed in the drawer header */
  title?: string;
  /** Content to render in the drawer */
  children: React.ReactNode;
  /** Whether to show overlay backdrop */
  showOverlay?: boolean;
  /** Whether clicking overlay closes the drawer */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the drawer */
  closeOnEscape?: boolean;
  /** Custom className for the drawer content */
  className?: string;
  /** Footer content (typically action buttons) */
  footer?: React.ReactNode;
  /** Header alignment (how to position title and close button) */
  headerAlign?: DrawerAlign;
  /** Footer alignment */
  footerAlign?: DrawerAlign;
  /** Whether the content (header, body, footer) should be contained in a max-width container */
  contentContained?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = "right",
  size = "md",
  title,
  children,
  showOverlay = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = "",
  footer,
  headerAlign = "space-between",
  footerAlign = "right",
  contentContained = false,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Handle mount/unmount with animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to trigger animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const positionClasses: Record<DrawerPosition, string> = {
    left: styles.left,
    right: styles.right,
    top: styles.top,
    bottom: styles.bottom,
  };

  const sizeClasses: Record<DrawerPosition, Record<DrawerSize, string>> = {
    left: {
      sm: styles.widthSm,
      md: styles.widthMd,
      lg: styles.widthLg,
      xl: styles.widthXl,
      full: styles.widthFull,
    },
    right: {
      sm: styles.widthSm,
      md: styles.widthMd,
      lg: styles.widthLg,
      xl: styles.widthXl,
      full: styles.widthFull,
    },
    top: {
      sm: styles.heightSm,
      md: styles.heightMd,
      lg: styles.heightLg,
      xl: styles.heightXl,
      full: styles.heightFull,
    },
    bottom: {
      sm: styles.heightSm,
      md: styles.heightMd,
      lg: styles.heightLg,
      xl: styles.heightXl,
      full: styles.heightFull,
    },
  };

  const transformClasses: Record<DrawerPosition, string> = {
    left: isAnimating ? styles.translateIn : styles.translateLeftOut,
    right: isAnimating ? styles.translateIn : styles.translateRightOut,
    top: isAnimating ? styles.translateIn : styles.translateTopOut,
    bottom: isAnimating ? styles.translateIn : styles.translateBottomOut,
  };

  const getPositionClasses = () =>
    classNames(
      styles.drawer,
      positionClasses[position],
      sizeClasses[position][size],
      transformClasses[position],
      className,
    );

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isAnimating && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isAnimating]);

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  // Don't render if not open and animation is complete
  if (!shouldRender) return null;

  const footerAlignClass = {
    left: styles.footerStart,
    center: styles.footerCenter,
    right: styles.footerEnd,
    "space-between": styles.footerSpaceBetween,
  }[footerAlign];

  return (
    <div
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "drawer-title" : undefined}
    >
      {showOverlay && (
        <div
          className={classNames(
            styles.overlay,
            isAnimating ? styles.overlayVisible : styles.overlayHidden,
          )}
          data-testid="drawer-overlay"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      <div
        ref={drawerRef}
        tabIndex={-1}
        className={getPositionClasses()}
        data-position={position}
        data-size={size}
      >
        {title && (
          <div
            className={classNames(
              styles.header,
              headerAlign === "center" && styles.headerCenter,
            )}
          >
            <div className={styles.headerContent}>
              <h2 id="drawer-title" className={styles.title}>
                {title}
              </h2>
              <button
                onClick={onClose}
                className={styles.closeButton}
                aria-label="Close drawer"
              >
                <CloseIcon size="md" />
              </button>
            </div>
          </div>
        )}

        <div className={styles.body}>
          {contentContained ? (
            <div className={styles.contained}>{children}</div>
          ) : (
            children
          )}
        </div>

        {footer && (
          <div className={classNames(styles.footer, footerAlignClass)}>
            {contentContained ? (
              <div className={styles.contained}>{footer}</div>
            ) : (
              footer
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
