import React from "react";
import { render, screen } from "@testing-library/react";
import OverlayLoader from "./OverlayLoader";

describe("OverlayLoader", () => {
  it("renders the message and a spinner when visible", () => {
    render(<OverlayLoader visible message="Estamos cargando la aplicación" />);

    expect(
      screen.getByText("Estamos cargando la aplicación"),
    ).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders an optional title", () => {
    render(<OverlayLoader visible title="Un momento" message="Cargando…" />);

    expect(screen.getByText("Un momento")).toBeInTheDocument();
  });

  it("marks the overlay visible via data-visible", () => {
    const { container } = render(<OverlayLoader visible message="Cargando…" />);

    expect(container.firstChild).toHaveAttribute("data-visible", "true");
  });

  it("hides and is aria-hidden when not visible", () => {
    const { container } = render(
      <OverlayLoader visible={false} message="Cargando…" />,
    );

    expect(container.firstChild).toHaveAttribute("data-visible", "false");
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("uses the message as the spinner accessible label by default", () => {
    render(<OverlayLoader visible message="Cerrando tu sesión…" />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-label",
      "Cerrando tu sesión…",
    );
  });
});
