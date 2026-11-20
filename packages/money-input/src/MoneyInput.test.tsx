import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MoneyInput, { formatMoney } from "./MoneyInput";

describe("formatMoney", () => {
  it("formatea soles y dólares como en Perú", () => {
    expect(formatMoney(1250.5, "PEN")).toBe("S/ 1,250.50");
    expect(formatMoney(8, "USD")).toBe("US$ 8.00");
    expect(formatMoney(null)).toBe("");
  });
});

describe("MoneyInput", () => {
  it("devuelve un número al escribir con punto o coma decimal", () => {
    const onChange = jest.fn();
    render(<MoneyInput label="Monto" value={null} onChange={onChange} />);
    const input = screen.getByLabelText("Monto");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "1250,5" } });
    expect(onChange).toHaveBeenLastCalledWith(1250.5);
    fireEvent.change(input, { target: { value: "1,250.75" } });
    expect(onChange).toHaveBeenLastCalledWith(1250.75);
  });

  it("al salir muestra el formato con miles", () => {
    const Demo = () => {
      const [v, setV] = React.useState<number | null>(null);
      return <MoneyInput label="Monto" value={v} onChange={setV} />;
    };
    render(<Demo />);
    const input = screen.getByLabelText("Monto");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "1250.5" } });
    fireEvent.blur(input);
    expect(input).toHaveValue("1,250.50");
  });

  it("no permite negativos por defecto y respeta max", () => {
    const onChange = jest.fn();
    render(
      <MoneyInput label="Monto" value={null} onChange={onChange} max={100} />,
    );
    const input = screen.getByLabelText("Monto");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "-500" } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenLastCalledWith(100);
  });

  it("vacío devuelve null y asocia el error", () => {
    const onChange = jest.fn();
    render(
      <MoneyInput
        label="Monto"
        value={5}
        onChange={onChange}
        error="Requerido"
      />,
    );
    const input = screen.getByLabelText("Monto");
    expect(input).toHaveAccessibleDescription("Requerido");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "" } });
    expect(onChange).toHaveBeenLastCalledWith(null);
  });
});
