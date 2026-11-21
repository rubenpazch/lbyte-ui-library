import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import DateRangePicker from "./DateRangePicker";

expect.extend(toHaveNoViolations);

// Accesibilidad automática (axe): debe pasar sin violaciones.
it("no tiene problemas de accesibilidad (axe)", async () => {
  render(
    <DateRangePicker
      label="Periodo"
      value={{ from: "2026-11-01", to: "2026-11-30" }}
      onChange={() => {}}
      today={new Date(2026, 10, 21)}
    />,
  );
  // "region" es una regla de página completa: no aplica a un componente aislado.
  const resultado = await axe(document.body, {
    rules: { region: { enabled: false } },
  });
  expect(resultado).toHaveNoViolations();
});
