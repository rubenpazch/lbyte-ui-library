import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import BottomNavigation from "./BottomNavigation";

expect.extend(toHaveNoViolations);

it("no tiene problemas de accesibilidad (axe)", async () => {
  render(
    <BottomNavigation
      currentPath="/"
      items={[
        { label: "Inicio", href: "/", icon: <svg /> },
        { label: "Tabla", href: "/tabla", icon: <svg /> },
        { label: "Más", icon: <svg />, onClick: () => {} },
      ]}
    />,
  );
  const resultado = await axe(document.body, {
    rules: { region: { enabled: false } },
  });
  expect(resultado).toHaveNoViolations();
});
