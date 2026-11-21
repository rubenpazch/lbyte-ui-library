import React from "react";
import { render, screen } from "@testing-library/react";
import Autocomplete from "./Autocomplete";

it("labelAction va junto a la etiqueta, fuera del <label>", () => {
  render(
    <Autocomplete
      label="Destinatario"
      labelAction={<button type="button">¿Qué es el destinatario?</button>}
      value={null}
      onChange={() => {}}
      options={[{ value: "1", label: "Logística" }]}
    />,
  );
  const accion = screen.getByRole("button", {
    name: "¿Qué es el destinatario?",
  });
  expect(accion.closest("label")).toBeNull();
  expect(screen.getByLabelText("Destinatario")).toBeInTheDocument();
});
