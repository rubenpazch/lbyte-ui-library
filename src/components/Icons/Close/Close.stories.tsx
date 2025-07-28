import type { Meta, StoryObj } from "@storybook/react";

import Close from "./Close";
import React from "react";

type Story = StoryObj<typeof Close>;

/**
 * Button component
 */
export default {
  component: Close,
  tags: ["autodocs"],
  title: "components/Icons/Close",
} satisfies Meta<typeof Close>;

export const Default: Story = {
  args: {
    onClick: () => {
      console.log("testing");
    },
  },
};

export const CustomSizes: Story = {
  render: () => {
    return (
      <div>
        <Close width={8} height={8} />
        <Close width={16} height={16} />
        <Close width={24} height={24} />
        <Close width={32} height={32} />
        <Close width={40} height={40} />
        <Close width={48} height={48} />
      </div>
    );
  },
};

export const FixedSizes: Story = {
  render: () => {
    return (
      <div>
        <Close size="small" />
        <Close size="medium" />
        <Close size="large" />
        <Close size="x-large" />
      </div>
    );
  },
};
