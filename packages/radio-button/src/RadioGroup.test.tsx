import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioGroup from "./RadioGroup";

const mockOptions = [
  { label: "Option 1", value: "option1", description: "First option" },
  { label: "Option 2", value: "option2", description: "Second option" },
  { label: "Option 3", value: "option3", description: "Third option" },
];

describe("RadioGroup Component", () => {
  describe("Rendering", () => {
    it("should render all radio options", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
        />,
      );

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });

    it("should render with group label", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          groupLabel="Choose an option:"
        />,
      );

      expect(screen.getByText("Choose an option:")).toBeInTheDocument();
    });

    it("should render all option descriptions", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
        />,
      );

      expect(screen.getByText("First option")).toBeInTheDocument();
      expect(screen.getByText("Second option")).toBeInTheDocument();
      expect(screen.getByText("Third option")).toBeInTheDocument();
    });

    it("should render error message when provided", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          error="Please select an option"
        />,
      );

      expect(screen.getByText("Please select an option")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const handleChange = jest.fn();
      const { container } = render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          className="custom-class"
        />,
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should render radiogroup role", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
        />,
      );

      const radioGroup = screen.getByRole("radiogroup");
      expect(radioGroup).toBeInTheDocument();
    });
  });

  describe("Orientation", () => {
    it("should apply vertical orientation classes by default", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
        />,
      );

      const radioGroup = screen.getByRole("radiogroup");
      expect(radioGroup).toHaveClass("flex", "flex-col", "space-y-3");
    });

    it("should apply horizontal orientation classes when specified", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          orientation="horizontal"
        />,
      );

      const radioGroup = screen.getByRole("radiogroup");
      expect(radioGroup).toHaveClass("flex", "flex-row", "flex-wrap", "gap-4");
    });
  });

  describe("Selected State", () => {
    it("should mark the correct option as checked", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          value="option2"
        />,
      );

      const radios = screen.getAllByRole("radio") as HTMLInputElement[];
      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(true);
      expect(radios[2].checked).toBe(false);
    });

    it("should show selected label when showSelectedLabel is true", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          value="option1"
          showSelectedLabel={true}
        />,
      );

      const selectedLabel = screen.getByText((content, element) => {
        return element?.textContent === "Selected: Option 1";
      });
      expect(selectedLabel).toBeInTheDocument();
    });

    it("should use custom selected label text", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          value="option2"
          showSelectedLabel={true}
          selectedLabelText="Current selection:"
        />,
      );

      expect(screen.getByText("Current selection:")).toBeInTheDocument();
    });

    it("should show value when no option matches", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          value="unknown"
          showSelectedLabel={true}
        />,
      );

      expect(screen.getByText("unknown")).toBeInTheDocument();
    });

    it("should show 'None' when no value is selected", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          showSelectedLabel={true}
        />,
      );

      expect(screen.getByText("None")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("should call onChange when an option is clicked", async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
        />,
      );

      const option2 = screen.getByLabelText("Option 2");
      await user.click(option2);

      expect(handleChange).toHaveBeenCalledWith("option2");
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("should call onChange with correct value when different options are clicked", async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
        />,
      );

      const option1 = screen.getByLabelText("Option 1");
      const option3 = screen.getByLabelText("Option 3");

      await user.click(option1);
      expect(handleChange).toHaveBeenCalledWith("option1");

      await user.click(option3);
      expect(handleChange).toHaveBeenCalledWith("option3");
    });

    it("should not call onChange when a disabled option is clicked", async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      const disabledOptions = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2", disabled: true },
        { label: "Option 3", value: "option3" },
      ];

      render(
        <RadioGroup
          name="test-group"
          options={disabledOptions}
          onChange={handleChange}
        />,
      );

      const option2 = screen.getByLabelText("Option 2");
      await user.click(option2);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should not call onChange when group is disabled", async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          disabled={true}
        />,
      );

      const option1 = screen.getByLabelText("Option 1");
      await user.click(option1);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Disabled State", () => {
    it("should disable all options when disabled prop is true", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          disabled={true}
        />,
      );

      const radios = screen.getAllByRole("radio");
      radios.forEach((radio) => {
        expect(radio).toBeDisabled();
      });
    });

    it("should disable individual options", () => {
      const handleChange = jest.fn();
      const mixedOptions = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2", disabled: true },
        { label: "Option 3", value: "option3" },
      ];

      render(
        <RadioGroup
          name="test-group"
          options={mixedOptions}
          onChange={handleChange}
        />,
      );

      const radios = screen.getAllByRole("radio");
      expect(radios[0]).not.toBeDisabled();
      expect(radios[1]).toBeDisabled();
      expect(radios[2]).not.toBeDisabled();
    });
  });

  describe("Variants and Sizes", () => {
    it("should pass variant to all radio buttons", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          variant="primary"
        />,
      );

      const radios = screen.getAllByRole("radio");
      radios.forEach((radio) => {
        expect(radio).toHaveClass("text-indigo-600", "focus:ring-indigo-500");
      });
    });

    it("should pass size to all radio buttons", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          size="lg"
        />,
      );

      const radios = screen.getAllByRole("radio");
      radios.forEach((radio) => {
        expect(radio).toHaveClass("w-5", "h-5");
      });
    });
  });

  describe("Required State", () => {
    it("should mark all options as required when required is true", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          required={true}
        />,
      );

      const radios = screen.getAllByRole("radio");
      radios.forEach((radio) => {
        expect(radio).toBeRequired();
      });
    });

    it("should show red groupLabel when required and no value selected", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          required={true}
          groupLabel="Select an option"
        />,
      );

      const groupLabel = screen.getByText("Select an option");
      expect(groupLabel).toHaveClass("text-red-600");
    });

    it("should show normal groupLabel when required and value is selected", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          required={true}
          value="option1"
          groupLabel="Select an option"
        />,
      );

      const groupLabel = screen.getByText("Select an option");
      expect(groupLabel).toHaveClass("text-gray-900");
    });

    it("should show red border on fieldset when bordered, required, and no value", () => {
      const handleChange = jest.fn();
      const { container } = render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          required={true}
          bordered={true}
        />,
      );

      const fieldset = container.querySelector("fieldset");
      expect(fieldset).toHaveClass("border-2", "border-red-500");
    });

    it("should show normal border on fieldset when bordered, required, and value selected", () => {
      const handleChange = jest.fn();
      const { container } = render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          required={true}
          value="option1"
          bordered={true}
        />,
      );

      const fieldset = container.querySelector("fieldset");
      expect(fieldset).toHaveClass("border", "border-gray-300");
    });

    it("should show red borderLabel when bordered, required, and no value", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          required={true}
          bordered={true}
          borderLabel="Choose option"
        />,
      );

      const legend = screen.getByText("Choose option");
      expect(legend).toHaveClass("text-red-600");
    });

    it("should show normal borderLabel when bordered, required, and value selected", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          required={true}
          value="option2"
          bordered={true}
          borderLabel="Choose option"
        />,
      );

      const legend = screen.getByText("Choose option");
      expect(legend).toHaveClass("text-gray-700");
    });
  });

  describe("Name Attribute", () => {
    it("should apply the same name to all radio buttons", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="payment-method"
          options={mockOptions}
          onChange={handleChange}
        />,
      );

      const radios = screen.getAllByRole("radio");
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute("name", "payment-method");
      });
    });
  });

  describe("Bordered Wrapper", () => {
    it("should render fieldset when bordered is true", () => {
      const handleChange = jest.fn();
      const { container } = render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          bordered={true}
        />,
      );

      const fieldset = container.querySelector("fieldset");
      expect(fieldset).toBeInTheDocument();
      expect(fieldset).toHaveClass("rounded-lg", "p-4");
    });

    it("should not render fieldset when bordered is false", () => {
      const handleChange = jest.fn();
      const { container } = render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          bordered={false}
        />,
      );

      const fieldset = container.querySelector("fieldset");
      expect(fieldset).not.toBeInTheDocument();
    });

    it("should render border label as legend when provided", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          bordered={true}
          borderLabel="Select an option"
        />,
      );

      const legend = screen.getByText("Select an option");
      expect(legend).toBeInTheDocument();
      expect(legend.tagName).toBe("LEGEND");
    });

    it("should not render legend when borderLabel is not provided", () => {
      const handleChange = jest.fn();
      const { container } = render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          bordered={true}
        />,
      );

      const legend = container.querySelector("legend");
      expect(legend).not.toBeInTheDocument();
    });

    it("should render both groupLabel and borderLabel when both provided", () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup
          name="test-group"
          options={mockOptions}
          onChange={handleChange}
          bordered={true}
          borderLabel="Border Label"
          groupLabel="Group Label"
        />,
      );

      expect(screen.getByText("Border Label")).toBeInTheDocument();
      expect(screen.getByText("Group Label")).toBeInTheDocument();
    });
  });
});
