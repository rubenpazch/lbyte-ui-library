import type { Meta, StoryObj } from "@storybook/react";

import MenuGrid from "./MenuGrid";
import React from "react";

type Story = StoryObj<typeof MenuGrid>;

/**
 * Button component
 */
export default {
  component: MenuGrid,
  tags: ["autodocs"],
  title: "components/Icons/MenuGrid",
} satisfies Meta<typeof MenuGrid>;

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
        <MenuGrid width={8} height={8} />
        <MenuGrid width={16} height={16} />
        <MenuGrid width={24} height={24} />
        <MenuGrid width={32} height={32} />
        <MenuGrid width={40} height={40} />
        <MenuGrid width={48} height={48} />
      </div>
    );
  },
};

export const FixedSizes: Story = {
  render: () => {
    return (
      <div>
        <MenuGrid size="small" />
        <MenuGrid size="medium" />
        <MenuGrid size="large" />
        <MenuGrid size="x-large" />
      </div>
    );
  },
};
