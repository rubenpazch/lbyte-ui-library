import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import AuthGate, { AuthScreen } from "./AuthGate";

const meta: Meta<typeof AuthScreen> = {
  title: "Navegación/AuthGate",
  component: AuthScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Puerta de sesión para la raíz de toda app con sesión (decisión 0006). Sin token va al login sin pintar nada; con token muestra esta pantalla neutra mientras `verify()` (/me) confirma, y recién entonces pinta la app.\n\n```tsx\n<AuthGate hasSession={hayToken} verify={api.me} onUnauthenticated={irAlLogin}>\n  {(me) => <AppShell …>…</AppShell>}\n</AuthGate>\n```",
      },
    },
  },
};
export default meta;

export const Verificando: StoryObj<typeof AuthScreen> = {
  args: {
    label: "Verificando sesión…",
    brand: <strong>Contabilidad · L BYTE</strong>,
  },
};

export const SesionConfirmada: StoryObj = {
  name: "Con sesión (se confirma en 1,5 s)",
  render: () => (
    <AuthGate
      hasSession={() => true}
      verify={() =>
        new Promise<{ nombre: string }>((r) =>
          setTimeout(() => r({ nombre: "Ana" }), 1500),
        )
      }
      onUnauthenticated={() => {}}
      brand={<strong>Contabilidad</strong>}
    >
      {(u) => <p style={{ padding: 24 }}>App visible para {u.nombre}.</p>}
    </AuthGate>
  ),
};
