import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
import ImageUpload from "./ImageUpload";

// Accesibilidad automática (axe): debe pasar sin violaciones.
it("no tiene problemas de accesibilidad (axe)", async () => {
  render(
    <ImageUpload
      label="Logo"
      onUpload={async () => {}}
      hint="PNG o JPG"
      required
    />,
  );
  // "region" es una regla de página completa: no aplica a un componente aislado.
  const resultado = await axe(document.body, {
    rules: { region: { enabled: false } },
  });
  expect(resultado).toHaveNoViolations();
});
