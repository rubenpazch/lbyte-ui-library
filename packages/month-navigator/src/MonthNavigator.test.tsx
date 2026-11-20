import { fireEvent, render, screen } from "@testing-library/react";
import MonthNavigator, { addMonths, currentMonth } from "./MonthNavigator";

describe("addMonths", () => {
  it("cruza años", () => {
    expect(addMonths("2026-12", 1)).toBe("2027-01");
    expect(addMonths("2026-01", -1)).toBe("2025-12");
  });
});

describe("MonthNavigator", () => {
  it("muestra el mes en español y navega", () => {
    const onChange = jest.fn();
    render(<MonthNavigator value="2026-11" onChange={onChange} />);
    expect(screen.getByText(/noviembre/i)).toHaveTextContent("2026");
    fireEvent.click(screen.getByRole("button", { name: "Mes siguiente" }));
    expect(onChange).toHaveBeenLastCalledWith("2026-12");
    fireEvent.click(screen.getByRole("button", { name: "Mes anterior" }));
    expect(onChange).toHaveBeenLastCalledWith("2026-10");
  });

  it("respeta min y max", () => {
    render(
      <MonthNavigator
        value="2026-11"
        onChange={jest.fn()}
        min="2026-11"
        max="2026-11"
      />,
    );
    expect(screen.getByRole("button", { name: "Mes anterior" })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Mes siguiente" }),
    ).toBeDisabled();
  });

  it("'Hoy' vuelve al mes actual", () => {
    const onChange = jest.fn();
    render(<MonthNavigator value="2020-01" onChange={onChange} showToday />);
    fireEvent.click(screen.getByRole("button", { name: "Hoy" }));
    expect(onChange).toHaveBeenLastCalledWith(currentMonth());
  });
});
