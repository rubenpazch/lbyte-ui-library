import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import Turnstile, { _reiniciarCargaTurnstile } from "./Turnstile";

type Opciones = {
  sitekey: string;
  action?: string;
  callback: (t: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

function falsoTurnstile() {
  const opciones: Opciones[] = [];
  const api = {
    render: jest.fn((_el: HTMLElement, o: Opciones) => {
      opciones.push(o);
      return `w${opciones.length}`;
    }),
    reset: jest.fn(),
    remove: jest.fn(),
  };
  window.turnstile = api;
  return { api, opciones };
}

afterEach(() => {
  delete window.turnstile;
  _reiniciarCargaTurnstile();
  document.head.querySelectorAll("script").forEach((s) => s.remove());
});

it("renderiza el widget con la clave y la acción, y entrega el token", async () => {
  const { api, opciones } = falsoTurnstile();
  const onToken = jest.fn();
  render(
    <Turnstile siteKey="clave-publica" action="login" onToken={onToken} />,
  );
  await waitFor(() => expect(api.render).toHaveBeenCalled());
  expect(opciones[0]).toMatchObject({
    sitekey: "clave-publica",
    action: "login",
  });
  act(() => opciones[0].callback("tok-1"));
  expect(onToken).toHaveBeenLastCalledWith("tok-1");
  act(() => opciones[0]["expired-callback"]());
  expect(onToken).toHaveBeenLastCalledWith("");
});

it("resetKey pide un token nuevo y al desmontar se quita el widget", async () => {
  const { api } = falsoTurnstile();
  const onToken = jest.fn();
  const { rerender, unmount } = render(
    <Turnstile siteKey="k" onToken={onToken} />,
  );
  await waitFor(() => expect(api.render).toHaveBeenCalled());
  rerender(<Turnstile siteKey="k" onToken={onToken} resetKey={1} />);
  expect(api.reset).toHaveBeenCalledWith("w1");
  expect(onToken).toHaveBeenLastCalledWith("");
  unmount();
  expect(api.remove).toHaveBeenCalledWith("w1");
});

it("si el widget falla, avisa con role=alert", async () => {
  const { api, opciones } = falsoTurnstile();
  render(<Turnstile siteKey="k" onToken={() => {}} />);
  await waitFor(() => expect(api.render).toHaveBeenCalled());
  act(() => opciones[0]["error-callback"]());
  expect(screen.getByRole("alert")).toHaveTextContent(
    "No se pudo cargar la verificación",
  );
});

it("si el script no carga, avisa y no rompe", async () => {
  render(<Turnstile siteKey="k" onToken={() => {}} />);
  const script = document.head.querySelector("script") as HTMLScriptElement;
  expect(script.src).toContain("challenges.cloudflare.com");
  act(() => script.onerror?.(new Event("error")));
  expect(await screen.findByRole("alert")).toBeInTheDocument();
});
