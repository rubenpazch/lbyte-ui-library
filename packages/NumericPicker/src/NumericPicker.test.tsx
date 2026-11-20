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

describe("NumericPicker: escritura, límites y accesibilidad", () => {
  it("permite escribir números de varios dígitos (no reformatea al escribir)", () => {
    const handleChange = jest.fn();
    render(<NumericPicker value="" onChange={handleChange} />);
    const input = screen.getByTestId("numeric-input");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.change(input, { target: { value: "12" } });
    fireEvent.change(input, { target: { value: "125.5" } });
    expect(input).toHaveValue("125.5");
    expect(handleChange).toHaveBeenLastCalledWith("125.5");
  });

  it("acepta coma decimal", () => {
    const handleChange = jest.fn();
    render(<NumericPicker value="" onChange={handleChange} />);
    fireEvent.change(screen.getByTestId("numeric-input"), {
      target: { value: "8,9" },
    });
    expect(handleChange).toHaveBeenLastCalledWith("8.9");
  });

  it("al salir del campo aplica decimales, mínimo y máximo", () => {
    const handleChange = jest.fn();
    render(
      <NumericPicker value="" onChange={handleChange} min={10} max={100} />,
    );
    const input = screen.getByTestId("numeric-input");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "500" } });
    fireEvent.blur(input);
    expect(input).toHaveValue("100.00");
    expect(handleChange).toHaveBeenLastCalledWith("100.00");
  });

  it("asocia etiqueta, ayuda y error", () => {
    render(
      <NumericPicker
        label="Monto"
        value=""
        onChange={jest.fn()}
        error="Requerido"
      />,
    );
    const input = screen.getByLabelText("Monto");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Requerido");
  });

  it("botones con nombre accesible en español y flechas del teclado", () => {
    const handleChange = jest.fn();
    render(
      <NumericPicker
        label="Cantidad"
        value="5"
        onChange={handleChange}
        step={1}
        decimals={0}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Aumentar" }),
    ).toBeInTheDocument();
    fireEvent.keyDown(screen.getByLabelText("Cantidad"), { key: "ArrowUp" });
    expect(handleChange).toHaveBeenLastCalledWith("6");
  });
});
