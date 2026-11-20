import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import AppShell from "./AppShell";
import { HomeIcon, DocumentIcon, CoinsHandIcon } from "@rubenpazch/icons";
const meta: Meta<typeof AppShell> = {
  title: "Navegación/AppShell",
  component: AppShell,
  tags: ["autodocs"],
};
export default meta;

export const Ejemplo: StoryObj<typeof AppShell> = {
  render: () => (
    <>
      <div
        style={{
          height: 600,
          overflow: "auto",
          border: "1px solid var(--lb-color-border)",
        }}
      >
        <AppShell
          brand={<strong>L BYTE · Cobros</strong>}
          brandCollapsed={<strong>LB</strong>}
          currentPath="#/cobros"
          title="Cobros"
          headerActions={<button>Salir</button>}
          sections={[
            {
              items: [
                { label: "Inicio", href: "#/", icon: <HomeIcon /> },
                {
                  label: "Cobros",
                  href: "#/cobros",
                  icon: <CoinsHandIcon />,
                  badge: 2,
                },
                {
                  label: "Comprobantes",
                  href: "#/comprobantes",
                  icon: <DocumentIcon />,
                },
              ],
            },
          ]}
        >
          <h1>Cobros</h1>
          <p>Contenido de la página.</p>
        </AppShell>
      </div>
    </>
  ),
};
