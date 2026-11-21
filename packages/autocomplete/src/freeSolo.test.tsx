import React, { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Autocomplete from "./Autocomplete";

const usuarios = [
  { value: "Ana Pérez", label: "Ana Pérez — Jefa de Logística" },
  { value: "Luis Rojas", label: "Luis Rojas — Asistente" },
];

function Destinatario({ onValor }: { onValor?: (v: unknown) => void }) {
  const [v, setV] = useState<string | number | null>(null);
  return (
    <>
      <Autocomplete
        label="Destinatario"
        freeSolo
        value={v}
        onChange={(nv) => {
          setV(nv);
          onValor?.(nv);
        }}
        options={usuarios}
      />
      <output data-testid="valor">{String(v)}</output>
    </>
  );
}

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe("Autocomplete freeSolo (texto libre con sugerencias)", () => {
  it("lo escrito es el valor y se conserva al salir del campo", () => {
    render(<Destinatario />);
    const campo = screen.getByLabelText("Destinatario");
    fireEvent.focus(campo);
    fireEvent.change(campo, { target: { value: "Gerencia Regional" } });
    expect(screen.getByTestId("valor")).toHaveTextContent("Gerencia Regional");
    fireEvent.blur(campo);
    act(() => {
      jest.runAllTimers();
    });
    expect(campo).toHaveValue("Gerencia Regional");
    expect(screen.queryByTestId("autocomplete-create")).toBeNull();
  });

  it("elegir una sugerencia guarda su valor y muestra su etiqueta", () => {
    render(<Destinatario />);
    const campo = screen.getByLabelText("Destinatario");
    fireEvent.focus(campo);
    fireEvent.change(campo, { target: { value: "ana" } });
    fireEvent.click(screen.getByText(/Jefa de Logística/));
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByTestId("valor")).toHaveTextContent("Ana Pérez");
    expect(campo).toHaveValue("Ana Pérez — Jefa de Logística");
  });

  it("Escape no borra lo escrito; al volver se sigue editando", () => {
    render(<Destinatario />);
    const campo = screen.getByLabelText("Destinatario");
    fireEvent.focus(campo);
    fireEvent.change(campo, { target: { value: "Mesa de partes" } });
    fireEvent.keyDown(campo, { key: "Escape" });
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByTestId("valor")).toHaveTextContent("Mesa de partes");
    fireEvent.focus(campo);
    expect(campo).toHaveValue("Mesa de partes");
  });

  it("borrar todo el texto deja el valor en null", () => {
    render(<Destinatario />);
    const campo = screen.getByLabelText("Destinatario");
    fireEvent.focus(campo);
    fireEvent.change(campo, { target: { value: "x" } });
    fireEvent.change(campo, { target: { value: "" } });
    expect(screen.getByTestId("valor")).toHaveTextContent("null");
  });
});
