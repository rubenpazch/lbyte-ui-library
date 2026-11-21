import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PageHeader from "./PageHeader";

describe("PageHeader", () => {
  it("título h1, migas con página actual y acciones", () => {
    render(
      <PageHeader
        title="Convocatorias"
        subtitle="17 publicadas"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Convocatorias" },
        ]}
        actions={<button>Nueva</button>}
      />,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Convocatorias" }),
    ).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Ruta de navegación" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getAllByText("Convocatorias")[0]).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "Nueva" })).toBeInTheDocument();
  });

  it("volver como botón o enlace", () => {
    const onClick = jest.fn();
    const { rerender } = render(
      <PageHeader title="Editar" back={{ onClick }} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Volver/ }));
    expect(onClick).toHaveBeenCalled();
    rerender(
      <PageHeader title="Editar" back={{ href: "/lista", label: "Lista" }} />,
    );
    expect(screen.getByRole("link", { name: /Lista/ })).toHaveAttribute(
      "href",
      "/lista",
    );
  });
});
