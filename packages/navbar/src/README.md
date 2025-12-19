# Navbar Component

A modern, responsive navbar component with mobile support, multiple variants, and customizable content.

## Features

- 🎨 **Multiple Variants**: Default, sticky, and floating styles
- 📱 **Mobile Responsive**: Automatic hamburger menu on mobile devices
- 🎛️ **Customizable**: Brand area, navigation items, and right content
- ♿ **Accessible**: ARIA labels, keyboard navigation, and focus management
- 🌙 **Dark Mode**: Built-in dark mode support
- ⚡ **Performance**: Optimized with React.forwardRef and proper event handling

## Basic Usage

```tsx
import { Navbar } from "@rubenpazch/lbyte-ui-library";

const navItems = [
  { id: "home", label: "Home", href: "/", active: true },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

function App() {
  return (
    <Navbar
      brand={<strong>My Brand</strong>}
      items={navItems}
      rightContent={
        <div>
          <Button variant="ghost" size="sm">Login</Button>
          <Button size="sm">Sign Up</Button>
        </div>
      }
    />
  );
}
```

## Advanced Usage

```tsx
import { Navbar, Button } from "@rubenpazch/lbyte-ui-library";
import { useState } from "react";

const navItemsWithIcons = [
  { 
    id: "dashboard", 
    label: "Dashboard", 
    href: "/dashboard", 
    icon: <DashboardIcon />,
    active: true 
  },
  { 
    id: "analytics", 
    label: "Analytics", 
    href: "/analytics", 
    icon: <AnalyticsIcon /> 
  },
  { 
    id: "settings", 
    label: "Settings", 
    href: "/settings", 
    icon: <SettingsIcon />,
    onClick: () => console.log("Settings clicked")
  },
];

function AdvancedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar
      variant="sticky"
      size="lg"
      brand={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src="/logo.svg" alt="Logo" width="32" height="32" />
          <strong>Company</strong>
        </div>
      }
      items={navItemsWithIcons}
      rightContent={
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span>Welcome, John!</span>
          <Button size="sm" variant="outline">Profile</Button>
          <Button size="sm">Logout</Button>
        </div>
      }
      shadow={true}
      isMobileMenuOpen={isMobileMenuOpen}
      onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "sticky" \| "floating"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the navbar |
| `position` | `"top" \| "bottom"` | `"top"` | Position of the navbar |
| `brand` | `ReactNode` | - | Brand/logo content |
| `items` | `NavbarItem[]` | `[]` | Navigation items |
| `rightContent` | `ReactNode` | - | Content for the right side |
| `shadow` | `boolean` | `true` | Whether to show shadow |
| `bordered` | `boolean` | `false` | Whether to show border |
| `fluid` | `boolean` | `false` | Full width navbar |
| `showMobileToggle` | `boolean` | `true` | Show mobile menu toggle |
| `isMobileMenuOpen` | `boolean` | - | Controlled mobile menu state |
| `onMobileMenuToggle` | `() => void` | - | Mobile menu toggle handler |

## NavbarItem Interface

```typescript
interface NavbarItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  children?: NavbarItem[]; // For future dropdown support
}
```

## Styling

The Navbar component uses CSS custom properties for easy theming:

```css
:root {
  --navbar-bg: #ffffff;
  --navbar-color: #1f2937;
  --navbar-border-color: #e5e7eb;
  --navbar-item-hover-color: #3b82f6;
  --navbar-item-hover-bg: rgba(59, 130, 246, 0.05);
  --navbar-item-active-color: #3b82f6;
  --navbar-item-active-bg: rgba(59, 130, 246, 0.1);
}
```

## Accessibility

The Navbar component follows accessibility best practices:

- Proper ARIA labels for the mobile menu toggle
- Keyboard navigation support
- Focus management
- Screen reader friendly structure
- High contrast mode support
