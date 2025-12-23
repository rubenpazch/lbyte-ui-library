import React, { useEffect, useRef, useState } from "react";
import { CloseIcon } from "@rubenpazch/icons";

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

  const getPositionClasses = () => {
    const base =
      "fixed bg-white shadow-xl transition-transform duration-300 ease-in-out";

    const sizes = {
      left: {
        sm: "w-64",
        md: "w-80",
        lg: "w-96",
        xl: "w-[32rem]",
        full: "w-full",
      },
      right: {
        sm: "w-64",
        md: "w-80",
        lg: "w-96",
        xl: "w-[32rem]",
        full: "w-full",
      },
      top: {
        sm: "h-64",
        md: "h-80",
        lg: "h-96",
        xl: "h-[32rem]",
        full: "h-full",
      },
      bottom: {
        sm: "h-64",
        md: "h-80",
        lg: "h-96",
        xl: "h-[32rem]",
        full: "h-full",
      },
    };

    const positions = {
      left: "left-0 top-0 h-full",
      right: "right-0 top-0 h-full",
      top: "top-0 left-0 w-full",
      bottom: "bottom-0 left-0 w-full",
    };

    const transforms = {
      left: isAnimating ? "translate-x-0" : "-translate-x-full",
      right: isAnimating ? "translate-x-0" : "translate-x-full",
      top: isAnimating ? "translate-y-0" : "-translate-y-full",
      bottom: isAnimating ? "translate-y-0" : "translate-y-full",
    };

    return `${base} ${positions[position]} ${sizes[position][size]} ${transforms[position]} ${className}`;
  };

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
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    "space-between": "justify-between",
  }[footerAlign];

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "drawer-title" : undefined}
    >
      {showOverlay && (
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      <div
        ref={drawerRef}
        tabIndex={-1}
        className={`${getPositionClasses()} flex flex-col`}
      >
        {title && (
          <div
            className={`px-6 py-4 border-b border-gray-200 ${
              headerAlign === "center" ? "text-center" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h2
                id="drawer-title"
                className="text-lg font-semibold text-gray-900 flex-1"
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                className="ml-4 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close drawer"
              >
                <CloseIcon size="md" />
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {contentContained ? (
            <div className="max-w-5xl mx-auto">{children}</div>
          ) : (
            children
          )}
        </div>

        {footer && (
          <div
            className={`px-6 py-4 border-t border-gray-200 bg-gray-50 flex ${footerAlignClass}`}
          >
            {contentContained ? (
              <div className="max-w-5xl mx-auto w-full">{footer}</div>
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
