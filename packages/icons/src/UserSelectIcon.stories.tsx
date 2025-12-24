import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import UserSelectIcon from "./UserSelectIcon";

const meta: Meta<typeof UserSelectIcon> = {
  component: UserSelectIcon,
  tags: ["autodocs"],
  title: "Icons/Users/UserSelectIcon",
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
        <UserSelectIcon size="md" className="text-gray-600" />
        <span className="text-xs text-gray-500">Gray</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserSelectIcon size="md" className="text-blue-600" />
        <span className="text-xs text-gray-500">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserSelectIcon size="md" className="text-green-600" />
        <span className="text-xs text-gray-500">Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserSelectIcon size="md" className="text-purple-600" />
        <span className="text-xs text-gray-500">Purple</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <UserSelectIcon size="sm" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserSelectIcon size="md" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserSelectIcon size="lg" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="p-3 bg-gray-100 rounded-lg">
        <UserSelectIcon size="md" className="text-gray-700" />
      </div>
      <div className="p-3 bg-blue-100 rounded-lg">
        <UserSelectIcon size="md" className="text-blue-700" />
      </div>
      <div className="p-3 bg-purple-100 rounded-lg">
        <UserSelectIcon size="md" className="text-purple-700" />
      </div>
    </div>
  ),
};
