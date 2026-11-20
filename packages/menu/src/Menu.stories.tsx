import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Menu from "./Menu";

const meta: Meta<typeof Menu> = {
  title: "Acciones/Menu",
  component: Menu,
  tags: ["autodocs"],
};
export default meta;

export const Ejemplo: StoryObj<typeof Menu> = {
  render: () => (
    <>
      <div style={{ padding: 48, display: "flex", justifyContent: "center" }}>
        <Menu
          items={[
            { label: "Editar", onSelect: () => {} },
            { label: "Duplicar", onSelect: () => {} },
            { label: "Anular", onSelect: () => {}, danger: true },
          ]}
        />
      </div>
    </>
  ),
};
