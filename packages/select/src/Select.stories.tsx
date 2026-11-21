import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Select from "./Select";

const tipos = [
  { value: "boleta", label: "Boleta" },
  { value: "factura", label: "Factura" },
  { value: "nota", label: "Nota de crédito" },
];

const meta: Meta<typeof Select> = {
  title: "Formularios/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Lista desplegable nativa (`<select>`): accesible y rápida en móvil. Para listas largas o con búsqueda usa `Autocomplete`.",
      },
    },
  },
  args: {
    label: "Tipo de comprobante",
    options: tipos,
    placeholder: "Selecciona…",
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

const Controlado = (args: React.ComponentProps<typeof Select>) => {
  const [valor, setValor] = useState(args.value ?? "");
  return <Select {...args} value={valor} onChange={setValor} />;
};

export const Basico: Story = {
  name: "Básico",
  render: (a) => <Controlado {...a} value="" />,
};
export const ConAyuda: Story = {
  name: "Con ayuda",
  render: (a) => (
    <Controlado {...a} value="boleta" hint="La factura requiere RUC" />
  ),
};
export const ConError: Story = {
  name: "Con error",
  render: (a) => (
    <Controlado {...a} value="" required error="Elige un tipo de comprobante" />
  ),
};
export const Deshabilitado: Story = {
  render: (a) => <Controlado {...a} value="factura" disabled />,
};
