import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Select, { type SelectOption } from "./Select";

const options: SelectOption[] = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

describe("Select", () => {
  test("renders the label and every option", () => {
    render(
      <Select
        label="Role"
        value=""
        onChange={() => {}}
        options={options}
        placeholder="Choose a role"
      />,
    );

    expect(screen.getByLabelText("Role")).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Choose a role" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Admin" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Editor" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Viewer" })).toBeInTheDocument();
  });

  test("calls onChange with the selected value", () => {
    const onChange = jest.fn();
    render(
      <Select label="Role" value="" onChange={onChange} options={options} />,
    );

    fireEvent.change(screen.getByLabelText("Role"), {
      target: { value: "editor" },
    });

    expect(onChange).toHaveBeenCalledWith("editor");
  });

  test("reflects the controlled value", () => {
    render(
      <Select
        label="Role"
        value="viewer"
        onChange={() => {}}
        options={options}
      />,
    );

    expect(screen.getByLabelText<HTMLSelectElement>("Role").value).toBe(
      "viewer",
    );
  });

  test("shows an error message and marks the field invalid", () => {
    render(
      <Select
        label="Role"
        value=""
        onChange={() => {}}
        options={options}
        error="Role is required"
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Role is required");
    expect(screen.getByLabelText("Role")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  test("can be disabled", () => {
    render(
      <Select
        label="Role"
        value=""
        onChange={() => {}}
        options={options}
        disabled
      />,
    );

    expect(screen.getByLabelText("Role")).toBeDisabled();
  });
});
