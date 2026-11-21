import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import UserCard, { initials } from "./UserCard";

it("calcula las iniciales", () => {
  expect(initials("Ana María Pérez")).toBe("AP");
  expect(initials("admin")).toBe("A");
  expect(initials("  ")).toBe("?");
});

it("muestra nombre, dato secundario, etiquetas y acciones", () => {
  render(
    <UserCard
      name="Ana Pérez"
      subtitle="ana@lbyte.pe"
      badges={<span>admin</span>}
      actions={<button>Editar</button>}
    />,
  );
  expect(
    screen.getByRole("article", { name: "Ana Pérez" }),
  ).toBeInTheDocument();
  expect(screen.getByText("AP")).toBeInTheDocument();
  expect(screen.getByText("ana@lbyte.pe")).toBeInTheDocument();
  expect(screen.getByText("admin")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Editar" })).toBeInTheDocument();
});

it("pone las acciones secundarias en un menú ⋮ con nombre accesible", () => {
  const eliminar = jest.fn();
  render(
    <UserCard
      name="Ana Pérez"
      menuItems={[{ label: "Eliminar", danger: true, onSelect: eliminar }]}
    />,
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Más acciones para Ana Pérez" }),
  );
  fireEvent.click(screen.getByRole("menuitem", { name: "Eliminar" }));
  expect(eliminar).toHaveBeenCalled();
});
