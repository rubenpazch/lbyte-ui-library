import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
import Timeline from "./Timeline";

// Accesibilidad automática (axe): debe pasar sin violaciones.
it("no tiene problemas de accesibilidad (axe)", async () => {
  render(
    <Timeline
      aria-label="Historial"
      highlightLast
      items={[
        { title: "Registrado", date: "20/11/2026", status: "info" },
        { title: "Derivado", description: "A Logística", status: "primary" },
      ]}
    />,
  );
  // "region" es una regla de página completa: no aplica a un componente aislado.
  const resultado = await axe(document.body, {
    rules: { region: { enabled: false } },
  });
  expect(resultado).toHaveNoViolations();
});
