import classList from "classnames";
import React, { forwardRef, useState, useEffect } from "react";
import { NavbarProps, NavbarItem } from "./Navbar.types";
import styles from "./Navbar.module.css";

export type NavbarHTMLProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof NavbarProps
> &
  NavbarProps;

/**
 * Modern, responsive navbar component with mobile support
 */
const Navbar = forwardRef<HTMLElement, NavbarHTMLProps>(
  (
    {
      variant = "default",
      size = "md",
      position = "top",
      brand,
      items = [],
      rightContent,
      shadow = true,
      bordered = false,
      showMobileToggle = true,
      isMobileMenuOpen: controlledMobileMenuOpen,
      onMobileMenuToggle,
      maxWidth,
      fluid = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);
    
    // Use controlled state if provided, otherwise use internal state
    const isMobileMenuOpen = controlledMobileMenuOpen !== undefined 
      ? controlledMobileMenuOpen 
      : internalMobileMenuOpen;

    const handleMobileToggle = () => {
      if (onMobileMenuToggle) {
        onMobileMenuToggle();
      } else {
        setInternalMobileMenuOpen(!internalMobileMenuOpen);
      }
    };

    // Close mobile menu on escape key
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isMobileMenuOpen) {
          handleMobileToggle();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobileMenuOpen]);

    // Close mobile menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const navbar = document.querySelector('[data-navbar]');
        if (navbar && !navbar.contains(event.target as Node) && isMobileMenuOpen) {
          handleMobileToggle();
        }
      };

      if (isMobileMenuOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isMobileMenuOpen]);

    const navbarClassName = classList(
      styles.navbar,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`position-${position}`],
      {
        [styles.shadow]: shadow,
        [styles.bordered]: bordered,
        [styles.fluid]: fluid,
        [styles.mobileMenuOpen]: isMobileMenuOpen,
      },
      className
    );

    const containerClassName = classList(
      styles.container,
      {
        [styles.containerFluid]: fluid,
      }
    );

    const renderNavItem = (item: NavbarItem, _index: number, isMobile = false) => {
      const itemClassName = classList(
        styles.navItem,
        {
          [styles.active]: item.active,
          [styles.disabled]: item.disabled,
          [styles.hasChildren]: item.children && item.children.length > 0,
          [styles.mobileNavItem]: isMobile,
        }
      );

      const handleItemClick = (e: React.MouseEvent) => {
        if (item.disabled) {
          e.preventDefault();
          return;
        }

        if (item.onClick) {
          item.onClick();
        }

        // Close mobile menu when item is clicked
        if (isMobile && isMobileMenuOpen) {
          handleMobileToggle();
        }
      };

      const itemContent = (
        <>
          {item.icon && <span className={styles.navItemIcon}>{item.icon}</span>}
          <span className={styles.navItemLabel}>{item.label}</span>
          {item.children && item.children.length > 0 && (
            <span className={styles.dropdownIndicator}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.427 9.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 9H4.604a.25.25 0 00-.177.427z"/>
              </svg>
            </span>
          )}
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
      <nav
        ref={ref}
        className={navbarClassName}
        data-navbar
        style={{ maxWidth: maxWidth && !fluid ? maxWidth : undefined }}
        {...props}
      >
        <div className={containerClassName}>
          {/* Brand/Logo */}
          {brand && (
            <div className={styles.brand}>
              {brand}
            </div>
          )}

          {/* Desktop Navigation */}
          {items.length > 0 && (
            <div className={styles.nav}>
              {items.map((item, index) => renderNavItem(item, index, false))}
            </div>
          )}

          {/* Custom children content */}
          {children && (
            <div className={styles.customContent}>
              {children}
            </div>
          )}

          {/* Right content and mobile toggle container */}
          <div className={styles.rightSection}>
            {rightContent && (
              <div className={styles.rightContent}>
                {rightContent}
              </div>
            )}

            {/* Mobile menu toggle */}
            {showMobileToggle && items.length > 0 && (
              <button
                type="button"
                className={styles.mobileToggle}
                onClick={handleMobileToggle}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className={styles.hamburger}>
                  <span className={styles.hamburgerLine} />
                  <span className={styles.hamburgerLine} />
                  <span className={styles.hamburgerLine} />
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {items.length > 0 && (
          <div 
            id="mobile-menu"
            className={classList(styles.mobileNav, {
              [styles.mobileNavOpen]: isMobileMenuOpen,
            })}
            aria-hidden={!isMobileMenuOpen}
          >
            <div className={styles.mobileNavContent}>
              {items.map((item, index) => renderNavItem(item, index, true))}
            </div>
          </div>
        )}
      </nav>
    );
  }
);

Navbar.displayName = "Navbar";

export default Navbar;
