import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import List, { ListItem } from "./List";

expect.extend(toHaveNoViolations);

it("no tiene problemas de accesibilidad (axe)", async () => {
  render(
    <List aria-label="Socios">
      <ListItem title="Ana" description="Activo" onClick={() => {}} />
      <ListItem title="Luis" href="#luis" />
      <ListItem title="Eva" leading="E" trailing="Baja" muted />
    </List>,
  );
  const resultado = await axe(document.body, {
    rules: { region: { enabled: false } },
  });
  expect(resultado).toHaveNoViolations();
});
