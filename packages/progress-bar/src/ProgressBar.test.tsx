import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("expone valor y nombre accesibles", () => {
    render(<ProgressBar label="Subiendo archivos" value={45} showValue />);
    const bar = screen.getByRole("progressbar", { name: "Subiendo archivos" });
    expect(bar).toHaveAttribute("aria-valuenow", "45");
    expect(bar).toHaveAttribute("aria-valuetext", "45 %");
    expect(screen.getByText("45 %")).toBeInTheDocument();
  });

  it("recorta valores fuera de rango", () => {
    render(<ProgressBar label="x" value={150} max={100} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });

  it("sin valor es indeterminada", () => {
    render(<ProgressBar label="Procesando" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar).toHaveAttribute("aria-busy", "true");
  });
});
