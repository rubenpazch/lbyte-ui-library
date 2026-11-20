import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  it("no renderiza nada cerrado", () => {
    render(<Modal open={false} onClose={jest.fn()} title="Hola" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("es un diálogo modal con nombre y descripción", () => {
    render(
      <Modal
        open
        onClose={jest.fn()}
        title="Editar cliente"
        description="Cambia los datos"
      >
        contenido
      </Modal>,
    );
    const dialog = screen.getByRole("dialog", { name: "Editar cliente" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription("Cambia los datos");
  });

  it("se cierra con Escape, con el botón × y con el fondo", () => {
    const onClose = jest.fn();
    render(<Modal open onClose={onClose} title="T" />);
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    fireEvent.mouseDown(screen.getByTestId("modal-overlay"));
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it("respeta closeOnEscape y closeOnOverlayClick en false", () => {
    const onClose = jest.fn();
    render(
      <Modal
        open
        onClose={onClose}
        title="T"
        closeOnEscape={false}
        closeOnOverlayClick={false}
      />,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.mouseDown(screen.getByTestId("modal-overlay"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("lleva el foco dentro y bloquea el scroll de la página", () => {
    render(
      <Modal open onClose={jest.fn()} title="T" showCloseButton={false}>
        <input aria-label="nombre" />
      </Modal>,
    );
    expect(screen.getByLabelText("nombre")).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("devuelve el foco al cerrar", () => {
    const Demo = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>abrir</button>
          <Modal open={open} onClose={() => setOpen(false)} title="T" />
        </>
      );
    };
    render(<Demo />);
    const abrir = screen.getByText("abrir");
    abrir.focus();
    fireEvent.click(abrir);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(abrir).toHaveFocus();
  });
});
