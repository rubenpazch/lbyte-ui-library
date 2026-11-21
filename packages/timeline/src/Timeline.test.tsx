import React from "react";
import { render, screen } from "@testing-library/react";
import Timeline from "./Timeline";

const items = [
  {
    title: "Registrado",
    date: "20/11/2026 09:10",
    dateTime: "2026-11-20T09:10",
    status: "info" as const,
  },
  {
    title: "Derivado a Logística",
    description: "Por Ana Pérez",
    date: "20/11/2026 10:02",
    status: "primary" as const,
  },
  {
    title: "Observado",
    description: "Falta firma",
    date: "21/11/2026",
    status: "warning" as const,
  },
];

it("muestra los eventos en orden, con fecha en <time> y descripción", () => {
  render(<Timeline items={items} aria-label="Historial del trámite" />);
  const lista = screen.getByRole("list", { name: "Historial del trámite" });
  const eventos = screen.getAllByRole("listitem");
  expect(lista).toBeInTheDocument();
  expect(eventos.map((e) => e.textContent)).toEqual([
    expect.stringContaining("Registrado"),
    expect.stringContaining("Derivado a Logística"),
    expect.stringContaining("Observado"),
  ]);
  expect(screen.getByText("20/11/2026 09:10").closest("time")).toHaveAttribute(
    "datetime",
    "2026-11-20T09:10",
  );
  expect(screen.getByText("Falta firma")).toBeInTheDocument();
});

it("marca el último evento como el actual", () => {
  render(<Timeline items={items} highlightLast />);
  const eventos = screen.getAllByRole("listitem");
  expect(eventos[2]).toHaveAttribute("aria-current", "step");
  expect(eventos[0]).not.toHaveAttribute("aria-current");
});

it("sin eventos muestra el texto vacío", () => {
  render(<Timeline items={[]} emptyText="Aún no hay movimientos." />);
  expect(screen.getByText("Aún no hay movimientos.")).toBeInTheDocument();
});
