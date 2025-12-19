import type { Meta, StoryObj } from "@storybook/react";

import Item from "./Item";
import React from "react";

type Story = StoryObj<typeof Item>;

/**
 * Item component
 */
export default {
  component: Item,
  tags: ["autodocs"],
} satisfies Meta<typeof Item>;

export const Default: Story = {
  args: {
    content: "testing",
  },
};

export const Rounded: Story = {
  render: () => {
    return (
      <div
        style={{
          backgroundColor: "rgb(232 232 232 / 63%)",
          width: "100",
          height: "20rem",
        }}
      >
        <Item content="testtt" rounded />
      </div>
    );
  },
};

export const Square: Story = {
  render: () => {
    return (
      <div
        style={{
          backgroundColor: "rgb(232 232 232 / 63%)",
          width: "100",
          height: "20rem",
        }}
      >
        <Item content="testtt" />
      </div>
    );
  },
};
