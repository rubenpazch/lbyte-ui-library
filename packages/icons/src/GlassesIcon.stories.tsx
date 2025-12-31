import React from "react";
import GlassesIcon from "./GlassesIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GlassesIcon> = {
  title: "Icons/GlassesIcon",
  component: GlassesIcon,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof GlassesIcon>;

export const Default: Story = { args: {} };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <GlassesIcon {...args} size="sm" />
      <GlassesIcon {...args} size="md" />
      <GlassesIcon {...args} size="lg" />
    </div>
  ),
};
export const CustomColor: Story = { args: { color: "#ff6600" } };
