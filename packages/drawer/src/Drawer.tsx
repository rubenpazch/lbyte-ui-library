import React, { useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { classList } from "@rubenpazch/shared";
import styles from "./Drawer.module.css";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";

export type DrawerDirection = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";
export type DrawerVariant = "default" | "modal" | "persistent" | "temporary";

export interface DrawerProps {
  /** Content to render inside the drawer */
  children?: React.ReactNode;
  /** Whether the drawer is open */
  open?: boolean;
  /** Callback when drawer should close */
  onClose?: () => void;
  /** Callback when drawer finishes opening */
  onOpen?: () => void;
  /** Direction from which drawer appears */
  direction?: DrawerDirection;
  /** Size of the drawer */
  size?: DrawerSize;
  /** Variant of the drawer */
  variant?: DrawerVariant;
  /** Custom className */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Whether to show backdrop overlay */
  showBackdrop?: boolean;
  /** Whether clicking backdrop closes drawer */
  closeOnBackdropClick?: boolean;
  /** Whether pressing escape closes drawer */
  closeOnEscape?: boolean;
  /** Whether to trap focus inside drawer */
  trapFocus?: boolean;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Custom close button */
  closeButton?: React.ReactNode;
  /** Whether to show default close button */
  showCloseButton?: boolean;
  /** Portal container element */
  portalContainer?: Element | DocumentFragment;
  /** Custom z-index */
  zIndex?: number;
  /** Disable body scroll when open */
  disableBodyScroll?: boolean;
  /** Animation duration in ms */
  transitionDuration?: number;
  /** Custom transition class names */
  transitionClasses?: CSSTransitionClassNames;
  /** ARIA label for accessibility */
  "aria-label"?: string;
  /** ARIA labelledby for accessibility */
  "aria-labelledby"?: string;
  /** ARIA describedby for accessibility */
  "aria-describedby"?: string;
}

const defaultTransitionClasses: Record<DrawerDirection, CSSTransitionClassNames> = {
  left: {
    enter: styles.fromLeftEnter,
    enterActive: styles.fromLeftEnterActive,
    enterDone: styles.fromLeftEnterDone,
    exit: styles.fromLeftExit,
    exitActive: styles.fromLeftExitActive,
    exitDone: styles.fromLeftExitDone,
  },
  right: {
    enter: styles.fromRightEnter,
    enterActive: styles.fromRightEnterActive,
    enterDone: styles.fromRightEnterDone,
    exit: styles.fromRightExit,
    exitActive: styles.fromRightExitActive,
    exitDone: styles.fromRightExitDone,
  },
  top: {
    enter: styles.fromTopEnter,
    enterActive: styles.fromTopEnterActive,
    enterDone: styles.fromTopEnterDone,
    exit: styles.fromTopExit,
    exitActive: styles.fromTopExitActive,
    exitDone: styles.fromTopExitDone,
  },
  bottom: {
    enter: styles.fromBottomEnter,
    enterActive: styles.fromBottomEnterActive,
    enterDone: styles.fromBottomEnterDone,
    exit: styles.fromBottomExit,
    exitActive: styles.fromBottomExitActive,
    exitDone: styles.fromBottomExitDone,
  },
};

const Drawer: React.FC<DrawerProps> = ({
  children,
  open = false,
  onClose,
  onOpen,
  direction = "left",
  size = "md",
  variant = "modal",
  className,
  style,
  showBackdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  trapFocus = true,
  header,
  footer,
  closeButton,
  showCloseButton = true,
  portalContainer,
  zIndex = 1000,
  disableBodyScroll = true,
  transitionDuration = 300,
  transitionClasses,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  // Handle escape key
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape && open && onClose) {
        onClose();
      }
    },
    [closeOnEscape, open, onClose]
  );

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === backdropRef.current && closeOnBackdropClick && onClose) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose]
  );

  // Manage body scroll
  useEffect(() => {
    if (disableBodyScroll && open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [disableBodyScroll, open]);

  // Manage focus trap
  useEffect(() => {
    if (!trapFocus || !open) return;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !nodeRef.current) return;

      const focusableElements = nodeRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [trapFocus, open]);

  // Store and restore focus
  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement;
      // Focus first focusable element after a brief delay
      setTimeout(() => {
        const firstFocusable = nodeRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        firstFocusable?.focus();
      }, 100);
    } else if (previousActiveElement.current) {
      (previousActiveElement.current as HTMLElement).focus?.();
    }
  }, [open]);

  // Add escape key listener
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  const renderDefaultCloseButton = () => (
    <button
      type="button"
      className={styles.closeButton}
      onClick={onClose}
      aria-label="Close drawer"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  );

  const drawerContent = (
    <>
      {/* Backdrop */}
      {showBackdrop && (
        <div
          ref={backdropRef}
          className={classList(styles.backdrop, {
            [styles.backdropVisible]: open,
          })}
          onClick={handleBackdropClick}
          style={{ zIndex: zIndex - 1 }}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <CSSTransition
        nodeRef={nodeRef}
        in={open}
        timeout={transitionDuration}
        classNames={transitionClasses || defaultTransitionClasses[direction]}
        unmountOnExit
        onEntered={onOpen}
        onExited={() => {
          // Restore focus when drawer closes
          if (previousActiveElement.current) {
            (previousActiveElement.current as HTMLElement).focus?.();
          }
        }}
      >
        <div
          ref={nodeRef}
          className={classList(
            styles.drawer,
            styles[`direction-${direction}`],
            styles[`size-${size}`],
            styles[`variant-${variant}`],
            className
          )}
          style={{ zIndex, ...style }}
          role="dialog"
          aria-modal={variant === "modal"}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          data-testid="drawer"
        >
          {/* Header */}
          {(header || showCloseButton) && (
            <div className={styles.header}>
              <div className={styles.headerContent}>{header}</div>
              {showCloseButton && (
                <div className={styles.headerActions}>
                  {closeButton || renderDefaultCloseButton()}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className={styles.content}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className={styles.footer}>
              {footer}
            </div>
          )}
        </div>
      </CSSTransition>
    </>
  );

  // Render in portal if container is provided, otherwise render normally
  if (portalContainer) {
    return ReactDOM.createPortal(drawerContent, portalContainer);
  }

  return drawerContent;
};

export default Drawer;
