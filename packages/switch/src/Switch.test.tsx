import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Switch from "./Switch";

describe("Switch", () => {
  it("es un switch con nombre y descripción", () => {
    render(
      <Switch
        checked={false}
        onChange={jest.fn()}
        label="Notificaciones"
        description="Por correo"
      />,
    );
    const s = screen.getByRole("switch", { name: "Notificaciones" });
    expect(s).toHaveAttribute("aria-checked", "false");
    expect(s).toHaveAccessibleDescription("Por correo");
  });

  it("alterna al hacer clic (y al pulsar la etiqueta)", () => {
    const onChange = jest.fn();
    render(<Switch checked onChange={onChange} label="Activo" />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(false);
    fireEvent.click(screen.getByText("Activo"));
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("no cambia deshabilitado", () => {
    const onChange = jest.fn();
    render(<Switch checked={false} onChange={onChange} label="X" disabled />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });
});
