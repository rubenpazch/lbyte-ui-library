import type { Meta, StoryObj } from "@storybook/react";
import Collapsible from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Presentación/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Sección plegable para lo opcional de un formulario. Varias secciones de las que se abre una sola: `Tabs`.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Cerrada: Story = {
  args: {
    title: "Más opciones",
    children: <p>Campos opcionales del formulario.</p>,
  },
};

export const Abierta: Story = {
  args: {
    title: "Después del partido",
    defaultOpen: true,
    children: <p>Video, crónica y resultado.</p>,
  },
};
