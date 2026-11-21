import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DateInput from "./DateInput";

describe("DateInput", () => {
  it("renders label and input", () => {
    render(<DateInput label="Fecha" value="" onChange={() => {}} />);
    expect(screen.getByText("Fecha")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("asocia la etiqueta al input (lectores de pantalla)", () => {
    render(
      <DateInput label="Fecha de nacimiento" value="" onChange={() => {}} />,
    );
    expect(screen.getByLabelText("Fecha de nacimiento")).toBe(
      screen.getByRole("combobox"),
    );
  });

  it("shows required indicator when required", () => {
    render(<DateInput label="Fecha" value="" onChange={() => {}} required />);
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeRequired();
  });

  it("muestra el error, marca el campo inválido y lo describe", () => {
    render(
      <DateInput
        label="Fecha"
        value=""
        onChange={() => {}}
        error="Fecha inválida"
      />,
    );
    const input = screen.getByRole("combobox");
    expect(screen.getByRole("alert")).toHaveTextContent("Fecha inválida");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Fecha inválida");
  });

  it("disables input when disabled", () => {
    render(<DateInput label="Fecha" value="" onChange={() => {}} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("en español muestra DD/MM/AAAA sin correrse un día (hora local)", () => {
    render(<DateInput label="Fecha" value="2026-11-20" onChange={() => {}} />);
    expect(screen.getByRole("combobox")).toHaveValue("20/11/2026");
  });

  it("lee lo que se escribe como día/mes en español", () => {
    const onChange = jest.fn();
    render(<DateInput label="Fecha" value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "05/12/2026" },
    });
    expect(onChange).toHaveBeenLastCalledWith("2026-12-05");
  });

  it("en inglés lee mes/día", () => {
    const onChange = jest.fn();
    render(<DateInput label="Date" value="" onChange={onChange} locale="en" />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "12/05/2026" },
    });
    expect(onChange).toHaveBeenLastCalledWith("2026-12-05");
  });

  it("no acepta fechas imposibles (31/02)", () => {
    const onChange = jest.fn();
    render(<DateInput label="Fecha" value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "31/02/2026" },
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("'Hoy' elige la fecha de hoy aunque el calendario muestre otro mes", () => {
    const onChange = jest.fn();
    render(<DateInput label="Fecha" value="2020-01-15" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Abrir calendario" }));
    fireEvent.click(screen.getByRole("button", { name: "Hoy" }));
    const now = new Date();
    const hoy = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    expect(onChange).toHaveBeenLastCalledWith(hoy);
  });

  it("el calendario es un diálogo accesible con textos en español y se cierra con Escape", () => {
    render(<DateInput label="Fecha" value="" onChange={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Abrir calendario" }));
    expect(
      screen.getByRole("dialog", { name: "Calendario" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Mes anterior" }),
    ).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("reenvía la ref al input", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<DateInput ref={ref} label="Fecha" value="" onChange={() => {}} />);
    expect(ref.current).toBe(screen.getByRole("combobox"));
  });
});
