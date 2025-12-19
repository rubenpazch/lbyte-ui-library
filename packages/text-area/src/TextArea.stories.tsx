// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TextArea from "./TextArea";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
};
export default meta;

type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {};

export const Primary: Story = {
  args: {
    color: "primary",
    placeholder: "add a text",
  },
};

export const ManyItems: Story = {
  render: (args) => (
    <>
      <TextArea {...args} />
    </>
  ),
};

export const Size: Story = {
  render: () => (
    <>
      <TextArea />
    </>
  ),
};
