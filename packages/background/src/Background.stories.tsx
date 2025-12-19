import type { Meta, StoryObj } from "@storybook/react";
import Background from "./Background";

type Story = StoryObj<typeof Background>;

export default {
  component: Background,
  tags: ["autodocs"],
} satisfies Meta<typeof Background>;

export const Default: Story = {
  args: {
    label: ".bg-primary",
  },
};

export const Primary: Story = {
  args: {
    label: ".bg-primary",
    color: "bgPrimary",
  },
};

export const PrimarySubtle: Story = {
  args: {
    label: ".bg-primary-subtle",
    color: "bgPrimarySubtle",
  },
};
