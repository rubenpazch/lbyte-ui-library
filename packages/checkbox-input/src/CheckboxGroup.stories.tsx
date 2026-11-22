import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import CheckboxGroup, { type CheckboxGroupProps } from "./CheckboxGroup";

const dias = [
  { label: "Lunes", value: "lun" },
  { label: "Martes", value: "mar" },
  { label: "Miércoles", value: "mie" },
  { label: "Jueves", value: "jue" },
  { label: "Viernes", value: "vie" },
  { label: "Sábado", value: "sab" },
  { label: "Domingo", value: "dom", disabled: true },
];

const meta: Meta<CheckboxGroupProps> = {
  title: "Formularios/CheckboxGroup",
  component: CheckboxGroup,
  tags: ["autodocs"],
  args: {
    label: "Días de atención",
    options: dias,
    hint: "Marca los días en que abre el local.",
  },
};
export default meta;

type Story = StoryObj<CheckboxGroupProps>;

const Controlado = (args: CheckboxGroupProps) => {
  const [v, setV] = useState<string[]>(args.value ?? ["lun", "mar"]);
  return <CheckboxGroup {...args} value={v} onChange={setV} />;
};

export const Vertical: Story = { render: (a) => <Controlado {...a} /> };

export const Horizontal: Story = {
  render: (a) => <Controlado {...a} />,
  args: { orientation: "horizontal" },
};

export const EnColumnasConSeleccionarTodos: Story = {
  name: "En columnas con «Seleccionar todos»",
  render: (a) => <Controlado {...a} />,
  args: { columns: 3, selectAll: true },
};

export const ConMaximo: Story = {
  name: "Con máximo (3)",
  render: (a) => <Controlado {...a} />,
  args: {
    label: "Especialidades",
    hint: "Hasta 3.",
    maxSelected: 3,
    value: [],
    options: [
      { label: "Optometría", value: "opt" },
      { label: "Contactología", value: "con" },
      { label: "Baja visión", value: "baja" },
      { label: "Ortóptica", value: "ort" },
      { label: "Pediatría", value: "ped" },
    ],
  },
};

export const ConError: Story = {
  render: (a) => <Controlado {...a} />,
  args: { required: true, value: [], error: "Elige al menos un día." },
};
