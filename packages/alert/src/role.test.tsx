import React from "react";
import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

it('admite role="note" para avisos fijos que no deben anunciarse como urgentes', () => {
  render(
    <Alert variant="warning" role="note">
      Si la desactivas no podrás entrar.
    </Alert>,
  );
  expect(screen.queryByRole("alert")).toBeNull();
  expect(screen.getByRole("note")).toHaveTextContent("Si la desactivas");
});
