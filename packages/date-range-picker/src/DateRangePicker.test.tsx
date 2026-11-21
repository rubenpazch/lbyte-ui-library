import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DateRangePicker, {
  DEFAULT_DATE_RANGE_PRESETS,
  rangoValido,
  type DateRange,
} from "./DateRangePicker";

const HOY = new Date(2026, 10, 21); // 21/11/2026, local

function Controlado({
  inicial = { from: "", to: "" },
}: {
  inicial?: DateRange;
}) {
  const [r, setR] = useState(inicial);
  return (
    <>
      <DateRangePicker label="Periodo" value={r} onChange={setR} today={HOY} />
      <output data-testid="valor">{`${r.from}|${r.to}`}</output>
    </>
  );
}

it("los atajos calculan fechas locales correctas", () => {
  const rangos = Object.fromEntries(
    DEFAULT_DATE_RANGE_PRESETS.map((p) => [p.label, p.range(HOY)]),
  );
  expect(rangos["Hoy"]).toEqual({ from: "2026-11-21", to: "2026-11-21" });
  expect(rangos["Últimos 7 días"]).toEqual({
    from: "2026-11-15",
    to: "2026-11-21",
  });
  expect(rangos["Este mes"]).toEqual({ from: "2026-11-01", to: "2026-11-30" });
  expect(rangos["Mes anterior"]).toEqual({
    from: "2026-10-01",
    to: "2026-10-31",
  });
  expect(rangos["Este año"]).toEqual({ from: "2026-01-01", to: "2026-12-31" });
  // Enero → mes anterior es diciembre del año pasado.
  const mesAnterior = DEFAULT_DATE_RANGE_PRESETS.find(
    (p) => p.label === "Mes anterior",
  )!;
  expect(mesAnterior.range(new Date(2026, 0, 15))).toEqual({
    from: "2025-12-01",
    to: "2025-12-31",
  });
});

it("rangoValido exige ambas fechas y orden", () => {
  expect(rangoValido({ from: "2026-11-01", to: "2026-11-30" })).toBe(true);
  expect(rangoValido({ from: "2026-11-01", to: "2026-11-01" })).toBe(true);
  expect(rangoValido({ from: "2026-11-30", to: "2026-11-01" })).toBe(false);
  expect(rangoValido({ from: "", to: "2026-11-01" })).toBe(false);
});

it("un atajo llena el rango y queda marcado", () => {
  render(<Controlado />);
  expect(screen.getByRole("group", { name: "Periodo" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Este mes" }));
  expect(screen.getByTestId("valor")).toHaveTextContent(
    "2026-11-01|2026-11-30",
  );
  expect(screen.getByRole("button", { name: "Este mes" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(screen.getByRole("button", { name: "Hoy" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
});

it("avisa si la fecha final es anterior a la inicial", () => {
  render(<Controlado inicial={{ from: "2026-11-30", to: "2026-11-01" }} />);
  expect(
    screen.getByText("La fecha final no puede ser anterior a la inicial."),
  ).toBeInTheDocument();
});

it("sin atajos con presets={false}", () => {
  render(
    <DateRangePicker
      value={{ from: "", to: "" }}
      onChange={() => {}}
      presets={false}
    />,
  );
  expect(screen.queryByRole("button", { name: "Hoy" })).toBeNull();
});
