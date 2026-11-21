import React, { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import DatePicker, { type DatePickerProps } from "./DatePicker";

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

function Controlado(props: Partial<DatePickerProps>) {
  const [v, setV] = useState("2026-11-10");
  return (
    <DatePicker label="Fecha de entrega" value={v} onChange={setV} {...props} />
  );
}

it("en celular el calendario ocupa toda la pantalla y al elegir vuelve al campo", () => {
  simularPantalla(true);
  render(<Controlado />);
  const campo = screen.getByRole("combobox");
  expect(campo).toHaveAttribute("inputmode", "none");
  fireEvent.click(screen.getByRole("button", { name: "Abrir calendario" }));

  const dialogo = screen.getByRole("dialog", { name: "Fecha de entrega" });
  expect(dialogo).toHaveAttribute("aria-modal", "true");
  expect(dialogo.className).toMatch(/fullScreen/);
  expect(document.body.style.overflow).toBe("hidden");

  fireEvent.click(within(dialogo).getByRole("button", { name: "21" }));
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(campo).toHaveValue("21/11/2026");
  expect(document.body.style.overflow).toBe("");
});

it("en celular se puede cerrar sin elegir", () => {
  simularPantalla(true);
  render(<Controlado />);
  fireEvent.click(screen.getByRole("button", { name: "Abrir calendario" }));
  fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));
  expect(screen.queryByRole("dialog")).toBeNull();
});

it("en escritorio sigue siendo un desplegable bajo el campo", () => {
  simularPantalla(false);
  render(<Controlado />);
  fireEvent.click(screen.getByRole("button", { name: "Abrir calendario" }));
  expect(screen.getByRole("dialog").className).not.toMatch(/fullScreen/);
  expect(screen.queryByRole("button", { name: "Cerrar" })).toBeNull();
});
