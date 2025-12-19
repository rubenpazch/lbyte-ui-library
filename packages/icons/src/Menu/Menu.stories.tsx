import type { Meta, StoryObj } from "@storybook/react";

import Menu from "./Menu";
import React from "react";

type Story = StoryObj<typeof Menu>;

/**
 * MenuIcon  component
 */
export default {
  component: Menu,
  tags: ["autodocs"],
  title: "components/Icons",
} satisfies Meta<typeof Menu>;

export const MenuIconSizes: Story = {
  render: () => {
    return (
      <div>
        <Menu width={8} height={8} />
        <Menu width={16} height={17} />
        <Menu width={24} height={24} />
        <Menu width={32} height={32} />
        <Menu width={40} height={40} />
        <Menu width={48} height={48} />
      </div>
    );
  },
};
