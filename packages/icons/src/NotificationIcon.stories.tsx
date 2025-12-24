import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import NotificationIcon from "./NotificationIcon";

const meta = {
  title: "Icons/Feedback/NotificationIcon",
  component: NotificationIcon,
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
} satisfies Meta<typeof NotificationIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Notification Icon
 * Shows the bell icon in medium size
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * Small Notification Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Large Notification Icon
 * Suitable for prominent notification displays
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Notification Icon with Blue Color
 * Commonly used for information notifications
 */
export const BlueColor: Story = {
  args: {
    size: "md",
    className: "text-blue-600",
  },
};

/**
 * Notification Icon with Red Color
 * For urgent or alert notifications
 */
export const RedColor: Story = {
  args: {
    size: "md",
    className: "text-red-600",
  },
};

/**
 * Notification Icon with Custom Color
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
    <div className="flex gap-4 items-center">
      <div className="flex flex-col items-center gap-2">
        <NotificationIcon size="sm" className="text-blue-600" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <NotificationIcon size="md" className="text-blue-600" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <NotificationIcon size="lg" className="text-blue-600" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};

/**
 * Color Variants
 */
export const ColorVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <NotificationIcon size="md" className="text-blue-600" />
        <span className="text-xs text-gray-500">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <NotificationIcon size="md" className="text-red-600" />
        <span className="text-xs text-gray-500">Red</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <NotificationIcon size="md" className="text-yellow-600" />
        <span className="text-xs text-gray-500">Yellow</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <NotificationIcon size="md" className="text-green-600" />
        <span className="text-xs text-gray-500">Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <NotificationIcon size="md" className="text-purple-600" />
        <span className="text-xs text-gray-500">Purple</span>
      </div>
    </div>
  ),
};

/**
 * With Badge Indicator
 */
export const WithBadge: Story = {
  render: () => (
    <div className="relative inline-block">
      <NotificationIcon size="lg" className="text-gray-600" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 items-center justify-center text-white text-xs font-bold">
          3
        </span>
      </span>
    </div>
  ),
};

/**
 * With Different Backgrounds
 */
export const WithBackground: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="p-3 bg-blue-100 rounded-lg">
        <NotificationIcon size="md" className="text-blue-700" />
      </div>
      <div className="p-3 bg-red-100 rounded-lg">
        <NotificationIcon size="md" className="text-red-700" />
      </div>
      <div className="p-3 bg-yellow-100 rounded-lg">
        <NotificationIcon size="md" className="text-yellow-700" />
      </div>
      <div className="p-3 bg-gray-100 rounded-lg">
        <NotificationIcon size="md" className="text-gray-700" />
      </div>
    </div>
  ),
};

/**
 * In Button Context
 */
export const InButton: Story = {
  render: () => (
    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      <NotificationIcon size="sm" />
      <span>Notifications</span>
      <span className="ml-1 px-2 py-0.5 text-xs bg-white text-blue-600 rounded-full">
        5
      </span>
    </button>
  ),
};

/**
 * Settings Tab Example
 */
export const InTabContext: Story = {
  render: () => (
    <div className="flex gap-2">
      <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 border-b-2 border-blue-700 rounded-t-lg">
        <NotificationIcon size="sm" />
        <span className="text-sm font-medium">Notifications</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-t-lg">
        <NotificationIcon size="sm" />
        <span className="text-sm font-medium">Notifications</span>
      </div>
    </div>
  ),
};
