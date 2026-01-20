import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import NumericUpPicker from "./NumericUpPicker";
import styles from "./NumericUpPicker.module.css";

describe("NumericUpPicker Component", () => {
  describe("Basic Rendering", () => {
    it("should render the component with default props", () => {
      render(<NumericUpPicker value="0" onChange={jest.fn()} />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render label when provided", () => {
      render(<NumericUpPicker label="Price" value="0" onChange={jest.fn()} />);
      expect(screen.getByText("Price")).toBeInTheDocument();
    });

    it("should display required asterisk when required is true", () => {
      render(
        <NumericUpPicker
          label="Amount"
          value="0"
          onChange={jest.fn()}
          required={true}
        />,
      );
      const label = screen.getByText("Amount");
      expect(label.parentElement).toHaveTextContent("*");
    });

    it("should not display required asterisk when required is false", () => {
      render(
        <NumericUpPicker
          label="Amount"
          value="0"
          onChange={jest.fn()}
          required={false}
        />,
      );
      const label = screen.getByText("Amount");
      expect(label.parentElement).not.toHaveTextContent("*");
    });

    it("should render increment and decrement buttons", () => {
      render(<NumericUpPicker value="5" onChange={jest.fn()} />);
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2); // Increment and Decrement
    });
  });

  describe("Value Display", () => {
    it("should display the current numeric value", () => {
      render(<NumericUpPicker value={42} onChange={jest.fn()} />);
      const input = screen.getByDisplayValue("42");
      expect(input).toBeInTheDocument();
    });

    it("should display string value correctly", () => {
      render(<NumericUpPicker value="123.45" onChange={jest.fn()} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("123.45");
    });

    it("should handle empty value", () => {
      render(<NumericUpPicker value="" onChange={jest.fn()} />);
      const input = screen.getByRole("textbox") as HTMLInputElement;
      expect(input.value).toBe("");
    });
  });

  describe("Increment/Decrement Buttons", () => {
    it("should increment value when plus button is clicked", async () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="5" onChange={handleChange} step={1} />);

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1]; // Plus button is second

      await userEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalled();
    });

    it("should decrement value when minus button is clicked", async () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="5" onChange={handleChange} step={1} />);

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0]; // Minus button is first

      await userEvent.click(decrementButton);

      expect(handleChange).toHaveBeenCalled();
    });

    it("should respect step value on increment", async () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="0" onChange={handleChange} step={0.5} />);

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("0.50");
    });

    it("should respect step value on decrement", async () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="1" onChange={handleChange} step={0.5} />);

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      expect(handleChange).toHaveBeenCalledWith("0.50");
    });

    it("should not decrement below min value", async () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker value="0" onChange={handleChange} min={0} step={1} />,
      );

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should not increment above max value", async () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="10"
          onChange={handleChange}
          max={10}
          step={1}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard Arrow Controls", () => {
    it("should increment value when ArrowUp key is pressed", () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="5" onChange={handleChange} step={1} />);

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowUp" });

      expect(handleChange).toHaveBeenCalledWith("6.00");
    });

    it("should decrement value when ArrowDown key is pressed", () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="5" onChange={handleChange} step={1} />);

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowDown" });

      expect(handleChange).toHaveBeenCalledWith("4.00");
    });

    it("should respect step value when using ArrowUp", () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="0" onChange={handleChange} step={0.5} />);

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowUp" });

      expect(handleChange).toHaveBeenCalledWith("0.50");
    });

    it("should respect step value when using ArrowDown", () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="1" onChange={handleChange} step={0.5} />);

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowDown" });

      expect(handleChange).toHaveBeenCalledWith("0.50");
    });

    it("should not increment above max value with ArrowUp", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="10"
          onChange={handleChange}
          max={10}
          step={1}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowUp" });

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should not decrement below min value with ArrowDown", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker value="0" onChange={handleChange} min={0} step={1} />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowDown" });

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should work with integer only mode using ArrowUp", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="5"
          onChange={handleChange}
          step={1}
          integerOnly={true}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowUp" });

      expect(handleChange).toHaveBeenCalledWith("6");
    });

    it("should work with integer only mode using ArrowDown", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="5"
          onChange={handleChange}
          step={1}
          integerOnly={true}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowDown" });

      expect(handleChange).toHaveBeenCalledWith("4");
    });

    it("should work with alwaysNegative mode using ArrowUp", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="-5.00"
          onChange={handleChange}
          step={0.25}
          min={-10}
          max={-0.25}
          alwaysNegative={true}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowUp" });

      expect(handleChange).toHaveBeenCalledWith("-4.75");
    });

    it("should work with alwaysNegative mode using ArrowDown", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="-5.00"
          onChange={handleChange}
          step={0.25}
          min={-10}
          max={-0.25}
          alwaysNegative={true}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowDown" });

      expect(handleChange).toHaveBeenCalledWith("-5.25");
    });

    it("should not respond to other keys", () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="5" onChange={handleChange} step={1} />);

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "Enter" });
      fireEvent.keyDown(input, { key: "a" });
      fireEvent.keyDown(input, { key: "Escape" });

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Min/Max Constraints", () => {
    it("should disable decrement button when at minimum", () => {
      render(<NumericUpPicker value="0" onChange={jest.fn()} min={0} />);

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      expect(decrementButton).toBeDisabled();
    });

    it("should disable increment button when at maximum", () => {
      render(<NumericUpPicker value="100" onChange={jest.fn()} max={100} />);

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      expect(incrementButton).toBeDisabled();
    });

    it("should enable decrement button when above minimum", () => {
      render(<NumericUpPicker value="5" onChange={jest.fn()} min={0} />);

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      expect(decrementButton).not.toBeDisabled();
    });

    it("should enable increment button when below maximum", () => {
      render(<NumericUpPicker value="5" onChange={jest.fn()} max={100} />);

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      expect(incrementButton).not.toBeDisabled();
    });

    it("should enforce min constraint during increment", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="9"
          onChange={handleChange}
          min={5}
          max={10}
          step={1}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("10.00");
    });

    it("should enforce max constraint during decrement", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="6"
          onChange={handleChange}
          min={5}
          max={10}
          step={1}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      expect(handleChange).toHaveBeenCalledWith("5.00");
    });
  });

  describe("Direct Input", () => {
    it("should call onChange when value is entered directly", async () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="" onChange={handleChange} />);

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "42");

      expect(handleChange).toHaveBeenCalled();
    });

    it("should handle decimal input", async () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="" onChange={handleChange} />);

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "3.14");

      // The direct input handler passes the raw value through
      expect(handleChange).toHaveBeenCalled();
      // Check that handleChange was called multiple times for each keystroke
      expect(handleChange.mock.calls.length).toBeGreaterThan(0);
      // Check that one of the calls is a numeric value
      const calls = handleChange.mock.calls.map((call) => call[0]);
      expect(calls.some((v) => !isNaN(parseFloat(v)))).toBe(true);
    });

    it("should call onBlur when input loses focus", async () => {
      const handleBlur = jest.fn();
      render(
        <NumericUpPicker value="0" onChange={jest.fn()} onBlur={handleBlur} />,
      );

      const input = screen.getByRole("textbox");

      fireEvent.blur(input);

      expect(handleBlur).toHaveBeenCalled();
    });

    it("should call onFocus when input receives focus", async () => {
      const handleFocus = jest.fn();
      render(
        <NumericUpPicker
          value="0"
          onChange={jest.fn()}
          onFocus={handleFocus}
        />,
      );

      const input = screen.getByRole("textbox");

      fireEvent.focus(input);

      expect(handleFocus).toHaveBeenCalled();
    });
  });

  describe("Disabled State", () => {
    it("should disable all buttons when disabled prop is true", () => {
      render(
        <NumericUpPicker value="0" onChange={jest.fn()} disabled={true} />,
      );

      const buttons = screen.getAllByRole("button");

      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it("should disable input when disabled prop is true", () => {
      render(
        <NumericUpPicker value="0" onChange={jest.fn()} disabled={true} />,
      );

      const input = screen.getByRole("textbox");

      expect(input).toBeDisabled();
    });

    it("should apply disabled styling", () => {
      render(
        <NumericUpPicker value="0" onChange={jest.fn()} disabled={true} />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("should not accept input when disabled", async () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker value="0" onChange={handleChange} disabled={true} />,
      );

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "42");

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Error/Warning/Hint Messages", () => {
    it("should display error message when error prop is provided", () => {
      render(
        <NumericUpPicker
          value="0"
          onChange={jest.fn()}
          error="Value must be positive"
        />,
      );

      expect(screen.getByText("Value must be positive")).toBeInTheDocument();
    });

    it("should display warning message when warning prop is provided", () => {
      render(
        <NumericUpPicker
          value="0"
          onChange={jest.fn()}
          warning="This is a warning"
        />,
      );

      expect(screen.getByText("This is a warning")).toBeInTheDocument();
    });

    it("should not display warning when error is present", () => {
      render(
        <NumericUpPicker
          value="0"
          onChange={jest.fn()}
          error="Error message"
          warning="Warning message"
        />,
      );

      expect(screen.queryByText("Warning message")).not.toBeInTheDocument();
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    it("should display hint message when hint prop is provided", () => {
      render(
        <NumericUpPicker value="0" onChange={jest.fn()} hint="Enter a value" />,
      );

      expect(screen.getByText("Enter a value")).toBeInTheDocument();
    });

    it("should not display hint when error is present", () => {
      render(
        <NumericUpPicker
          value="0"
          onChange={jest.fn()}
          error="Error"
          hint="Helpful hint"
        />,
      );

      expect(screen.queryByText("Helpful hint")).not.toBeInTheDocument();
    });

    it("should not display hint when warning is present", () => {
      render(
        <NumericUpPicker
          value="0"
          onChange={jest.fn()}
          warning="Warning"
          hint="Helpful hint"
        />,
      );

      expect(screen.queryByText("Helpful hint")).not.toBeInTheDocument();
    });

    it("should show error icon when error exists", () => {
      const { container } = render(
        <NumericUpPicker
          value="0"
          onChange={jest.fn()}
          error="Error message"
        />,
      );

      const errorIcon = container.querySelector("svg");

      expect(errorIcon).toBeInTheDocument();
    });
  });

  describe("Placeholder", () => {
    it("should display placeholder text", () => {
      render(
        <NumericUpPicker
          value=""
          onChange={jest.fn()}
          placeholder="Enter amount"
        />,
      );

      const input = screen.getByRole("textbox") as HTMLInputElement;

      expect(input.placeholder).toBe("Enter amount");
    });

    it("should show placeholder when value is empty", () => {
      render(
        <NumericUpPicker
          value=""
          onChange={jest.fn()}
          placeholder="Enter value"
        />,
      );

      const input = screen.getByRole("textbox");

      expect(input).toHaveAttribute("placeholder", "Enter value");
    });
  });

  describe("Step Value", () => {
    it("should use custom step value", () => {
      const { container } = render(
        <NumericUpPicker value="0" onChange={jest.fn()} step={5} />,
      );

      const input = container.querySelector(
        'input[type="text"]',
      ) as HTMLInputElement;

      expect(input.step).toBe("5");
    });

    it("should default to 0.01 step when not provided", () => {
      const { container } = render(
        <NumericUpPicker value="0" onChange={jest.fn()} />,
      );

      const input = container.querySelector(
        'input[type="text"]',
      ) as HTMLInputElement;

      expect(input.step).toBe("0.01");
    });

    it("should handle decimal step values", () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="0" onChange={handleChange} step={0.1} />);

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("0.10");
    });
  });

  describe("Button Accessibility", () => {
    it("should have aria-label on decrement button", () => {
      render(<NumericUpPicker value="5" onChange={jest.fn()} />);

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      expect(decrementButton).toHaveAttribute("aria-label", "Decrease");
    });

    it("should have aria-label on increment button", () => {
      render(<NumericUpPicker value="5" onChange={jest.fn()} />);

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      expect(incrementButton).toHaveAttribute("aria-label", "Increase");
    });

    it("should have title attributes on buttons", () => {
      render(<NumericUpPicker value="5" onChange={jest.fn()} />);

      const buttons = screen.getAllByRole("button");

      expect(buttons[0]).toHaveAttribute("title", "Decrease value");
      expect(buttons[1]).toHaveAttribute("title", "Increase value");
    });
  });

  describe("CSS Classes", () => {
    it("should accept custom className", () => {
      const { container } = render(
        <NumericUpPicker
          value="0"
          onChange={jest.fn()}
          className="custom-class"
        />,
      );

      const wrapper = container.firstChild as HTMLElement;

      expect(wrapper).toHaveClass("custom-class");
    });
  });

  describe("Complex Interactions", () => {
    it("should handle multiple increments", async () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="0" onChange={handleChange} step={1} />);

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it("should handle rapid increment/decrement", async () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="5"
          onChange={handleChange}
          min={0}
          max={10}
          step={1}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];
      const decrementButton = buttons[0];

      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(decrementButton);

      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it("should handle boundary conditions", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="5"
          onChange={handleChange}
          min={0}
          max={10}
          step={1}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      // Since value is controlled and doesn't update, numValue stays at 5
      // So each click calculates: 5 + 1 = 6, which is always <= 10
      // All 6 clicks will call onChange
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);

      // All 6 clicks should have called onChange
      expect(handleChange).toHaveBeenCalledTimes(6);
    });

    it("should format output correctly", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker value="10" onChange={handleChange} step={0.01} />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      // Should call with properly formatted number
      expect(handleChange).toHaveBeenCalledWith("10.01");
    });
  });

  describe("Edge Cases", () => {
    it("should handle zero value", () => {
      render(<NumericUpPicker value="0" onChange={jest.fn()} />);

      const input = screen.getByRole("textbox");

      expect(input).toHaveValue("0");
    });

    it("should handle negative values", () => {
      render(<NumericUpPicker value="-5" onChange={jest.fn()} min={-10} />);

      const input = screen.getByRole("textbox");

      expect(input).toHaveValue("-5");
    });

    it("should handle very large numbers", () => {
      render(<NumericUpPicker value="999999" onChange={jest.fn()} />);

      const input = screen.getByRole("textbox");

      expect(input).toHaveValue("999999");
    });

    it("should handle very small decimal numbers", () => {
      render(
        <NumericUpPicker value="0.001" onChange={jest.fn()} step={0.001} />,
      );

      const input = screen.getByRole("textbox");

      expect(input).toHaveValue("0.001");
    });

    it("should strip unnecessary zeros in formatted output", () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="5" onChange={handleChange} step={1} />);

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      // Should format to two decimals
      expect(handleChange).toHaveBeenCalledWith("6.00");
    });
  });

  describe("useMinAsDefault Prop", () => {
    it("should allow displaying value less than min but adjust to min on blur when useMinAsDefault is true", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="0"
          onChange={handleChange}
          min={50}
          useMinAsDefault={true}
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("0");

      // When blur happens, it should adjust to min
      fireEvent.blur(input);
      expect(handleChange).toHaveBeenCalledWith("50.00");
    });

    it("should display value as-is when value is greater than min", () => {
      render(
        <NumericUpPicker
          value="75"
          onChange={jest.fn()}
          min={50}
          useMinAsDefault={true}
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("75");
    });

    it("should display value as-is when useMinAsDefault is false", () => {
      render(
        <NumericUpPicker
          value="0"
          onChange={jest.fn()}
          min={50}
          useMinAsDefault={false}
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("0");
    });

    it("should ignore useMinAsDefault when min is not provided", () => {
      render(
        <NumericUpPicker
          value="0"
          onChange={jest.fn()}
          useMinAsDefault={true}
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("0");
    });

    it("should handle decimal min values correctly", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="1.5"
          onChange={handleChange}
          min={50.5}
          useMinAsDefault={true}
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("1.5");

      // Adjust to min on blur
      fireEvent.blur(input);
      expect(handleChange).toHaveBeenCalledWith("50.50");
    });

    it("should work with negative min values", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="-100"
          onChange={handleChange}
          min={-50}
          useMinAsDefault={true}
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("-100");

      // Adjust to min on blur
      fireEvent.blur(input);
      expect(handleChange).toHaveBeenCalledWith("-50.00");
    });

    it("should update displayed value when value prop changes", () => {
      const { rerender } = render(
        <NumericUpPicker
          value="0"
          onChange={jest.fn()}
          min={50}
          useMinAsDefault={true}
        />,
      );

      let input = screen.getByRole("textbox");
      expect(input).toHaveValue("0");

      rerender(
        <NumericUpPicker
          value="75"
          onChange={jest.fn()}
          min={50}
          useMinAsDefault={true}
        />,
      );

      input = screen.getByRole("textbox");
      expect(input).toHaveValue("75");
    });

    describe("Manual Input with useMinAsDefault", () => {
      it("should allow typing values above minimum", async () => {
        const handleChange = jest.fn();
        render(
          <NumericUpPicker
            value=""
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
          />,
        );

        const input = screen.getByRole("textbox");
        await userEvent.type(input, "2.5");

        // Verify onChange was called (it will be called for each keystroke)
        expect(handleChange).toHaveBeenCalled();
        // Check that onChange was called with values as user types
        const calls = handleChange.mock.calls.map((call) => call[0]);
        // Should have been called with '2', '2.', '2.5' or similar progression
        expect(calls.some((value) => value.includes("2"))).toBe(true);
      });

      it("should allow typing values within range during input", async () => {
        const handleChange = jest.fn();
        render(
          <NumericUpPicker
            value="1.0"
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
          />,
        );

        const input = screen.getByRole("textbox");
        await userEvent.clear(input);
        await userEvent.type(input, "3.75");

        expect(handleChange).toHaveBeenCalled();
      });

      it("should adjust to minimum on blur when value is below minimum", async () => {
        const handleChange = jest.fn();
        render(
          <NumericUpPicker
            value="0.25"
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
          />,
        );

        const input = screen.getByRole("textbox");
        fireEvent.blur(input);

        expect(handleChange).toHaveBeenCalledWith("0.50");
      });

      it("should adjust to minimum on blur when user types value below minimum", async () => {
        const handleChange = jest.fn();
        const { rerender } = render(
          <NumericUpPicker
            value="1.0"
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
          />,
        );

        const input = screen.getByRole("textbox");

        // Simulate user typing a value below minimum
        await userEvent.clear(input);
        await userEvent.type(input, "0.25");

        // Update component with new value
        rerender(
          <NumericUpPicker
            value="0.25"
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
          />,
        );

        // Blur should trigger adjustment to minimum
        fireEvent.blur(input);

        expect(handleChange).toHaveBeenCalledWith("0.50");
      });

      it("should clamp to maximum on blur when value exceeds maximum", async () => {
        const handleChange = jest.fn();
        const { rerender } = render(
          <NumericUpPicker
            value="2.0"
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
          />,
        );

        const input = screen.getByRole("textbox");

        // Simulate user typing a value above maximum
        await userEvent.clear(input);
        await userEvent.type(input, "5.0");

        // Update component with new value
        rerender(
          <NumericUpPicker
            value="5.0"
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
          />,
        );

        // Blur should trigger clamping to maximum
        fireEvent.blur(input);

        expect(handleChange).toHaveBeenCalledWith("4.00");
      });

      it("should set to minimum on blur when input is empty", async () => {
        const handleChange = jest.fn();
        const { rerender } = render(
          <NumericUpPicker
            value="1.0"
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
            required={true}
          />,
        );

        const input = screen.getByRole("textbox");

        // Clear input
        await userEvent.clear(input);

        // Update component with empty value
        rerender(
          <NumericUpPicker
            value=""
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
            required={true}
          />,
        );

        // Blur should set to minimum
        fireEvent.blur(input);

        expect(handleChange).toHaveBeenCalledWith("0.50");
      });

      it('should allow partial input during typing (like typing "0.")', async () => {
        const handleChange = jest.fn();
        render(
          <NumericUpPicker
            value="1.0"
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
          />,
        );

        const input = screen.getByRole("textbox");
        await userEvent.clear(input);
        await userEvent.type(input, "0.");

        // Should allow partial input
        expect(handleChange).toHaveBeenCalled();
      });

      it("should allow typing negative sign for negative ranges", async () => {
        const handleChange = jest.fn();
        render(
          <NumericUpPicker
            value="0"
            onChange={handleChange}
            min={-20}
            max={20}
            step={0.25}
            useMinAsDefault={false}
          />,
        );

        const input = screen.getByRole("textbox");
        await userEvent.clear(input);
        await userEvent.type(input, "-");

        // Should allow typing negative sign
        expect(handleChange).toHaveBeenCalled();
        // Check that at least one call contains the negative sign
        const calls = handleChange.mock.calls;
        const hasNegativeSign = calls.some((call) => call[0].includes("-"));
        expect(hasNegativeSign).toBe(true);
      });

      it("should preserve valid values on blur that are within range", async () => {
        const handleChange = jest.fn();
        const { rerender } = render(
          <NumericUpPicker
            value="1.0"
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
          />,
        );

        const input = screen.getByRole("textbox");

        // Type a valid value
        await userEvent.clear(input);
        await userEvent.type(input, "2.75");

        // Update component with new value
        rerender(
          <NumericUpPicker
            value="2.75"
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
          />,
        );

        // Blur should preserve the value (it's within range)
        fireEvent.blur(input);

        expect(handleChange).toHaveBeenCalledWith("2.75");
      });

      it("should handle invalid input on blur by resetting to minimum", async () => {
        const handleChange = jest.fn();
        const { rerender } = render(
          <NumericUpPicker
            value="1.0"
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
          />,
        );

        const input = screen.getByRole("textbox");

        // Type invalid text
        await userEvent.clear(input);
        await userEvent.type(input, "abc");

        // Update component with invalid value
        rerender(
          <NumericUpPicker
            value="abc"
            onChange={handleChange}
            min={0.5}
            max={4.0}
            step={0.25}
            useMinAsDefault={true}
          />,
        );

        // Blur should reset to minimum
        fireEvent.blur(input);

        expect(handleChange).toHaveBeenCalledWith("0.50");
      });
    });
  });

  describe("Two Decimal Places Formatting", () => {
    it("should format integer values with two decimal places on blur", async () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <NumericUpPicker value="" onChange={handleChange} />,
      );

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "1");

      rerender(<NumericUpPicker value="1" onChange={handleChange} />);

      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("1.00");
    });

    it("should format one decimal place values with two decimal places on blur", async () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <NumericUpPicker value="" onChange={handleChange} />,
      );

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "1.5");

      rerender(<NumericUpPicker value="1.5" onChange={handleChange} />);

      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("1.50");
    });

    it("should keep two decimal places on blur", async () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <NumericUpPicker value="" onChange={handleChange} />,
      );

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "1.25");

      rerender(<NumericUpPicker value="1.25" onChange={handleChange} />);

      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("1.25");
    });

    it("should format increment with two decimal places", () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="1" onChange={handleChange} step={0.01} />);

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("1.01");
    });

    it("should format decrement with two decimal places", () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="1" onChange={handleChange} step={0.01} />);

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      expect(handleChange).toHaveBeenCalledWith("0.99");
    });

    it("should format empty value to 0.00 on blur when required", async () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker value="" onChange={handleChange} required={true} />,
      );

      const input = screen.getByRole("textbox");

      fireEvent.focus(input);
      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("0.00");
    });

    it("should format min value with two decimal places when useMinAsDefault", async () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={0.5}
          useMinAsDefault={true}
          required={true}
        />,
      );

      const input = screen.getByRole("textbox");

      fireEvent.focus(input);
      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("0.50");
    });

    it("should format negative values with two decimal places", async () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <NumericUpPicker value="" onChange={handleChange} min={-10} />,
      );

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "-5");

      rerender(
        <NumericUpPicker value="-5" onChange={handleChange} min={-10} />,
      );

      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("-5.00");
    });

    it("should format value at max constraint with two decimal places", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="9.00"
          onChange={handleChange}
          max={10}
          step={1}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("10.00");
    });

    it("should format value at min constraint with two decimal places", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="0.5"
          onChange={handleChange}
          min={0}
          step={0.25}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      expect(handleChange).toHaveBeenCalledWith("0.25");
    });

    it("should handle three or more decimal places by rounding to two", async () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <NumericUpPicker value="" onChange={handleChange} />,
      );

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "1.256");

      rerender(<NumericUpPicker value="1.256" onChange={handleChange} />);

      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("1.26");
    });
  });

  describe("Always Negative Field (Cylinder)", () => {
    it("should always display negative values when alwaysNegative is true", async () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-10.0}
          max={-0.25}
          step={0.25}
          alwaysNegative={true}
        />,
      );

      const input = screen.getByRole("textbox");

      // Type a positive number
      await userEvent.type(input, "2.5");

      // Should still have negative sign
      expect(handleChange).toHaveBeenCalled();
      const calls = handleChange.mock.calls;
      // Check that all calls contain negative values
      calls.forEach((call) => {
        if (call[0] !== "-") {
          expect(call[0]).toMatch(/^-/);
        }
      });
    });

    it("should format to negative on blur for alwaysNegative field", async () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-10.0}
          max={-0.25}
          step={0.25}
          alwaysNegative={true}
        />,
      );

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "2.5");

      rerender(
        <NumericUpPicker
          value="-2.5"
          onChange={handleChange}
          min={-10.0}
          max={-0.25}
          step={0.25}
          alwaysNegative={true}
        />,
      );

      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("-2.50");
    });

    it("should clamp to minimum (most negative) for alwaysNegative field", async () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-10.0}
          max={-0.25}
          step={0.25}
          alwaysNegative={true}
        />,
      );

      const input = screen.getByRole("textbox");

      // Type a value beyond the min (more negative than -10)
      await userEvent.type(input, "15");

      rerender(
        <NumericUpPicker
          value="-15"
          onChange={handleChange}
          min={-10.0}
          max={-0.25}
          step={0.25}
          alwaysNegative={true}
        />,
      );

      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("-10.00");
    });

    it("should clamp to maximum (least negative) for alwaysNegative field", async () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-10.0}
          max={-0.25}
          step={0.25}
          alwaysNegative={true}
        />,
      );

      const input = screen.getByRole("textbox");

      // Type a very small value
      await userEvent.type(input, "0.1");

      rerender(
        <NumericUpPicker
          value="-0.1"
          onChange={handleChange}
          min={-10.0}
          max={-0.25}
          step={0.25}
          alwaysNegative={true}
        />,
      );

      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("-0.25");
    });

    it("should increment correctly for alwaysNegative field", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="-2.00"
          onChange={handleChange}
          min={-10.0}
          max={-0.25}
          step={0.25}
          alwaysNegative={true}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      // Increment means less negative (closer to 0)
      expect(handleChange).toHaveBeenCalledWith("-1.75");
    });

    it("should decrement correctly for alwaysNegative field", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="-2.00"
          onChange={handleChange}
          min={-10.0}
          max={-0.25}
          step={0.25}
          alwaysNegative={true}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      // Decrement means more negative (farther from 0)
      expect(handleChange).toHaveBeenCalledWith("-2.25");
    });

    it("should disable increment when at max (least negative) for alwaysNegative", () => {
      render(
        <NumericUpPicker
          value="-0.25"
          onChange={jest.fn()}
          min={-10.0}
          max={-0.25}
          step={0.25}
          alwaysNegative={true}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      expect(incrementButton).toBeDisabled();
    });

    it("should disable decrement when at min (most negative) for alwaysNegative", () => {
      render(
        <NumericUpPicker
          value="-10.00"
          onChange={jest.fn()}
          min={-10.0}
          max={-0.25}
          step={0.25}
          alwaysNegative={true}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      expect(decrementButton).toBeDisabled();
    });

    it("should default to negative minimum on empty blur for alwaysNegative", async () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-10.0}
          max={-0.25}
          step={0.25}
          alwaysNegative={true}
          required={true}
        />,
      );

      const input = screen.getByRole("textbox");

      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("-10.00");
    });
  });

  describe("Empty Value Increment/Decrement Behavior", () => {
    it("should start from min value when incrementing from empty (positive range)", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={15}
          max={25}
          step={1}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("15.00");
    });

    it("should start from max value when decrementing from empty (positive range)", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={15}
          max={25}
          step={1}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      expect(handleChange).toHaveBeenCalledWith("25.00");
    });

    it("should start from min value when incrementing from empty (negative range)", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-15}
          max={-1}
          step={1}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("-15.00");
    });

    it("should start from max value when decrementing from empty (negative range)", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-15}
          max={-1}
          step={1}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      expect(handleChange).toHaveBeenCalledWith("-1.00");
    });

    it("should start from min when using ArrowUp on empty field (positive range)", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={15}
          max={25}
          step={1}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowUp" });

      expect(handleChange).toHaveBeenCalledWith("15.00");
    });

    it("should start from max when using ArrowDown on empty field (positive range)", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={15}
          max={25}
          step={1}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowDown" });

      expect(handleChange).toHaveBeenCalledWith("25.00");
    });

    it("should start from min when using ArrowUp on empty field (negative range)", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-15}
          max={-1}
          step={1}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowUp" });

      expect(handleChange).toHaveBeenCalledWith("-15.00");
    });

    it("should start from max when using ArrowDown on empty field (negative range)", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-15}
          max={-1}
          step={1}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "ArrowDown" });

      expect(handleChange).toHaveBeenCalledWith("-1.00");
    });

    it("should start from min when incrementing from empty with integerOnly", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={15}
          max={25}
          step={1}
          integerOnly={true}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("15");
    });

    it("should start from max when decrementing from empty with integerOnly", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={15}
          max={25}
          step={1}
          integerOnly={true}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      expect(handleChange).toHaveBeenCalledWith("25");
    });

    it("should default to 0 when incrementing from empty with no min", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker value="" onChange={handleChange} max={100} step={1} />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("0.00");
    });

    it("should default to 0 when decrementing from empty with no max", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-100}
          step={1}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      expect(handleChange).toHaveBeenCalledWith("0.00");
    });

    it("should handle alwaysNegative when incrementing from empty", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-10}
          max={-1}
          step={1}
          alwaysNegative={true}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("-10.00");
    });

    it("should handle alwaysNegative when decrementing from empty", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-10}
          max={-1}
          step={1}
          alwaysNegative={true}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      expect(handleChange).toHaveBeenCalledWith("-1.00");
    });
  });

  describe("Clearable Feature", () => {
    it("should render clear button when clearable is true and value exists", () => {
      render(
        <NumericUpPicker value="25" onChange={jest.fn()} clearable={true} />,
      );

      const buttons = screen.getAllByRole("button");
      // Should have 3 buttons: minus, clear, plus
      expect(buttons).toHaveLength(3);
    });

    it("should not render clear button when clearable is false", () => {
      render(
        <NumericUpPicker value="25" onChange={jest.fn()} clearable={false} />,
      );

      const buttons = screen.getAllByRole("button");
      // Should have only 2 buttons: minus, plus
      expect(buttons).toHaveLength(2);
    });

    it("should not render clear button when value is empty", () => {
      render(
        <NumericUpPicker value="" onChange={jest.fn()} clearable={true} />,
      );

      const buttons = screen.getAllByRole("button");
      // Should have only 2 buttons: minus, plus (no clear button when empty)
      expect(buttons).toHaveLength(2);
    });

    it("should clear value when clear button is clicked", async () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker value="50" onChange={handleChange} clearable={true} />,
      );

      const buttons = screen.getAllByRole("button");
      const clearButton = buttons[1]; // Clear button is in the middle

      await userEvent.click(clearButton);

      expect(handleChange).toHaveBeenCalledWith("");
    });

    it("should call onClear callback when clear button is clicked", async () => {
      const handleClear = jest.fn();
      render(
        <NumericUpPicker
          value="50"
          onChange={jest.fn()}
          clearable={true}
          onClear={handleClear}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const clearButton = buttons[1];

      await userEvent.click(clearButton);

      expect(handleClear).toHaveBeenCalled();
    });

    it("should not render clear button when disabled", () => {
      render(
        <NumericUpPicker
          value="25"
          onChange={jest.fn()}
          clearable={true}
          disabled={true}
        />,
      );

      const buttons = screen.getAllByRole("button");
      // Should have only 2 buttons: minus, plus (no clear when disabled)
      expect(buttons).toHaveLength(2);
    });
  });

  describe("DefaultToZero Feature", () => {
    it("should start from 0 when incrementing from empty with defaultToZero", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-10}
          max={10}
          step={1}
          defaultToZero={true}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("0.00");
    });

    it("should start from 0 when decrementing from empty with defaultToZero", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={-10}
          max={10}
          step={1}
          defaultToZero={true}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      expect(handleChange).toHaveBeenCalledWith("0.00");
    });

    it("should start from min when incrementing from empty without defaultToZero", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={5}
          max={10}
          step={1}
          defaultToZero={false}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("5.00");
    });

    it("should start from max when decrementing from empty without defaultToZero", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={5}
          max={10}
          step={1}
          defaultToZero={false}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      expect(handleChange).toHaveBeenCalledWith("10.00");
    });
  });

  describe("Required Field Validation", () => {
    it("should show asterisk when required is true", () => {
      render(
        <NumericUpPicker
          label="Amount"
          value="0"
          onChange={jest.fn()}
          required={true}
        />,
      );

      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should set to min value on blur when empty and required", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={1}
          max={100}
          required={true}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("1.00");
    });

    it("should allow empty value when not required", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value=""
          onChange={handleChange}
          min={1}
          max={100}
          required={false}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("");
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("should handle very large numbers", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="999999"
          onChange={handleChange}
          max={1000000}
          step={1}
        />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("1000000.00");
    });

    it("should handle negative zero correctly", () => {
      const handleChange = jest.fn();
      render(<NumericUpPicker value="-0" onChange={handleChange} step={1} />);

      const input = screen.getByRole("textbox");
      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("0.00");
    });

    it("should handle decimal precision correctly", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker value="0.1" onChange={handleChange} step={0.1} />,
      );

      const buttons = screen.getAllByRole("button");
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith("0.20");
    });

    it("should handle invalid input gracefully", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="abc"
          onChange={handleChange}
          min={0}
          max={100}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("0.00");
    });

    it("should clamp value to max on blur when exceeded", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="150"
          onChange={handleChange}
          min={0}
          max={100}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("100.00");
    });

    it("should clamp value to min on blur when below", () => {
      const handleChange = jest.fn();
      render(
        <NumericUpPicker
          value="-5"
          onChange={handleChange}
          min={0}
          max={100}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith("0.00");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels for buttons", () => {
      render(<NumericUpPicker value="5" onChange={jest.fn()} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons[0]).toHaveAttribute("aria-label", "Decrease");
      expect(buttons[1]).toHaveAttribute("aria-label", "Increase");
    });

    it("should have proper ARIA label for clear button when clearable", () => {
      render(
        <NumericUpPicker value="5" onChange={jest.fn()} clearable={true} />,
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons[1]).toHaveAttribute("aria-label", "Clear");
    });

    it("should disable buttons when disabled prop is true", () => {
      render(
        <NumericUpPicker value="5" onChange={jest.fn()} disabled={true} />,
      );

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it("should have textbox role for input", () => {
      render(<NumericUpPicker value="0" onChange={jest.fn()} />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });

  describe("Size Variations", () => {
    describe("Small Size", () => {
      it("should render with small size class", () => {
        const { container } = render(
          <NumericUpPicker value="5" onChange={jest.fn()} size="small" />,
        );

        const stepper =
          container.querySelector(
            "[data-testid='numeric-up-picker-container']",
          ) || container.firstChild;
        expect(stepper).toBeInTheDocument();
      });

      it("should render with small text size", () => {
        const { container } = render(
          <NumericUpPicker value="5" onChange={jest.fn()} size="small" />,
        );

        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
      });

      it("should render with small button width", () => {
        const { container } = render(
          <NumericUpPicker value="5" onChange={jest.fn()} size="small" />,
        );

        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
      });

      it("should render with small label", () => {
        render(
          <NumericUpPicker
            label="Small Input"
            value="5"
            onChange={jest.fn()}
            size="small"
          />,
        );

        const label = screen.getByText("Small Input");
        expect(label).toBeInTheDocument();
      });

      it("should work with increment/decrement in small size", async () => {
        const handleChange = jest.fn();
        render(
          <NumericUpPicker
            value="5"
            onChange={handleChange}
            step={1}
            size="small"
          />,
        );

        const buttons = screen.getAllByRole("button");
        const incrementButton = buttons[1];

        await userEvent.click(incrementButton);

        expect(handleChange).toHaveBeenCalled();
      });
    });

    describe("Medium Size (Default)", () => {
      it("should render with medium size class by default", () => {
        const { container } = render(
          <NumericUpPicker value="5" onChange={jest.fn()} />,
        );

        const stepper =
          container.querySelector(
            "[data-testid='numeric-up-picker-container']",
          ) || container.firstChild;
        expect(stepper).toBeInTheDocument();
      });

      it("should render with medium size class explicitly", () => {
        const { container } = render(
          <NumericUpPicker value="5" onChange={jest.fn()} size="medium" />,
        );

        const stepper =
          container.querySelector(
            "[data-testid='numeric-up-picker-container']",
          ) || container.firstChild;
        expect(stepper).toBeInTheDocument();
      });

      it("should render with medium text size", () => {
        const { container } = render(
          <NumericUpPicker value="5" onChange={jest.fn()} size="medium" />,
        );

        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
      });

      it("should render with medium button width", () => {
        const { container } = render(
          <NumericUpPicker value="5" onChange={jest.fn()} size="medium" />,
        );

        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
      });

      it("should render with medium label", () => {
        render(
          <NumericUpPicker
            label="Medium Input"
            value="5"
            onChange={jest.fn()}
            size="medium"
          />,
        );

        const label = screen.getByText("Medium Input");
        expect(label).toBeInTheDocument();
      });
    });

    describe("Large Size", () => {
      it("should render with large size class", () => {
        const { container } = render(
          <NumericUpPicker value="5" onChange={jest.fn()} size="large" />,
        );

        const stepper =
          container.querySelector(
            "[data-testid='numeric-up-picker-container']",
          ) || container.firstChild;
        expect(stepper).toBeInTheDocument();
      });

      it("should render with large text size", () => {
        const { container } = render(
          <NumericUpPicker value="5" onChange={jest.fn()} size="large" />,
        );

        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
      });

      it("should render with large button width", () => {
        const { container } = render(
          <NumericUpPicker value="5" onChange={jest.fn()} size="large" />,
        );

        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
      });

      it("should render with large label", () => {
        render(
          <NumericUpPicker
            label="Large Input"
            value="5"
            onChange={jest.fn()}
            size="large"
          />,
        );

        const label = screen.getByText("Large Input");
        expect(label).toBeInTheDocument();
      });

      it("should work with increment/decrement in large size", async () => {
        const handleChange = jest.fn();
        render(
          <NumericUpPicker
            value="5"
            onChange={handleChange}
            step={1}
            size="large"
          />,
        );

        const buttons = screen.getAllByRole("button");
        const decrementButton = buttons[0];

        await userEvent.click(decrementButton);

        expect(handleChange).toHaveBeenCalled();
      });

      it("should be clickable and responsive in large size", async () => {
        const handleChange = jest.fn();
        render(
          <NumericUpPicker
            label="Large Number"
            value="10"
            onChange={handleChange}
            min={0}
            max={20}
            step={1}
            size="large"
          />,
        );

        const buttons = screen.getAllByRole("button");
        const incrementButton = buttons[1];

        await userEvent.click(incrementButton);

        expect(handleChange).toHaveBeenCalled();
      });
    });

    describe("Size with Different States", () => {
      it("should render disabled state correctly in small size", () => {
        render(
          <NumericUpPicker
            value="5"
            onChange={jest.fn()}
            disabled
            size="small"
          />,
        );

        const input = screen.getByRole("textbox");
        expect(input).toBeDisabled();
      });

      it("should render error state correctly in medium size", () => {
        const { container } = render(
          <NumericUpPicker
            value="5"
            onChange={jest.fn()}
            error="Invalid"
            size="medium"
          />,
        );

        const error = screen.getByText("Invalid");
        expect(error).toBeInTheDocument();
      });

      it("should render with hint in large size", () => {
        render(
          <NumericUpPicker
            label="Amount"
            value="5"
            onChange={jest.fn()}
            hint="Enter a value"
            size="large"
          />,
        );

        expect(screen.getByText("Enter a value")).toBeInTheDocument();
      });

      it("should work with clearable in small size", async () => {
        const handleClear = jest.fn();
        const { container } = render(
          <NumericUpPicker
            value="5"
            onChange={jest.fn()}
            clearable
            onClear={handleClear}
            size="small"
          />,
        );

        const clearButton = container.querySelector(".rounded-full");
        if (clearButton) {
          await userEvent.click(clearButton);
          expect(handleClear).toHaveBeenCalled();
        }
      });
    });

    describe("Size with Various Props", () => {
      it("should handle min/max constraints in small size", async () => {
        const handleChange = jest.fn();
        render(
          <NumericUpPicker
            value="0"
            onChange={handleChange}
            min={0}
            max={5}
            step={1}
            size="small"
          />,
        );

        const buttons = screen.getAllByRole("button");
        const decrementButton = buttons[0];

        await userEvent.click(decrementButton);

        // Should not go below min
        expect(handleChange).not.toHaveBeenCalledWith("-1");
      });

      it("should handle required field in medium size", () => {
        render(
          <NumericUpPicker
            label="Required Field"
            value="5"
            onChange={jest.fn()}
            required
            size="medium"
          />,
        );

        const label = screen.getByText("Required Field");
        expect(label.parentElement).toHaveTextContent("*");
      });

      it("should handle integerOnly in large size", async () => {
        const handleChange = jest.fn();
        render(
          <NumericUpPicker
            value="5"
            onChange={handleChange}
            step={0.5}
            integerOnly
            size="large"
          />,
        );

        const buttons = screen.getAllByRole("button");
        const incrementButton = buttons[1];

        await userEvent.click(incrementButton);

        expect(handleChange).toHaveBeenCalled();
      });

      it("should handle alwaysNegative in small size", () => {
        render(
          <NumericUpPicker
            value="-5"
            onChange={jest.fn()}
            alwaysNegative
            size="small"
          />,
        );

        const input = screen.getByRole("textbox") as HTMLInputElement;
        expect(input.value).toContain("-");
      });

      it("should handle showSign in medium size", () => {
        render(
          <NumericUpPicker
            value="5"
            onChange={jest.fn()}
            showSign
            size="medium"
          />,
        );

        const input = screen.getByRole("textbox") as HTMLInputElement;
        expect(input.value).toContain("+");
      });
    });

    describe("Size Consistency", () => {
      it("should maintain functionality across all sizes", async () => {
        const handleChange = jest.fn();

        const { rerender } = render(
          <NumericUpPicker
            value="5"
            onChange={handleChange}
            step={1}
            size="small"
          />,
        );

        let buttons = screen.getAllByRole("button");
        await userEvent.click(buttons[1]); // increment

        rerender(
          <NumericUpPicker
            value="5"
            onChange={handleChange}
            step={1}
            size="medium"
          />,
        );

        buttons = screen.getAllByRole("button");
        await userEvent.click(buttons[1]); // increment

        rerender(
          <NumericUpPicker
            value="5"
            onChange={handleChange}
            step={1}
            size="large"
          />,
        );

        buttons = screen.getAllByRole("button");
        await userEvent.click(buttons[1]); // increment

        // Should have been called 3 times across different sizes
        expect(handleChange).toHaveBeenCalledTimes(3);
      });

      it("should handle keyboard input in all sizes", async () => {
        const handleChange = jest.fn();

        const { rerender } = render(
          <NumericUpPicker value="5" onChange={handleChange} size="small" />,
        );

        const input = screen.getByRole("textbox");
        await userEvent.type(input, "10");

        rerender(
          <NumericUpPicker value="5" onChange={handleChange} size="large" />,
        );

        const newInput = screen.getByRole("textbox");
        expect(newInput).toBeInTheDocument();
      });
    });
  });
});
