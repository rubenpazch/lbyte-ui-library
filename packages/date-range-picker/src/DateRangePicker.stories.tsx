import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import DateRangePicker, {
  type DateRange,
  type DateRangePickerProps,
} from "./DateRangePicker";

const meta: Meta<typeof DateRangePicker> = {
  title: "Formularios/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Periodo desde/hasta (ISO `AAAA-MM-DD`) con atajos. Valida el orden y limita cada calendario según la otra fecha. Para una sola fecha, `DateInput`; para navegar mes a mes, `MonthNavigator`.",
      },
    },
  },
};
export default meta;

function Demo(props: Partial<DateRangePickerProps>) {
  const [r, setR] = useState<DateRange>({ from: "", to: "" });
  return (
    <DateRangePicker
      label="Periodo del reporte"
      value={r}
      onChange={setR}
      {...props}
    />
  );
}

export const ConAtajos: StoryObj = {
  name: "Con atajos",
  render: () => <Demo hint="Se incluyen ambas fechas." />,
};
export const SinAtajos: StoryObj = {
  name: "Sin atajos",
  render: () => <Demo presets={false} />,
};
export const AtajosPropios: StoryObj = {
  name: "Atajos propios",
  render: () => (
    <Demo
      presets={[
        {
          label: "Primer semestre",
          range: (h) => ({
            from: `${h.getFullYear()}-01-01`,
            to: `${h.getFullYear()}-06-30`,
          }),
        },
        {
          label: "Segundo semestre",
          range: (h) => ({
            from: `${h.getFullYear()}-07-01`,
            to: `${h.getFullYear()}-12-31`,
          }),
        },
      ]}
    />
  ),
};
