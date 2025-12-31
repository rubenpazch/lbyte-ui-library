import React from "react";
import EyeCheckIcon from "./EyeCheckIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof EyeCheckIcon> = {
  title: "Icons/EyeCheckIcon",
  component: EyeCheckIcon,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof EyeCheckIcon>;

export const Default: Story = { args: {} };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <EyeCheckIcon {...args} size="sm" />
      <EyeCheckIcon {...args} size="md" />
      <EyeCheckIcon {...args} size="lg" />
    </div>
  ),
};
export const CustomColor: Story = { args: { color: "#ff6600" } };
