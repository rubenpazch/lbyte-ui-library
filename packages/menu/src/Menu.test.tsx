import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./Menu";

const items = (fns: Record<string, jest.Mock>) => [
  { label: "Editar", onSelect: fns.editar },
  { label: "Duplicar", onSelect: fns.duplicar, disabled: true },
  { label: "Eliminar", onSelect: fns.eliminar, danger: true },
];

describe("Menu", () => {
  it("abre un role=menu desde el botón por defecto", () => {
    render(
      <Menu
        items={items({
          editar: jest.fn(),
          duplicar: jest.fn(),
          eliminar: jest.fn(),
        })}
      />,
    );
    const btn = screen.getByRole("button", { name: "Más opciones" });
    expect(btn).toHaveAttribute("aria-haspopup", "menu");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
  });

  it("elige una opción y se cierra; las deshabilitadas no hacen nada", () => {
    const fns = { editar: jest.fn(), duplicar: jest.fn(), eliminar: jest.fn() };
    render(<Menu items={items(fns)} />);
    fireEvent.click(screen.getByRole("button", { name: "Más opciones" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Duplicar" }));
    expect(fns.duplicar).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("menuitem", { name: "Eliminar" }));
    expect(fns.eliminar).toHaveBeenCalled();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("flechas saltan las deshabilitadas y Escape cierra devolviendo el foco", () => {
    render(
      <Menu
        items={items({
          editar: jest.fn(),
          duplicar: jest.fn(),
          eliminar: jest.fn(),
        })}
      />,
    );
    const btn = screen.getByRole("button", { name: "Más opciones" });
    fireEvent.click(btn);
    const editar = screen.getByRole("menuitem", { name: "Editar" });
    editar.focus();
    fireEvent.keyDown(editar, { key: "ArrowDown" });
    expect(screen.getByRole("menuitem", { name: "Eliminar" })).toHaveFocus();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(btn).toHaveFocus();
  });
});
