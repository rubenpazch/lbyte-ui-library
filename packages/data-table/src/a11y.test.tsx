import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
import DataTable from "./DataTable";

// Accesibilidad automática (axe): debe pasar sin violaciones.
it("no tiene problemas de accesibilidad (axe)", async () => {
  const { container } = render(
    <DataTable
      caption="Pagos"
      getRowId={(r: { id: number }) => r.id}
      columns={[{ key: "n", header: "Nombre", sortable: true }]}
      rows={[{ id: 1, n: "Luz" }]}
      onRowClick={() => {}}
    />,
  );
  // "region" es una regla de página completa: no aplica a un componente aislado.
  const resultado = await axe(document.body, {
    rules: { region: { enabled: false } },
  });
  expect(resultado).toHaveNoViolations();
});
