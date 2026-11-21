import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import PageHeader from "./PageHeader";

const meta: Meta<typeof PageHeader> = {
  title: "Navegación/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
};
export default meta;

export const Ejemplo: StoryObj<typeof PageHeader> = {
  render: () => (
    <>
      <PageHeader
        title="Convocatorias"
        subtitle="17 publicadas"
        breadcrumbs={[
          { label: "Inicio", href: "#" },
          { label: "Convocatorias" },
        ]}
        actions={<button>Nueva convocatoria</button>}
      />
    </>
  ),
};
