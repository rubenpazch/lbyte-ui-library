import React from "react";
import { render, screen } from "@testing-library/react";
import Flex, { Inline, Spacer, Stack } from "./Flex";
import { Grid, GridItem } from "./Grid";
import { Center } from "./Center";
import { Container } from "./Container";

// En las pruebas los CSS Modules devuelven el nombre de la clase tal cual (identity-obj-proxy).
const clases = (el: HTMLElement) => el.className.split(" ");

describe("Flex", () => {
  it("convierte las props en clases, también por punto de quiebre", () => {
    render(
      <Flex
        data-testid="f"
        direction={{ base: "column", md: "row" }}
        gap={{ base: 2, lg: 6 }}
        align="center"
        justify="between"
        wrap
        padding={4}
      />,
    );
    expect(clases(screen.getByTestId("f"))).toEqual(
      expect.arrayContaining([
        "flex",
        "dir-column",
        "md_dir-row",
        "gap-2",
        "lg_gap-6",
        "align-center",
        "justify-between",
        "wrap-wrap",
        "p-4",
      ]),
    );
  });

  it("renderiza la etiqueta de `as` y pasa atributos y ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Flex as="nav" aria-label="Principal" ref={ref} inline>
        <a href="/">Inicio</a>
      </Flex>,
    );
    const nav = screen.getByRole("navigation", { name: "Principal" });
    expect(ref.current).toBe(nav);
    expect(clases(nav)).toContain("inlineFlex");
  });

  it("oculta por punto de quiebre", () => {
    render(<Flex data-testid="f" hide={{ base: true, md: false }} />);
    expect(clases(screen.getByTestId("f"))).toEqual(
      expect.arrayContaining(["hide-true", "md_hide-false"]),
    );
  });
});

describe("Stack e Inline", () => {
  it("Stack es una columna con gap 4 por defecto", () => {
    render(<Stack data-testid="s" />);
    expect(clases(screen.getByTestId("s"))).toEqual(
      expect.arrayContaining(["dir-column", "gap-4"]),
    );
  });

  it("Inline es una fila centrada que se ajusta", () => {
    render(<Inline data-testid="i" reverse />);
    expect(clases(screen.getByTestId("i"))).toEqual(
      expect.arrayContaining([
        "dir-row-reverse",
        "gap-2",
        "align-center",
        "wrap-wrap",
      ]),
    );
  });

  it("Spacer es decorativo", () => {
    const { container } = render(<Spacer />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Grid", () => {
  it("columnas fijas por punto de quiebre", () => {
    render(<Grid data-testid="g" columns={{ base: 1, md: 3 }} />);
    expect(clases(screen.getByTestId("g"))).toEqual(
      expect.arrayContaining(["grid", "cols-1", "md_cols-3", "gap-4"]),
    );
  });

  it("columnas automáticas con ancho mínimo", () => {
    render(<Grid data-testid="g" minItemWidth="12rem" autoMode="fit" />);
    const g = screen.getByTestId("g");
    expect(clases(g)).toContain("autoCols");
    expect(clases(g)).not.toContain("cols-1");
    expect(g.style.getPropertyValue("--lb-grid-min")).toBe("12rem");
    expect(g.style.getPropertyValue("--lb-grid-fill")).toBe("auto-fit");
  });

  it("GridItem ocupa columnas", () => {
    render(<GridItem data-testid="c" span={{ base: "full", md: 2 }} />);
    expect(clases(screen.getByTestId("c"))).toEqual(
      expect.arrayContaining(["span-full", "md_span-2"]),
    );
  });
});

describe("Center y Container", () => {
  it("Center centra en ambos ejes y a pantalla completa", () => {
    render(<Center data-testid="c" minHeight="screen" />);
    expect(clases(screen.getByTestId("c"))).toEqual(
      expect.arrayContaining(["align-center", "justify-center", "minh-screen"]),
    );
  });

  it("Center solo horizontal con alto libre", () => {
    render(<Center data-testid="c" axis="horizontal" minHeight="20rem" />);
    const c = screen.getByTestId("c");
    expect(clases(c)).toContain("align-center");
    expect(clases(c)).not.toContain("justify-center");
    expect(c.style.minHeight).toBe("20rem");
  });

  it("Container con tamaño o ancho libre", () => {
    const { rerender } = render(<Container data-testid="k" size="md" />);
    expect(clases(screen.getByTestId("k"))).toEqual(
      expect.arrayContaining(["container", "size-md", "px-4", "md_px-6"]),
    );
    rerender(<Container data-testid="k" maxWidth="72rem" />);
    const k = screen.getByTestId("k");
    expect(clases(k)).not.toContain("size-lg");
    expect(k.style.getPropertyValue("--lb-container-max")).toBe("72rem");
  });
});
