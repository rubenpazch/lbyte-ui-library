import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Card, { CardBody, CardFooter, CardHeader } from "./Card";

describe("Card", () => {
  it("compone cabecera, cuerpo y pie", () => {
    render(
      <Card as="section" aria-label="Resumen">
        <CardHeader
          title="Noviembre"
          subtitle="Obligaciones"
          actions={<button>Editar</button>}
        />
        <CardBody>S/ 1 250.00</CardBody>
        <CardFooter>
          <button>Ver detalle</button>
        </CardFooter>
      </Card>,
    );
    expect(screen.getByRole("region", { name: "Resumen" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Noviembre" }),
    ).toBeInTheDocument();
    expect(screen.getByText("S/ 1 250.00")).toBeInTheDocument();
  });

  it("con onClick es accesible con teclado", () => {
    const onClick = jest.fn();
    render(<Card onClick={onClick}>Abrir</Card>);
    const card = screen.getByRole("button", { name: "Abrir" });
    expect(card).toHaveAttribute("tabindex", "0");
    fireEvent.keyDown(card, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("reenvía la ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Card ref={ref}>x</Card>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
