import React from "react";
import { render, screen } from "@testing-library/react";

import IconButton from "./IconButton";

describe("IconButton", () => {
  test("renders the IconButton component", () => {
    render(<IconButton color="primary" />);
    expect(screen.getByRole("button")).toBeTruthy();
  });
});
