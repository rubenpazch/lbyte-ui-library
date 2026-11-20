import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Tooltip from "./Tooltip";

describe("Tooltip", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("aparece al enfocar y describe al elemento", () => {
    render(
      <Tooltip content="Eliminar registro">
        <button>🗑</button>
      </Tooltip>,
    );
    const btn = screen.getByRole("button");
    fireEvent.focus(btn);
    act(() => jest.runAllTimers());
    expect(screen.getByRole("tooltip")).toHaveTextContent("Eliminar registro");
    expect(btn).toHaveAccessibleDescription("Eliminar registro");
  });

  it("espera el retraso con el mouse y se cierra con Escape", () => {
    render(
      <Tooltip content="Ayuda" delay={300}>
        <button>?</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole("button"));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    act(() => jest.advanceTimersByTime(300));
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("conserva los manejadores del hijo", () => {
    const onFocus = jest.fn();
    render(
      <Tooltip content="x">
        <button onFocus={onFocus}>a</button>
      </Tooltip>,
    );
    fireEvent.focus(screen.getByRole("button"));
    expect(onFocus).toHaveBeenCalled();
  });
});
