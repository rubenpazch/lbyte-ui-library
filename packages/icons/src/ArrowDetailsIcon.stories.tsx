import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ArrowDetailsIcon from "./ArrowDetailsIcon";

const meta = {
  title: "Icons/Navigation/ArrowDetailsIcon",
  component: ArrowDetailsIcon,
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
} satisfies Meta<typeof ArrowDetailsIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Arrow Details Icon
 * Shows the arrow-in-circle icon in medium size
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * Small Arrow Details Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Large Arrow Details Icon
 * Suitable for prominently featured view details actions
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Arrow Details Icon with Blue Color
 * Commonly used for primary view details actions
 */
export const BlueColor: Story = {
  args: {
    size: "md",
    className: "text-blue-600",
  },
};

/**
 * Arrow Details Icon with Gray Color
 * Commonly used in neutral contexts
 */
export const GrayColor: Story = {
  args: {
    size: "md",
    className: "text-gray-600",
  },
};

/**
 * Arrow Details Icon with Custom Color
 */
export const CustomColor: Story = {
  args: {
    size: "md",
    className: "text-emerald-500",
  },
};

/**
 * Multiple Sizes Comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <ArrowDetailsIcon size="sm" />
      <ArrowDetailsIcon size="md" />
      <ArrowDetailsIcon size="lg" />
    </div>
  ),
};

/**
 * Arrow Details Icon in Context
 * Shows the icon as it might be used in UI
 */
export const InContext: Story = {
  render: () => (
    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      View Details
      <ArrowDetailsIcon size="sm" color="white" />
    </button>
  ),
};
