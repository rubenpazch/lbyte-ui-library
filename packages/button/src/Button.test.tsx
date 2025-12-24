import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

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
      expect(button).toHaveClass("px-3", "py-1.5", "text-xs");
    });

    it("renders medium button (default)", () => {
      const { container } = render(<Button>Medium</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("px-4", "py-2", "text-sm");
    });

    it("renders large button", () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("px-6", "py-3", "text-base");
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

    variants.forEach((variant) => {
      it(`renders ${variant} variant outline button`, () => {
        render(<Button variant={variant}>{variant}</Button>);
        expect(screen.getByRole("button")).toBeInTheDocument();
      });

      it(`renders ${variant} variant filled button`, () => {
        render(
          <Button variant={variant} filled>
            {variant}
          </Button>,
        );
        expect(screen.getByRole("button")).toBeInTheDocument();
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
      expect(container.querySelector("button")).toHaveClass(
        "bg-gray-300",
        "text-gray-500",
        "cursor-not-allowed",
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
      expect(button).toHaveClass("text-gray-600");
    });

    it("quiet button ignores variant", () => {
      const { container } = render(
        <Button quiet variant="pink">
          Quiet
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("text-gray-600");
    });

    it("quiet button ignores filled prop", () => {
      const { container } = render(
        <Button quiet filled variant="blue">
          Quiet
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("text-gray-600");
    });
  });

  describe("Circled Button", () => {
    it("renders circled button with full border radius", () => {
      const { container } = render(<Button circled>O</Button>);
      expect(container.querySelector("button")).toHaveClass("rounded-full");
    });

    it("renders regular button with lg border radius", () => {
      const { container } = render(<Button>Regular</Button>);
      expect(container.querySelector("button")).toHaveClass("rounded-lg");
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
      expect(button).toHaveClass("bg-blue-500");
    });

    it("renders inverted filled button as outline", () => {
      const { container } = render(
        <Button variant="pink" filled inverted>
          Inverted
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("border-2");
    });
  });

  describe("Focus Styles", () => {
    it("renders with filled focus style (default)", () => {
      const { container } = render(<Button>Button</Button>);
      expect(container.querySelector("button")).toHaveClass("focus:ring-2");
    });

    it("renders with outline focus style", () => {
      const { container } = render(
        <Button focusStyleType="outline">Button</Button>,
      );
      expect(container.querySelector("button")).toHaveClass("focus:ring-2");
    });

    it("renders with underline focus style", () => {
      const { container } = render(
        <Button focusStyleType="underline">Button</Button>,
      );
      expect(container.querySelector("button")).toHaveClass("focus:underline");
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
      expect(button).toHaveClass("px-6", "py-3", "bg-pink-500");
    });

    it("renders small circled disabled button", () => {
      const { container } = render(
        <Button size="sm" circled disabled>
          X
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass(
        "px-3",
        "py-1.5",
        "rounded-full",
        "bg-gray-300",
        "text-gray-500",
      );
    });

    it("renders medium quiet button with custom class", () => {
      const { container } = render(
        <Button quiet className="my-custom-class">
          Quiet
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("my-custom-class", "text-gray-600");
    });

    it("renders large inverted gradient-green button", () => {
      const { container } = render(
        <Button size="lg" variant="gradient-green" inverted>
          Gradient
        </Button>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass(
        "px-6",
        "py-3",
        "bg-gradient-to-r",
        "from-emerald-400",
      );
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
        "transition-all",
        "duration-200",
      );
    });

    it("applies hover state to outlined button", () => {
      const { container } = render(<Button variant="blue">Button</Button>);
      expect(container.querySelector("button")).toHaveClass("hover:bg-blue-50");
    });

    it("applies hover state to filled button", () => {
      const { container } = render(
        <Button variant="blue" filled>
          Button
        </Button>,
      );
      expect(container.querySelector("button")).toHaveClass(
        "hover:bg-blue-600",
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
      expect(container.querySelector("button")).toHaveClass(
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-2",
      );
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
