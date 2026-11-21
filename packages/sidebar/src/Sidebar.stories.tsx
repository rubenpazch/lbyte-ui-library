import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  HomeIcon,
  DocumentIcon,
  CoinsHandIcon,
  UsersIcon,
  SettingsIcon,
  PresentationChartIcon,
} from "@rubenpazch/icons";
const meta: Meta<typeof Sidebar> = {
  title: "Navegación/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
};
export default meta;

const Demo = () => {
  const [path, setPath] = useState("/obligaciones");
  const sections = [
    {
      title: "General",
      items: [
        {
          label: "Inicio",
          href: "#/",
          icon: <HomeIcon />,
          onClick: () => setPath("/"),
        },
        {
          label: "Obligaciones",
          href: "#/obligaciones",
          icon: <DocumentIcon />,
          badge: 3,
          active: path === "/obligaciones",
          onClick: () => setPath("/obligaciones"),
        },
        {
          label: "Cobros",
          href: "#/cobros",
          icon: <CoinsHandIcon />,
          active: path === "/cobros",
          onClick: () => setPath("/cobros"),
        },
      ],
    },
    {
      title: "Gestión",
      items: [
        {
          label: "Reportes",
          icon: <PresentationChartIcon />,
          children: [
            { label: "Mensual", href: "#/reportes/mensual" },
            { label: "Anual", href: "#/reportes/anual" },
          ],
        },
        { label: "Usuarios", href: "#/usuarios", icon: <UsersIcon /> },
        { label: "Configuración", href: "#/config", icon: <SettingsIcon /> },
      ],
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        height: 560,
        border: "1px solid var(--lb-color-border)",
      }}
    >
      <Sidebar
        sections={sections}
        brand={<strong>L BYTE · Finanzas</strong>}
        brandCollapsed={<strong>LB</strong>}
        footer={<small>Ruben Paz</small>}
        storageKey="storybook-sidebar"
      />
      <div style={{ padding: 24 }}>Página: {path}</div>
    </div>
  );
};

export const Ejemplo: StoryObj<typeof Sidebar> = { render: () => <Demo /> };
