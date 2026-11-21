import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

it('usa type="button" por defecto: no envía el formulario que lo contiene', () => {
  const onSubmit = jest.fn((e: React.FormEvent) => e.preventDefault());
  render(
    <form onSubmit={onSubmit}>
      <Button>Volver</Button>
      <Button type="submit">Guardar</Button>
    </form>,
  );
  expect(screen.getByRole("button", { name: "Volver" })).toHaveAttribute(
    "type",
    "button",
  );
  fireEvent.click(screen.getByRole("button", { name: "Volver" }));
  expect(onSubmit).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "Guardar" }));
  expect(onSubmit).toHaveBeenCalledTimes(1);
});
