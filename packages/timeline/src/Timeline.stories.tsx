import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Timeline from "./Timeline";

const meta: Meta<typeof Timeline> = {
  title: "Presentación/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Historial en orden (trámites, pedidos, expedientes). Genérico: la app convierte sus estados en `items` (p. ej. un envoltorio local `TimelineDocumento`). Para pasos que el usuario recorre ahora, usa `Stepper`.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Timeline>;

export const Tramite: Story = {
  name: "Historial de un trámite",
  args: {
    "aria-label": "Historial del trámite",
    highlightLast: true,
    items: [
      {
        title: "Registrado",
        description: "Mesa de partes virtual",
        date: "20/11/2026 09:10",
        status: "info",
      },
      {
        title: "Derivado a Logística",
        description: "Por Ana Pérez · Para atención",
        date: "20/11/2026 10:02",
        status: "primary",
      },
      {
        title: "Observado",
        description: "Falta la firma del jefe de área",
        date: "21/11/2026 08:45",
        status: "warning",
      },
      {
        title: "Respondido",
        description: "Oficio N.º 245-2026",
        date: "21/11/2026 16:30",
        status: "success",
      },
    ],
  },
};

export const Compacto: Story = {
  args: { ...Tramite.args, dense: true, highlightLast: false },
};
export const SinEventos: Story = { name: "Sin eventos", args: { items: [] } };
