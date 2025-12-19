import type { Meta, StoryObj } from "@storybook/react";

import Lbyte from "./Lbyte";
import React from "react";

type Story = StoryObj<typeof Lbyte>;

/**
 * Button component
 */
export default {
  component: Lbyte,
  tags: ["autodocs"],
  title: "components/Icons/Lbyte",
} satisfies Meta<typeof Lbyte>;

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
        <Lbyte width={8} height={8} />
        <Lbyte width={16} height={16} />
        <Lbyte width={24} height={24} />
        <Lbyte width={32} height={32} />
        <Lbyte width={40} height={40} />
        <Lbyte width={48} height={48} />
      </div>
    );
  },
};

export const FixedSizes: Story = {
  render: () => {
    return (
      <div>
        <Lbyte size="small" />
        <Lbyte size="medium" />
        <Lbyte size="large" />
        <Lbyte size="x-large" />
      </div>
    );
  },
};
