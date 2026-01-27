/// <reference path="../../../css-module.d.ts" />

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chip from "./Chip";
import styles from "./Chip.module.css";

describe("Chip", () => {
  it("renders the label content", () => {
    render(<Chip label="Active" data-testid="chip" />);
    expect(screen.getByTestId("chip")).toHaveTextContent("Active");
  });

  it("applies size, variant, and color classes", () => {
    render(
      <Chip
        label="Primary"
        variant="outlined"
        color="primary"
        size="sm"
        data-testid="chip"
      />,
    );

    const chip = screen.getByTestId("chip");
    expect(chip).toHaveClass(styles.sizeSm);
    expect(chip).toHaveClass(styles.variantOutlined);
    expect(chip).toHaveClass(styles.colorPrimary);
  });

  it("fires onClick when clickable", () => {
    const handleClick = jest.fn();
    render(
      <Chip
        label="Clickable"
        clickable
        onClick={handleClick}
        data-testid="chip"
      />,
    );

    fireEvent.click(screen.getByTestId("chip"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Chip
        label="Disabled"
        clickable
        disabled
        onClick={handleClick}
        data-testid="chip"
      />,
    );

    fireEvent.click(screen.getByTestId("chip"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("calls onDelete without triggering parent click", () => {
    const handleClick = jest.fn();
    const handleDelete = jest.fn();
    render(
      <Chip
        label="Deletable"
        clickable
        onClick={handleClick}
        onDelete={handleDelete}
        data-testid="chip"
      />,
    );

    fireEvent.click(screen.getByTestId("chip-delete"));
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
