import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

it("en loading marca aria-busy; si no, no lo pone", () => {
  const { rerender } = render(<Button loading>Guardar</Button>);
  expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  rerender(<Button>Guardar</Button>);
  expect(screen.getByRole("button")).not.toHaveAttribute("aria-busy");
});
