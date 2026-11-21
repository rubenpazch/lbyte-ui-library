import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Badge from "@rubenpazch/badge";
import Button from "@rubenpazch/button";
import UserCard from "./UserCard";

const meta: Meta<typeof UserCard> = {
  title: "Presentación/UserCard",
  component: UserCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Tarjeta de una persona. Dos acciones principales en el pie (`variant="contained"` y `"outlined"`) y el resto en el menú ⋮. Para comparar muchos datos, usa `DataTable`.',
      },
    },
  },
};
export default meta;

const tarjeta = (
  nombre: string,
  correo: string,
  rol: React.ReactNode,
  activo = true,
) => (
  <UserCard
    name={nombre}
    subtitle={correo}
    muted={!activo}
    badges={
      <>
        {rol}
        <Badge color={activo ? "success" : "danger"} dot>
          {activo ? "activo" : "inactivo"}
        </Badge>
        <Badge variant="outline">Cobros</Badge>
      </>
    }
    actions={
      <>
        <Button variant="contained" size="sm">
          Editar datos
        </Button>
        <Button variant="outlined" size="sm">
          Módulos
        </Button>
      </>
    }
    menuItems={[
      { label: "Restablecer contraseña" },
      { label: "Restablecer MFA" },
      { label: "Eliminar", danger: true },
    ]}
  />
);

export const Cuadricula: StoryObj = {
  name: "En cuadrícula",
  render: () => (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fill, minmax(17.5rem, 1fr))",
      }}
    >
      {tarjeta(
        "Administrador local",
        "admin@lbyte.local",
        <Badge color="violet">superadmin</Badge>,
      )}
      {tarjeta(
        "Ana María Pérez Quispe",
        "ana.perez@clinica-sol.pe",
        <Badge color="primary">admin</Badge>,
      )}
      {tarjeta("Luis Huamán", "luis@lbyte.pe", <Badge>usuario</Badge>, false)}
    </div>
  ),
};
