import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import IdentificationInput from "./IdentificationInput";
import styles from "./IdentificationInput.module.css";

jest.mock("@rubenpazch/autocomplete", () => ({
  __esModule: true,
  default: (props: any) => (
    <div
      data-testid="autocomplete"
      data-required={props.required ? "true" : "false"}
      data-disabled={props.disabled ? "true" : "false"}
    >
      <span>{props.label}</span>
      <span>{props.placeholder}</span>
      <button type="button" onClick={() => props.onChange("dni")}>
        select-dni
      </button>
    </div>
  ),
}));

jest.mock("@rubenpazch/text-input", () => ({
  __esModule: true,
  default: (props: any) => (
    <div
      data-testid="text-input"
      data-required={props.required ? "true" : "false"}
      data-disabled={props.disabled ? "true" : "false"}
    >
      <span>{props.label}</span>
      <span>{props.placeholder}</span>
      <button type="button" onClick={() => props.onChange("12a34")}>
        change-value
      </button>
    </div>
  ),
}));

const noop = () => {};

const labels = {
  documentType: "Document type",
  selectDocumentType: "Select document type",
  documentTypeHint: "Choose the document to validate",
  identificationNumber: "Document number",
};

test("renders IdentificationInput with document type selection", () => {
  render(
    <IdentificationInput
      documentType={null}
      onDocumentTypeChange={noop}
      identificationNumber=""
      onIdentificationNumberChange={noop}
      labels={labels}
    />,
  );

  const element = screen.getByTestId("identification-input");
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass(styles.container);
  expect(screen.getByText("Document type")).toBeInTheDocument();
  expect(screen.getByText("Select document type")).toBeInTheDocument();
});

test("renders identification number when document type selected", () => {
  render(
    <IdentificationInput
      documentType="dni"
      onDocumentTypeChange={noop}
      identificationNumber=""
      onIdentificationNumberChange={noop}
      labels={labels}
    />,
  );

  expect(screen.getByText("Document number - DNI")).toBeInTheDocument();
  expect(screen.getByText("12345678")).toBeInTheDocument();
});

test("calls handlers when document type changes", () => {
  const onDocumentTypeChange = jest.fn();
  const onIdentificationNumberChange = jest.fn();

  render(
    <IdentificationInput
      documentType={null}
      onDocumentTypeChange={onDocumentTypeChange}
      identificationNumber=""
      onIdentificationNumberChange={onIdentificationNumberChange}
      labels={labels}
    />,
  );

  fireEvent.click(screen.getByText("select-dni"));

  expect(onDocumentTypeChange).toHaveBeenCalledWith("dni");
  expect(onIdentificationNumberChange).toHaveBeenCalledWith("");
});

test("formats identification number based on document type", () => {
  const onIdentificationNumberChange = jest.fn();

  render(
    <IdentificationInput
      documentType="dni"
      onDocumentTypeChange={noop}
      identificationNumber=""
      onIdentificationNumberChange={onIdentificationNumberChange}
      labels={labels}
    />,
  );

  fireEvent.click(screen.getByText("change-value"));

  expect(onIdentificationNumberChange).toHaveBeenCalledWith("1234");
});

test("passes required and disabled props to inputs", () => {
  render(
    <IdentificationInput
      documentType="dni"
      onDocumentTypeChange={noop}
      identificationNumber=""
      onIdentificationNumberChange={noop}
      labels={labels}
      required
      disabled
    />,
  );

  expect(screen.getByTestId("autocomplete")).toHaveAttribute(
    "data-required",
    "true",
  );
  expect(screen.getByTestId("autocomplete")).toHaveAttribute(
    "data-disabled",
    "true",
  );
  expect(screen.getByTestId("text-input")).toHaveAttribute(
    "data-required",
    "true",
  );
  expect(screen.getByTestId("text-input")).toHaveAttribute(
    "data-disabled",
    "true",
  );
});
