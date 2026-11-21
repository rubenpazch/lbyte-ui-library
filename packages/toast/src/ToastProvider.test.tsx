import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { ToastProvider, useToast } from "./ToastProvider";

function Botones() {
  const toast = useToast();
  return (
    <>
      <button onClick={() => toast.exito("Usuario guardado")}>ok</button>
      <button onClick={() => toast.error("No se pudo guardar")}>error</button>
    </>
  );
}

describe("ToastProvider", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("muestra los mensajes del servidor como toast y los cierra solos", () => {
    render(
      <ToastProvider>
        <Botones />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText("ok"));
    expect(screen.getByRole("status")).toHaveTextContent("Usuario guardado");
    fireEvent.click(screen.getByText("error"));
    expect(screen.getByRole("alert")).toHaveTextContent("No se pudo guardar");
    act(() => jest.advanceTimersByTime(4500));
    expect(screen.queryByText("Usuario guardado")).toBeNull();
    expect(screen.getByText("No se pudo guardar")).toBeInTheDocument();
  });

  it("no apila el mismo mensaje dos veces", () => {
    render(
      <ToastProvider>
        <Botones />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText("error"));
    fireEvent.click(screen.getByText("error"));
    expect(screen.getAllByText("No se pudo guardar")).toHaveLength(1);
  });

  it("falla con un mensaje claro fuera de un proveedor (p. ej. en el login)", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Botones />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });
});
