import React from "react";
import { render } from "@testing-library/react";
import Skeleton from "./Skeleton";

describe("Skeleton", () => {
  it("es decorativo", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("varias líneas, la última más corta", () => {
    const { container } = render(<Skeleton lines={3} />);
    const lines = container.querySelectorAll("span > span");
    expect(lines).toHaveLength(3);
    expect((lines[2] as HTMLElement).style.width).toBe("60%");
  });

  it("circle usa el mismo ancho y alto", () => {
    const { container } = render(<Skeleton variant="circle" width={48} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("48px");
    expect(el.style.height).toBe("48px");
  });
});
