/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import Button from "./Button";

expect.extend(matchers);

declare module "expect" {
  interface Matchers<R = void, T = unknown> {
    toBeInTheDocument(): R;
    toHaveClass(...classNames: string[]): R;
    toHaveAttribute(attr: string, value?: unknown): R;
    toBeDisabled(): R;
  }
}

describe("Button Component", () => {
  describe("Basic Rendering", () => {
    it("renders a button with text", () => {
      render(<Button>Click Me</Button>);
      expect(
        screen.getByRole("button", { name: /click me/i }),
      ).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Button className="custom-class">Custom</Button>,
      );
      expect(container.querySelector("button")).toHaveClass("custom-class");
    });
  });

  describe("Variants", () => {
    it("renders text variant by default", () => {
      const { container } = render(<Button>Text</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("text");
    });

    it("renders contained variant", () => {
      const { container } = render(
        <Button variant="contained">Contained</Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("contained");
    });

    it("renders outlined variant", () => {
      const { container } = render(
        <Button variant="outlined">Outlined</Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("outlined");
    });
  });

  describe("Colors", () => {
    const colors = [
      "primary",
      "secondary",
      "success",
      "error",
      "warning",
      "info",
    ] as const;

    colors.forEach((color) => {
      it(`renders ${color} color with text variant`, () => {
        const { container } = render(
          <Button variant="text" color={color}>
            {color}
          </Button>,
        );
        const button = container.querySelector("button");
        expect(button).toHaveClass(
          `text${color.charAt(0).toUpperCase()}${color.slice(1)}`,
        );
      });

      it(`renders ${color} color with contained variant`, () => {
        const { container } = render(
          <Button variant="contained" color={color}>
            {color}
          </Button>,
        );
        const button = container.querySelector("button");
        expect(button).toHaveClass(
          `contained${color.charAt(0).toUpperCase()}${color.slice(1)}`,
        );
      });

      it(`renders ${color} color with outlined variant`, () => {
        const { container } = render(
          <Button variant="outlined" color={color}>
            {color}
          </Button>,
        );
        const button = container.querySelector("button");
        expect(button).toHaveClass(
          `outlined${color.charAt(0).toUpperCase()}${color.slice(1)}`,
        );
      });
    });
  });

  describe("Sizes", () => {
    it("renders small button", () => {
      const { container } = render(<Button size="small">Small</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("sizeSmall");
    });

    it("renders medium button (default)", () => {
      const { container } = render(<Button>Medium</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("sizeMedium");
    });

    it("renders large button", () => {
      const { container } = render(<Button size="large">Large</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("sizeLarge");
    });
  });

  describe("Icons", () => {
    const TestIcon = () => <span>Icon</span>;

    it("renders start icon", () => {
      render(<Button startIcon={<TestIcon />}>With Icon</Button>);
      expect(screen.getByText("Icon")).toBeInTheDocument();
    });

    it("renders end icon", () => {
      render(<Button endIcon={<TestIcon />}>With Icon</Button>);
      expect(screen.getByText("Icon")).toBeInTheDocument();
    });

    it("hides icons when loading", () => {
      const { container } = render(
        <Button loading startIcon={<TestIcon />} endIcon={<TestIcon />}>
          Loading
        </Button>,
      );
      const content = container.querySelector(".content");
      expect(content).toHaveClass("contentHidden");
    });
  });

  describe("States", () => {
    it("handles disabled state", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("handles loading state", () => {
      const { container } = render(<Button loading>Loading</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(container.querySelector(".loadingWrapper")).toBeInTheDocument();
    });

    it("is disabled when loading", () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("Layout", () => {
    it("renders full width button", () => {
      const { container } = render(<Button fullWidth>Full Width</Button>);
      expect(container.querySelector("button")).toHaveClass("fullWidth");
    });

    it("renders without elevation", () => {
      const { container } = render(
        <Button variant="contained" disableElevation>
          No Elevation
        </Button>,
      );
      expect(container.querySelector("button")).toHaveClass("noElevation");
    });
  });

  describe("Interactions", () => {
    it("handles click events", async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click</Button>);

      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not trigger click when disabled", async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );

      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not trigger click when loading", async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>,
      );

      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Link behavior", () => {
    it("renders as link when href is provided", () => {
      const { container } = render(
        <Button href="https://example.com">Link</Button>,
      );
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("applies aria-disabled to disabled links", () => {
      const { container } = render(
        <Button href="https://example.com" disabled>
          Disabled Link
        </Button>,
      );
      const link = container.querySelector("a");
      expect(link).toHaveAttribute("aria-disabled", "true");
    });
  });
});
