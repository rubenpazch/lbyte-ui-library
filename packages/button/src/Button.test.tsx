import React from "react";
import { render, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Button color="primary" />);
    expect(screen.getByRole("button")).toBeTruthy();
  });

  test("renders with primary color", () => {
    const { container } = render(<Button color="primary" />);
    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain("color-primary");
  });

  test("renders with small size", () => {
    const { container } = render(<Button size="small" color="secondary" />);
    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain("size-small");
  });

  test("renders with wrap", () => {
    const { container } = render(<Button color="secondary" wrap />);
    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain("wrap");
  });

  test("renders with outline variant", () => {
    const { container } = render(<Button color="secondary" outline />);
    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain("variant-outline");
  });

  test("renders with ghost variant (quiet)", () => {
    const { container } = render(<Button color="secondary" quiet />);
    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain("variant-ghost");
  });
});
