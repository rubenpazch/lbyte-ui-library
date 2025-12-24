import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import DownloadIcon from "./DownloadIcon";

const meta: Meta<typeof DownloadIcon> = {
  component: DownloadIcon,
  tags: ["autodocs"],
  title: "Icons/Actions/DownloadIcon",
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

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <DownloadIcon size="md" className="text-gray-600" />
        <span className="text-xs text-gray-500">Gray</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DownloadIcon size="md" className="text-blue-600" />
        <span className="text-xs text-gray-500">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DownloadIcon size="md" className="text-green-600" />
        <span className="text-xs text-gray-500">Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DownloadIcon size="md" className="text-amber-600" />
        <span className="text-xs text-gray-500">Amber</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <DownloadIcon size="sm" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DownloadIcon size="md" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DownloadIcon size="lg" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
        <DownloadIcon size="md" className="text-gray-700" />
      </div>
      <div className="p-3 bg-blue-100 rounded-lg hover:bg-blue-200 cursor-pointer">
        <DownloadIcon size="md" className="text-blue-700" />
      </div>
      <div className="p-3 bg-green-100 rounded-lg hover:bg-green-200 cursor-pointer">
        <DownloadIcon size="md" className="text-green-700" />
      </div>
    </div>
  ),
};
