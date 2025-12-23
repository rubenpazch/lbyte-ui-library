import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Drawer from "./Drawer";

// Simple button component for stories
const StoryButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
    {...props}
  >
    {children}
  </button>
);

const SecondaryButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
    {...props}
  >
    {children}
  </button>
);

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Drawer Component

A flexible and animated drawer component that slides in from any edge of the screen. Perfect for navigation menus, filters, forms, or any content that needs to be displayed in a slide-out panel.

## Features

- 🎨 **Smooth Animations**: Built-in slide and fade animations with 300ms timing
- 📍 **Flexible Positioning**: Slide from left, right, top, or bottom
- 📏 **Multiple Sizes**: Small, medium, large, extra-large, or full-screen options
- ⌨️ **Keyboard Accessible**: Close with Escape key (configurable)
- 🖱️ **Overlay Control**: Optional backdrop with customizable click behavior
- 🎯 **Focus Management**: Proper focus trapping and accessibility attributes

## Installation

\`\`\`bash
pnpm add @rubenpazch/drawer
\`\`\`

## Basic Usage

\`\`\`tsx
import { Drawer } from '@rubenpazch/drawer';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Drawer
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Drawer"
      >
        <div>Your content here</div>
      </Drawer>
    </>
  );
}
\`\`\`

## Common Use Cases

### Navigation Menu (Mobile)
\`\`\`tsx
<Drawer
  isOpen={menuOpen}
  onClose={() => setMenuOpen(false)}
  position="left"
  size="sm"
  title="Menu"
>
  <nav>
    <a href="/home">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</Drawer>
\`\`\`

### Filters Panel
\`\`\`tsx
<Drawer
  isOpen={filtersOpen}
  onClose={() => setFiltersOpen(false)}
  position="right"
  title="Filters"
  footer={
    <div className="flex gap-2">
      <button onClick={applyFilters}>Apply</button>
      <button onClick={clearFilters}>Clear</button>
    </div>
  }
>
  <FilterForm />
</Drawer>
\`\`\`

### Form Panel
\`\`\`tsx
<Drawer
  isOpen={formOpen}
  onClose={() => setFormOpen(false)}
  position="right"
  size="lg"
  title="Create New Item"
  closeOnOverlayClick={false} // Prevent accidental closes
>
  <YourForm />
</Drawer>
\`\`\`

### Notifications Panel
\`\`\`tsx
<Drawer
  isOpen={notificationsOpen}
  onClose={() => setNotificationsOpen(false)}
  position="right"
  size="md"
  title="Notifications"
>
  <NotificationsList />
</Drawer>
\`\`\`

## Animation Behavior

The drawer uses a two-state animation system:
1. **Opening**: Slides in from the specified edge with a fade-in overlay (300ms)
2. **Closing**: Slides out to the edge with a fade-out overlay (300ms)

The component properly mounts/unmounts from the DOM after animations complete to avoid memory leaks.
        `,
      },
    },
  },
  tags: ["autodocs"],
  args: {
    isOpen: true,
    position: "right",
    size: "md",
    showOverlay: true,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    title: "Drawer Title",
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Whether the drawer is open",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClose: {
      control: false,
      description: "Callback function called when the drawer should close",
      table: {
        type: { summary: "() => void" },
      },
    },
    position: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
      description: "Position from which the drawer slides in",
      table: {
        type: { summary: "'left' | 'right' | 'top' | 'bottom'" },
        defaultValue: { summary: "'right'" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Size of the drawer",
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl' | 'full'" },
        defaultValue: { summary: "'md'" },
      },
    },
    title: {
      control: "text",
      description: "Title displayed in the drawer header",
      table: {
        type: { summary: "string" },
      },
    },
    showOverlay: {
      control: "boolean",
      description: "Whether to show the backdrop overlay",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    closeOnOverlayClick: {
      control: "boolean",
      description: "Whether clicking the overlay closes the drawer",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    closeOnEscape: {
      control: "boolean",
      description: "Whether pressing Escape closes the drawer",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    footer: {
      control: false,
      description: "Optional footer content (usually buttons)",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    children: {
      control: false,
      description: "Content to display inside the drawer",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

/**
 * ## Default Drawer
 *
 * This is the basic drawer with default settings. Use the controls below to:
 * - Toggle the drawer open/close
 * - Change position (left, right, top, bottom)
 * - Adjust size (sm, md, lg, xl, full)
 * - Configure overlay and close behaviors
 */
export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <p className="text-gray-700">
          This is the drawer content. You can put any content here.
        </p>
        <p className="text-gray-700">
          Use the controls below to change the drawer properties.
        </p>
      </div>
    ),
  },
};

/**
 * ## Interactive Example
 *
 * This example demonstrates how to control the drawer with a button, which is the most common use case.
 * The drawer is closed by default and can be opened by clicking the button.
 */
export const Interactive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <StoryButton onClick={() => setIsOpen(true)}>Open Drawer</StoryButton>
        <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="space-y-4">
            <p className="text-gray-700">
              This is the drawer content. You can put any content here.
            </p>
            <p className="text-gray-700">
              Click the close button, press Escape, or click the overlay to
              close.
            </p>
          </div>
        </Drawer>
      </div>
    );
  },
  args: {
    title: "Interactive Drawer",
  },
};

/**
 * Right Drawer (Default)
 * Most common position for drawers
 */
export const RightDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <StoryButton onClick={() => setIsOpen(true)}>
          Open Right Drawer
        </StoryButton>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Right Drawer"
          position="right"
        >
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Right Side Panel</h3>
            <p className="text-gray-700">
              This drawer slides in from the right side.
            </p>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Left Drawer
 * Alternative position sliding from left
 */
export const LeftDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <StoryButton onClick={() => setIsOpen(true)}>
          Open Left Drawer
        </StoryButton>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Left Drawer"
          position="left"
        >
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Left Side Panel</h3>
            <p className="text-gray-700">
              This drawer slides in from the left side.
            </p>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Top Drawer
 * Slides from top of screen
 */
export const TopDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <StoryButton onClick={() => setIsOpen(true)}>
          Open Top Drawer
        </StoryButton>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Top Drawer"
          position="top"
        >
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Top Panel</h3>
            <p className="text-gray-700">This drawer slides in from the top.</p>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Bottom Drawer
 * Slides from bottom of screen
 */
export const BottomDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <StoryButton onClick={() => setIsOpen(true)}>
          Open Bottom Drawer
        </StoryButton>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Bottom Drawer"
          position="bottom"
        >
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Bottom Panel</h3>
            <p className="text-gray-700">
              This drawer slides in from the bottom.
            </p>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Small Drawer
 * Compact size for minimal content
 */
export const SmallSize: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <StoryButton onClick={() => setIsOpen(true)}>
          Open Small Drawer
        </StoryButton>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Small Drawer"
          size="sm"
        >
          <p className="text-gray-700">Small drawer (256px wide)</p>
        </Drawer>
      </div>
    );
  },
};

/**
 * Large Drawer
 * More space for complex content
 */
export const LargeSize: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <StoryButton onClick={() => setIsOpen(true)}>
          Open Large Drawer
        </StoryButton>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Large Drawer"
          size="lg"
        >
          <p className="text-gray-700">Large drawer (384px wide)</p>
        </Drawer>
      </div>
    );
  },
};

/**
 * With Footer
 * Includes action buttons in footer
 */
export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <StoryButton onClick={() => setIsOpen(true)}>
          Open Drawer with Footer
        </StoryButton>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Drawer with Footer"
          footer={
            <div className="flex gap-3 justify-end">
              <SecondaryButton onClick={() => setIsOpen(false)}>
                Cancel
              </SecondaryButton>
              <StoryButton onClick={() => setIsOpen(false)}>Apply</StoryButton>
            </div>
          }
        >
          <div className="space-y-4">
            <p className="text-gray-700">Content with footer actions</p>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Filter Drawer
 * Example use case for filtering data
 */
export const FilterDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [dateRange, setDateRange] = useState("");

    const handleApply = () => {
      console.log("Filters applied:", { status, dateRange });
      setIsOpen(false);
    };

    const handleReset = () => {
      setStatus("");
      setDateRange("");
    };

    return (
      <div className="p-8">
        <StoryButton onClick={() => setIsOpen(true)}>Open Filters</StoryButton>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Filter Prescriptions"
          footer={
            <div className="flex gap-3 justify-end">
              <SecondaryButton onClick={handleReset}>Reset</SecondaryButton>
              <StoryButton onClick={handleApply}>Apply Filters</StoryButton>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="delivery_pending">Delivery Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * No Overlay
 * Drawer without background overlay
 */
export const NoOverlay: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <StoryButton onClick={() => setIsOpen(true)}>Open Drawer</StoryButton>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="No Overlay"
          showOverlay={false}
        >
          <p className="text-gray-700">This drawer has no overlay backdrop.</p>
        </Drawer>
      </div>
    );
  },
};

/**
 * Scrollable Content
 * Drawer with long scrollable content
 */
export const ScrollableContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <StoryButton onClick={() => setIsOpen(true)}>Open Drawer</StoryButton>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Scrollable Content"
        >
          <div className="space-y-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="p-4 bg-gray-100 rounded-lg">
                <h4 className="font-semibold text-gray-900">Item {i + 1}</h4>
                <p className="text-gray-600 mt-1">
                  This is some content that will make the drawer scrollable.
                </p>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    );
  },
};
