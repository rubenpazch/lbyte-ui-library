import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import PinInput, { type PinInputProps } from "./PinInput";

expect.extend(toHaveNoViolations);

function Controlado(props: Partial<PinInputProps>) {
  const [v, setV] = useState(props.value ?? "");
  return (
    <>
      <PinInput label="Código" {...props} value={v} onChange={setV} />
      <output data-testid="valor">{v}</output>
    </>
  );
}

const caja = (i: number) => screen.getByTestId(`pin-${i}`) as HTMLInputElement;
const valor = () => screen.getByTestId("valor").textContent;

describe("PinInput", () => {
  it("la etiqueta nombra el grupo y apunta a la primera casilla", () => {
    render(<Controlado hint="Por correo" />);
    expect(screen.getByRole("group", { name: "Código" })).toBeInTheDocument();
    expect(caja(0).labels?.[0]).toHaveTextContent("Código");
    expect(screen.getByRole("textbox", { name: "Carácter 2 de 6" })).toBe(
      caja(1),
    );
    expect(caja(0)).toHaveAttribute("autocomplete", "one-time-code");
    expect(caja(0)).toHaveAttribute("inputmode", "numeric");
    expect(caja(0)).toHaveAccessibleDescription("Por correo");
  });

  it("avanza al escribir y llama a onComplete al llenar", () => {
    const onComplete = jest.fn();
    function ConComplete() {
      const [v, setV] = useState("");
      return (
        <PinInput
          value={v}
          onChange={setV}
          onComplete={onComplete}
          length={4}
        />
      );
    }
    render(<ConComplete />);
    fireEvent.change(caja(0), { target: { value: "1" } });
    expect(caja(1)).toHaveFocus();
    fireEvent.change(caja(1), { target: { value: "2" } });
    fireEvent.change(caja(2), { target: { value: "3" } });
    expect(onComplete).not.toHaveBeenCalled();
    fireEvent.change(caja(3), { target: { value: "4" } });
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("ignora caracteres no válidos", () => {
    render(<Controlado />);
    fireEvent.change(caja(0), { target: { value: "a" } });
    expect(valor()).toBe("");
  });

  it("pegar distribuye el código en las casillas", () => {
    render(<Controlado />);
    fireEvent.paste(caja(0), {
      clipboardData: { getData: () => " 123-456 " },
    });
    expect(valor()).toBe("123456");
    expect(caja(5)).toHaveValue("6");
  });

  it("el autocompletado del SMS llega entero a la primera casilla", () => {
    render(<Controlado />);
    fireEvent.change(caja(0), { target: { value: "987654" } });
    expect(valor()).toBe("987654");
  });

  it("borrar en una casilla vacía retrocede y borra la anterior", () => {
    render(<Controlado value="12" />);
    caja(2).focus();
    fireEvent.keyDown(caja(2), { key: "Backspace" });
    expect(valor()).toBe("1");
    expect(caja(1)).toHaveFocus();
  });

  it("escribir sobre una casilla llena la reemplaza", () => {
    render(<Controlado value="123" />);
    fireEvent.change(caja(1), { target: { value: "29" } });
    expect(valor()).toBe("193");
  });

  it("alfanumérico en mayúsculas y oculto con mask", () => {
    render(<Controlado type="alphanumeric" mask length={4} />);
    fireEvent.change(caja(0), { target: { value: "ab" } });
    expect(valor()).toBe("AB");
    expect(caja(0)).toHaveAttribute("type", "password");
  });

  it("envía el código completo con name", () => {
    const { container } = render(
      <form>
        <Controlado name="codigo" value="4321" length={4} />
      </form>,
    );
    expect(new FormData(container.querySelector("form")!).get("codigo")).toBe(
      "4321",
    );
  });

  it("muestra el error y marca las casillas", () => {
    render(<Controlado error="Código vencido" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Código vencido");
    expect(caja(0)).toHaveAttribute("aria-invalid", "true");
  });

  it("sin violaciones de accesibilidad", async () => {
    render(<Controlado hint="Ayuda" groupSize={3} />);
    const r = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(r).toHaveNoViolations();
  });
});
