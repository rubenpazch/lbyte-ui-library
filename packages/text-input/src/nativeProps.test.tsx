import React from "react";
import { render, screen } from "@testing-library/react";
import TextInput from "./TextInput";

it("pasa los atributos nativos al input sin romper la accesibilidad", () => {
  render(
    <TextInput
      label="Código de verificación"
      value=""
      onChange={() => {}}
      hint="6 dígitos"
      inputMode="numeric"
      autoFocus
      spellCheck={false}
      data-campo="codigo"
      aria-describedby="otro"
      min={1}
      max={9}
    />,
  );
  const input = screen.getByLabelText("Código de verificación");
  expect(input).toHaveAttribute("inputmode", "numeric");
  expect(input).toHaveFocus();
  expect(input).toHaveAttribute("spellcheck", "false");
  expect(input).toHaveAttribute("data-campo", "codigo");
  expect(input).toHaveAttribute("min", "1");
  // La ayuda sigue asociada: los props propios del componente ganan.
  expect(input).toHaveAccessibleDescription("6 dígitos");
});
