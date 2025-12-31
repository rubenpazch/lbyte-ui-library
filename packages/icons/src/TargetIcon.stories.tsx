import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TargetIcon from "./TargetIcon";

const meta: Meta<typeof TargetIcon> = {
  title: "Icons/TargetIcon",
  component: TargetIcon,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      defaultValue: "md",
    },
    className: { control: "text" },
    color: { control: "color" },
  },
};
export default meta;
type Story = StoryObj<typeof TargetIcon>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-6">
      <TargetIcon size="sm" {...args} />
      <TargetIcon size="md" {...args} />
      <TargetIcon size="lg" {...args} />
    </div>
  ),
  args: {},
};

export const CustomColor: Story = {
  args: { color: "#8B5CF6", size: "lg" },
};
