import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
import UserCard from "./UserCard";

// Accesibilidad automática (axe): debe pasar sin violaciones.
it("no tiene problemas de accesibilidad (axe)", async () => {
  render(
    <UserCard
      name="Ana Pérez"
      subtitle="ana@lbyte.pe"
      badges={<span>admin</span>}
      actions={<button>Editar</button>}
      menuItems={[{ label: "Eliminar", danger: true }]}
    />,
  );
  // "region" es una regla de página completa: no aplica a un componente aislado.
  const resultado = await axe(document.body, {
    rules: { region: { enabled: false } },
  });
  expect(resultado).toHaveNoViolations();
});
