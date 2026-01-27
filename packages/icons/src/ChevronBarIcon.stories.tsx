import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ChevronBarIcon from "./ChevronBarIcon";

const meta: Meta<typeof ChevronBarIcon> = {
  component: ChevronBarIcon,
  tags: ["autodocs"],
  title: "Icons/Navigation/ChevronBarIcon",
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
      options: ["left", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    direction: "right",
  },
};

export const Directions: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <div className="flex flex-col items-center gap-2">
        <ChevronBarIcon direction="left" />
        <span className="text-xs text-gray-500">Left</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronBarIcon direction="right" />
        <span className="text-xs text-gray-500">Right</span>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <ChevronBarIcon size="sm" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronBarIcon size="md" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronBarIcon size="lg" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};
