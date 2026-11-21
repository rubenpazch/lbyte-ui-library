import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Textarea from "./Textarea";

describe("Textarea", () => {
  it("asocia etiqueta, ayuda y error", () => {
    render(
      <Textarea
        label="Motivo"
        value=""
        onChange={jest.fn()}
        hint="Mínimo 10 caracteres"
        error="Requerido"
      />,
    );
    const t = screen.getByLabelText("Motivo");
    expect(t).toHaveAttribute("aria-invalid", "true");
    expect(t).toHaveAccessibleDescription("Requerido Mínimo 10 caracteres");
  });

  it("devuelve el texto en onChange", () => {
    const onChange = jest.fn();
    render(<Textarea label="Nota" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("Nota"), {
      target: { value: "hola" },
    });
    expect(onChange).toHaveBeenCalledWith("hola");
  });

  it("muestra el contador con maxLength", () => {
    render(
      <Textarea label="Nota" value="abc" onChange={jest.fn()} maxLength={10} />,
    );
    expect(screen.getByText("3/10")).toBeInTheDocument();
  });

  it("reenvía la ref", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} label="Nota" value="" onChange={jest.fn()} />);
    expect(ref.current).toBe(screen.getByLabelText("Nota"));
  });
});
