import React from "react";
import { ArchiveIcon } from "./ArchiveIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ArchiveIcon> = {
  title: "Icons/ArchiveIcon",
  component: ArchiveIcon,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof ArchiveIcon>;

export const Default: Story = { args: {} };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <ArchiveIcon {...args} size="sm" />
      <ArchiveIcon {...args} size="md" />
      <ArchiveIcon {...args} size="lg" />
    </div>
  ),
};
export const CustomColor: Story = { args: { color: "#ff6600" } };
