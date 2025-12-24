import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SearchIcon from "./SearchIcon";

const meta = {
  title: "Icons/Actions/SearchIcon",
  component: SearchIcon,
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
  },
} satisfies Meta<typeof SearchIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Search Icon
 * Shows the search/magnifying glass icon in medium size
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * Small Search Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Large Search Icon
 * Suitable for prominently featured search actions
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Search Icon with Blue Color
 */
export const BlueColor: Story = {
  args: {
    size: "md",
    className: "text-blue-600",
  },
};

/**
 * Search Icon with Gray Color
 */
export const GrayColor: Story = {
  args: {
    size: "md",
    className: "text-gray-600",
  },
};

/**
 * Search Icon with Custom Color
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
      <SearchIcon size="sm" />
      <SearchIcon size="md" />
      <SearchIcon size="lg" />
    </div>
  ),
};
