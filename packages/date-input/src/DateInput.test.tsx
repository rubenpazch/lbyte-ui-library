import React from "react";
import { render, screen } from "@testing-library/react";
import DateInput from "./DateInput";

describe("DateInput", () => {
  it("renders label and input", () => {
    render(<DateInput label="Date" value="" onChange={() => {}} />);
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(<DateInput label="Date" value="" onChange={() => {}} required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("shows error message when error prop is set", () => {
    render(
      <DateInput
        label="Date"
        value=""
        onChange={() => {}}
        error="Fecha inválida"
      />,
    );
    expect(screen.getByText("Fecha inválida")).toBeInTheDocument();
  });

  it("disables input when disabled", () => {
    render(<DateInput label="Date" value="" onChange={() => {}} disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
