/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClinicalNotesIcon from "./ClinicalNotesIcon";

describe("ClinicalNotesIcon", () => {
  it("renders with default size", () => {
    const { container } = render(<ClinicalNotesIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-5", "h-5");
  });

  it("applies size and className", () => {
    const { container } = render(
      <ClinicalNotesIcon size="xl" className="text-blue-600" />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("w-8", "h-8", "text-blue-600");
  });

  it("uses currentColor fill", () => {
    const { container } = render(<ClinicalNotesIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "currentColor");
  });
});
