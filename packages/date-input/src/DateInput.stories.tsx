import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import DateInput, { type DateInputProps } from "./DateInput";

const meta: Meta<DateInputProps> = {
  title: "Components/DateInput",
  component: DateInput as any,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<DateInputProps>;

const DateInputWithState = (args: DateInputProps) => {
  const [value, setValue] = useState(args.value ?? "");
  return <DateInput {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <DateInputWithState {...args} />,
  args: {
    label: "Date",
    value: "",
    placeholder: "MM/DD/YYYY",
  },
};

export const Required: Story = {
  render: (args) => <DateInputWithState {...args} />,
  args: {
    label: "Appointment Date",
    value: "",
    required: true,
    placeholder: "MM/DD/YYYY",
  },
};

export const WithError: Story = {
  render: (args) => <DateInputWithState {...args} />,
  args: {
    label: "Date",
    value: "",
    error: "Fecha inválida",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    value: "2024-08-15",
    disabled: true,
  },
};

export const WithRange: Story = {
  render: (args) => <DateInputWithState {...args} />,
  args: {
    label: "Range",
    value: "",
    minDate: "2024-01-01",
    maxDate: "2024-12-31",
  },
};

export const SpanishLocale: Story = {
  render: (args) => <DateInputWithState {...args} />,
  args: {
    label: "Fecha",
    value: "",
    locale: "es",
    placeholder: "DD/MM/YYYY",
  },
};
