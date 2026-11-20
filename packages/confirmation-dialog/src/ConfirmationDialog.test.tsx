import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ConfirmationDialog from "./ConfirmationDialog";

const base = {
  isOpen: true,
  title: "¿Eliminar la convocatoria?",
  message: "Esta acción no se puede deshacer.",
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

describe("ConfirmationDialog", () => {
  beforeEach(() => jest.clearAllMocks());

  it("no se muestra cerrado", () => {
    render(<ConfirmationDialog {...base} isOpen={false} />);
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("es un alertdialog con título y mensaje anunciados", () => {
    render(<ConfirmationDialog {...base} />);
    const dialog = screen.getByRole("alertdialog", { name: base.title });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription(base.message);
  });

  it("textos por defecto en español", () => {
    render(<ConfirmationDialog {...base} />);
    expect(
      screen.getByRole("button", { name: "Confirmar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cancelar" }),
    ).toBeInTheDocument();
  });

  it("acepta textos personalizados", () => {
    render(
      <ConfirmationDialog
        {...base}
        confirmText="Eliminar"
        cancelText="Volver"
      />,
    );
    expect(
      screen.getByRole("button", { name: "Eliminar" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Volver" })).toBeInTheDocument();
  });

  it("el foco empieza en Cancelar (opción segura)", () => {
    render(<ConfirmationDialog {...base} isDangerous />);
    expect(screen.getByRole("button", { name: "Cancelar" })).toHaveFocus();
  });

  it("confirma y cancela", () => {
    render(<ConfirmationDialog {...base} />);
    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));
    expect(base.onConfirm).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(base.onCancel).toHaveBeenCalledTimes(1);
  });

  it("Escape cancela", () => {
    render(<ConfirmationDialog {...base} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(base.onCancel).toHaveBeenCalledTimes(1);
  });

  it("cargando: no se puede cancelar ni con Escape", () => {
    render(<ConfirmationDialog {...base} isLoading />);
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(base.onCancel).not.toHaveBeenCalled();
  });

  it("acepta contenido extra (p. ej. un motivo)", () => {
    render(
      <ConfirmationDialog {...base}>
        <label>
          Motivo <input />
        </label>
      </ConfirmationDialog>,
    );
    expect(screen.getByLabelText("Motivo")).toBeInTheDocument();
  });
});
