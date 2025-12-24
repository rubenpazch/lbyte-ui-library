import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DocumentIcon from "./DocumentIcon";

const meta = {
  title: "Icons/Documents/DocumentIcon",
  component: DocumentIcon,
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
} satisfies Meta<typeof DocumentIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Document Icon
 * Shows the document/file icon in medium size
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * Small Document Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Large Document Icon
 * Suitable for prominently featured documents or prescriptions
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Document Icon with Pink Color
 * Commonly used for prescription-related actions
 */
export const PinkColor: Story = {
  args: {
    size: "md",
    className: "text-pink-600",
  },
};

/**
 * Document Icon with Blue Color
 */
export const BlueColor: Story = {
  args: {
    size: "md",
    className: "text-blue-600",
  },
};

/**
 * Document Icon with Custom Color
 */
export const CustomColor: Story = {
  args: {
    size: "md",
    className: "text-red-500",
  },
};

/**
 * Multiple Sizes Comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <DocumentIcon size="sm" />
      <DocumentIcon size="md" />
      <DocumentIcon size="lg" />
    </div>
  ),
};
