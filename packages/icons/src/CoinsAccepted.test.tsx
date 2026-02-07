/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CoinsAcceptedIcon from "./CoinsAcceptedIcon";

describe("CoinsAcceptedIcon", () => {
  it("renders with default size", () => {
    const { container } = render(<CoinsAcceptedIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-5", "h-5");
  });

  it("applies size and className", () => {
    const { container } = render(
      <CoinsAcceptedIcon size="xl" className="text-green-600" />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("w-8", "h-8", "text-green-600");
  });

  it("uses currentColor fill", () => {
    const { container } = render(<CoinsAcceptedIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "currentColor");
  });
});
