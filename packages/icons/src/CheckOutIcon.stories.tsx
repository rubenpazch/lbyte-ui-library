import React from "react";
import { CheckOutIcon } from "./CheckOutIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CheckOutIcon> = {
  title: "Icons/CheckOutIcon",
  component: CheckOutIcon,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof CheckOutIcon>;

export const Default: Story = { args: {} };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <CheckOutIcon {...args} size="sm" />
      <CheckOutIcon {...args} size="md" />
      <CheckOutIcon {...args} size="lg" />
    </div>
  ),
};
export const CustomColor: Story = { args: { color: "#ff6600" } };
