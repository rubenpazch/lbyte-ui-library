import React from "react";
import { act, render, screen } from "@testing-library/react";
import AuthGate from "./AuthGate";

const App = () => <nav>Menú del sistema</nav>;

it("sin sesión va al login sin pintar nada de la app", () => {
  const alLogin = jest.fn();
  const verify = jest.fn();
  render(
    <AuthGate
      hasSession={() => false}
      verify={verify}
      onUnauthenticated={alLogin}
    >
      <App />
    </AuthGate>,
  );
  expect(alLogin).toHaveBeenCalledTimes(1);
  expect(verify).not.toHaveBeenCalled();
  expect(screen.queryByText("Menú del sistema")).toBeNull();
  expect(screen.getByRole("status")).toHaveTextContent(
    "Redirigiendo al inicio de sesión",
  );
});

it("con sesión muestra solo la pantalla neutra hasta que el servidor la confirma", async () => {
  let confirmar!: (u: { nombre: string }) => void;
  const verify = () => new Promise<{ nombre: string }>((r) => (confirmar = r));
  render(
    <AuthGate
      hasSession={() => true}
      verify={verify}
      onUnauthenticated={jest.fn()}
    >
      {(u) => <p>Hola, {u.nombre}</p>}
    </AuthGate>,
  );
  expect(screen.getByRole("status")).toHaveTextContent("Verificando sesión");
  expect(screen.queryByText(/Hola/)).toBeNull();
  await act(async () => confirmar({ nombre: "Ana" }));
  expect(screen.getByText("Hola, Ana")).toBeInTheDocument();
});

it("si el servidor rechaza la sesión (401) va al login sin haber pintado la app", async () => {
  const alLogin = jest.fn();
  render(
    <AuthGate
      hasSession={() => true}
      verify={() => Promise.reject(new Error("401"))}
      onUnauthenticated={alLogin}
    >
      <App />
    </AuthGate>,
  );
  await act(async () => {});
  expect(alLogin).toHaveBeenCalledTimes(1);
  expect(screen.queryByText("Menú del sistema")).toBeNull();
});

it("un 401 a mitad de uso (auth:logout) oculta la app y va al login", async () => {
  const alLogin = jest.fn();
  render(
    <AuthGate
      hasSession={() => true}
      verify={() => Promise.resolve({})}
      onUnauthenticated={alLogin}
    >
      <App />
    </AuthGate>,
  );
  await act(async () => {});
  expect(screen.getByText("Menú del sistema")).toBeInTheDocument();
  act(() => {
    window.dispatchEvent(new Event("auth:logout"));
  });
  expect(screen.queryByText("Menú del sistema")).toBeNull();
  expect(screen.getByRole("status")).toHaveTextContent("Tu sesión terminó");
  expect(alLogin).toHaveBeenCalledTimes(1);
});
