import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ChevronIcon from "./ChevronIcon";

const meta: Meta<typeof ChevronIcon> = {
  component: ChevronIcon,
  tags: ["autodocs"],
  title: "Icons/Navigation/ChevronIcon",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    direction: {
      control: { type: "select" },
      options: ["up", "down", "left", "right"],
    },
    color: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    direction: "down",
    color: "currentColor",
  },
};

export const Down: Story = {
  args: {
    direction: "down",
  },
};

export const Up: Story = {
  args: {
    direction: "up",
  },
};

export const Left: Story = {
  args: {
    direction: "left",
  },
};

export const Right: Story = {
  args: {
    direction: "right",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <ChevronIcon size="sm" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronIcon size="md" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronIcon size="lg" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};

export const Directions: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <ChevronIcon direction="up" />
        <span className="text-xs text-gray-500">Up</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronIcon direction="down" />
        <span className="text-xs text-gray-500">Down</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronIcon direction="left" />
        <span className="text-xs text-gray-500">Left</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronIcon direction="right" />
        <span className="text-xs text-gray-500">Right</span>
      </div>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <ChevronIcon className="text-gray-600" />
        <span className="text-xs text-gray-500">Gray</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronIcon className="text-blue-600" />
        <span className="text-xs text-gray-500">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronIcon className="text-green-600" />
        <span className="text-xs text-gray-500">Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronIcon className="text-red-600" />
        <span className="text-xs text-gray-500">Red</span>
      </div>
    </div>
  ),
};
