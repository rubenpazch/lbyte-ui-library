import React from "react";
import { BusinessPlanIcon } from "./BusinessPlanIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BusinessPlanIcon> = {
  title: "Icons/BusinessPlanIcon",
  component: BusinessPlanIcon,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof BusinessPlanIcon>;

export const Default: Story = { args: {} };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <BusinessPlanIcon {...args} size="sm" />
      <BusinessPlanIcon {...args} size="md" />
      <BusinessPlanIcon {...args} size="lg" />
    </div>
  ),
};
export const CustomColor: Story = { args: { color: "#ff6600" } };
