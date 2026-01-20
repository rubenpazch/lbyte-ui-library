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
    toHaveFocus(): R;
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

    it("renders with children elements", () => {
      render(
        <Button>
          <svg className="w-4 h-4" />
          <span>Button with Icon</span>
        </Button>,
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByText("Button with Icon")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Button className="custom-class">Custom</Button>,
      );
      expect(container.querySelector("button")).toHaveClass("custom-class");
    });
  });

  describe("Button Sizes", () => {
    it("renders small button", () => {
      const { container } = render(<Button size="sm">Small</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveAttribute("data-size", "sm");
      expect(button).toHaveClass("sizeSm");
    });

    it("renders medium button (default)", () => {
      const { container } = render(<Button>Medium</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveAttribute("data-size", "md");
      expect(button).toHaveClass("sizeMd");
    });

    it("renders large button", () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveAttribute("data-size", "lg");
      expect(button).toHaveClass("sizeLg");
    });
  });

  describe("Button Variants", () => {
    const variants = [
      "default",
      "secondary",
      "black",
      "gradient-green",
      "solid-green",
      "blue",
      "pink",
      "warning",
    ] as const;

    const variantClassNames: Record<
      (typeof variants)[number],
      { outlined: string; filled: string }
    > = {
      default: {
        outlined: "variantDefaultOutlined",
        filled: "variantDefaultFilled",
      },
      secondary: {
        outlined: "variantSecondaryOutlined",
        filled: "variantSecondaryFilled",
      },
      black: {
        outlined: "variantBlackOutlined",
        filled: "variantBlackFilled",
      },
      "gradient-green": {
        outlined: "variantGradientGreenOutlined",
        filled: "variantGradientGreenFilled",
      },
      "solid-green": {
        outlined: "variantSolidGreenOutlined",
        filled: "variantSolidGreenFilled",
      },
      blue: {
        outlined: "variantBlueOutlined",
        filled: "variantBlueFilled",
      },
      pink: {
        outlined: "variantPinkOutlined",
        filled: "variantPinkFilled",
      },
      warning: {
        outlined: "variantWarningOutlined",
        filled: "variantWarningFilled",
      },
    };

    variants.forEach((variant) => {
      it(`renders ${variant} variant outline button`, () => {
        render(<Button variant={variant}>{variant}</Button>);
        expect(screen.getByRole("button")).toHaveAttribute(
          "data-style",
          "outlined",
        );
        expect(screen.getByRole("button")).toHaveClass(
          variantClassNames[variant].outlined,
        );
      });

      it(`renders ${variant} variant filled button`, () => {
        render(
          <Button variant={variant} filled>
            {variant}
          </Button>,
        );
        expect(screen.getByRole("button")).toHaveAttribute(
          "data-style",
          "filled",
        );
        expect(screen.getByRole("button")).toHaveClass(
          variantClassNames[variant].filled,
        );
      });
    });
  });

  describe("Button States", () => {
    it("renders disabled button", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("disabled button has opacity reduced", () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      expect(container.querySelector("button")).toHaveClass("disabled");
      expect(container.querySelector("button")).toHaveAttribute(
        "data-disabled",
        "true",
      );
    });

    it("handles click events", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not trigger click when disabled", async () => {
      const handleClick = jest.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Quiet Button", () => {
    it("renders quiet button with reduced styling", () => {
      const { container } = render(<Button quiet>Quiet Button</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("quiet");
      expect(button).toHaveAttribute("data-style", "quiet");
    });

    it("quiet button ignores variant", () => {
      const { container } = render(
        <Button quiet variant="pink">
          Quiet
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("quiet");
      expect(button).toHaveAttribute("data-style", "quiet");
    });

    it("quiet button ignores filled prop", () => {
      const { container } = render(
        <Button quiet filled variant="blue">
          Quiet
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("quiet");
      expect(button).toHaveAttribute("data-style", "quiet");
    });
  });

  describe("Circled Button", () => {
    it("renders circled button with full border radius", () => {
      const { container } = render(<Button circled>O</Button>);
      expect(container.querySelector("button")).toHaveClass("roundedFull");
      expect(container.querySelector("button")).toHaveAttribute(
        "data-shape",
        "circle",
      );
    });

    it("renders regular button with lg border radius", () => {
      const { container } = render(<Button>Regular</Button>);
      expect(container.querySelector("button")).toHaveClass("roundedLg");
      expect(container.querySelector("button")).toHaveAttribute(
        "data-shape",
        "rounded",
      );
    });
  });

  describe("Inverted Button", () => {
    it("renders inverted outline button as filled", () => {
      const { container } = render(
        <Button variant="blue" inverted>
          Inverted
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("variantBlueFilled");
      expect(button).toHaveAttribute("data-style", "filled");
    });

    it("renders inverted filled button as outline", () => {
      const { container } = render(
        <Button variant="pink" filled inverted>
          Inverted
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("variantPinkOutlined");
      expect(button).toHaveAttribute("data-style", "outlined");
    });
  });

  describe("Focus Styles", () => {
    it("renders with filled focus style (default)", () => {
      const { container } = render(<Button>Button</Button>);
      expect(container.querySelector("button")).toHaveClass("focusFilled");
      expect(container.querySelector("button")).toHaveAttribute(
        "data-focus-style",
        "filled",
      );
    });

    it("renders with outline focus style", () => {
      const { container } = render(
        <Button focusStyleType="outline">Button</Button>,
      );
      expect(container.querySelector("button")).toHaveClass("focusOutline");
      expect(container.querySelector("button")).toHaveAttribute(
        "data-focus-style",
        "outline",
      );
    });

    it("renders with underline focus style", () => {
      const { container } = render(
        <Button focusStyleType="underline">Button</Button>,
      );
      expect(container.querySelector("button")).toHaveClass("focusUnderline");
      expect(container.querySelector("button")).toHaveAttribute(
        "data-focus-style",
        "underline",
      );
    });
  });

  describe("Focus Trigger Types", () => {
    it("sets data-focus-trigger attribute", () => {
      const { container } = render(
        <Button focusTriggerType="parent">Button</Button>,
      );
      expect(container.querySelector("button")).toHaveAttribute(
        "data-focus-trigger",
        "parent",
      );
    });

    it("defaults to self focus trigger", () => {
      const { container } = render(<Button>Button</Button>);
      expect(container.querySelector("button")).toHaveAttribute(
        "data-focus-trigger",
        "self",
      );
    });
  });

  describe("Accessibility", () => {
    it("button is keyboard focusable", async () => {
      render(<Button>Keyboard</Button>);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });

    it("button responds to Enter key", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Button</Button>);
      const button = screen.getByRole("button");
      button.focus();
      await userEvent.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalled();
    });

    it("button responds to Space key", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Button</Button>);
      const button = screen.getByRole("button");
      button.focus();
      await userEvent.keyboard(" ");
      expect(handleClick).toHaveBeenCalled();
    });

    it("disabled button is not focusable by click", async () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      await userEvent.click(button);
      expect(button).not.toHaveFocus();
    });
  });

  describe("Combined Props", () => {
    it("renders large filled pink button", () => {
      const { container } = render(
        <Button size="lg" variant="pink" filled>
          Large Pink
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("sizeLg", "variantPinkFilled");
      expect(button).toHaveAttribute("data-size", "lg");
      expect(button).toHaveAttribute("data-style", "filled");
    });

    it("renders small circled disabled button", () => {
      const { container } = render(
        <Button size="sm" circled disabled>
          X
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("sizeSm", "roundedFull", "disabled");
      expect(button).toHaveAttribute("data-size", "sm");
      expect(button).toHaveAttribute("data-shape", "circle");
      expect(button).toHaveAttribute("data-disabled", "true");
    });

    it("renders medium quiet button with custom class", () => {
      const { container } = render(
        <Button quiet className="my-custom-class">
          Quiet
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("my-custom-class", "quiet");
      expect(button).toHaveAttribute("data-style", "quiet");
    });

    it("renders large inverted gradient-green button", () => {
      const { container } = render(
        <Button size="lg" variant="gradient-green" inverted>
          Gradient
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("sizeLg", "variantGradientGreenFilled");
      expect(button).toHaveAttribute("data-style", "filled");
      expect(button).toHaveAttribute("data-size", "lg");
    });
  });

  describe("HTML Attributes", () => {
    it("forwards all button HTML attributes", () => {
      const { container } = render(
        <Button
          title="Hover Title"
          aria-label="Custom Label"
          data-testid="custom-button"
        >
          Button
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveAttribute("title", "Hover Title");
      expect(button).toHaveAttribute("aria-label", "Custom Label");
      expect(button).toHaveAttribute("data-testid", "custom-button");
    });

    it("supports ref forwarding", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("Hover and Transition", () => {
    it("has transition classes for smooth interaction", () => {
      const { container } = render(<Button>Button</Button>);
      expect(container.querySelector("button")).toHaveClass(
        "interactive",
        "root",
      );
    });

    it("applies hover state to outlined button", () => {
      const { container } = render(<Button variant="blue">Button</Button>);
      expect(container.querySelector("button")).toHaveClass(
        "variantBlueOutlined",
      );
    });

    it("applies hover state to filled button", () => {
      const { container } = render(
        <Button variant="blue" filled>
          Button
        </Button>,
      );
      expect(container.querySelector("button")).toHaveClass(
        "variantBlueFilled",
      );
    });
  });

  describe("Icon Support", () => {
    it("renders button with icon and text", () => {
      render(
        <Button>
          <svg data-testid="icon" className="w-4 h-4" />
          Text
        </Button>,
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Text")).toBeInTheDocument();
    });

    it("centers icon and text with gap", () => {
      const { container } = render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>,
      );
      expect(container.querySelector("button")).toHaveClass("root");
    });
  });

  describe("Display Name", () => {
    it("has correct displayName for debugging", () => {
      expect(Button.displayName).toBe("Button");
    });
  });

  describe("Type Exports", () => {
    it("exports correct variant types", () => {
      const button = (
        <Button variant="blue" filled>
          Typed
        </Button>
      );
      expect(button).toBeDefined();
    });
  });
});
