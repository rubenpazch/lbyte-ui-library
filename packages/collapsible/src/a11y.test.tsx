import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Collapsible from "./Collapsible";

expect.extend(toHaveNoViolations);

it("no tiene problemas de accesibilidad (axe)", async () => {
  render(
    <Collapsible title="Más opciones" defaultOpen>
      <p>Contenido</p>
    </Collapsible>,
  );
  const resultado = await axe(document.body, {
    rules: { region: { enabled: false } },
  });
  expect(resultado).toHaveNoViolations();
});
