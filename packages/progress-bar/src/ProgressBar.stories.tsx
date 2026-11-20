import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ProgressBar from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Retroalimentación/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
};
export default meta;

export const Ejemplo: StoryObj<typeof ProgressBar> = {
  render: () => (
    <>
      <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
        <ProgressBar label="Subiendo archivos" value={45} showValue />
        <ProgressBar
          label="Presupuesto usado"
          value={92}
          color="warning"
          showValue
        />
        <ProgressBar label="Procesando" />
      </div>
    </>
  ),
};
