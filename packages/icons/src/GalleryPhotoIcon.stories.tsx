import React from "react";
import { GalleryPhotoIcon } from "./GalleryPhotoIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GalleryPhotoIcon> = {
  title: "Icons/GalleryPhotoIcon",
  component: GalleryPhotoIcon,
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    color: { control: "color" },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof GalleryPhotoIcon>;

export const Default: Story = { args: {} };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <GalleryPhotoIcon {...args} size="sm" />
      <GalleryPhotoIcon {...args} size="md" />
      <GalleryPhotoIcon {...args} size="lg" />
    </div>
  ),
};
export const CustomColor: Story = { args: { color: "#ff6600" } };
