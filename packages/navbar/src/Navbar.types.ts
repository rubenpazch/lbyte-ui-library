import { ReactNode } from "react";

export type NavbarVariant = "default" | "sticky" | "floating";
export type NavbarSize = "sm" | "md" | "lg";
export type NavbarPosition = "top" | "bottom";

export interface NavbarItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  children?: NavbarItem[];
}

export interface NavbarProps {
  /**
   * Navbar variant style
   * @default "default"
   */
  variant?: NavbarVariant;
  /**
   * Navbar size
   * @default "md"
   */
  size?: NavbarSize;
  /**
   * Position of the navbar
   * @default "top"
   */
  position?: NavbarPosition;
  /**
   * Brand/logo content
   */
  brand?: ReactNode;
  /**
   * Navigation items
   */
  items?: NavbarItem[];
  /**
   * Content to display on the right side
   */
  rightContent?: ReactNode;
  /**
   * Whether the navbar has a shadow
   * @default true
   */
  shadow?: boolean;
  /**
   * Whether the navbar has a border
   * @default false
   */
  bordered?: boolean;
  /**
   * Whether to show mobile menu toggle
   * @default true
   */
  showMobileToggle?: boolean;
  /**
   * Whether the mobile menu is open
   */
  isMobileMenuOpen?: boolean;
  /**
   * Callback when mobile menu toggle is clicked
   */
  onMobileMenuToggle?: () => void;
  /**
   * Maximum width of the navbar content
   */
  maxWidth?: string;
  /**
   * Whether the navbar should be fluid (full width)
   * @default false
   */
  fluid?: boolean;
  /**
   * Custom CSS class
   */
  className?: string;
  /**
   * Children elements (for custom content)
   */
  children?: ReactNode;
}
