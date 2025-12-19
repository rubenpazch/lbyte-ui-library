import type { Meta, StoryObj } from "@storybook/react";

import Bullet from "./Bullet";
import React from "react";

type Story = StoryObj<typeof Bullet>;

/**
 * Button component
 */
export default {
  component: Bullet,
  tags: ["autodocs"],
  title: "components/Icons/Bullet",
} satisfies Meta<typeof Bullet>;

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
        <Bullet width={8} height={8} />
        <Bullet width={16} height={16} />
        <Bullet width={24} height={24} />
        <Bullet width={32} height={32} />
        <Bullet width={40} height={40} />
        <Bullet width={48} height={48} />
      </div>
    );
  },
};

export const FixedSizes: Story = {
  render: () => {
    return (
      <div>
        <Bullet size="small" />
        <Bullet size="medium" />
        <Bullet size="large" />
        <Bullet size="x-large" />
      </div>
    );
  },
};
