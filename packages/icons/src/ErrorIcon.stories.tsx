import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ErrorIcon from "./ErrorIcon";

const meta = {
  title: "Icons/Feedback/ErrorIcon",
  component: ErrorIcon,
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
} satisfies Meta<typeof ErrorIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Error Icon
 * Shows the error (X in circle) icon in medium size
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * Small Error Icon
 * Useful for inline usage or compact error messages
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Large Error Icon
 * Suitable for prominent error displays
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Error Icon with Red Color
 * Commonly used for error states and validation failures
 */
export const RedColor: Story = {
  args: {
    size: "md",
    className: "text-red-600",
  },
};

/**
 * Error Icon with Light Red
 * Softer error indication
 */
export const LightRedColor: Story = {
  args: {
    size: "md",
    className: "text-red-400",
  },
};

/**
 * Error Icon with Custom Color
 */
export const CustomColor: Story = {
  args: {
    size: "md",
    className: "text-orange-500",
  },
};

/**
 * Multiple Sizes Comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col items-center gap-2">
        <ErrorIcon size="sm" className="text-red-600" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ErrorIcon size="md" className="text-red-600" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ErrorIcon size="lg" className="text-red-600" />
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
        <ErrorIcon size="md" className="text-red-600" />
        <span className="text-xs text-gray-500">Red</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ErrorIcon size="md" className="text-red-400" />
        <span className="text-xs text-gray-500">Light Red</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ErrorIcon size="md" className="text-orange-600" />
        <span className="text-xs text-gray-500">Orange</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ErrorIcon size="md" className="text-gray-600" />
        <span className="text-xs text-gray-500">Gray</span>
      </div>
    </div>
  ),
};

/**
 * With Error Message Context
 */
export const WithErrorMessage: Story = {
  render: () => (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md max-w-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <ErrorIcon className="text-red-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">
            Invalid credentials. Please check your email and password.
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * With Different Backgrounds
 */
export const WithBackground: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="p-3 bg-red-100 rounded-lg">
        <ErrorIcon size="md" className="text-red-700" />
      </div>
      <div className="p-3 bg-orange-100 rounded-lg">
        <ErrorIcon size="md" className="text-orange-700" />
      </div>
      <div className="p-3 bg-gray-100 rounded-lg">
        <ErrorIcon size="md" className="text-gray-700" />
      </div>
    </div>
  ),
};

/**
 * Inline Usage Example
 */
export const InlineUsage: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <ErrorIcon size="sm" className="text-red-500" />
      <span className="text-sm text-red-700">This field is required</span>
    </div>
  ),
};

/**
 * List of Errors
 */
export const ErrorList: Story = {
  render: () => (
    <div className="space-y-2 max-w-md">
      <div className="flex items-start gap-2">
        <ErrorIcon size="sm" className="text-red-500 mt-0.5 flex-shrink-0" />
        <span className="text-sm text-gray-700">Email address is invalid</span>
      </div>
      <div className="flex items-start gap-2">
        <ErrorIcon size="sm" className="text-red-500 mt-0.5 flex-shrink-0" />
        <span className="text-sm text-gray-700">
          Password must be at least 8 characters
        </span>
      </div>
      <div className="flex items-start gap-2">
        <ErrorIcon size="sm" className="text-red-500 mt-0.5 flex-shrink-0" />
        <span className="text-sm text-gray-700">Passwords do not match</span>
      </div>
    </div>
  ),
};
