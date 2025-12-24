import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZoomInIcon from "./ZoomInIcon";

const meta: Meta<typeof ZoomInIcon> = {
  component: ZoomInIcon,
  tags: ["autodocs"],
  title: "Icons/Actions/ZoomInIcon",
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
        <ZoomInIcon size="md" className="text-gray-600" />
        <span className="text-xs text-gray-500">Gray</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ZoomInIcon size="md" className="text-blue-600" />
        <span className="text-xs text-blue-500">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ZoomInIcon size="md" className="text-green-600" />
        <span className="text-xs text-green-500">Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ZoomInIcon size="md" className="text-purple-600" />
        <span className="text-xs text-purple-500">Purple</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-8 items-end">
      <div className="flex flex-col items-center gap-2">
        <ZoomInIcon size="sm" className="text-blue-600" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ZoomInIcon size="md" className="text-blue-600" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ZoomInIcon size="lg" className="text-blue-600" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="flex gap-4">
      <button className="p-2 rounded hover:bg-gray-100 transition-colors">
        <ZoomInIcon size="md" className="text-gray-700" />
      </button>
      <button className="p-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors">
        <ZoomInIcon size="md" color="white" />
      </button>
    </div>
  ),
};
