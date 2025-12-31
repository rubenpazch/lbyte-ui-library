import React from "react";
import { UserPlusIcon } from "./UserPlusIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserPlusIcon> = {
  title: "Icons/UserPlusIcon",
  component: UserPlusIcon,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof UserPlusIcon>;

export const Default: Story = { args: {} };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <UserPlusIcon {...args} size="sm" />
      <UserPlusIcon {...args} size="md" />
      <UserPlusIcon {...args} size="lg" />
    </div>
  ),
};
export const CustomColor: Story = { args: { color: "#ff6600" } };
