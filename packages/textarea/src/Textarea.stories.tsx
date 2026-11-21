import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Textarea from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Formularios/Textarea",
  component: Textarea,
  tags: ["autodocs"],
};
export default meta;

const Demo = () => {
  const [v, setV] = useState("");
  return (
    <div style={{ maxWidth: 420 }}>
      <Textarea
        label="Motivo de anulación"
        value={v}
        onChange={setV}
        maxLength={300}
        hint="Se mostrará en el historial."
        autoResize
      />
    </div>
  );
};

export const Ejemplo: StoryObj<typeof Textarea> = { render: () => <Demo /> };
