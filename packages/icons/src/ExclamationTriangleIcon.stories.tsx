import React from "react";
import { ExclamationTriangleIcon } from "./ExclamationTriangleIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ExclamationTriangleIcon> = {
  title: "Icons/ExclamationTriangleIcon",
  component: ExclamationTriangleIcon,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof ExclamationTriangleIcon>;

export const Default: Story = { args: {} };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <ExclamationTriangleIcon {...args} size="sm" />
      <ExclamationTriangleIcon {...args} size="md" />
      <ExclamationTriangleIcon {...args} size="lg" />
    </div>
  ),
};
export const CustomColor: Story = { args: { color: "#ff6600" } };
