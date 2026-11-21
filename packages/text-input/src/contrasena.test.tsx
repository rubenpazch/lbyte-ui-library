import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TextInput, { type TextInputProps } from "./TextInput";

function Controlado(props: Partial<TextInputProps>) {
  const [v, setV] = useState("secreto");
  return (
    <TextInput
      label="Contraseña"
      type="password"
      value={v}
      onChange={setV}
      {...props}
    />
  );
}

describe("ver / ocultar contraseña", () => {
  it("el botón alterna entre ocultar y mostrar lo escrito", () => {
    render(<Controlado />);
    const campo = screen.getByLabelText("Contraseña");
    expect(campo).toHaveAttribute("type", "password");

    const boton = screen.getByRole("button", { name: "Mostrar contraseña" });
    expect(boton).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(boton);
    expect(campo).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: "Ocultar contraseña" }),
    ).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: "Ocultar contraseña" }));
    expect(campo).toHaveAttribute("type", "password");
  });

  it("no envía el formulario (type=button) ni aparece en otros tipos", () => {
    const { rerender } = render(<Controlado />);
    expect(
      screen.getByRole("button", { name: "Mostrar contraseña" }),
    ).toHaveAttribute("type", "button");
    rerender(<Controlado type="text" />);
    expect(screen.queryByRole("button", { name: /contraseña/ })).toBeNull();
  });

  it("se puede desactivar y traducir", () => {
    const { rerender } = render(<Controlado showPasswordToggle={false} />);
    expect(screen.queryByRole("button")).toBeNull();
    rerender(
      <Controlado passwordToggleLabels={{ show: "Show", hide: "Hide" }} />,
    );
    expect(screen.getByRole("button", { name: "Show" })).toBeInTheDocument();
  });
});

describe("labelAction", () => {
  it("muestra la acción junto a la etiqueta, fuera del <label>", () => {
    render(
      <TextInput
        label="Remitente"
        value=""
        onChange={() => {}}
        labelAction={<button type="button">¿Qué es el remitente?</button>}
      />,
    );
    const accion = screen.getByRole("button", {
      name: "¿Qué es el remitente?",
    });
    expect(accion.closest("label")).toBeNull();
    // La etiqueta sigue asociada al campo.
    expect(screen.getByLabelText("Remitente")).toHaveAttribute("type", "text");
  });
});
