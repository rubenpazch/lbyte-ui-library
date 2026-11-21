import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Turnstile from "./Turnstile";

// Claves de prueba públicas de Cloudflare (documentadas): siempre pasa / siempre falla.
const PASA = "1x00000000000000000000AA";
const FALLA = "2x00000000000000000000AB";

const meta: Meta<typeof Turnstile> = {
  title: "Formularios/Turnstile",
  component: Turnstile,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Anti-robots de Cloudflare Turnstile para formularios públicos (login, registro, recuperación). Entrega el token (o "" si caduca/falla); el servidor lo valida y sirve una sola vez: cambia `resetKey` tras cada envío. La CSP debe permitir `https://challenges.cloudflare.com`. Estas historias usan las claves de prueba de Cloudflare.',
      },
    },
  },
};
export default meta;

function Demo({ siteKey }: { siteKey: string }) {
  const [token, setToken] = useState("");
  const [envios, setEnvios] = useState(0);
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 340 }}>
      <Turnstile
        siteKey={siteKey}
        action="login"
        onToken={setToken}
        resetKey={envios}
      />
      <button
        type="button"
        disabled={!token}
        onClick={() => setEnvios((n) => n + 1)}
      >
        Enviar (pide un token nuevo)
      </button>
      <small>Token: {token ? `${token.slice(0, 16)}…` : "—"}</small>
    </div>
  );
}

export const SiemprePasa: StoryObj = {
  name: "Clave de prueba: pasa",
  render: () => <Demo siteKey={PASA} />,
};
export const SiempreFalla: StoryObj = {
  name: "Clave de prueba: falla",
  render: () => <Demo siteKey={FALLA} />,
};
