import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
import FileUpload from "./FileUpload";

// Accesibilidad automática (axe): debe pasar sin violaciones.
it("no tiene problemas de accesibilidad (axe)", async () => {
  render(
    <FileUpload
      label="Adjuntos"
      hint="PDF, máximo 5 MB"
      value={[new File(["x"], "oficio.pdf", { type: "application/pdf" })]}
      onChange={() => {}}
      accept=".pdf"
    />,
  );
  // "region" es una regla de página completa: no aplica a un componente aislado.
  const resultado = await axe(document.body, {
    rules: { region: { enabled: false } },
  });
  expect(resultado).toHaveNoViolations();
});
