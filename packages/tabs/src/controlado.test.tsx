import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Tabs from "./Tabs";

const tabs = [
  { id: "asignados", label: "Asignados a mí", badge: 3 },
  { id: "por_recepcionar", label: "Por recepcionar" },
];

it("controlado: la pestaña activa la decide `value` y avisa con onChange", () => {
  const onChange = jest.fn();
  const { rerender } = render(
    <Tabs
      tabs={tabs}
      value="asignados"
      onChange={onChange}
      renderContent={(id) => <p>Contenido {id}</p>}
    />,
  );
  fireEvent.click(screen.getByRole("tab", { name: /Por recepcionar/ }));
  expect(onChange).toHaveBeenCalledWith("por_recepcionar");
  // Sin cambiar `value`, sigue en la misma pestaña.
  expect(screen.getByRole("tab", { name: /Asignados/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  // Cuando el padre cambia `value` (p. ej. Atrás en el navegador), se actualiza.
  rerender(
    <Tabs
      tabs={tabs}
      value="por_recepcionar"
      onChange={onChange}
      renderContent={(id) => <p>Contenido {id}</p>}
    />,
  );
  expect(screen.getByRole("tab", { name: /Por recepcionar/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByText("Contenido por_recepcionar")).toBeInTheDocument();
});

it("sin value funciona como antes (no controlado)", () => {
  function Demo() {
    const [ultimo, setUltimo] = useState("");
    return (
      <>
        <Tabs tabs={tabs} onChange={setUltimo} />
        <output>{ultimo}</output>
      </>
    );
  }
  render(<Demo />);
  fireEvent.click(screen.getByRole("tab", { name: /Por recepcionar/ }));
  expect(screen.getByRole("tab", { name: /Por recepcionar/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});
