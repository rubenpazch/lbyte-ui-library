import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Turnstile from "./Turnstile";

expect.extend(toHaveNoViolations);

// Accesibilidad automática (axe): debe pasar sin violaciones.
it("no tiene problemas de accesibilidad (axe)", async () => {
  window.turnstile = { render: () => "w", reset: () => {}, remove: () => {} };
  render(<Turnstile siteKey="k" onToken={() => {}} />);
  // "region" es una regla de página completa: no aplica a un componente aislado.
  const resultado = await axe(document.body, {
    rules: { region: { enabled: false } },
  });
  expect(resultado).toHaveNoViolations();
  delete window.turnstile;
});
