import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import PinInput, { type PinInputProps } from "./PinInput";

const meta: Meta<PinInputProps> = {
  title: "Formularios/PinInput",
  component: PinInput,
  tags: ["autodocs"],
  args: {
    label: "Código de verificación",
    hint: "Te enviamos un código de 6 dígitos a tu correo.",
    length: 6,
  },
};
export default meta;

type Story = StoryObj<PinInputProps>;

const Controlado = (args: PinInputProps) => {
  const [v, setV] = useState(args.value ?? "");
  const [enviado, setEnviado] = useState<string | null>(null);
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <PinInput
        {...args}
        value={v}
        onChange={(n) => {
          setV(n);
          setEnviado(null);
        }}
        onComplete={setEnviado}
      />
      <small>{enviado ? `onComplete: ${enviado}` : `value: "${v}"`}</small>
    </div>
  );
};

export const Codigo: Story = { render: (a) => <Controlado {...a} /> };

export const EnGrupos: Story = {
  name: "En grupos de 3",
  render: (a) => <Controlado {...a} />,
  args: { groupSize: 3 },
};

export const Alfanumerico: Story = {
  render: (a) => <Controlado {...a} />,
  args: {
    type: "alphanumeric",
    length: 8,
    groupSize: 4,
    label: "Código de invitación",
    hint: "Letras y números.",
    size: "sm",
  },
};

export const PinOculto: Story = {
  name: "PIN oculto",
  render: (a) => <Controlado {...a} />,
  args: { mask: true, length: 4, label: "PIN", hint: undefined, size: "lg" },
};

export const ConError: Story = {
  render: (a) => <Controlado {...a} />,
  args: { value: "123456", error: "El código no es válido o ya venció." },
};
