import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Alert from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Retroalimentación/Alert",
  component: Alert,
  tags: ["autodocs"],
};
export default meta;

export const Ejemplo: StoryObj<typeof Alert> = {
  render: () => (
    <>
      <div style={{ display: "grid", gap: 12 }}>
        <Alert title="Información">El periodo de noviembre está abierto.</Alert>
        <Alert variant="success" title="Guardado">
          Los cambios se guardaron.
        </Alert>
        <Alert variant="warning">
          Hay 3 obligaciones por vencer esta semana.
        </Alert>
        <Alert variant="danger" title="No se pudo conectar" onClose={() => {}}>
          Revisa tu conexión e inténtalo otra vez.
        </Alert>
      </div>
    </>
  ),
};
