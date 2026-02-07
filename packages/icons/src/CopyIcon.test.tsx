/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CopyIcon from "./CopyIcon";

describe("CopyIcon", () => {
  it("renders with default size", () => {
    const { container } = render(<CopyIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-5", "h-5");
  });

  it("applies size and className", () => {
    const { container } = render(
      <CopyIcon size="xl" className="text-indigo-600" />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("w-8", "h-8", "text-indigo-600");
  });

  it("uses currentColor fill", () => {
    const { container } = render(<CopyIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "currentColor");
  });
});
