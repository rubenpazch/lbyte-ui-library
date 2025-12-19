import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MenuMobile from "./MenuMobile";

type Story = StoryObj<typeof MenuMobile>;

const sampleItems = [
  { id: "home", label: "Home", href: "/", active: true },
  { id: "about", label: "About", href: "/about" },
  { id: "services", label: "Services", href: "/services" },
  { id: "products", label: "Products", href: "/products" },
  { id: "contact", label: "Contact", href: "/contact" },
];

const sampleItemsWithIcons = [
  { 
    id: "dashboard", 
    label: "Dashboard", 
    href: "/dashboard", 
    icon: <span>📊</span>, 
    active: true 
  },
  { 
    id: "profile", 
    label: "Profile", 
    href: "/profile", 
    icon: <span>👤</span> 
  },
  { 
    id: "settings", 
    label: "Settings", 
    href: "/settings", 
    icon: <span>⚙️</span> 
  },
  { 
    id: "help", 
    label: "Help", 
    href: "/help", 
    icon: <span>❓</span> 
  },
  { 
    id: "logout", 
    label: "Logout", 
    onClick: () => alert("Logging out..."), 
    icon: <span>🚪</span>,
    disabled: false
  },
];

/**
 * Modern mobile menu component with hamburger toggle
 */
export default {
  title: "Components/MenuMobile",
  component: MenuMobile,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    isOpen: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof MenuMobile>;

export const Default: Story = {
  args: {
    items: sampleItems,
    brand: <span style={{ fontWeight: 'bold' }}>MyApp</span>,
  },
};

export const WithIcons: Story = {
  args: {
    items: sampleItemsWithIcons,
    brand: <span style={{ fontWeight: 'bold', color: '#667eea' }}>Dashboard</span>,
  },
};

export const RightPosition: Story = {
  args: {
    items: sampleItems,
    position: "right",
    brand: <span style={{ fontWeight: 'bold' }}>Right Menu</span>,
  },
};

export const SmallSize: Story = {
  args: {
    items: sampleItems,
    size: "sm",
    brand: <span style={{ fontSize: '0.9rem' }}>Small Menu</span>,
  },
};

export const LargeSize: Story = {
  args: {
    items: sampleItems,
    size: "lg",
    brand: <span style={{ fontSize: '1.5rem' }}>Large Menu</span>,
  },
};

export const WithCustomContent: Story = {
  args: {
    items: sampleItems.slice(0, 3),
    brand: <span style={{ fontWeight: 'bold' }}>Custom Content</span>,
    children: (
      <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Custom Section</h3>
        <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>
          This is custom content that can be added to the mobile menu.
        </p>
      </div>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    items: sampleItems,
    brand: <span style={{ fontWeight: 'bold' }}>With Footer</span>,
    footerContent: (
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#666' }}>
          © 2025 MyApp. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              background: '#667eea', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              background: 'transparent', 
              color: '#667eea', 
              border: '1px solid #667eea', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    ),
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <div>
        <div style={{ padding: '2rem', background: '#f8f9fa', minHeight: '100vh' }}>
          <h2>Controlled Menu Example</h2>
          <p>Menu is {isOpen ? 'open' : 'closed'}</p>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              padding: '0.5rem 1rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            Toggle Menu Programmatically
          </button>
          
          <MenuMobile
            items={sampleItemsWithIcons}
            brand={<span style={{ fontWeight: 'bold' }}>Controlled Menu</span>}
            isOpen={isOpen}
            onToggle={setIsOpen}
          />
        </div>
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    items: sampleItemsWithIcons,
    brand: <span style={{ fontWeight: 'bold' }}>Playground</span>,
    position: "left",
    size: "md",
    footerContent: (
      <div style={{ textAlign: 'center', color: '#666', fontSize: '0.875rem' }}>
        Playground Footer
      </div>
    ),
  },
};
