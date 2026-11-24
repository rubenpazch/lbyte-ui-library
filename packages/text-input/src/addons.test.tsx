import React from "react";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import TextInput from "./TextInput";

expect.extend(toHaveNoViolations);

describe("startAddon / endAddon", () => {
  it("un texto pegado se anuncia como descripción del campo", () => {
    render(
      <TextInput
        label="Monto"
        value="10"
        onChange={() => {}}
        hint="Con IGV"
        startAddon="S/"
        endAddon="PEN"
      />,
    );
    const input = screen.getByRole("textbox", { name: "Monto" });
    expect(input).toHaveAccessibleDescription("Con IGV S/ PEN");
    expect(input.className).toContain("inputAfterAddon");
    expect(input.className).toContain("inputBeforeAddon");
  });

  it("un botón pegado queda accesible y no se agrega a la descripción", () => {
    render(
      <TextInput
        label="RUC"
        value=""
        onChange={() => {}}
        endAddon={<button type="button">Buscar</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "RUC" })).not.toHaveAttribute(
      "aria-describedby",
    );
    expect(screen.queryByTestId("start-addon")).not.toBeInTheDocument();
  });

  it("marca el grupo con error", () => {
    render(
      <TextInput
        label="Peso"
        value="900"
        onChange={() => {}}
        endAddon="kg"
        error="Fuera de rango"
      />,
    );
    expect(screen.getByTestId("end-addon").parentElement?.className).toContain(
      "groupError",
    );
  });

  it("sin violaciones de accesibilidad", async () => {
    render(
      <TextInput
        label="Dominio"
        value="lbyte"
        onChange={() => {}}
        startAddon="https://"
        endAddon=".pe"
      />,
    );
    const r = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(r).toHaveNoViolations();
  });
});
