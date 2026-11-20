import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Switch from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Formularios/Switch",
  component: Switch,
  tags: ["autodocs"],
};
export default meta;

const Demo = () => {
  const [on, setOn] = useState(true);
  return (
    <Switch
      checked={on}
      onChange={setOn}
      label="Mostrar en el sitio público"
      description="Los visitantes verán esta convocatoria."
    />
  );
};

export const Ejemplo: StoryObj<typeof Switch> = { render: () => <Demo /> };
