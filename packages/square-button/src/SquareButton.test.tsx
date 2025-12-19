import React from "react";
import { render, screen } from "@testing-library/react";

import SquareButton from "./SquareButton";

describe("SquareButton", () => {
  test("renders the SquareButton component", () => {
    render(<SquareButton color="primary" />);
    expect(screen.getByRole("button")).toBeTruthy();
  });
});
