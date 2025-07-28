import type { Meta, StoryObj } from "@storybook/react";

import MenuMobile from "./MenuMobile";
import React from "react";

type Story = StoryObj<typeof MenuMobile>;

/**
 * Menu component
 */
export default {
  component: MenuMobile,
  tags: ["autodocs"],
} satisfies Meta<typeof MenuMobile>;

export const Default: Story = {
  args: {
    children: (
      <>
        <MenuMobile />
      </>
    ),
  },
};
