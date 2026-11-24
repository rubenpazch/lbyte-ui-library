import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TextInput, { type PasswordRule, type TextInputProps } from "./TextInput";

function Controlado(props: Partial<TextInputProps>) {
  const [v, setV] = useState("secreto");
  return (
    <TextInput
      label="Contraseña"
      type="password"
      value={v}
      onChange={setV}
      {...props}
    />
  );
}

describe("ver / ocultar contraseña", () => {
  it("el botón alterna entre ocultar y mostrar lo escrito", () => {
    render(<Controlado />);
    const campo = screen.getByLabelText("Contraseña");
    expect(campo).toHaveAttribute("type", "password");

    const boton = screen.getByRole("button", { name: "Mostrar contraseña" });
    expect(boton).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(boton);
    expect(campo).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: "Ocultar contraseña" }),
    ).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: "Ocultar contraseña" }));
    expect(campo).toHaveAttribute("type", "password");
  });

  it("no envía el formulario (type=button) ni aparece en otros tipos", () => {
    const { rerender } = render(<Controlado />);
    expect(
      screen.getByRole("button", { name: "Mostrar contraseña" }),
    ).toHaveAttribute("type", "button");
    rerender(<Controlado type="text" />);
    expect(screen.queryByRole("button", { name: /contraseña/ })).toBeNull();
  });

  it("se puede desactivar y traducir", () => {
    const { rerender } = render(<Controlado showPasswordToggle={false} />);
    expect(screen.queryByRole("button")).toBeNull();
    rerender(
      <Controlado passwordToggleLabels={{ show: "Show", hide: "Hide" }} />,
    );
    expect(screen.getByRole("button", { name: "Show" })).toBeInTheDocument();
  });
});

describe("labelAction", () => {
  it("muestra la acción junto a la etiqueta, fuera del <label>", () => {
    render(
      <TextInput
        label="Remitente"
        value=""
        onChange={() => {}}
        labelAction={<button type="button">¿Qué es el remitente?</button>}
      />,
    );
    const accion = screen.getByRole("button", {
      name: "¿Qué es el remitente?",
    });
    expect(accion.closest("label")).toBeNull();
    // La etiqueta sigue asociada al campo.
    expect(screen.getByLabelText("Remitente")).toHaveAttribute("type", "text");
  });
});

describe("passwordRules", () => {
  const reglas: PasswordRule[] = [
    { id: "largo", label: "12 caracteres o más", test: (v) => v.length >= 12 },
    {
      id: "bordes",
      label: "Sin espacios al inicio ni al final",
      test: (v) => v.length > 0 && v === v.trim(),
    },
  ];

  function ConReglas(props: Partial<TextInputProps>) {
    const [v, setV] = useState("");
    return (
      <TextInput
        label="Contraseña nueva"
        type="password"
        value={v}
        onChange={setV}
        passwordRules={reglas}
        {...props}
      />
    );
  }

  const estado = (texto: string) =>
    screen.getByText(texto).closest("li")?.getAttribute("data-met");

  it("muestra las reglas desde el inicio y las marca al cumplirse", () => {
    render(<ConReglas />);
    expect(screen.getByText("La contraseña debe tener:")).toBeInTheDocument();
    expect(estado("12 caracteres o más")).toBe("false");
    expect(estado("Sin espacios al inicio ni al final")).toBe("false");

    fireEvent.change(screen.getByLabelText("Contraseña nueva"), {
      target: { value: "mi perro come mango" },
    });
    expect(estado("12 caracteres o más")).toBe("true");
    expect(estado("Sin espacios al inicio ni al final")).toBe("true");
    expect(screen.getAllByText(/\(cumplido\)/)).toHaveLength(2);
  });

  it("onValidityChange solo da true cuando se cumplen todas", () => {
    const onValidityChange = jest.fn();
    render(<ConReglas onValidityChange={onValidityChange} />);
    const campo = screen.getByLabelText("Contraseña nueva");

    fireEvent.change(campo, { target: { value: "  frase de prueba" } });
    expect(onValidityChange).toHaveBeenLastCalledWith(false);
    fireEvent.change(campo, { target: { value: "frase de prueba" } });
    expect(onValidityChange).toHaveBeenLastCalledWith(true);
  });

  it("la lista describe al campo y sus textos se pueden cambiar", () => {
    render(
      <ConReglas
        passwordRulesLabels={{ title: "Requisitos", met: "ok", unmet: "falta" }}
      />,
    );
    const lista = screen.getByTestId("password-rules");
    expect(
      screen
        .getByLabelText("Contraseña nueva")
        .getAttribute("aria-describedby"),
    ).toContain(lista.id);
    expect(screen.getByText("Requisitos")).toBeInTheDocument();
    expect(screen.getAllByText(/\(falta\)/)).toHaveLength(2);
  });

  it("reemplazan al medidor por composición", () => {
    render(
      <ConReglas
        showPasswordStrength
        strengthLabels={{ weak: "Débil", "very-strong": "Muy fuerte" }}
        requirementsLabels={{ uppercase: "Una mayúscula" }}
      />,
    );
    fireEvent.change(screen.getByLabelText("Contraseña nueva"), {
      target: { value: "Clave1!" },
    });
    expect(screen.queryByText("Una mayúscula")).toBeNull();
    expect(screen.queryByText("Muy fuerte")).toBeNull();
  });

  it("no aparecen en campos que no son de contraseña ni sin reglas", () => {
    const { rerender } = render(<ConReglas type="text" />);
    expect(screen.queryByTestId("password-rules")).toBeNull();
    rerender(<ConReglas passwordRules={[]} />);
    expect(screen.queryByTestId("password-rules")).toBeNull();
  });
});
