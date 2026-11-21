import { fireEvent, render, screen, within } from "@testing-library/react";
import DataTable from "./DataTable";

type Fila = { id: number; nombre: string; monto: number };
const filas: Fila[] = [
  { id: 1, nombre: "Luz", monto: 120 },
  { id: 2, nombre: "agua", monto: 45.5 },
  { id: 3, nombre: "Internet", monto: 99 },
];
const columnas = [
  { key: "nombre", header: "Nombre", sortable: true },
  {
    key: "monto",
    header: "Monto",
    sortable: true,
    align: "right" as const,
    render: (f: Fila) => `S/ ${f.monto.toFixed(2)}`,
  },
];

const nombres = () =>
  screen
    .getAllByRole("row")
    .slice(1)
    .map((r) => within(r).getAllByRole("cell")[0].textContent);

describe("DataTable", () => {
  it("tabla con caption accesible y celdas renderizadas", () => {
    render(
      <DataTable
        caption="Obligaciones"
        columns={columnas}
        rows={filas}
        getRowId={(f) => f.id}
      />,
    );
    expect(
      screen.getByRole("table", { name: "Obligaciones" }),
    ).toBeInTheDocument();
    expect(screen.getByText("S/ 45.50")).toBeInTheDocument();
  });

  it("ordena asc, desc y quita el orden (aria-sort); texto sin distinguir mayúsculas", () => {
    render(
      <DataTable
        caption="X"
        columns={columnas}
        rows={filas}
        getRowId={(f) => f.id}
      />,
    );
    const th = screen.getByRole("columnheader", { name: /Nombre/ });
    expect(th).toHaveAttribute("aria-sort", "none");
    fireEvent.click(within(th).getByRole("button"));
    expect(th).toHaveAttribute("aria-sort", "ascending");
    expect(nombres()).toEqual(["agua", "Internet", "Luz"]);
    fireEvent.click(within(th).getByRole("button"));
    expect(nombres()).toEqual(["Luz", "Internet", "agua"]);
    fireEvent.click(within(th).getByRole("button"));
    expect(th).toHaveAttribute("aria-sort", "none");
  });

  it("ordena números por valor, no por el texto mostrado", () => {
    render(
      <DataTable
        caption="X"
        columns={columnas}
        rows={filas}
        getRowId={(f) => f.id}
      />,
    );
    fireEvent.click(
      within(screen.getByRole("columnheader", { name: /Monto/ })).getByRole(
        "button",
      ),
    );
    expect(nombres()).toEqual(["agua", "Internet", "Luz"]);
  });

  it("con onSortChange no ordena por su cuenta (orden del servidor)", () => {
    const onSortChange = jest.fn();
    render(
      <DataTable
        caption="X"
        columns={columnas}
        rows={filas}
        getRowId={(f) => f.id}
        sort={null}
        onSortChange={onSortChange}
      />,
    );
    fireEvent.click(
      within(screen.getByRole("columnheader", { name: /Nombre/ })).getByRole(
        "button",
      ),
    );
    expect(onSortChange).toHaveBeenCalledWith({
      key: "nombre",
      direction: "asc",
    });
    expect(nombres()).toEqual(["Luz", "agua", "Internet"]);
  });

  it("estado vacío y de carga", () => {
    const { rerender } = render(
      <DataTable
        caption="X"
        columns={columnas}
        rows={[]}
        getRowId={(f: Fila) => f.id}
        emptyTitle="No hay obligaciones"
      />,
    );
    expect(screen.getByText("No hay obligaciones")).toBeInTheDocument();
    rerender(
      <DataTable
        caption="X"
        columns={columnas}
        rows={[]}
        getRowId={(f: Fila) => f.id}
        loading
      />,
    );
    expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Cargando…")).toBeInTheDocument();
  });

  it("filas clicables con Enter", () => {
    const onRowClick = jest.fn();
    render(
      <DataTable
        caption="X"
        columns={columnas}
        rows={filas}
        getRowId={(f) => f.id}
        onRowClick={onRowClick}
      />,
    );
    const fila = screen.getAllByRole("row")[1];
    fireEvent.keyDown(fila, { key: "Enter" });
    expect(onRowClick).toHaveBeenCalledWith(filas[0]);
  });
});
