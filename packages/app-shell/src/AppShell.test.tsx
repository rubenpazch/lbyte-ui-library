import { fireEvent, render, screen } from "@testing-library/react";
import { useToast } from "@rubenpazch/toast";
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

describe("AppShell + toasts", () => {
  it("incluye ToastProvider: useToast() funciona dentro del panel", () => {
    function Guardar() {
      const toast = useToast();
      return (
        <button onClick={() => toast.exito("Cambios guardados")}>
          Guardar
        </button>
      );
    }
    render(
      <AppShell
        title="Panel"
        sections={[{ items: [{ label: "Inicio", href: "/" }] }]}
      >
        <Guardar />
      </AppShell>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByRole("status")).toHaveTextContent("Cambios guardados");
  });
});

it("pinta los toasts bajo la cabecera, dentro de la columna del contenido (no flotan sobre el menú)", () => {
  function Guardar() {
    const toast = useToast();
    return (
      <button onClick={() => toast.error("No se pudo guardar")}>Guardar</button>
    );
  }
  const { container } = render(
    <AppShell
      title="Panel"
      sections={[{ items: [{ label: "Inicio", href: "/" }] }]}
    >
      <Guardar />
    </AppShell>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Guardar" }));
  const alerta = screen.getByRole("alert");
  const cabecera = container.querySelector("header")!;
  // El toast comparte el bloque fijo de la cabecera y está fuera de <main> y del menú.
  expect(cabecera.parentElement!.contains(alerta)).toBe(true);
  expect(container.querySelector("main")!.contains(alerta)).toBe(false);
  expect(container.querySelector("nav")?.contains(alerta) ?? false).toBe(false);
});

it("loading muestra la carga solo en el contenido: el menú y la cabecera siguen igual", () => {
  const { container } = render(
    <AppShell
      title="Panel"
      loading
      sections={[{ items: [{ label: "Inicio", href: "/" }] }]}
    >
      <p>Lista de usuarios</p>
    </AppShell>,
  );
  const carga = screen.getByRole("status");
  expect(carga).toHaveTextContent("Cargando");
  expect(container.querySelector("main")!.contains(carga)).toBe(true);
  expect(
    screen.getByText("Lista de usuarios").closest("[aria-busy]"),
  ).toHaveAttribute("aria-busy", "true");
  expect(screen.getByRole("link", { name: "Inicio" })).toBeInTheDocument();
  expect(container.querySelector("header")).toHaveTextContent("Panel");
});

it('bottomNav agrega la barra inferior con "Más", que abre el menú lateral', () => {
  render(
    <AppShell
      sections={sections}
      currentPath="/cobros"
      bottomNav={{
        items: [{ label: "Cobros", href: "/cobros", icon: <svg /> }],
      }}
    >
      <p>contenido</p>
    </AppShell>,
  );
  const barra = screen.getByRole("navigation", {
    name: "Secciones principales",
  });
  expect(barra).toBeInTheDocument();
  const mas = screen.getByRole("button", { name: "Más" });
  expect(mas).not.toHaveAttribute("aria-current");
  fireEvent.click(mas);
  expect(mas).toHaveAttribute("aria-current", "page");
});

it('"Más" queda activo cuando la página actual no está en la barra inferior', () => {
  render(
    <AppShell
      sections={sections}
      currentPath="/reportes"
      bottomNav={{
        items: [{ label: "Cobros", href: "/cobros", icon: <svg /> }],
      }}
    >
      <p>contenido</p>
    </AppShell>,
  );
  expect(screen.getByRole("button", { name: "Más" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});
