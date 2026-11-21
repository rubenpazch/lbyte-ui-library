import React from "react";
import { render, screen } from "@testing-library/react";
import FormField, { FormActions, FormRow } from "./FormField";

describe("FormField", () => {
  it("asocia etiqueta, ayuda y error a un control nativo", () => {
    render(
      <FormField
        label="RUC"
        hint="11 dígitos"
        error="RUC inválido"
        required
        name="ruc"
      >
        <input />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "RUC" });
    expect(input).toHaveAttribute("name", "ruc");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("RUC inválido 11 dígitos");
  });

  it("acepta una función para controles propios", () => {
    render(
      <FormField label="Color" hint="Elige uno">
        {(props) => <select {...props} />}
      </FormField>,
    );
    expect(screen.getByLabelText("Color")).toHaveAccessibleDescription(
      "Elige uno",
    );
  });

  it("FormRow y FormActions renderizan su contenido", () => {
    render(
      <>
        <FormRow columns={3}>
          <span>a</span>
        </FormRow>
        <FormActions>
          <button>Guardar</button>
        </FormActions>
      </>,
    );
    expect(screen.getByRole("button", { name: "Guardar" })).toBeInTheDocument();
  });
});
