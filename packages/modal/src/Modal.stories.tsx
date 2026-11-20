import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Button from "@rubenpazch/button";
import Modal from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Retroalimentación/Modal",
  component: Modal,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Modal>;

const Plantilla = (args: React.ComponentProps<typeof Modal>) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Abrir modal
      </Button>
      <Modal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Guardar
            </Button>
          </>
        }
      />
    </>
  );
};

export const Basico: Story = {
  render: (args) => <Plantilla {...args} />,
  args: {
    title: "Editar cliente",
    description: "Los cambios se guardan al presionar Guardar.",
    children: "Aquí va el formulario o el contenido.",
  },
};

export const Grande: Story = {
  ...Basico,
  args: { ...Basico.args, size: "lg" },
};
