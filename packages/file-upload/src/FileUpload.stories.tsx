import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import FileUpload, { type FileUploadProps } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Formularios/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Subir uno o varios archivos (arrastrar y soltar o elegir). Valida tipo, tamaño, cantidad y duplicados. No sube nada: entrega los `File` a la app. Para una sola imagen con vista previa, `ImageUpload`.",
      },
    },
  },
};
export default meta;

function Demo(props: Partial<FileUploadProps>) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload label="Adjuntos" value={files} onChange={setFiles} {...props} />
  );
}

export const Documentos: StoryObj = {
  render: () => (
    <Demo
      accept=".pdf,.docx"
      maxSizeMB={5}
      maxFiles={3}
      hint="PDF o Word, hasta 5 MB cada uno, máximo 3."
    />
  ),
};
export const UnSoloArchivo: StoryObj = {
  name: "Un solo archivo",
  render: () => (
    <Demo multiple={false} accept="application/pdf" hint="Un PDF." />
  ),
};
export const ConError: StoryObj = {
  name: "Con error del formulario",
  render: () => <Demo required error="Adjunta al menos un documento." />,
};
