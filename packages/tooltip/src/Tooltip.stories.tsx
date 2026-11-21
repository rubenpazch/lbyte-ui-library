import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Tooltip from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Presentación/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};
export default meta;

export const Ejemplo: StoryObj<typeof Tooltip> = {
  render: () => (
    <>
      <div style={{ padding: 48 }}>
        <Tooltip content="Eliminar registro">
          <button>🗑</button>
        </Tooltip>
      </div>
    </>
  ),
};
