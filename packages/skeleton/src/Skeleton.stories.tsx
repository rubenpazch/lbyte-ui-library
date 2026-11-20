import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Skeleton from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Retroalimentación/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};
export default meta;

export const Ejemplo: StoryObj<typeof Skeleton> = {
  render: () => (
    <>
      <div style={{ display: "flex", gap: 12, maxWidth: 360 }}>
        <Skeleton variant="circle" width={48} />
        <div style={{ flex: 1 }}>
          <Skeleton lines={3} />
        </div>
      </div>
    </>
  ),
};
