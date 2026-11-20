import React from "react";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  it("muestra el texto con color y variante", () => {
    render(
      <Badge color="success" variant="solid">
        Pagado
      </Badge>,
    );
    const b = screen.getByText("Pagado");
    expect(b).toHaveAttribute("data-color", "success");
    expect(b.className).toMatch(/solid/);
  });

  it("el punto es decorativo y acepta aria-label", () => {
    const { container } = render(
      <Badge dot color="danger" aria-label="Estado: vencido">
        Vencido
      </Badge>,
    );
    expect(screen.getByLabelText("Estado: vencido")).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
