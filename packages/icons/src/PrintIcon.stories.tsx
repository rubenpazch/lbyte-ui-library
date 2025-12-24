import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import PrintIcon from "./PrintIcon";

const meta = {
  title: "Icons/Documents/PrintIcon",
  component: PrintIcon,
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
} satisfies Meta<typeof PrintIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Print Icon
 * Shows the printer icon in medium size
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * Small Print Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Large Print Icon
 * Suitable for prominently featured print actions
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Print Icon with Blue Color
 * Commonly used for primary print actions
 */
export const BlueColor: Story = {
  args: {
    size: "md",
    className: "text-blue-600",
  },
};

/**
 * Print Icon with Gray Color
 * Commonly used in neutral contexts
 */
export const GrayColor: Story = {
  args: {
    size: "md",
    className: "text-gray-600",
  },
};

/**
 * Print Icon with Custom Color
 */
export const CustomColor: Story = {
  args: {
    size: "md",
    className: "text-indigo-500",
  },
};

/**
 * Multiple Sizes Comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <PrintIcon size="sm" />
      <PrintIcon size="md" />
      <PrintIcon size="lg" />
    </div>
  ),
};

/**
 * Print Icon in Context
 * Shows the icon as it might be used in UI
 */
export const InContext: Story = {
  render: () => (
    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      <PrintIcon size="sm" color="white" />
      Print Format
    </button>
  ),
};
