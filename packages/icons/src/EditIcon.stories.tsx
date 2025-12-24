import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import EditIcon from "./EditIcon";

const meta = {
  title: "Icons/Actions/EditIcon",
  component: EditIcon,
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
} satisfies Meta<typeof EditIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Edit Icon
 * Shows the pencil/edit icon in medium size
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * Small Edit Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Large Edit Icon
 * Suitable for prominently featured edit actions
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Edit Icon with Blue Color
 * Commonly used for primary edit actions
 */
export const BlueColor: Story = {
  args: {
    size: "md",
    className: "text-blue-600",
  },
};

/**
 * Edit Icon with Green Color
 */
export const GreenColor: Story = {
  args: {
    size: "md",
    className: "text-green-600",
  },
};

/**
 * Edit Icon with Custom Color
 */
export const CustomColor: Story = {
  args: {
    size: "md",
    className: "text-amber-500",
  },
};

/**
 * Multiple Sizes Comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <EditIcon size="sm" />
      <EditIcon size="md" />
      <EditIcon size="lg" />
    </div>
  ),
};

/**
 * Edit Icon in Context
 * Shows the icon as it might be used in UI
 */
export const InContext: Story = {
  render: () => (
    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      <EditIcon size="sm" color="white" />
      Edit
    </button>
  ),
};
