import React from "react";
import { render, screen } from "@testing-library/react";

import DrawerMenuMobile from "./DrawerMenuMobile";

describe("DrawerMenuMobile", () => {
  test("renders the DrawerMenuMobile component", () => {
    render(<DrawerMenuMobile />);
    expect(screen.getByRole("button")).toBeTruthy();
  });
});
