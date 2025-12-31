import React from "react";
import CoinsHandIcon from "./CoinsHandIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CoinsHandIcon> = {
  title: "Icons/CoinsHandIcon",
  component: CoinsHandIcon,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof CoinsHandIcon>;

export const Default: Story = { args: {} };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <CoinsHandIcon {...args} size="sm" />
      <CoinsHandIcon {...args} size="md" />
      <CoinsHandIcon {...args} size="lg" />
    </div>
  ),
};
export const CustomColor: Story = { args: { color: "#ff6600" } };
