import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Collapsible from "./Collapsible";

it("empieza cerrada y se abre al tocar el título", async () => {
  render(
    <Collapsible title="Más opciones">
      <p>Detalle</p>
    </Collapsible>,
  );
  const detalles = screen.getByText("Más opciones").closest("details")!;
  expect(detalles.open).toBe(false);
  await userEvent.click(screen.getByText("Más opciones"));
  expect(detalles.open).toBe(true);
});

it("defaultOpen la muestra abierta", () => {
  render(
    <Collapsible title="Acreditación" defaultOpen>
      <p>Campos</p>
    </Collapsible>,
  );
  expect(screen.getByText("Acreditación").closest("details")!.open).toBe(true);
});
