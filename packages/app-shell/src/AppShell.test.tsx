import { fireEvent, render, screen } from "@testing-library/react";
import AppShell from "./AppShell";

const sections = [
  {
    items: [
      { label: "Inicio", href: "/" },
      { label: "Cobros", href: "/cobros" },
    ],
  },
];

describe("AppShell", () => {
  it("barra lateral, cabecera y contenido principal", () => {
    render(
      <AppShell
        sections={sections}
        currentPath="/cobros"
        title="Cobros"
        headerActions={<button>Salir</button>}
      >
        <p>contenido</p>
      </AppShell>,
    );
    expect(
      screen.getByRole("navigation", { name: "Navegación principal" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("contenido");
    expect(screen.getByRole("link", { name: "Cobros" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "Salir" })).toBeInTheDocument();
  });

  it("el enlace 'Saltar al contenido' apunta al main", () => {
    render(<AppShell sections={sections}>x</AppShell>);
    const skip = screen.getByRole("link", { name: "Saltar al contenido" });
    expect(skip.getAttribute("href")).toBe(`#${screen.getByRole("main").id}`);
  });

  it("el botón ☰ abre el cajón en móvil y Escape lo cierra", () => {
    render(<AppShell sections={sections}>x</AppShell>);
    const btn = screen.getByRole("button", { name: "Abrir menú" });
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    // El botón Cerrar del cajón solo se ve en móvil (CSS real del Sidebar compilado).
    fireEvent.keyDown(document, { key: "Escape" });
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });
});
