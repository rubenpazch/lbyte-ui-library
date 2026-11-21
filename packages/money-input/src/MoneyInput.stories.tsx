import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import MoneyInput from "./MoneyInput";
import { formatMoney } from "./MoneyInput";
const meta: Meta<typeof MoneyInput> = {
  title: "Formularios/MoneyInput",
  component: MoneyInput,
  tags: ["autodocs"],
};
export default meta;

const Demo = () => {
  const [v, setV] = useState<number | null>(1250.5);
  return (
    <div style={{ maxWidth: 280, display: "grid", gap: 8 }}>
      <MoneyInput label="Monto de la cuota" value={v} onChange={setV} />
      <small>Valor: {formatMoney(v)}</small>
    </div>
  );
};

export const Ejemplo: StoryObj<typeof MoneyInput> = { render: () => <Demo /> };
