import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import DataTable from "./DataTable";

const meta: Meta<typeof DataTable> = {
  title: "Datos/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};
export default meta;

export const Ejemplo: StoryObj<typeof DataTable> = {
  render: () => (
    <>
      <DataTable
        caption="Obligaciones de noviembre"
        showCaption
        getRowId={(r: { id: number }) => r.id}
        columns={[
          { key: "nombre", header: "Obligación", sortable: true },
          { key: "vence", header: "Vence", sortable: true, hideBelow: "sm" },
          {
            key: "monto",
            header: "Monto",
            sortable: true,
            align: "right",
            render: (r: { monto: number }) => `S/ ${r.monto.toFixed(2)}`,
          },
        ]}
        rows={[
          { id: 1, nombre: "Luz", vence: "2026-11-25", monto: 120 },
          { id: 2, nombre: "Agua", vence: "2026-11-18", monto: 45.5 },
          { id: 3, nombre: "Internet", vence: "2026-11-30", monto: 99 },
        ]}
      />
    </>
  ),
};
