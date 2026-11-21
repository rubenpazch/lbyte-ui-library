import type { Meta, StoryObj } from "@storybook/react";
import DescriptionList from "./DescriptionList";

const meta: Meta<typeof DescriptionList> = {
  title: "Presentación/DescriptionList",
  component: DescriptionList,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pares etiqueta/valor de solo lectura (resumen de un registro). Para muchos registros, `DataTable`.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DescriptionList>;

export const Resumen: Story = {
  args: {
    title: "Datos del trámite",
    items: [
      { label: "Expediente", value: "EXP-2026-00321", highlight: true },
      { label: "Tipo", value: "Solicitud" },
      { label: "Remitente", value: "Ana Pérez Quispe" },
      { label: "Área de origen", value: "Logística" },
      { label: "Teléfono", value: "" },
      {
        label: "Asunto",
        value: "Solicitud de compra de insumos para el área de emergencia",
        fullWidth: true,
      },
    ],
    footnote: "El remitente se toma de la sesión.",
  },
};

export const TresColumnas: Story = {
  name: "Tres columnas",
  args: { ...Resumen.args, columns: 3 },
};
