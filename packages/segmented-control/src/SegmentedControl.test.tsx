import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SegmentedControl from "./SegmentedControl";

const opciones = [
  { value: "personal", label: "Personal" },
  { value: "empresa", label: "Empresa" },
  { value: "ambos", label: "Ambos" },
];

describe("SegmentedControl", () => {
  it("es un radiogroup con la opción seleccionada", () => {
    render(
      <SegmentedControl
        aria-label="Ámbito"
        options={opciones}
        value="empresa"
        onChange={jest.fn()}
      />,
    );
    expect(
      screen.getByRole("radiogroup", { name: "Ámbito" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Empresa" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("radio", { name: "Personal" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });

  it("cambia con clic y con flechas (cíclico)", () => {
    const onChange = jest.fn();
    render(
      <SegmentedControl
        aria-label="Ámbito"
        options={opciones}
        value="ambos"
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("radio", { name: "Personal" }));
    expect(onChange).toHaveBeenLastCalledWith("personal");
    fireEvent.keyDown(screen.getByRole("radio", { name: "Ambos" }), {
      key: "ArrowRight",
    });
    expect(onChange).toHaveBeenLastCalledWith("personal");
  });
});
