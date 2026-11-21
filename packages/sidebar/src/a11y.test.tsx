import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
import Sidebar from "./Sidebar";

// Accesibilidad automática (axe): debe pasar sin violaciones.
it("no tiene problemas de accesibilidad (axe)", async () => {
  const { container } = render(
    <Sidebar
      currentPath="/a"
      sections={[
        {
          title: "General",
          items: [
            { label: "Inicio", href: "/a" },
            { label: "Reportes", children: [{ label: "Mensual", href: "/r" }] },
          ],
        },
      ]}
    />,
  );
  // "region" es una regla de página completa: no aplica a un componente aislado.
  const resultado = await axe(document.body, {
    rules: { region: { enabled: false } },
  });
  expect(resultado).toHaveNoViolations();
});
