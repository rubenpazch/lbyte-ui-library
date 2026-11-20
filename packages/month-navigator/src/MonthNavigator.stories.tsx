import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import MonthNavigator from "./MonthNavigator";

const meta: Meta<typeof MonthNavigator> = {
  title: "Navegación/MonthNavigator",
  component: MonthNavigator,
  tags: ["autodocs"],
};
export default meta;

const Demo = () => {
  const [v, setV] = useState("2026-11");
  return <MonthNavigator value={v} onChange={setV} showToday />;
};

export const Ejemplo: StoryObj<typeof MonthNavigator> = {
  render: () => <Demo />,
};
