import React from "react";
import { PresentationChartIcon } from "./PresentationChartIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PresentationChartIcon> = {
  title: "Icons/PresentationChartIcon",
  component: PresentationChartIcon,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof PresentationChartIcon>;

export const Default: Story = { args: {} };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <PresentationChartIcon {...args} size="sm" />
      <PresentationChartIcon {...args} size="md" />
      <PresentationChartIcon {...args} size="lg" />
    </div>
  ),
};
export const CustomColor: Story = { args: { color: "#ff6600" } };
