import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CoinsAcceptedIcon from "./CoinsAcceptedIcon";

const meta: Meta<typeof CoinsAcceptedIcon> = {
  title: "Icons/Business/CoinsAcceptedIcon",
  component: CoinsAcceptedIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the icon",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CoinsAcceptedIcon>;

export const Default: Story = {
  args: {
    size: "md",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
  },
};

export const CustomColor: Story = {
  args: {
    size: "md",
    className: "text-green-600",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <CoinsAcceptedIcon size="sm" />
      <CoinsAcceptedIcon size="md" />
      <CoinsAcceptedIcon size="lg" />
      <CoinsAcceptedIcon size="xl" />
    </div>
  ),
};
