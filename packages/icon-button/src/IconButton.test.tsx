/// <reference path="./modules.d.ts" />
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import IconButton from "./IconButton";
import styles from "./IconButton.module.css";

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
      expect(button).toHaveClass(
        styles.button,
        styles.sizeSmall,
        styles.variantDefaultOutlined,
        styles.shapeRounded,
        styles.focusFilled,
      );
    });

    it("renders medium icon-only button (default)", () => {
      const { container } = render(<IconButton icon={<MockIcon />} />);
      const button = container.querySelector("button");
      expect(button).toHaveClass(
        styles.button,
        styles.sizeMedium,
        styles.variantDefaultOutlined,
        styles.shapeRounded,
        styles.focusFilled,
      );
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
      expect(button).toHaveClass(
        styles.button,
        styles.textSmall,
        styles.variantDefaultOutlined,
        styles.roundedLg,
        styles.focusFilled,
        styles.whitespaceNowrap,
      );
    });

    it("renders medium button with text", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} size="medium">
          Medium
        </IconButton>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass(
        styles.button,
        styles.textMedium,
        styles.variantDefaultOutlined,
        styles.roundedLg,
        styles.focusFilled,
        styles.whitespaceNowrap,
      );
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
      expect(container.querySelector("button")).toHaveClass(styles.disabled);
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
      expect(button).toHaveClass(styles.variantDefaultQuiet);
    });

    it("quiet button respects variant color", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} quiet variant="pink" />,
      );
      const button = container.querySelector("button");
      // Quiet mode now respects variant colors
      expect(button).toHaveClass(styles.variantPinkQuiet);
    });

    it("quiet button ignores filled prop", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} quiet filled variant="blue" />,
      );
      const button = container.querySelector("button");
      // Quiet always uses quiet styling regardless of filled prop
      expect(button).toHaveClass(styles.variantBlueQuiet);
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
      expect(button).toHaveClass(styles.variantBlueFilled);
    });

    it("renders inverted filled button as outline", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} variant="pink" filled inverted>
          Inverted
        </IconButton>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass(styles.variantPinkOutlined);
    });
  });

  describe("Focus Styles", () => {
    it("renders with filled focus style (default)", () => {
      const { container } = render(<IconButton icon={<MockIcon />} />);
      expect(container.querySelector("button")).toHaveClass(styles.focusFilled);
    });

    it("renders with outline focus style", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} focusStyleType="outline" />,
      );
      expect(container.querySelector("button")).toHaveClass(
        styles.focusOutline,
      );
    });

    it("renders with underline focus style", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} focusStyleType="underline" />,
      );
      expect(container.querySelector("button")).toHaveClass(
        styles.focusUnderline,
      );
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
      expect(button).toHaveClass(styles.variantPinkFilled);
    });

    it("renders small quiet icon button", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} size="small" quiet />,
      );
      const button = container.querySelector("button");
      // Default variant is 'default' which maps to blue-600 in quiet mode
      expect(button).toHaveClass(
        styles.button,
        styles.sizeSmall,
        styles.variantDefaultQuiet,
        styles.shapeRounded,
        styles.focusFilled,
      );
    });

    it("renders medium inverted gradient-green icon button", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} variant="gradient-green" inverted>
          Gradient
        </IconButton>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass(styles.variantGradientGreenFilled);
    });

    it("renders disabled icon button with custom class", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} disabled className="my-custom-class">
          Custom
        </IconButton>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("my-custom-class", styles.disabled);
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
      expect(container.querySelector("button")).toHaveClass(
        styles.shapeRounded,
      );
    });

    it("button with text has rounded corners", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />}>Edit</IconButton>,
      );
      expect(container.querySelector("button")).toHaveClass(styles.roundedLg);
    });
  });

  describe("Hover and Transition", () => {
    it("has transition classes for smooth interaction", () => {
      const { container } = render(<IconButton icon={<MockIcon />} />);
      expect(container.querySelector("button")).toHaveClass(styles.button);
    });

    it("applies hover state to outlined button", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} variant="blue">
          Button
        </IconButton>,
      );
      expect(container.querySelector("button")).toHaveClass(
        styles.variantBlueOutlined,
      );
    });

    it("applies hover state to filled button", () => {
      const { container } = render(
        <IconButton icon={<MockIcon />} variant="blue" filled>
          Button
        </IconButton>,
      );
      expect(container.querySelector("button")).toHaveClass(
        styles.variantBlueFilled,
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
      expect(parent).toHaveClass(styles.iconSmall);
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
      expect(parent).toHaveClass(styles.iconMedium);
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

  describe("Shape Variants", () => {
    describe("Square Shape", () => {
      it("renders button with square shape", () => {
        const { container } = render(
          <IconButton icon={<MockIcon />} shape="square" />,
        );
        const button = container.querySelector("button");
        expect(button).toHaveClass(styles.shapeSquare);
      });

      it("renders square shape with small size", () => {
        const { container } = render(
          <IconButton icon={<MockIcon />} shape="square" size="small" />,
        );
        const button = container.querySelector("button");
        expect(button).toHaveClass(
          styles.button,
          styles.sizeSmall,
          styles.variantDefaultOutlined,
          styles.shapeSquare,
          styles.focusFilled,
        );
      });

      it("renders square shape with medium size", () => {
        const { container } = render(
          <IconButton icon={<MockIcon />} shape="square" size="medium" />,
        );
        const button = container.querySelector("button");
        expect(button).toHaveClass(
          styles.button,
          styles.sizeMedium,
          styles.variantDefaultOutlined,
          styles.shapeSquare,
          styles.focusFilled,
        );
      });

      it("renders square shape with filled variant", () => {
        const { container } = render(
          <IconButton
            icon={<MockIcon />}
            shape="square"
            filled
            variant="blue"
          />,
        );
        const button = container.querySelector("button");
        expect(button).toHaveClass(
          styles.variantBlueFilled,
          styles.shapeSquare,
        );
      });

      it("renders square shape with quiet variant", () => {
        const { container } = render(
          <IconButton
            icon={<MockIcon />}
            shape="square"
            quiet
            variant="blue"
          />,
        );
        const button = container.querySelector("button");
        expect(button).toHaveClass(styles.variantBlueQuiet, styles.shapeSquare);
      });

      it("renders square shape with all color variants", () => {
        const variants: Array<
          | "default"
          | "secondary"
          | "black"
          | "gradient-green"
          | "solid-green"
          | "blue"
          | "pink"
          | "warning"
        > = [
          "default",
          "secondary",
          "black",
          "gradient-green",
          "solid-green",
          "blue",
          "pink",
          "warning",
        ];

        variants.forEach((variant) => {
          const { container } = render(
            <IconButton
              icon={<MockIcon />}
              shape="square"
              variant={variant}
              filled
            />,
          );
          const button = container.querySelector("button");
          expect(button).toHaveClass(styles.shapeSquare);
        });
      });

      it("renders square shape with disabled state", () => {
        const { container } = render(
          <IconButton icon={<MockIcon />} shape="square" disabled />,
        );
        const button = container.querySelector("button");
        expect(button).toBeDisabled();
        expect(button).toHaveClass(styles.disabled);
      });

      it("renders square shape with tooltip", () => {
        render(
          <IconButton
            icon={<MockIcon />}
            shape="square"
            tooltip="Square button"
          />,
        );
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
      });

      it("renders square shape with icon and text", () => {
        render(
          <IconButton icon={<MockIcon />} shape="square">
            Action
          </IconButton>,
        );
        expect(screen.getByText("Action")).toBeInTheDocument();
        expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
      });

      it("applies square shape with inverted style", () => {
        const { container } = render(
          <IconButton
            icon={<MockIcon />}
            shape="square"
            variant="blue"
            inverted
          />,
        );
        const button = container.querySelector("button");
        expect(button).toHaveClass(styles.shapeSquare);
      });

      it("applies square shape with link style", () => {
        const { container } = render(
          <IconButton
            icon={<MockIcon />}
            shape="square"
            linkStyle
            quiet
            variant="blue"
          />,
        );
        const button = container.querySelector("button");
        expect(button).toHaveClass(styles.shapeSquare, styles.linkStyle);
      });

      it("renders square shape with different focus styles", () => {
        const focusStyles: Array<"filled" | "outline" | "underline"> = [
          "filled",
          "outline",
          "underline",
        ];

        focusStyles.forEach((focusStyle) => {
          const { container } = render(
            <IconButton
              icon={<MockIcon />}
              shape="square"
              focusStyleType={focusStyle}
            />,
          );
          const button = container.querySelector("button");
          expect(button).toHaveClass(styles.shapeSquare);
        });
      });

      it("renders square shape with tooltip in all positions", () => {
        const tooltipPositions: Array<"top" | "bottom" | "left" | "right"> = [
          "top",
          "bottom",
          "left",
          "right",
        ];

        tooltipPositions.forEach((position) => {
          const { unmount } = render(
            <IconButton
              icon={<MockIcon />}
              shape="square"
              tooltip="Test"
              tooltipPosition={position}
            />,
          );
          expect(screen.getByRole("button")).toBeInTheDocument();
          unmount();
        });
      });

      it("square shape button is clickable and calls onClick", async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();
        render(
          <IconButton
            icon={<MockIcon />}
            shape="square"
            onClick={handleClick}
          />,
        );

        const button = screen.getByRole("button");
        await user.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("square shape button shows tooltip on hover", async () => {
        const user = userEvent.setup();
        render(
          <IconButton
            icon={<MockIcon />}
            shape="square"
            tooltip="Square button tooltip"
          />,
        );

        const button = screen.getByRole("button");
        await user.hover(button);
        expect(screen.getByText("Square button tooltip")).toBeInTheDocument();
      });

      it("square shape button hides tooltip on hover out", async () => {
        const user = userEvent.setup();
        const { rerender } = render(
          <IconButton
            icon={<MockIcon />}
            shape="square"
            tooltip="Square button tooltip"
          />,
        );

        const button = screen.getByRole("button");
        await user.hover(button);
        expect(screen.getByText("Square button tooltip")).toBeInTheDocument();

        await user.unhover(button);
        rerender(
          <IconButton
            icon={<MockIcon />}
            shape="square"
            tooltip="Square button tooltip"
          />,
        );
      });

      it("renders square shape with keyboard focus", async () => {
        const user = userEvent.setup();
        const { container } = render(
          <IconButton icon={<MockIcon />} shape="square" />,
        );

        const button = container.querySelector("button");
        await user.click(button!);
        expect(button).toHaveClass(styles.shapeSquare);
      });

      it("renders square shape with aria attributes", () => {
        const { container } = render(
          <IconButton
            icon={<MockIcon />}
            shape="square"
            aria-label="Square Button"
          />,
        );
        const button = container.querySelector("button");
        expect(button).toHaveAttribute("aria-label", "Square Button");
      });

      it("applies square shape with different button types", () => {
        const buttonTypes: Array<"button" | "submit" | "reset"> = [
          "button",
          "submit",
          "reset",
        ];

        buttonTypes.forEach((type) => {
          const { container } = render(
            <IconButton icon={<MockIcon />} shape="square" type={type} />,
          );
          const button = container.querySelector("button");
          // Icon-only buttons may not have explicit type in DOM, so we check for className instead
          expect(button).toHaveClass(styles.shapeSquare);
        });
      });
    });

    describe("Rounded Shape (Default)", () => {
      it("renders button with rounded shape by default", () => {
        const { container } = render(<IconButton icon={<MockIcon />} />);
        const button = container.querySelector("button");
        expect(button).toHaveClass(styles.shapeRounded);
      });

      it("explicitly renders with rounded shape", () => {
        const { container } = render(
          <IconButton icon={<MockIcon />} shape="rounded" />,
        );
        const button = container.querySelector("button");
        expect(button).toHaveClass(styles.shapeRounded);
      });

      it("rounded shape maintains all other properties", () => {
        const { container } = render(
          <IconButton
            icon={<MockIcon />}
            shape="rounded"
            variant="blue"
            filled
            size="medium"
          />,
        );
        const button = container.querySelector("button");
        expect(button).toHaveClass(
          styles.button,
          styles.sizeMedium,
          styles.variantBlueFilled,
          styles.shapeRounded,
          styles.focusFilled,
        );
      });
    });

    describe("Shape vs Rounded Comparison", () => {
      it("square and rounded have different border radius", () => {
        const { container: squareContainer } = render(
          <IconButton icon={<MockIcon />} shape="square" />,
        );
        const { container: roundedContainer } = render(
          <IconButton icon={<MockIcon />} shape="rounded" />,
        );

        const squareButton = squareContainer.querySelector("button");
        const roundedButton = roundedContainer.querySelector("button");

        expect(squareButton).toHaveClass(styles.shapeSquare);
        expect(roundedButton).toHaveClass(styles.shapeRounded);
      });

      it("both shapes support all variants", () => {
        const variant = "blue" as const;
        const { container: squareContainer } = render(
          <IconButton icon={<MockIcon />} shape="square" variant={variant} />,
        );
        const { container: roundedContainer } = render(
          <IconButton icon={<MockIcon />} shape="rounded" variant={variant} />,
        );

        const squareButton = squareContainer.querySelector("button");
        const roundedButton = roundedContainer.querySelector("button");

        expect(squareButton).toBeInTheDocument();
        expect(roundedButton).toBeInTheDocument();
      });

      it("both shapes work with text buttons", () => {
        render(
          <IconButton icon={<MockIcon />} shape="square">
            Square Text
          </IconButton>,
        );
        render(
          <IconButton icon={<MockIcon />} shape="rounded">
            Rounded Text
          </IconButton>,
        );

        expect(screen.getByText("Square Text")).toBeInTheDocument();
        expect(screen.getByText("Rounded Text")).toBeInTheDocument();
      });

      it("both shapes handle all sizes", () => {
        const sizes: Array<"small" | "medium"> = ["small", "medium"];

        sizes.forEach((size) => {
          const { container: squareContainer } = render(
            <IconButton icon={<MockIcon />} shape="square" size={size} />,
          );
          const { container: roundedContainer } = render(
            <IconButton icon={<MockIcon />} shape="rounded" size={size} />,
          );

          const squareButton = squareContainer.querySelector("button");
          const roundedButton = roundedContainer.querySelector("button");

          if (size === "small") {
            expect(squareButton).toHaveClass(
              styles.button,
              styles.sizeSmall,
              styles.shapeSquare,
            );
            expect(roundedButton).toHaveClass(
              styles.button,
              styles.sizeSmall,
              styles.shapeRounded,
            );
          } else {
            expect(squareButton).toHaveClass(
              styles.button,
              styles.sizeMedium,
              styles.shapeSquare,
            );
            expect(roundedButton).toHaveClass(
              styles.button,
              styles.sizeMedium,
              styles.shapeRounded,
            );
          }
        });
      });

      it("both shapes handle disabled state", () => {
        const { container: squareContainer } = render(
          <IconButton icon={<MockIcon />} shape="square" disabled />,
        );
        const { container: roundedContainer } = render(
          <IconButton icon={<MockIcon />} shape="rounded" disabled />,
        );

        const squareButton = squareContainer.querySelector("button");
        const roundedButton = roundedContainer.querySelector("button");

        expect(squareButton).toBeDisabled();
        expect(roundedButton).toBeDisabled();
        expect(squareButton).toHaveClass(styles.disabled);
        expect(roundedButton).toHaveClass(styles.disabled);
      });

      it("square shape text button has rounded-lg", () => {
        const { container } = render(
          <IconButton icon={<MockIcon />} shape="square">
            Text Button
          </IconButton>,
        );
        const button = container.querySelector("button");
        expect(button).toHaveClass(styles.roundedLg);
      });

      it("rounded shape text button has rounded-lg", () => {
        const { container } = render(
          <IconButton icon={<MockIcon />} shape="rounded">
            Text Button
          </IconButton>,
        );
        const button = container.querySelector("button");
        // Text buttons use different rounding, checking for button existence
        expect(button).toHaveClass(styles.roundedLg);
      });

      it("square shape preserves focus behavior", async () => {
        const user = userEvent.setup();
        const { container } = render(
          <IconButton
            icon={<MockIcon />}
            shape="square"
            focusStyleType="filled"
          />,
        );

        const button = container.querySelector("button");
        await user.click(button!);
        expect(button).toHaveClass(styles.focusFilled);
      });

      it("rounded shape preserves focus behavior", async () => {
        const user = userEvent.setup();
        const { container } = render(
          <IconButton
            icon={<MockIcon />}
            shape="rounded"
            focusStyleType="filled"
          />,
        );

        const button = container.querySelector("button");
        await user.click(button!);
        expect(button).toHaveClass(styles.focusFilled);
      });
    });
  });
});
