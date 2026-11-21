import { fireEvent, render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import type { SidebarSection } from "./Sidebar";

const sections: SidebarSection[] = [
  {
    title: "General",
    items: [
      { label: "Inicio", href: "/" },
      { label: "Obligaciones", href: "/obligaciones", badge: 3 },
    ],
  },
  {
    title: "Gestión",
    items: [
      {
        label: "Reportes",
        children: [
          { label: "Mensual", href: "/reportes/mensual" },
          { label: "Anual", href: "/reportes/anual" },
        ],
      },
    ],
  },
];

describe("Sidebar", () => {
  beforeEach(() => window.localStorage.clear());

  it("navegación con la página actual marcada (también en subrutas)", () => {
    render(<Sidebar sections={sections} currentPath="/obligaciones/12" />);
    expect(
      screen.getByRole("navigation", { name: "Navegación principal" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Obligaciones/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Inicio" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("grupos: se abren solos si una subopción está activa y se pliegan", () => {
    render(<Sidebar sections={sections} currentPath="/reportes/anual" />);
    const grupo = screen.getByRole("button", { name: "Reportes" });
    expect(grupo).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Anual" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    fireEvent.click(grupo);
    expect(grupo).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("link", { name: "Anual" }),
    ).not.toBeInTheDocument();
  });

  it("colapsa, mantiene los nombres accesibles y recuerda la preferencia", () => {
    const { unmount } = render(
      <Sidebar sections={sections} storageKey="menu" />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Contraer menú" }));
    expect(
      screen.getByRole("button", { name: "Expandir menú" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("link", { name: "Inicio" })).toBeInTheDocument();
    expect(window.localStorage.getItem("menu")).toBe("1");
    unmount();
    render(<Sidebar sections={sections} storageKey="menu" />);
    expect(
      screen.getByRole("button", { name: "Expandir menú" }),
    ).toBeInTheDocument();
  });

  it("en modo colapsado, un grupo expande la barra", () => {
    const onCollapsedChange = jest.fn();
    render(
      <Sidebar
        sections={sections}
        collapsed
        onCollapsedChange={onCollapsedChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Reportes" }));
    expect(onCollapsedChange).toHaveBeenCalledWith(false);
  });

  it("móvil: Escape, fondo y elegir una opción cierran el cajón", () => {
    const onMobileOpenChange = jest.fn();
    render(
      <Sidebar
        sections={sections}
        mobileOpen
        onMobileOpenChange={onMobileOpenChange}
      />,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.click(screen.getByTestId("sidebar-backdrop"));
    fireEvent.click(screen.getByRole("link", { name: "Inicio" }));
    fireEvent.click(screen.getByRole("button", { name: "Cerrar menú" }));
    expect(onMobileOpenChange).toHaveBeenCalledTimes(4);
    expect(onMobileOpenChange).toHaveBeenCalledWith(false);
  });

  it("acepta el componente Link del framework", () => {
    const Link = ({
      href,
      children,
      ...p
    }: {
      href: string;
      children: React.ReactNode;
    }) => (
      <a href={href} data-link="next" {...p}>
        {children}
      </a>
    );
    render(<Sidebar sections={sections} linkComponent={Link} />);
    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute(
      "data-link",
      "next",
    );
  });
});
