import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ArrowRightIcon from "./ArrowRightIcon";

const meta: Meta<typeof ArrowRightIcon> = {
  title: "Icons/ArrowRightIcon",
  component: ArrowRightIcon,
};
export default meta;

type Story = StoryObj<typeof ArrowRightIcon>;

export const Default: Story = {
  render: (args) => <ArrowRightIcon {...args} />,
};
