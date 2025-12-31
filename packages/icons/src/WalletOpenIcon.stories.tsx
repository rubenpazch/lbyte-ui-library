import React from "react";
import WalletOpen from "./WalletOpenIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof WalletOpen> = {
  title: "Icons/WalletOpen",
  component: WalletOpen,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof WalletOpen>;

export const Default: Story = { args: {} };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <WalletOpen {...args} size="sm" />
      <WalletOpen {...args} size="md" />
      <WalletOpen {...args} size="lg" />
    </div>
  ),
};
export const CustomColor: Story = { args: { color: "#ff6600" } };
