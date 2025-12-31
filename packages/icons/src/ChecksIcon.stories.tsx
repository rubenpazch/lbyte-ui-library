import React from "react";
import { ChecksIcon } from "./ChecksIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ChecksIcon> = {
  title: "Icons/ChecksIcon",
  component: ChecksIcon,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof ChecksIcon>;

export const Default: Story = { args: {} };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <ChecksIcon {...args} size="sm" />
      <ChecksIcon {...args} size="md" />
      <ChecksIcon {...args} size="lg" />
    </div>
  ),
};
export const CustomColor: Story = { args: { color: "#ff6600" } };
