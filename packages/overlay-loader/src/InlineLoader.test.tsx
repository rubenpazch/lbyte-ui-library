import React from "react";
import { render, screen } from "@testing-library/react";
import InlineLoader from "./InlineLoader";

describe("InlineLoader", () => {
  it("renders the message and a spinner", () => {
    render(<InlineLoader message="Cargando módulo…" />);

    expect(screen.getByText("Cargando módulo…")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders without a message", () => {
    render(<InlineLoader />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("uses the message as the spinner accessible label by default", () => {
    render(<InlineLoader message="Cargando módulo…" />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-label",
      "Cargando módulo…",
    );
  });

  it("falls back to a default spinner label", () => {
    render(<InlineLoader />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-label",
      "Cargando",
    );
  });

  it("applies the fill modifier when fill is set", () => {
    const { container } = render(<InlineLoader fill message="Cargando…" />);

    expect(container.firstChild).toHaveClass("fill");
  });
});
