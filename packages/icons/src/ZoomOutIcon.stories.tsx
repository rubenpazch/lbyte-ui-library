import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZoomOutIcon from "./ZoomOutIcon";

const meta: Meta<typeof ZoomOutIcon> = {
  component: ZoomOutIcon,
  tags: ["autodocs"],
  title: "Icons/Actions/ZoomOutIcon",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    color: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    color: "currentColor",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <ZoomOutIcon size="md" className="text-gray-600" />
        <span className="text-xs text-gray-500">Gray</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ZoomOutIcon size="md" className="text-blue-600" />
        <span className="text-xs text-blue-500">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ZoomOutIcon size="md" className="text-red-600" />
        <span className="text-xs text-red-500">Red</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ZoomOutIcon size="md" className="text-orange-600" />
        <span className="text-xs text-orange-500">Orange</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-8 items-end">
      <div className="flex flex-col items-center gap-2">
        <ZoomOutIcon size="sm" className="text-blue-600" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ZoomOutIcon size="md" className="text-blue-600" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ZoomOutIcon size="lg" className="text-blue-600" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="flex gap-4">
      <button className="p-2 rounded hover:bg-gray-100 transition-colors">
        <ZoomOutIcon size="md" className="text-gray-700" />
      </button>
      <button className="p-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors">
        <ZoomOutIcon size="md" color="white" />
      </button>
    </div>
  ),
};
