import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";

const meta: Meta<typeof ConfirmationDialog> = {
  title: "Retroalimentación/ConfirmationDialog",
  component: ConfirmationDialog,
  tags: ["autodocs"],
};
export default meta;

const Demo = ({ isDangerous }: { isDangerous?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>
        {isDangerous ? "Eliminar convocatoria" : "Publicar"}
      </button>
      <ConfirmationDialog
        isOpen={open}
        title={
          isDangerous
            ? "¿Eliminar la convocatoria?"
            : "¿Publicar la convocatoria?"
        }
        message={
          isDangerous
            ? "Esta acción no se puede deshacer."
            : "Será visible en el sitio público."
        }
        confirmText={isDangerous ? "Eliminar" : "Publicar"}
        isDangerous={isDangerous}
        isLoading={loading}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setOpen(false);
          }, 1200);
        }}
      />
    </>
  );
};

export const Normal: StoryObj<typeof ConfirmationDialog> = {
  render: () => <Demo />,
};
export const Peligrosa: StoryObj<typeof ConfirmationDialog> = {
  render: () => <Demo isDangerous />,
};
