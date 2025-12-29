import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ArrowLeftIcon from "./ArrowLeftIcon";

const meta: Meta<typeof ArrowLeftIcon> = {
  title: "Icons/ArrowLeftIcon",
  component: ArrowLeftIcon,
};
export default meta;

type Story = StoryObj<typeof ArrowLeftIcon>;

export const Default: Story = {
  render: (args) => <ArrowLeftIcon {...args} />,
};
