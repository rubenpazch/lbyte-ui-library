import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BottomNavigation from "./BottomNavigation";

const Icono = () => <svg />;

it("marca la opción de la ruta actual y deja las acciones como botones", async () => {
  const mas = jest.fn();
  render(
    <BottomNavigation
      currentPath="/partidos/3"
      items={[
        { label: "Inicio", href: "/", icon: <Icono /> },
        { label: "Partidos", href: "/partidos", icon: <Icono /> },
        { label: "Más", icon: <Icono />, onClick: mas },
      ]}
    />,
  );
  const nav = screen.getByRole("navigation", { name: "Navegación principal" });
  expect(nav).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Partidos" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  expect(screen.getByRole("link", { name: "Inicio" })).not.toHaveAttribute(
    "aria-current",
  );
  await userEvent.click(screen.getByRole("button", { name: "Más" }));
  expect(mas).toHaveBeenCalledTimes(1);
});

it("active fuerza el estado activo y badge se muestra", () => {
  render(
    <BottomNavigation
      items={[
        {
          label: "Prensa",
          icon: <Icono />,
          onClick: () => {},
          active: true,
          badge: 3,
        },
        { label: "Socios", icon: <Icono />, onClick: () => {} },
      ]}
    />,
  );
  expect(screen.getByRole("button", { name: /Prensa/ })).toHaveAttribute(
    "aria-current",
    "page",
  );
  expect(screen.getByText("3")).toBeInTheDocument();
});
