import type { Meta, StoryObj } from "@storybook/react";

import Menu from "./Menu";
import React from "react";

type Story = StoryObj<typeof Menu>;

/**
 * Menu component
 */
export default {
  component: Menu,
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export const Horizontal: Story = {
  args: {
    items: ["item1", "item2", "item3"],
  },
};

export const HorizontalWithChildren: Story = {
  args: {
    children: (
      <>
        <li>test1</li>
        <li>test2</li>
        <li>test3</li>
      </>
    ),
  },
};
