import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RefreshIcon from "./RefreshIcon";

const meta = {
  title: "Icons/Actions/RefreshIcon",
  component: RefreshIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the icon",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for styling",
    },
    color: {
      control: "color",
      description: "Color of the icon",
    },
  },
} satisfies Meta<typeof RefreshIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Refresh Icon
 * Shows the refresh/restore icon in medium size
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * Small Refresh Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Large Refresh Icon
 * Suitable for prominently featured refresh actions
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Refresh Icon with Green Color
 * Commonly used for restore or reload actions
 */
export const GreenColor: Story = {
  args: {
    size: "md",
    className: "text-green-600",
  },
};

/**
 * Refresh Icon with Blue Color
 * Used for refresh data actions
 */
export const BlueColor: Story = {
  args: {
    size: "md",
    className: "text-blue-600",
  },
};

/**
 * Refresh Icon with Gray Color
 * Subtle appearance for secondary actions
 */
export const GrayColor: Story = {
  args: {
    size: "md",
    className: "text-gray-500",
  },
};

/**
 * Multiple Sizes Comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <RefreshIcon size="sm" />
      <RefreshIcon size="md" />
      <RefreshIcon size="lg" />
    </div>
  ),
};

/**
 * Color Variations
 */
export const ColorVariations: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <RefreshIcon size="md" className="text-gray-600" />
      <RefreshIcon size="md" className="text-blue-600" />
      <RefreshIcon size="md" className="text-green-600" />
      <RefreshIcon size="md" className="text-emerald-600" />
    </div>
  ),
};

/**
 * Usage in Button Context
 */
export const InButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <button className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700 transition-colors">
        <RefreshIcon size="sm" />
        Restore
      </button>
      <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md flex items-center gap-2 hover:bg-blue-50 transition-colors">
        <RefreshIcon size="sm" />
        Refresh
      </button>
    </div>
  ),
};

/**
 * Animated Refresh (with Tailwind)
 */
export const Animated: Story = {
  render: () => (
    <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors group">
      <RefreshIcon size="sm" className="group-hover:animate-spin" />
      Refresh Data
    </button>
  ),
};
