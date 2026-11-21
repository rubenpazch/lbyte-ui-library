import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import SegmentedControl from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  title: "Formularios/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
};
export default meta;

const Demo = () => {
  const [v, setV] = useState("empresa");
  return (
    <SegmentedControl
      aria-label="Ámbito"
      value={v}
      onChange={setV}
      options={[
        { value: "personal", label: "Personal" },
        { value: "empresa", label: "Empresa" },
        { value: "ambos", label: "Ambos" },
      ]}
    />
  );
};

export const Ejemplo: StoryObj<typeof SegmentedControl> = {
  render: () => <Demo />,
};
