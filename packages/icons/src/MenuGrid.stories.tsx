import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import MenuGridIcon from "./MenuGridIcon";

const meta: Meta<typeof MenuGridIcon> = {
  component: MenuGridIcon,
  tags: ["autodocs"],
  title: "Icons/Navigation/MenuGridIcon",
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
        <MenuGridIcon size="md" className="text-gray-600" />
        <span className="text-xs text-gray-500">Gray</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MenuGridIcon size="md" className="text-blue-600" />
        <span className="text-xs text-gray-500">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MenuGridIcon size="md" className="text-green-600" />
        <span className="text-xs text-gray-500">Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MenuGridIcon size="md" className="text-red-600" />
        <span className="text-xs text-gray-500">Red</span>
      </div>
    </div>
  ),
};

export const SizeComparison: Story = {
  render: () => (
    <div className="flex gap-4 items-end">
      <div className="flex flex-col items-center gap-2">
        <MenuGridIcon size="sm" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MenuGridIcon size="md" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MenuGridIcon size="lg" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};
