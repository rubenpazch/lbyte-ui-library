import React, { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import DateInput, { type DateInputProps } from "./DateInput";

function simularPantalla(esMovil: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: esMovil,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
const original = window.matchMedia;
afterEach(() => {
  window.matchMedia = original;
  document.body.style.overflow = "";
});

function Controlado(props: Partial<DateInputProps>) {
  const [v, setV] = useState("2026-11-10");
  return (
    <DateInput label="Fecha de ingreso" value={v} onChange={setV} {...props} />
  );
}

it("en celular el calendario ocupa toda la pantalla y al elegir vuelve al campo", () => {
  jest.useFakeTimers();
  simularPantalla(true);
  render(<Controlado />);
  const campo = screen.getByRole("combobox");
  expect(campo).toHaveAttribute("inputmode", "none"); // sin teclado virtual
  fireEvent.click(screen.getByRole("button", { name: "Abrir calendario" }));

  const dialogo = screen.getByRole("dialog", { name: "Fecha de ingreso" });
  expect(dialogo).toHaveAttribute("aria-modal", "true");
  expect(dialogo.className).toMatch(/fullScreen/);
  expect(document.body.style.overflow).toBe("hidden");

  fireEvent.click(screen.getByRole("button", { name: "21/11/2026" }));
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(campo).toHaveValue("21/11/2026");
  expect(document.body.style.overflow).toBe("");
  // El foco vuelve al control y no reabre el calendario.
  act(() => {
    jest.runAllTimers();
  });
  expect(screen.queryByRole("dialog")).toBeNull();
  jest.useRealTimers();
});

it("en celular se puede cerrar sin elegir", () => {
  simularPantalla(true);
  render(<Controlado />);
  fireEvent.click(screen.getByRole("button", { name: "Abrir calendario" }));
  fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(screen.getByRole("combobox")).toHaveValue("10/11/2026");
});

it("en escritorio sigue siendo un desplegable bajo el campo", () => {
  simularPantalla(false);
  render(<Controlado />);
  fireEvent.click(screen.getByRole("button", { name: "Abrir calendario" }));
  const dialogo = screen.getByRole("dialog");
  expect(dialogo).not.toHaveAttribute("aria-modal");
  expect(dialogo.className).not.toMatch(/fullScreen/);
  expect(screen.queryByRole("button", { name: "Cerrar" })).toBeNull();
});

it("mobileFullScreen={false} lo desactiva también en celular", () => {
  simularPantalla(true);
  render(<Controlado mobileFullScreen={false} />);
  fireEvent.click(screen.getByRole("button", { name: "Abrir calendario" }));
  expect(screen.getByRole("dialog").className).not.toMatch(/fullScreen/);
});
