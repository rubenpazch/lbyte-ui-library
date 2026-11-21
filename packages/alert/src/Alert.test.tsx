import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Alert from "./Alert";

describe("Alert", () => {
  it("info se anuncia como estado; danger como alerta", () => {
    const { rerender } = render(<Alert title="Guardado">Listo</Alert>);
    expect(screen.getByRole("status")).toHaveTextContent("GuardadoListo");
    rerender(<Alert variant="danger">Falló el pago</Alert>);
    expect(screen.getByRole("alert")).toHaveTextContent("Falló el pago");
  });

  it("muestra el botón cerrar solo con onClose", () => {
    const onClose = jest.fn();
    const { rerender } = render(<Alert>Hola</Alert>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    rerender(<Alert onClose={onClose}>Hola</Alert>);
    fireEvent.click(screen.getByRole("button", { name: "Cerrar aviso" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("acepta una acción y ocultar el icono", () => {
    const { container } = render(
      <Alert icon={false} action={<button>Reintentar</button>}>
        Error de red
      </Alert>,
    );
    expect(
      screen.getByRole("button", { name: "Reintentar" }),
    ).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeNull();
  });
});
