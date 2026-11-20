import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Card from "./Card";
import { CardHeader, CardBody, CardFooter } from "./Card";
const meta: Meta<typeof Card> = {
  title: "Presentación/Card",
  component: Card,
  tags: ["autodocs"],
};
export default meta;

export const Ejemplo: StoryObj<typeof Card> = {
  render: () => (
    <>
      <Card style={{ maxWidth: 360 }}>
        <CardHeader title="Noviembre 2026" subtitle="Obligaciones del mes" />
        <CardBody>Total por pagar: S/ 1 250.00</CardBody>
        <CardFooter>
          <button>Ver detalle</button>
        </CardFooter>
      </Card>
    </>
  ),
};
