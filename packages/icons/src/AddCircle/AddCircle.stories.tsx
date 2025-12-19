import type { Meta, StoryObj } from "@storybook/react";

import AddCircle from "./AddCircle";
import React from "react";

type Story = StoryObj<typeof AddCircle>;

/**
 * Button component
 */
export default {
  component: AddCircle,
  tags: ["autodocs"],
  title: "components/Icons",
} satisfies Meta<typeof AddCircle>;

export const AddCircleIconSizes: Story = {
  render: () => {
    return (
      <div>
        <AddCircle width={8} height={8} />
        <AddCircle width={16} height={17} />
        <AddCircle width={24} height={24} />
        <AddCircle width={32} height={32} />
        <AddCircle width={40} height={40} />
        <AddCircle width={48} height={48} />
      </div>
    );
  },
};
