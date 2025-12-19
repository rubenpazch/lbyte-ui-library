import React from "react";
import { render } from "@testing-library/react";

import InputButton from "./InputButton";

describe("InputButton", () => {
  test("renders the Button component", () => {
    render(<InputButton styleColor="primary" />);
  });
});
