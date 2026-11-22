import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthScreen } from "./AuthGate";

it("por defecto es una pantalla de espera (status, con indicador)", () => {
  render(<AuthScreen label="Verificando sesión…" />);
  const pantalla = screen.getByRole("status");
  expect(pantalla).toHaveAttribute("aria-busy", "true");
  expect(pantalla).toHaveTextContent("Verificando sesión…");
});

it("muestra mensaje y acción, sin indicador, cuando busy={false}", () => {
  render(
    <AuthScreen
      label="Cerraste sesión"
      description="Puedes volver a entrar cuando quieras."
      action={<button type="button">Volver a entrar</button>}
      busy={false}
    />,
  );
  const pantalla = screen.getByRole("status");
  expect(pantalla).not.toHaveAttribute("aria-busy");
  expect(
    screen.getByText("Puedes volver a entrar cuando quieras."),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Volver a entrar" }),
  ).toBeInTheDocument();
});

it("tone=error se anuncia de inmediato (alert)", () => {
  render(
    <AuthScreen
      label="No pudimos iniciar sesión"
      description="Tu usuario está desactivado."
      busy={false}
      tone="error"
    />,
  );
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Tu usuario está desactivado.",
  );
});
