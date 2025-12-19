// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  args: {
    formSize: "small",
    value: "testing small",
  },
};

type Story = StoryObj<typeof TextInput>;

export const Basic: Story = {};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div>
        <TextInput {...args} value="testing small" />
        <TextInput formSize="medium" value="testing medium" />
        <TextInput formSize="large" value="testing large" />
      </div>
    );
  },
};

export default meta;
