import type { Meta, StoryObj } from "@storybook/react";
import BottomNavigation from "./BottomNavigation";
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  ListIcon,
  MenuIcon,
} from "@rubenpazch/icons";

const meta: Meta<typeof BottomNavigation> = {
  title: "Navegación/BottomNavigation",
  component: BottomNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" },
    docs: {
      description: {
        component:
          'Barra inferior del celular con 3 a 5 secciones. Dentro de un panel, pásala a `AppShell` con `bottomNav` (agrega "Más", que abre el menú).',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BottomNavigation>;

export const Panel: Story = {
  args: {
    currentPath: "/partidos",
    hideFrom: "never",
    items: [
      { label: "Resumen", href: "/", icon: <HomeIcon /> },
      { label: "Partidos", href: "/partidos", icon: <CalendarIcon /> },
      { label: "Plantel", href: "/plantel", icon: <UsersIcon /> },
      { label: "Tabla", href: "/tabla", icon: <ListIcon />, badge: 2 },
      { label: "Más", icon: <MenuIcon />, onClick: () => {} },
    ],
  },
};
