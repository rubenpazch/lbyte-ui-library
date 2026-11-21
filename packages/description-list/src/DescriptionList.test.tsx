import React from "react";
import { render, screen } from "@testing-library/react";
import DescriptionList from "./DescriptionList";

it("muestra etiquetas y valores como <dl>, con un valor por defecto para los vacíos", () => {
  render(
    <DescriptionList
      title="Datos del trámite"
      items={[
        { label: "Remitente", value: "Ana Pérez" },
        { label: "Área", value: "Logística", highlight: true },
        { label: "Teléfono", value: "" },
      ]}
      footnote="Datos tomados de la sesión."
    />,
  );
  expect(
    screen.getByRole("heading", { name: "Datos del trámite" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Remitente").tagName).toBe("DT");
  expect(screen.getByText("Ana Pérez").tagName).toBe("DD");
  expect(screen.getByText("—")).toBeInTheDocument();
  expect(screen.getByText("Datos tomados de la sesión.")).toBeInTheDocument();
});

it("sin datos muestra el texto vacío", () => {
  render(<DescriptionList items={[]} emptyText="No hay información." />);
  expect(screen.getByText("No hay información.")).toBeInTheDocument();
});
