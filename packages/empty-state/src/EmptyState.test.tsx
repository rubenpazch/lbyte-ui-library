import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyState from "./EmptyState";

describe("EmptyState", () => {
  it("muestra título, descripción y acción", () => {
    render(
      <EmptyState
        title="No hay convocatorias"
        description="Crea la primera para publicarla."
        action={<button>Crear convocatoria</button>}
      />,
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "No hay convocatorias",
    );
    expect(
      screen.getByText("Crea la primera para publicarla."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Crear convocatoria" }),
    ).toBeInTheDocument();
  });

  it("permite ocultar el icono", () => {
    const { container } = render(
      <EmptyState title="Sin resultados" icon={false} />,
    );
    expect(container.querySelector("svg")).toBeNull();
  });
});
