import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CheckboxInput from "./CheckboxInput";
import styles from "../CheckboxInput.module.css";

describe("CheckboxInput Component", () => {
  describe("Basic Rendering", () => {
    it("renders checkbox with label", () => {
      render(<CheckboxInput label="Accept terms" />);
      expect(screen.getByLabelText("Accept terms")).toBeInTheDocument();
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("renders with custom id", () => {
      render(<CheckboxInput id="custom-id" label="Custom checkbox" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("id", "custom-id");
    });

    it("generates unique id when not provided", () => {
      const { container } = render(<CheckboxInput label="Auto ID" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox?.id).toMatch(/^checkbox-/);
    });
  });

  describe("Checked State", () => {
    it("renders unchecked by default", () => {
      render(<CheckboxInput label="Unchecked" />);
      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it("renders checked when checked prop is true", () => {
      render(<CheckboxInput label="Checked" checked={true} />);
      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it("updates checked state when clicked", () => {
      const handleChange = jest.fn();
      render(
        <CheckboxInput
          label="Toggle me"
          checked={false}
          onChange={handleChange}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("toggles from checked to unchecked", () => {
      const handleChange = jest.fn();
      render(
        <CheckboxInput
          label="Toggle me"
          checked={true}
          onChange={handleChange}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(false);
    });
  });

  describe("Disabled State", () => {
    it("renders as disabled when disabled prop is true", () => {
      render(<CheckboxInput label="Disabled" disabled={true} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeDisabled();
    });

    it("does not trigger onChange when disabled", () => {
      const handleChange = jest.fn();
      render(
        <CheckboxInput
          label="Disabled"
          disabled={true}
          onChange={handleChange}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("applies disabled styling to label", () => {
      render(<CheckboxInput label="Disabled label" disabled={true} />);
      const label = screen.getByText("Disabled label");
      expect(label).toHaveClass(styles.labelDisabled);
    });
  });

  describe("Description", () => {
    it("renders description when provided", () => {
      render(
        <CheckboxInput
          label="With description"
          description="This is a helpful description"
        />,
      );
      expect(
        screen.getByText("This is a helpful description"),
      ).toBeInTheDocument();
    });

    it("does not render description when not provided", () => {
      const { container } = render(<CheckboxInput label="No description" />);
      const description = container.querySelector(`.${styles.description}`);
      expect(description).not.toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("renders error message when provided", () => {
      render(
        <CheckboxInput label="With error" error="This field is required" />,
      );
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("applies error styling to checkbox", () => {
      render(<CheckboxInput label="Error checkbox" error="Error message" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(styles.checkboxError);
    });

    it("does not render error when not provided", () => {
      const { container } = render(<CheckboxInput label="No error" />);
      const error = container.querySelector(`.${styles.errorText}`);
      expect(error).not.toBeInTheDocument();
    });
  });

  describe("Required Field", () => {
    it("shows asterisk when required is true", () => {
      render(<CheckboxInput label="Required field" required={true} />);
      const asterisk = screen.getByText("*");
      expect(asterisk).toBeInTheDocument();
      expect(asterisk).toHaveClass(styles.required);
    });

    it("does not show asterisk when required is false", () => {
      render(<CheckboxInput label="Optional field" required={false} />);
      const asterisks = screen.queryByText("*");
      expect(asterisks).not.toBeInTheDocument();
    });

    it("sets required attribute on input", () => {
      render(<CheckboxInput label="Required" required={true} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeRequired();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className to wrapper", () => {
      const { container } = render(
        <CheckboxInput label="Custom class" className="my-custom-class" />,
      );
      const wrapper = container.firstChild as HTMLElement | null;
      expect(wrapper).toHaveClass("my-custom-class");
    });

    it("maintains default classes with custom className", () => {
      const { container } = render(
        <CheckboxInput label="Custom class" className="my-custom-class" />,
      );
      const wrapper = container.firstChild as HTMLElement | null;
      expect(wrapper).toHaveClass(styles.wrapper, "my-custom-class");
    });
  });

  describe("Label Interaction", () => {
    it("toggles checkbox when label is clicked", () => {
      const handleChange = jest.fn();
      render(<CheckboxInput label="Click label" onChange={handleChange} />);

      const label = screen.getByText("Click label");
      fireEvent.click(label);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("label has correct cursor style when enabled", () => {
      render(<CheckboxInput label="Clickable label" />);
      const label = screen.getByText("Clickable label");
      expect(label).toHaveClass(styles.labelNormal);
    });

    it("label has disabled cursor when disabled", () => {
      render(<CheckboxInput label="Disabled label" disabled={true} />);
      const label = screen.getByText("Disabled label");
      expect(label).toHaveClass(styles.labelDisabled);
    });
  });

  describe("Accessibility", () => {
    it("associates label with checkbox via htmlFor", () => {
      render(<CheckboxInput id="test-checkbox" label="Accessible checkbox" />);
      const checkbox = screen.getByRole("checkbox");
      const label = screen.getByText("Accessible checkbox");

      expect(checkbox).toHaveAttribute("id", "test-checkbox");
      expect(label).toHaveAttribute("for", "test-checkbox");
    });

    it("has proper focus styling", () => {
      render(<CheckboxInput label="Focus test" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(styles.variantDefault);
    });

    it("is keyboard accessible", () => {
      const handleChange = jest.fn();
      render(
        <CheckboxInput
          label="Keyboard accessible"
          checked={false}
          onChange={handleChange}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();
      expect(checkbox).toHaveFocus();

      // Click simulates keyboard interaction for checkboxes
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles onChange being undefined", () => {
      render(<CheckboxInput label="No onChange" />);
      const checkbox = screen.getByRole("checkbox");

      expect(() => fireEvent.click(checkbox)).not.toThrow();
    });

    it("handles empty label gracefully", () => {
      render(<CheckboxInput label="" />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("handles all props together", () => {
      const handleChange = jest.fn();
      render(
        <CheckboxInput
          id="complex-checkbox"
          label="Complex checkbox"
          checked={true}
          onChange={handleChange}
          disabled={false}
          description="This is a complex example"
          error="Example error"
          className="custom-wrapper"
          required={true}
        />,
      );

      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.getByText("Complex checkbox")).toBeInTheDocument();
      expect(screen.getByText("This is a complex example")).toBeInTheDocument();
      expect(screen.getByText("Example error")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("renders small size correctly", () => {
      render(<CheckboxInput label="Small checkbox" size="sm" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(styles.checkboxSm);
    });

    it("renders medium size by default", () => {
      render(<CheckboxInput label="Medium checkbox" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(styles.checkboxMd);
    });

    it("renders medium size when specified", () => {
      render(<CheckboxInput label="Medium checkbox" size="md" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(styles.checkboxMd);
    });

    it("renders large size correctly", () => {
      render(<CheckboxInput label="Large checkbox" size="lg" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(styles.checkboxLg);
    });

    it("applies correct label size for small", () => {
      render(<CheckboxInput label="Small label" size="sm" />);
      const label = screen.getByText("Small label");
      expect(label).toHaveClass(styles.labelSm);
    });

    it("applies correct label size for large", () => {
      render(<CheckboxInput label="Large label" size="lg" />);
      const label = screen.getByText("Large label");
      expect(label).toHaveClass(styles.labelLg);
    });

    it("applies correct description size for small", () => {
      render(
        <CheckboxInput
          label="Small"
          size="sm"
          description="Small description"
        />,
      );
      const description = screen.getByText("Small description");
      expect(description).toHaveClass(styles.descriptionSm);
    });

    it("applies correct description size for large", () => {
      render(
        <CheckboxInput
          label="Large"
          size="lg"
          description="Large description"
        />,
      );
      const description = screen.getByText("Large description");
      expect(description).toHaveClass(styles.descriptionLg);
    });
  });

  describe("Style Variants", () => {
    it("renders default variant correctly", () => {
      render(<CheckboxInput label="Default" checked={true} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(styles.variantDefault);
    });

    it("renders primary variant correctly", () => {
      render(
        <CheckboxInput label="Primary" variant="primary" checked={true} />,
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(styles.variantPrimary);
    });

    it("renders success variant correctly", () => {
      render(
        <CheckboxInput label="Success" variant="success" checked={true} />,
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(styles.variantSuccess);
    });

    it("renders warning variant correctly", () => {
      render(
        <CheckboxInput label="Warning" variant="warning" checked={true} />,
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(styles.variantWarning);
    });

    it("renders danger variant correctly", () => {
      render(<CheckboxInput label="Danger" variant="danger" checked={true} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(styles.variantDanger);
    });

    it("combines size and variant correctly", () => {
      render(
        <CheckboxInput
          label="Large Success"
          size="lg"
          variant="success"
          checked={true}
        />,
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(styles.checkboxLg, styles.variantSuccess);
    });

    it("maintains variant styling when disabled", () => {
      render(
        <CheckboxInput
          label="Disabled Primary"
          variant="primary"
          disabled={true}
        />,
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(styles.variantPrimary);
    });
  });

  describe("Combined Size and Variant", () => {
    it("works with all combinations", () => {
      const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
      const variants: Array<
        "default" | "primary" | "success" | "warning" | "danger"
      > = ["default", "primary", "success", "warning", "danger"];

      sizes.forEach((size) => {
        variants.forEach((variant) => {
          const { unmount } = render(
            <CheckboxInput
              label={`${size}-${variant}`}
              size={size}
              variant={variant}
            />,
          );
          expect(screen.getByRole("checkbox")).toBeInTheDocument();
          unmount();
        });
      });
    });
  });
});
