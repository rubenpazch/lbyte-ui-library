import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import CheckboxGroup, { type CheckboxGroupProps } from "./CheckboxGroup";

expect.extend(toHaveNoViolations);

const opciones = [
  { label: "Leer", value: "leer" },
  { label: "Escribir", value: "escribir" },
  { label: "Borrar", value: "borrar" },
  { label: "Administrar", value: "admin", disabled: true },
];

function Controlado(
  props: Partial<CheckboxGroupProps> & { onCambio?: (v: string[]) => void },
) {
  const { onCambio, ...resto } = props;
  const [v, setV] = useState<string[]>(props.value ?? []);
  return (
    <CheckboxGroup
      label="Permisos"
      options={opciones}
      {...resto}
      value={v}
      onChange={(n) => {
        setV(n);
        onCambio?.(n);
      }}
    />
  );
}

describe("CheckboxGroup", () => {
  it("es un grupo con nombre accesible, ayuda y error", () => {
    render(
      <Controlado hint="Del usuario" error="Elige al menos uno" required />,
    );
    const grupo = screen.getByRole("group", { name: "Permisos" });
    expect(grupo).toHaveAccessibleDescription("Del usuario Elige al menos uno");
    expect(screen.getByRole("alert")).toHaveTextContent("Elige al menos uno");
  });

  it("agrega y quita valores en el orden de las opciones", () => {
    const onCambio = jest.fn();
    render(<Controlado onCambio={onCambio} />);
    fireEvent.click(screen.getByLabelText("Borrar"));
    fireEvent.click(screen.getByLabelText("Leer"));
    expect(onCambio).toHaveBeenLastCalledWith(["leer", "borrar"]);
    fireEvent.click(screen.getByLabelText("Borrar"));
    expect(onCambio).toHaveBeenLastCalledWith(["leer"]);
  });

  it("«Seleccionar todos» marca solo las habilitadas y queda indeterminado", () => {
    const onCambio = jest.fn();
    render(<Controlado selectAll onCambio={onCambio} value={["leer"]} />);
    const todos = screen.getByLabelText(
      "Seleccionar todos",
    ) as HTMLInputElement;
    expect(todos.indeterminate).toBe(true);
    fireEvent.click(todos);
    expect(onCambio).toHaveBeenLastCalledWith(["leer", "escribir", "borrar"]);
    expect(todos.checked).toBe(true);
    fireEvent.click(todos);
    expect(onCambio).toHaveBeenLastCalledWith([]);
  });

  it("con maxSelected deshabilita el resto al llegar al límite", () => {
    render(<Controlado maxSelected={2} />);
    fireEvent.click(screen.getByLabelText("Leer"));
    fireEvent.click(screen.getByLabelText("Escribir"));
    expect(screen.getByLabelText("Borrar")).toBeDisabled();
    fireEvent.click(screen.getByLabelText("Leer"));
    expect(screen.getByLabelText("Borrar")).toBeEnabled();
  });

  it("envía un valor por casilla marcada en formularios nativos", () => {
    const { container } = render(
      <form>
        <Controlado name="permisos" value={["leer", "borrar"]} />
      </form>,
    );
    const datos = new FormData(container.querySelector("form")!);
    expect(datos.getAll("permisos")).toEqual(["leer", "borrar"]);
  });

  it("sin violaciones de accesibilidad", async () => {
    render(<Controlado selectAll hint="Ayuda" columns={2} />);
    const r = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(r).toHaveNoViolations();
  });
});
