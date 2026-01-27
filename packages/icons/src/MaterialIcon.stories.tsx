import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import MaterialIcon from "./MaterialIcon";

const meta: Meta<typeof MaterialIcon> = {
  title: "Icons/MaterialIcon",
  component: MaterialIcon as any,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof MaterialIcon>;

export const Basic: Story = {
  args: {
    name: "search",
    variant: "outlined",
    size: "md",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <MaterialIcon name="favorite" variant="outlined" />
      <MaterialIcon name="favorite" variant="rounded" />
      <MaterialIcon name="favorite" variant="sharp" />
    </div>
  ),
};

export const SizesAndWeights: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <MaterialIcon name="home" size="sm" />
      <MaterialIcon name="home" size="md" />
      <MaterialIcon name="home" size="lg" />
      <MaterialIcon name="home" size={32} weight={600} />
      <MaterialIcon name="home" size={40} fill={1} />
    </div>
  ),
};
