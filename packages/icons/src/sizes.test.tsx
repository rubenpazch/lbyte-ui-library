import React from "react";
import { render } from "@testing-library/react";
import * as Icons from "./index";

// Sin Tailwind, un <svg> sin width/height se estira a todo el ancho. Todos los iconos deben
// traer un tamaño propio (atributo SVG), que cualquier clase CSS puede sobrescribir.
describe("iconos: tamaño sin depender de Tailwind", () => {
  const componentes = Object.entries(Icons).filter(
    ([nombre, valor]) =>
      /Icon$/.test(nombre) &&
      typeof valor === "function" &&
      nombre !== "MaterialIcon",
  ) as Array<[string, React.ComponentType<Record<string, unknown>>]>;

  it("hay iconos para probar", () => {
    expect(componentes.length).toBeGreaterThan(40);
  });

  it.each(componentes)("%s tiene width y height", (_nombre, Icono) => {
    const { container } = render(<Icono />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("width")).toMatch(/^\d+/);
    expect(svg?.getAttribute("height")).toMatch(/^\d+/);
  });

  it("el tamaño cambia con la prop size", () => {
    const { container, rerender } = render(<Icons.CheckIcon size="sm" />);
    const sm = container.querySelector("svg")?.getAttribute("width");
    rerender(<Icons.CheckIcon size="lg" />);
    expect(container.querySelector("svg")?.getAttribute("width")).not.toBe(sm);
  });
});
