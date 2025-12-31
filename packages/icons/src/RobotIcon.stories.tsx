import React from "react";
import { RobotIcon } from "./RobotIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RobotIcon> = {
  title: "Icons/RobotIcon",
  component: RobotIcon,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof RobotIcon>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <RobotIcon {...args} size="sm" />
      <RobotIcon {...args} size="md" />
      <RobotIcon {...args} size="lg" />
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    color: "#ff6600",
  },
};
