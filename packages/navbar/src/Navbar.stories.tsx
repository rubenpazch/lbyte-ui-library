import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Navbar from "./Navbar";
import Button from "@rubenpazch/button";
import React from "react";

type Story = StoryObj<typeof Navbar>;

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
    icon: <span>🏠</span>,
    active: true 
  },
  { 
    id: "analytics", 
    label: "Analytics", 
    href: "/analytics", 
    icon: <span>📊</span> 
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
];

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A modern, responsive navbar component with mobile support, multiple variants, and customizable content.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'sticky', 'floating'],
      description: 'Visual style variant of the navbar',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the navbar',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom'],
      description: 'Position of the navbar',
    },
    shadow: {
      control: { type: 'boolean' },
      description: 'Whether the navbar has a shadow',
    },
    bordered: {
      control: { type: 'boolean' },
      description: 'Whether the navbar has a border',
    },
    fluid: {
      control: { type: 'boolean' },
      description: 'Whether the navbar should be fluid (full width)',
    },
    showMobileToggle: {
      control: { type: 'boolean' },
      description: 'Whether to show mobile menu toggle',
    },
  },
  args: {
    onMobileMenuToggle: fn(),
  },
  tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
  args: {
    brand: <strong>Brand</strong>,
    items: sampleItems,
    rightContent: (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button size="sm" variant="ghost">Login</Button>
        <Button size="sm">Sign Up</Button>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ height: '100vh', background: '#f3f4f6' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ margin: '1rem', color: '#374151' }}>Default Navbar</h3>
        <Navbar
          brand={<strong>Default</strong>}
          items={sampleItems}
          rightContent={<Button size="sm">Action</Button>}
        />
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ margin: '1rem', color: '#374151' }}>Sticky Navbar</h3>
        <Navbar
          variant="sticky"
          brand={<strong>Sticky</strong>}
          items={sampleItems}
          rightContent={<Button size="sm">Action</Button>}
        />
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ margin: '1rem', color: '#374151' }}>Floating Navbar</h3>
        <Navbar
          variant="floating"
          brand={<strong>Floating</strong>}
          items={sampleItems.slice(0, 3)}
          rightContent={<Button size="sm">Action</Button>}
        />
      </div>
      
      <div style={{ height: '200vh', padding: '2rem' }}>
        <p>Scroll to see sticky and floating behavior...</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>Small</h4>
        <Navbar
          size="sm"
          brand={<strong>Small</strong>}
          items={sampleItems.slice(0, 3)}
          rightContent={<Button size="xs">Action</Button>}
        />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>Medium</h4>
        <Navbar
          size="md"
          brand={<strong>Medium</strong>}
          items={sampleItems.slice(0, 3)}
          rightContent={<Button size="sm">Action</Button>}
        />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>Large</h4>
        <Navbar
          size="lg"
          brand={<strong>Large</strong>}
          items={sampleItems.slice(0, 3)}
          rightContent={<Button size="md">Action</Button>}
        />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    brand: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🚀</span>
        <strong>Company</strong>
      </div>
    ),
    items: sampleItemsWithIcons,
    rightContent: (
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span>👤</span>
        <Button size="sm" variant="ghost">Profile</Button>
      </div>
    ),
  },
};

export const ShadowAndBorders: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>With Shadow</h4>
        <Navbar
          brand={<strong>Shadow</strong>}
          items={sampleItems.slice(0, 3)}
          shadow={true}
        />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>With Border</h4>
        <Navbar
          brand={<strong>Border</strong>}
          items={sampleItems.slice(0, 3)}
          bordered={true}
          shadow={false}
        />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>Both Shadow and Border</h4>
        <Navbar
          brand={<strong>Both</strong>}
          items={sampleItems.slice(0, 3)}
          shadow={true}
          bordered={true}
        />
      </div>
    </div>
  ),
};

export const FluidWidth: Story = {
  args: {
    brand: <strong>Fluid Navbar</strong>,
    items: sampleItems,
    rightContent: <Button size="sm">Action</Button>,
    fluid: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Navbar with fluid width that spans the full container width.',
      },
    },
  },
};

export const CustomContent: Story = {
  args: {
    brand: <strong>Custom</strong>,
    rightContent: (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Welcome, John!
        </span>
        <Button size="sm" variant="outline">Logout</Button>
      </div>
    ),
    children: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'center' }}>
        <input
          type="search"
          placeholder="Search..."
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            width: '300px',
          }}
        />
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Navbar with custom content like search bars or other components.',
      },
    },
  },
};

export const MobilePreview: Story = {
  args: {
    brand: <strong>Mobile Demo</strong>,
    items: [
      ...sampleItemsWithIcons,
      { id: "disabled", label: "Disabled", href: "#", disabled: true, icon: <span>🚫</span> },
    ],
    rightContent: (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button size="sm" variant="ghost">Login</Button>
      </div>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Navbar optimized for mobile devices with hamburger menu.',
      },
    },
  },
};

export const DarkMode: Story = {
  args: {
    brand: <strong style={{ color: '#f9fafb' }}>Dark Navbar</strong>,
    items: sampleItemsWithIcons,
    rightContent: (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button size="sm" variant="ghost">Login</Button>
        <Button size="sm">Sign Up</Button>
      </div>
    ),
    className: 'dark-navbar',
  },
  decorators: [
    (Story) => (
      <div style={{ 
        background: '#111827', 
        minHeight: '100vh', 
        padding: '0',
        '--navbar-bg': '#1f2937',
        '--navbar-color': '#f9fafb',
        '--navbar-border-color': '#374151',
      } as React.CSSProperties}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Navbar with dark theme styling.',
      },
    },
  },
};
