import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import UsersIcon from "./UsersIcon";

const meta = {
  title: "Icons/Users/UsersIcon",
  component: UsersIcon,
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
} satisfies Meta<typeof UsersIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Users Icon
 * Shows the users/people icon in medium size
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * Small Users Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Large Users Icon
 * Suitable for prominently featured actions
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Users Icon with Blue Color
 * Commonly used for patient/user list views
 */
export const BlueColor: Story = {
  args: {
    size: "md",
    className: "text-blue-600",
  },
};

/**
 * Users Icon with Green Color
 */
export const GreenColor: Story = {
  args: {
    size: "md",
    className: "text-green-600",
  },
};

/**
 * Users Icon with Custom Color
 */
export const CustomColor: Story = {
  args: {
    size: "md",
    className: "text-purple-500",
  },
};

/**
 * Multiple Sizes Comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <UsersIcon size="sm" />
      <UsersIcon size="md" />
      <UsersIcon size="lg" />
    </div>
  ),
};
