import React from "react";
import { render, screen } from "@testing-library/react";

import Link from "./Link";

describe("Link", () => {
  test("renders the Link component", () => {
    render(<Link styleColor="primary" href="#" />);
    expect(screen.getByRole("link")).toBeTruthy();
  });
});
