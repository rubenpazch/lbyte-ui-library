import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List, { ListItem } from "./List";

it("muestra filas con título, detalle y contenido a la derecha", () => {
  render(
    <List aria-label="Partidos">
      <ListItem
        title="Cienciano vs Alianza"
        description="dom, 29 nov."
        trailing={<span>Programado</span>}
      />
      <ListItem title="Oculto" muted />
    </List>,
  );
  const lista = screen.getByRole("list", { name: "Partidos" });
  expect(lista.querySelectorAll("li")).toHaveLength(2);
  expect(screen.getByText("dom, 29 nov.")).toBeInTheDocument();
  expect(screen.getByText("Programado")).toBeInTheDocument();
});

it("con onClick la fila es un botón", async () => {
  const onClick = jest.fn();
  render(
    <List>
      <ListItem title="Abrir" onClick={onClick} />
    </List>,
  );
  await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
  expect(onClick).toHaveBeenCalledTimes(1);
});

it("con href la fila es un enlace (y acepta un componente de enlace propio)", () => {
  const Enlace = ({
    href,
    children,
    ...p
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} data-propio="si" {...p}>
      {children}
    </a>
  );
  render(
    <List>
      <ListItem title="Ver" href="/partidos/1" linkComponent={Enlace} />
    </List>,
  );
  const enlace = screen.getByRole("link", { name: "Ver" });
  expect(enlace).toHaveAttribute("href", "/partidos/1");
  expect(enlace).toHaveAttribute("data-propio", "si");
});
