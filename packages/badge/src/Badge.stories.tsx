import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Presentación/Badge",
  component: Badge,
  tags: ["autodocs"],
};
export default meta;

export const Ejemplo: StoryObj<typeof Badge> = {
  render: () => (
    <>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Badge color="success" dot>
          Pagado
        </Badge>
        <Badge color="warning" dot>
          Por vencer
        </Badge>
        <Badge color="danger" dot>
          Vencido
        </Badge>
        <Badge>Borrador</Badge>
        <Badge color="primary" variant="solid">
          3 nuevos
        </Badge>
        <Badge color="violet" variant="outline">
          Planilla
        </Badge>
      </div>
    </>
  ),
};
