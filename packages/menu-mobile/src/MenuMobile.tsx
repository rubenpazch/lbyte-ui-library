import React, { ReactNode, useState, useEffect } from "react";
import { classList } from "@rubenpazch/shared";
import styles from "./MenuMobile.module.css";

export type MenuMobileItem = {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
};

export type MenuMobileProps = {
  /** Menu items to display */
  items?: MenuMobileItem[];
  /** Custom content to display in the menu */
  children?: ReactNode;
  /** Brand/logo to display at the top */
  brand?: ReactNode;
  /** Additional content at the bottom of the menu */
  footerContent?: ReactNode;
  /** Custom className */
  className?: string;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when menu is toggled */
  onToggle?: (isOpen: boolean) => void;
  /** Position of the menu */
  position?: "left" | "right";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Custom hamburger icon */
  hamburgerIcon?: ReactNode;
  /** Close icon */
  closeIcon?: ReactNode;
};

const MenuMobile: React.FC<MenuMobileProps> = ({
  items = [],
  children,
  brand,
  footerContent,
  className,
  isOpen: controlledIsOpen,
  onToggle,
  position = "left",
  size = "md",
  hamburgerIcon,
  closeIcon,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    const newState = !isOpen;
    if (onToggle) {
      onToggle(newState);
    } else {
      setInternalIsOpen(newState);
    }
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleToggle();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const renderMenuItem = (item: MenuMobileItem) => {
    const itemClassName = classList(styles.menuItem, {
      [styles.menuItemActive]: item.active,
      [styles.menuItemDisabled]: item.disabled,
    });

    const handleItemClick = () => {
      if (item.disabled) return;
      
      if (item.onClick) {
        item.onClick();
      }
      
      // Close menu after item click
      handleToggle();
    };

    const itemContent = (
      <>
        {item.icon && <span className={styles.menuItemIcon}>{item.icon}</span>}
        <span className={styles.menuItemLabel}>{item.label}</span>
      </>
    );

    if (item.href) {
      return (
        <a
          key={item.id}
          href={item.href}
          className={itemClassName}
          onClick={handleItemClick}
          aria-disabled={item.disabled}
        >
          {itemContent}
        </a>
      );
    }

    return (
      <button
        key={item.id}
        type="button"
        className={itemClassName}
        onClick={handleItemClick}
        disabled={item.disabled}
      >
        {itemContent}
      </button>
    );
  };

  return (
    <>
      {/* Hamburger Toggle Button */}
      <button
        type="button"
        className={classList(
          styles.hamburgerToggle,
          styles[`size-${size}`],
          {
            [styles.hamburgerActive]: isOpen,
          },
          className
        )}
        onClick={handleToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        data-testid="mobile-menu-toggle"
      >
        {hamburgerIcon || (
          <div className={styles.hamburgerIcon}>
            <span className={classList(styles.hamburgerLine, styles.hamburgerTop)} />
            <span className={classList(styles.hamburgerLine, styles.hamburgerMiddle)} />
            <span className={classList(styles.hamburgerLine, styles.hamburgerBottom)} />
          </div>
        )}
        <span className={styles.srOnly}>
          {isOpen ? "Close navigation menu" : "Open navigation menu"}
        </span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className={styles.overlay}
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <aside
        id="mobile-menu"
        className={classList(
          styles.mobileMenu,
          styles[`position-${position}`],
          styles[`size-${size}`],
          {
            [styles.mobileMenuOpen]: isOpen,
          }
        )}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className={styles.menuHeader}>
          {brand && (
            <div className={styles.menuBrand}>
              {brand}
            </div>
          )}
          
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleToggle}
            aria-label="Close menu"
          >
            {closeIcon || (
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
            )}
          </button>
        </div>

        <nav className={styles.menuContent} role="navigation">
          <h2 id="mobile-menu-title" className={styles.srOnly}>
            Navigation Menu
          </h2>
          
          {items.length > 0 && (
            <ul className={styles.menuList} role="list">
              {items.map((item) => (
                <li key={item.id} className={styles.menuListItem}>
                  {renderMenuItem(item)}
                </li>
              ))}
            </ul>
          )}

          {children && (
            <div className={styles.customContent}>
              {children}
            </div>
          )}
        </nav>

        {footerContent && (
          <div className={styles.menuFooter}>
            {footerContent}
          </div>
        )}
      </aside>
    </>
  );
};

export default MenuMobile;
