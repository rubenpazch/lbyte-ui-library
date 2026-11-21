import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import EmptyState from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Retroalimentación/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
};
export default meta;

export const Ejemplo: StoryObj<typeof EmptyState> = {
  render: () => (
    <>
      <EmptyState
        title="No hay convocatorias"
        description="Crea la primera para publicarla en el sitio."
        action={<button>Crear convocatoria</button>}
      />
    </>
  ),
};
