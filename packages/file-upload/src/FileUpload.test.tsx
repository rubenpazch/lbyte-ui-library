import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import FileUpload, { aceptaArchivo, type FileUploadProps } from "./FileUpload";

const archivo = (nombre: string, tipo: string, bytes = 1024) =>
  new File([new Uint8Array(bytes)], nombre, { type: tipo, lastModified: 1 });

function Controlado(
  props: Partial<FileUploadProps> & { onRejectSpy?: jest.Mock },
) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      label="Adjuntos"
      value={files}
      onChange={setFiles}
      onReject={props.onRejectSpy}
      {...props}
    />
  );
}

const elegir = (files: File[]) =>
  fireEvent.change(screen.getByLabelText("Adjuntos", { selector: "input" }), {
    target: { files },
  });

it("acepta por extensión, MIME exacto o comodín", () => {
  expect(aceptaArchivo(archivo("a.PDF", "application/pdf"), ".pdf")).toBe(true);
  expect(aceptaArchivo(archivo("a.png", "image/png"), "image/*")).toBe(true);
  expect(
    aceptaArchivo(archivo("a.exe", "application/x-msdownload"), ".pdf,image/*"),
  ).toBe(false);
  expect(aceptaArchivo(archivo("a.exe", "x"), undefined)).toBe(true);
});

it("agrega archivos válidos y los lista con su tamaño; se pueden quitar", () => {
  render(<Controlado accept=".pdf" />);
  elegir([
    archivo("oficio.pdf", "application/pdf", 2048),
    archivo("anexo.pdf", "application/pdf"),
  ]);
  expect(
    screen.getByRole("list", { name: "Adjuntos: archivos elegidos" }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
  fireEvent.click(screen.getByRole("button", { name: "Quitar oficio.pdf" }));
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  expect(screen.getByText("anexo.pdf")).toBeInTheDocument();
});

it("rechaza tipo, tamaño, duplicados y exceso, y lo informa", () => {
  const onRejectSpy = jest.fn();
  render(
    <Controlado
      accept=".pdf"
      maxSizeMB={1}
      maxFiles={2}
      onRejectSpy={onRejectSpy}
    />,
  );
  elegir([
    archivo("virus.exe", "application/x-msdownload"),
    archivo("grande.pdf", "application/pdf", 2 * 1024 * 1024),
    archivo("a.pdf", "application/pdf"),
  ]);
  const alerta = screen.getByRole("alert");
  expect(alerta).toHaveTextContent("virus.exe: tipo de archivo no permitido");
  expect(alerta).toHaveTextContent("grande.pdf: pesa 2.0 MB (máximo 1 MB)");
  expect(screen.getAllByRole("listitem")).toHaveLength(1);

  elegir([
    archivo("a.pdf", "application/pdf"),
    archivo("b.pdf", "application/pdf"),
    archivo("c.pdf", "application/pdf"),
  ]);
  expect(screen.getByRole("alert")).toHaveTextContent(
    "a.pdf: ya está en la lista",
  );
  expect(screen.getByRole("alert")).toHaveTextContent("Máximo 2 archivos");
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
  expect(onRejectSpy).toHaveBeenCalled();
  // Con el máximo alcanzado, ya no se puede elegir más.
  expect(
    screen.getByRole("button", { name: "Elegir archivos" }),
  ).toBeDisabled();
});

it("acepta archivos soltados en la zona", () => {
  render(<Controlado />);
  fireEvent.drop(screen.getByTestId("file-upload-zone"), {
    dataTransfer: { files: [archivo("foto.jpg", "image/jpeg")] },
  });
  expect(screen.getByText("foto.jpg")).toBeInTheDocument();
});

it("con multiple={false} se queda solo con el último", () => {
  render(<Controlado multiple={false} />);
  elegir([archivo("uno.pdf", "application/pdf")]);
  elegir([archivo("dos.pdf", "application/pdf")]);
  expect(screen.queryByText("uno.pdf")).toBeNull();
  expect(screen.getByText("dos.pdf")).toBeInTheDocument();
});
