import React from "react";
import { render, screen } from "@testing-library/react";
import Select from "./Select";

it("labelAction va junto a la etiqueta, fuera del <label>", () => {
  render(
    <Select
      label="Rol"
      labelAction={<button type="button">Ver qué hace cada rol</button>}
      value=""
      onChange={() => {}}
      options={[{ value: "admin", label: "Administrador" }]}
    />,
  );
  const accion = screen.getByRole("button", { name: "Ver qué hace cada rol" });
  expect(accion.closest("label")).toBeNull();
  expect(screen.getByLabelText("Rol").tagName).toBe("SELECT");
});
