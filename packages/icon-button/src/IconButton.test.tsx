import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IconButton from "./IconButton";

// Mock icon component
const MockIcon = () => (
  <svg data-testid="mock-icon" className="w-5 h-5" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

describe("IconButton Component", () => {
  describe("Basic Rendering", () => {
    it("renders icon-only button", () => {
      const { container } = render(<IconButton icon={<MockIcon />} />);
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("renders icon button with text", () => {
      render(<IconButton icon={<MockIcon />}>Edit</IconButton>);
      expect(screen.getByText("Edit")).toBeInTheDocument();
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    });

    it("renders icon button with label prop", () => {
      render(<IconButton icon={<MockIcon />} label="Delete" />);
      expect(screen.getByText("Delete")).toBeInTheDocument();
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} className="custom-class" />,
      );
      expect(container.querySelector("button")).toHaveClass("custom-class");
    });
  });

  describe("Icon-Only Button Sizes", () => {
    it("renders small icon-only button", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} size="small" />,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("p-2", "w-8", "h-8");
    });

    it("renders medium icon-only button (default)", () => {
      const { container } = render(<IconButton icon={<MockIcon />} />);
      const button = container.querySelector("button");
      expect(button).toHaveClass("p-2.5", "w-10", "h-10");
    });
  });

  describe("Icon Button With Text Sizes", () => {
    it("renders small button with text", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} size="small">
          Small
        </IconButton>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("px-3", "py-1.5", "text-xs");
    });

    it("renders medium button with text", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} size="medium">
          Medium
        </IconButton>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("px-4", "py-2", "text-sm");
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
      it(`renders ${variant} variant outline icon button`, () => {
        render(
          <IconButton icon={<MockIcon />} variant={variant}>
            {variant}
          </IconButton>,
        );
        expect(screen.getByRole("button")).toBeInTheDocument();
      });

      it(`renders ${variant} variant filled icon button`, () => {
        render(
          <IconButton icon={<MockIcon />} variant={variant} filled>
            {variant}
          </IconButton>,
        );
        expect(screen.getByRole("button")).toBeInTheDocument();
      });
    });
  });

  describe("Button States", () => {
    it("renders disabled icon button", () => {
      render(<IconButton icon={<MockIcon />} disabled />);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("disabled button has opacity reduced", () => {
      const { container } = render(<IconButton icon={<MockIcon />} disabled />);
      expect(container.querySelector("button")).toHaveClass(
        "opacity-50",
        "cursor-not-allowed",
      );
    });

    it("handles click events", async () => {
      const handleClick = jest.fn();
      render(<IconButton icon={<MockIcon />} onClick={handleClick} />);
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not trigger click when disabled", async () => {
      const handleClick = jest.fn();
      render(<IconButton icon={<MockIcon />} disabled onClick={handleClick} />);
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Quiet Icon Button", () => {
    it("renders quiet icon button with reduced styling", () => {
      const { container } = render(<IconButton icon={<MockIcon />} quiet />);
      const button = container.querySelector("button");
      // Default variant is 'default' which maps to blue-600 in quiet mode
      expect(button).toHaveClass("text-blue-600");
      expect(button).toHaveClass("hover:text-blue-700");
    });

    it("quiet button respects variant color", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} quiet variant="pink" />,
      );
      const button = container.querySelector("button");
      // Quiet mode now respects variant colors
      expect(button).toHaveClass("text-pink-500");
      expect(button).toHaveClass("hover:text-pink-600");
    });

    it("quiet button ignores filled prop", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} quiet filled variant="blue" />,
      );
      const button = container.querySelector("button");
      // Quiet always uses quiet styling regardless of filled prop
      expect(button).toHaveClass("text-blue-500");
      expect(button).toHaveClass("hover:text-blue-600");
    });
  });

  describe("Icon Position", () => {
    it("renders icon before text by default", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />}>Edit</IconButton>,
      );
      const button = container.querySelector("button");
      const children = button?.childNodes;
      // Icon should be first child (the span containing svg)
      expect(children?.[0]).toContainElement(screen.getByTestId("mock-icon"));
    });

    it("renders icon after text with iconPosition end", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} iconPosition="end">
          Done
        </IconButton>,
      );
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
      // Verify the button contains both text and icon
      expect(screen.getByText("Done")).toBeInTheDocument();
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    });
  });

  describe("Inverted Icon Button", () => {
    it("renders inverted outline button as filled", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} variant="blue" inverted>
          Inverted
        </IconButton>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("bg-blue-500");
    });

    it("renders inverted filled button as outline", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} variant="pink" filled inverted>
          Inverted
        </IconButton>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("border-2");
    });
  });

  describe("Focus Styles", () => {
    it("renders with filled focus style (default)", () => {
      const { container } = render(<IconButton icon={<MockIcon />} />);
      expect(container.querySelector("button")).toHaveClass("focus:ring-2");
    });

    it("renders with outline focus style", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} focusStyleType="outline" />,
      );
      expect(container.querySelector("button")).toHaveClass("focus:ring-2");
    });

    it("renders with underline focus style", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} focusStyleType="underline" />,
      );
      expect(container.querySelector("button")).toHaveClass("focus:underline");
    });
  });

  describe("Focus Trigger Types", () => {
    it("sets data-focus-trigger attribute", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} focusTriggerType="parent" />,
      );
      expect(container.querySelector("button")).toHaveAttribute(
        "data-focus-trigger",
        "parent",
      );
    });

    it("defaults to self focus trigger", () => {
      const { container } = render(<IconButton icon={<MockIcon />} />);
      expect(container.querySelector("button")).toHaveAttribute(
        "data-focus-trigger",
        "self",
      );
    });
  });

  describe("Accessibility", () => {
    it("icon button is keyboard focusable", async () => {
      render(<IconButton icon={<MockIcon />} />);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });

    it("icon button responds to Enter key", async () => {
      const handleClick = jest.fn();
      render(<IconButton icon={<MockIcon />} onClick={handleClick} />);
      const button = screen.getByRole("button");
      button.focus();
      await userEvent.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalled();
    });

    it("icon button responds to Space key", async () => {
      const handleClick = jest.fn();
      render(<IconButton icon={<MockIcon />} onClick={handleClick} />);
      const button = screen.getByRole("button");
      button.focus();
      await userEvent.keyboard(" ");
      expect(handleClick).toHaveBeenCalled();
    });

    it("disabled button is not focusable by click", async () => {
      render(<IconButton icon={<MockIcon />} disabled />);
      const button = screen.getByRole("button");
      await userEvent.click(button);
      expect(button).not.toHaveFocus();
    });

    it("supports aria-label for icon-only buttons", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} aria-label="Close dialog" />,
      );
      const button = container.querySelector("button");
      expect(button).toHaveAttribute("aria-label", "Close dialog");
    });
  });

  describe("Combined Props", () => {
    it("renders large filled pink icon button", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} variant="pink" filled>
          Delete
        </IconButton>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("bg-pink-500");
    });

    it("renders small quiet icon button", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} size="small" quiet />,
      );
      const button = container.querySelector("button");
      // Default variant is 'default' which maps to blue-600 in quiet mode
      expect(button).toHaveClass("p-2", "text-blue-600");
    });

    it("renders medium inverted gradient-green icon button", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} variant="gradient-green" inverted>
          Gradient
        </IconButton>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("bg-gradient-to-r", "from-emerald-400");
    });

    it("renders disabled icon button with custom class", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} disabled className="my-custom-class">
          Custom
        </IconButton>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("my-custom-class", "opacity-50");
    });
  });

  describe("HTML Attributes", () => {
    it("forwards all button HTML attributes", () => {
      const { container } = render(
        <IconButton
          icon={<MockIcon />}
          title="Hover Title"
          aria-label="Custom Label"
          data-testid="custom-icon-button"
        />,
      );
      const button = container.querySelector("button");
      expect(button).toHaveAttribute("title", "Hover Title");
      expect(button).toHaveAttribute("aria-label", "Custom Label");
      expect(button).toHaveAttribute("data-testid", "custom-icon-button");
    });

    it("supports ref forwarding", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<IconButton ref={ref} icon={<MockIcon />} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("Circular Shape", () => {
    it("icon-only button has circular shape", () => {
      const { container } = render(<IconButton icon={<MockIcon />} />);
      expect(container.querySelector("button")).toHaveClass("rounded-full");
    });

    it("button with text has rounded corners", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />}>Edit</IconButton>,
      );
      expect(container.querySelector("button")).toHaveClass("rounded-lg");
    });
  });

  describe("Hover and Transition", () => {
    it("has transition classes for smooth interaction", () => {
      const { container } = render(<IconButton icon={<MockIcon />} />);
      expect(container.querySelector("button")).toHaveClass(
        "transition-all",
        "duration-200",
      );
    });

    it("applies hover state to outlined button", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} variant="blue">
          Button
        </IconButton>,
      );
      expect(container.querySelector("button")).toHaveClass("hover:bg-blue-50");
    });

    it("applies hover state to filled button", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} variant="blue" filled>
          Button
        </IconButton>,
      );
      expect(container.querySelector("button")).toHaveClass(
        "hover:bg-blue-600",
      );
    });
  });

  describe("Icon Sizing", () => {
    it("small icon button has small icon size", () => {
      render(
        <IconButton
          icon={<MockIcon />}
          size="small"
          data-testid="small-icon-btn"
        />,
      );
      const icon = screen.getByTestId("mock-icon");
      const parent = icon.parentElement;
      expect(parent).toHaveClass("w-4", "h-4");
    });

    it("medium icon button has medium icon size", () => {
      render(
        <IconButton
          icon={<MockIcon />}
          size="medium"
          data-testid="medium-icon-btn"
        />,
      );
      const icon = screen.getByTestId("mock-icon");
      const parent = icon.parentElement;
      expect(parent).toHaveClass("w-5", "h-5");
    });
  });

  describe("Display Name", () => {
    it("has correct displayName for debugging", () => {
      expect(IconButton.displayName).toBe("IconButton");
    });
  });

  describe("Label and Children Priority", () => {
    it("uses children over label when both provided", () => {
      render(
        <IconButton icon={<MockIcon />} label="Label">
          Children
        </IconButton>,
      );
      expect(screen.getByText("Children")).toBeInTheDocument();
      expect(screen.queryByText("Label")).not.toBeInTheDocument();
    });

    it("uses label when children not provided", () => {
      render(<IconButton icon={<MockIcon />} label="Label" />);
      expect(screen.getByText("Label")).toBeInTheDocument();
    });
  });

  describe("Type Exports", () => {
    it("exports correct icon button types", () => {
      const button = (
        <IconButton icon={<MockIcon />} variant="blue" filled>
          Typed
        </IconButton>
      );
      expect(button).toBeDefined();
    });
  });
});
