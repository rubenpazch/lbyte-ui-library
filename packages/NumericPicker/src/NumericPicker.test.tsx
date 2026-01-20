import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NumericPicker from "./NumericPicker";

describe("NumericPicker Component", () => {
  it("renders correctly with default props", () => {
    render(<NumericPicker value="0" onChange={jest.fn()} />);
    const input = screen.getByTestId("numeric-input");
    expect(input).toBeInTheDocument();
  });

  it("displays the label when provided", () => {
    render(<NumericPicker label="Price" value="0" onChange={jest.fn()} />);
    expect(screen.getByText("Price")).toBeInTheDocument();
  });

  it("shows required asterisk when required is true", () => {
    render(
      <NumericPicker
        label="Amount"
        value="0"
        onChange={jest.fn()}
        required={true}
      />,
    );
    const required = screen.getByText("*");
    expect(required).toBeInTheDocument();
  });

  it("displays currency symbol", () => {
    render(<NumericPicker value="0" onChange={jest.fn()} currency="$" />);
    expect(screen.getByTestId("currency-symbol")).toHaveTextContent("$");
  });

  it("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(<NumericPicker value="0" onChange={handleChange} />);
    const input = screen.getByTestId("numeric-input");
    fireEvent.change(input, { target: { value: "100" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("increments value when increment button is clicked", () => {
    const handleChange = jest.fn();
    render(<NumericPicker value="0" onChange={handleChange} step={1} />);
    const incrementButton = screen.getByTestId("increment-button");
    fireEvent.click(incrementButton);
    expect(handleChange).toHaveBeenCalled();
  });

  it("decrements value when decrement button is clicked", () => {
    const handleChange = jest.fn();
    render(<NumericPicker value="10" onChange={handleChange} step={1} />);
    const decrementButton = screen.getByTestId("decrement-button");
    fireEvent.click(decrementButton);
    expect(handleChange).toHaveBeenCalled();
  });

  it("disables buttons when disabled prop is true", () => {
    render(<NumericPicker value="5" onChange={jest.fn()} disabled={true} />);
    const incrementButton = screen.getByTestId("increment-button");
    const decrementButton = screen.getByTestId("decrement-button");
    expect(incrementButton).toBeDisabled();
    expect(decrementButton).toBeDisabled();
  });
});
