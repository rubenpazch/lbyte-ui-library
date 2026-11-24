import type { Meta, StoryObj } from "@storybook/react";
import List, { ListItem } from "./List";
import Badge from "@rubenpazch/badge";

const meta: Meta<typeof List> = {
  title: "Presentación/List",
  component: List,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Lista de filas (`ListItem`) con separadores. Para datos con muchas columnas, `DataTable`.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof List>;

export const Filas: Story = {
  render: () => (
    <List aria-label="Próximos partidos">
      <ListItem
        title="Cienciano 1-0 Alianza"
        description="dom, 22 nov. · 15:30 · Liga 1"
        trailing={
          <Badge color="danger" variant="solid">
            En vivo
          </Badge>
        }
        onClick={() => {}}
      />
      <ListItem
        title="Cienciano vs Universitario"
        description="dom, 29 nov. · 15:30 · Liga 1"
        trailing={<Badge color="primary">Programado</Badge>}
        onClick={() => {}}
      />
      <ListItem
        title="Jugador oculto"
        description="No sale en el sitio"
        leading="JO"
        muted
      />
    </List>
  ),
};

export const SinBorde: Story = {
  name: "Sin borde (dentro de una tarjeta)",
  render: () => (
    <List variant="plain">
      <ListItem title="Primera fila" description="Detalle" />
      <ListItem title="Segunda fila" description="Detalle" />
    </List>
  ),
};
