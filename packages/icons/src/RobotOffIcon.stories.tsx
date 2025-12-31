import React from "react";
import { RobotOffIcon } from "./RobotOffIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RobotOffIcon> = {
  title: "Icons/RobotOffIcon",
  component: RobotOffIcon,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof RobotOffIcon>;

export const Default: Story = { args: {} };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <RobotOffIcon {...args} size="sm" />
      <RobotOffIcon {...args} size="md" />
      <RobotOffIcon {...args} size="lg" />
    </div>
  ),
};
export const CustomColor: Story = { args: { color: "#ff6600" } };
