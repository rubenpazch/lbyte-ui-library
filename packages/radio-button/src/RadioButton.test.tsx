import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioButton from "./RadioButton";

describe("RadioButton Component", () => {
  describe("Rendering", () => {
    it("should render with label", () => {
      render(
        <RadioButton
          name="test"
          label="Test Radio"
          value="test"
          onChange={jest.fn()}
        />,
      );

      expect(screen.getByText("Test Radio")).toBeInTheDocument();
      expect(screen.getByRole("radio")).toBeInTheDocument();
    });

    it("should render with custom id", () => {
      render(
        <RadioButton
          id="custom-id"
          name="test"
          label="Test Radio"
          value="test"
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveAttribute("id", "custom-id");
    });

    it("should generate id from name and value when not provided", () => {
      render(
        <RadioButton
          name="color"
          label="Blue"
          value="blue"
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveAttribute("id", "radio-color-blue");
    });

    it("should render description when provided", () => {
      render(
        <RadioButton
          name="test"
          label="Test Radio"
          value="test"
          description="This is a description"
          onChange={jest.fn()}
        />,
      );

      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });

    it("should render error message when provided", () => {
      render(
        <RadioButton
          name="test"
          label="Test Radio"
          value="test"
          error="This field is required"
          onChange={jest.fn()}
        />,
      );

      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("should apply required attribute when required is true", () => {
      render(
        <RadioButton
          name="test"
          label="Required Radio"
          value="test"
          required={true}
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toBeRequired();
    });

    it("should show red border and label when required and unchecked", () => {
      render(
        <RadioButton
          name="test"
          label="Required Radio"
          value="test"
          required={true}
          checked={false}
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      const label = screen.getByText("Required Radio");

      expect(radio).toHaveClass("border-red-500");
      expect(label).toHaveClass("text-red-600");
    });

    it("should not show red border and label when required and checked", () => {
      render(
        <RadioButton
          name="test"
          label="Required Radio"
          value="test"
          required={true}
          checked={true}
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      const label = screen.getByText("Required Radio");

      expect(radio).toHaveClass("border-gray-300");
      expect(label).toHaveClass("text-gray-700");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <RadioButton
          name="test"
          label="Test Radio"
          value="test"
          className="custom-class"
          onChange={jest.fn()}
        />,
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("States", () => {
    it("should render as checked when checked prop is true", () => {
      render(
        <RadioButton
          name="test"
          label="Test Radio"
          value="test"
          checked={true}
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio") as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });

    it("should render as unchecked when checked prop is false", () => {
      render(
        <RadioButton
          name="test"
          label="Test Radio"
          value="test"
          checked={false}
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio") as HTMLInputElement;
      expect(radio.checked).toBe(false);
    });

    it("should render as disabled when disabled prop is true", () => {
      render(
        <RadioButton
          name="test"
          label="Test Radio"
          value="test"
          disabled={true}
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toBeDisabled();
    });

    it("should have required attribute when required is true", () => {
      render(
        <RadioButton
          name="test"
          label="Test Radio"
          value="test"
          required={true}
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toBeRequired();
    });

    it("should have aria-invalid when error is provided", () => {
      render(
        <RadioButton
          name="test"
          label="Test Radio"
          value="test"
          error="Error message"
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveAttribute("aria-invalid", "true");
    });

    it("should have aria-describedby when description is provided", () => {
      render(
        <RadioButton
          id="test-radio"
          name="test"
          label="Test Radio"
          value="test"
          description="Description text"
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveAttribute(
        "aria-describedby",
        "test-radio-description",
      );
    });
  });

  describe("Interactions", () => {
    it("should call onChange with value when clicked", async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(
        <RadioButton
          name="test"
          label="Test Radio"
          value="test-value"
          onChange={handleChange}
        />,
      );

      const radio = screen.getByRole("radio");
      await user.click(radio);

      expect(handleChange).toHaveBeenCalledWith("test-value");
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("should call onChange when label is clicked", async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(
        <RadioButton
          name="test"
          label="Test Radio"
          value="test-value"
          onChange={handleChange}
        />,
      );

      const label = screen.getByText("Test Radio");
      await user.click(label);

      expect(handleChange).toHaveBeenCalledWith("test-value");
    });

    it("should not call onChange when disabled", async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(
        <RadioButton
          name="test"
          label="Test Radio"
          value="test-value"
          disabled={true}
          onChange={handleChange}
        />,
      );

      const radio = screen.getByRole("radio");
      await user.click(radio);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should handle onChange event correctly with fireEvent", () => {
      const handleChange = jest.fn();

      render(
        <RadioButton
          name="test"
          label="Test Radio"
          value="test-value"
          onChange={handleChange}
        />,
      );

      const radio = screen.getByRole("radio");
      fireEvent.click(radio);

      expect(handleChange).toHaveBeenCalledWith("test-value");
    });
  });

  describe("Sizes", () => {
    it("should apply small size classes", () => {
      render(
        <RadioButton
          name="test"
          label="Small Radio"
          value="test"
          size="sm"
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveClass("w-3", "h-3");
    });

    it("should apply medium size classes by default", () => {
      render(
        <RadioButton
          name="test"
          label="Medium Radio"
          value="test"
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveClass("w-4", "h-4");
    });

    it("should apply large size classes", () => {
      render(
        <RadioButton
          name="test"
          label="Large Radio"
          value="test"
          size="lg"
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveClass("w-5", "h-5");
    });
  });

  describe("Variants", () => {
    it("should apply default variant classes", () => {
      render(
        <RadioButton
          name="test"
          label="Default Radio"
          value="test"
          variant="default"
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveClass("text-blue-600", "focus:ring-blue-500");
    });

    it("should apply primary variant classes", () => {
      render(
        <RadioButton
          name="test"
          label="Primary Radio"
          value="test"
          variant="primary"
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveClass("text-indigo-600", "focus:ring-indigo-500");
    });

    it("should apply success variant classes", () => {
      render(
        <RadioButton
          name="test"
          label="Success Radio"
          value="test"
          variant="success"
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveClass("text-green-600", "focus:ring-green-500");
    });

    it("should apply warning variant classes", () => {
      render(
        <RadioButton
          name="test"
          label="Warning Radio"
          value="test"
          variant="warning"
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveClass("text-yellow-600", "focus:ring-yellow-500");
    });

    it("should apply danger variant classes", () => {
      render(
        <RadioButton
          name="test"
          label="Danger Radio"
          value="test"
          variant="danger"
          onChange={jest.fn()}
        />,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveClass("text-red-600", "focus:ring-red-500");
    });
  });

  describe("Name attribute", () => {
    it("should group radio buttons with the same name", () => {
      const handleChange = jest.fn();

      render(
        <>
          <RadioButton
            name="group"
            label="Option 1"
            value="option1"
            onChange={handleChange}
          />
          <RadioButton
            name="group"
            label="Option 2"
            value="option2"
            onChange={handleChange}
          />
          <RadioButton
            name="group"
            label="Option 3"
            value="option3"
            onChange={handleChange}
          />
        </>,
      );

      const radios = screen.getAllByRole("radio") as HTMLInputElement[];
      expect(radios).toHaveLength(3);
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute("name", "group");
      });
    });
  });
});
