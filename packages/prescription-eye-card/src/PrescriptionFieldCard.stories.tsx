import type { Meta, StoryObj } from "@storybook/react";
import { PrescriptionFieldCard } from "./PrescriptionFieldCard";

const meta = {
  title: "Components/PrescriptionFieldCard",
  component: PrescriptionFieldCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The label text for the field",
    },
    value: {
      control: "text",
      description: "The value to display",
    },
    range: {
      control: "text",
      description: "Optional range information",
    },
    variant: {
      control: "select",
      options: ["default", "highlighted", "success", "warning"],
      description: "The visual variant of the card",
    },
    required: {
      control: "boolean",
      description: "Whether to show the required asterisk",
    },
    unit: {
      control: "text",
      description: "Optional unit to display after the value",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof PrescriptionFieldCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to format values with +/- signs
const formatPlusMinus = (value: string | number) => {
  const num = parseFloat(value.toString());
  return num >= 0 ? `+${num}` : `${num}`;
};

// Default variant stories
export const Default: Story = {
  args: {
    label: "Field Label",
    value: "0.00",
  },
};

export const Sphere: Story = {
  args: {
    label: "ESFERA",
    value: -2.5,
    range: "Rango: -20.00 D a +20.00 D",
    formatValue: formatPlusMinus,
  },
};

export const SpherePositive: Story = {
  args: {
    label: "ESFERA",
    value: 2.5,
    range: "Rango: -20.00 D a +20.00 D",
    formatValue: formatPlusMinus,
  },
};

export const SphereZero: Story = {
  args: {
    label: "ESFERA",
    value: 0,
    range: "Rango: -20.00 D a +20.00 D",
    formatValue: formatPlusMinus,
  },
};

export const Cylinder: Story = {
  args: {
    label: "CILINDRO",
    value: -1.25,
    range: "Rango: -10.00 D a -0.25 D",
    formatValue: formatPlusMinus,
  },
};

export const Axis: Story = {
  args: {
    label: "EJE",
    value: "90",
    range: "Rango: 0° a 180°",
    unit: "°",
  },
};

// Highlighted variant stories
export const DNPHighlighted: Story = {
  args: {
    label: "DNP (Distancia Nasopupilar)",
    value: "32",
    range: "Rango: 15 mm a 70 mm",
    variant: "highlighted",
    required: true,
    unit: "mm",
  },
};

export const DNPMinimum: Story = {
  args: {
    label: "DNP",
    value: "15",
    range: "Rango: 15 mm a 70 mm",
    variant: "highlighted",
    required: true,
    unit: "mm",
  },
};

export const DNPMaximum: Story = {
  args: {
    label: "DNP",
    value: "70",
    range: "Rango: 15 mm a 70 mm",
    variant: "highlighted",
    required: true,
    unit: "mm",
  },
};

// ADD field stories
export const ADD: Story = {
  args: {
    label: "Adición Cerca (ADD)",
    value: "2.00",
    range: "Rango: +0.50 D a +5.00 D",
    formatValue: (value) => `+${value}`,
  },
};

export const ADDMinimum: Story = {
  args: {
    label: "ADD",
    value: "0.50",
    range: "Rango: +0.50 D a +5.00 D",
    formatValue: (value) => `+${value}`,
  },
};

export const ADDMaximum: Story = {
  args: {
    label: "ADD",
    value: "5.00",
    range: "Rango: +0.50 D a +5.00 D",
    formatValue: (value) => `+${value}`,
  },
};

// Intermediate ADD
export const IntermediateADD: Story = {
  args: {
    label: "Adición Intermedia",
    value: "1.50",
    range: "Rango: +0.25 D a +5.00 D",
  },
};

// Prism stories
export const Prism: Story = {
  args: {
    label: "PRISMA",
    value: "2",
    range: "Rango: 0 a 20 Δ",
    unit: "Δ",
  },
};

export const PrismZero: Story = {
  args: {
    label: "PRISMA",
    value: "0",
    range: "Rango: 0 a 20 Δ",
    unit: "Δ",
  },
};

export const PrismBase: Story = {
  args: {
    label: "BASE PRISMA",
    value: "Superior",
    range: "Opciones: Superior, Inferior, Nasal, Temporal",
  },
};

export const Height: Story = {
  args: {
    label: "ALTURA/CENTRO",
    value: "18",
    range: "Rango: 10 mm a 50 mm",
    unit: "mm",
  },
};

// Success variant
export const SuccessVariant: Story = {
  args: {
    label: "Validated Field",
    value: "OK",
    range: "All checks passed",
    variant: "success",
  },
};

// Warning variant
export const WarningVariant: Story = {
  args: {
    label: "Warning Field",
    value: "Check needed",
    range: "Please verify this value",
    variant: "warning",
  },
};

// Without range
export const WithoutRange: Story = {
  args: {
    label: "Simple Field",
    value: "100",
  },
};

// With custom className
export const WithCustomClass: Story = {
  args: {
    label: "Custom Styled",
    value: "Value",
    className: "shadow-lg",
  },
};

// Grid layout example
export const GridLayout = {
  args: {} as any,
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <PrescriptionFieldCard
        label="ESFERA"
        value={-2.5}
        range="Rango: -20.00 D a +20.00 D"
        formatValue={formatPlusMinus}
      />
      <PrescriptionFieldCard
        label="CILINDRO"
        value={-1.25}
        range="Rango: -10.00 D a -0.25 D"
        formatValue={formatPlusMinus}
      />
      <PrescriptionFieldCard
        label="EJE"
        value="90"
        range="Rango: 0° a 180°"
        unit="°"
      />
    </div>
  ),
};

// Grid with DNP highlighted
export const GridWithDNP = {
  args: {} as any,
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <PrescriptionFieldCard
        label="DNP (Distancia Nasopupilar)"
        value="32"
        range="Rango: 15 mm a 70 mm"
        variant="highlighted"
        required={true}
        unit="mm"
      />
      <PrescriptionFieldCard
        label="Adición Cerca (ADD)"
        value="2.00"
        range="Rango: +0.50 D a +5.00 D"
        formatValue={(value) => `+${value}`}
      />
      <PrescriptionFieldCard
        label="Adición Intermedia"
        value="1.50"
        range="Rango: +0.25 D a +5.00 D"
      />
    </div>
  ),
};

// Complete prescription layout
export const CompletePrescription = {
  args: {} as any,
  render: () => (
    <div className="space-y-4 max-w-4xl">
      {/* Main fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PrescriptionFieldCard
          label="ESFERA"
          value={-2.5}
          range="Rango: -20.00 D a +20.00 D"
          formatValue={formatPlusMinus}
        />
        <PrescriptionFieldCard
          label="CILINDRO"
          value={-1.25}
          range="Rango: -10.00 D a -0.25 D"
          formatValue={formatPlusMinus}
        />
        <PrescriptionFieldCard
          label="EJE"
          value="90"
          range="Rango: 0° a 180°"
          unit="°"
        />
      </div>

      {/* DNP and ADD fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PrescriptionFieldCard
          label="DNP (Distancia Nasopupilar)"
          value="32"
          range="Rango: 15 mm a 70 mm"
          variant="highlighted"
          required={true}
          unit="mm"
        />
        <PrescriptionFieldCard
          label="Adición Cerca (ADD)"
          value="2.00"
          range="Rango: +0.50 D a +5.00 D"
          formatValue={(value) => `+${value}`}
        />
        <PrescriptionFieldCard
          label="Adición Intermedia"
          value="1.50"
          range="Rango: +0.25 D a +5.00 D"
        />
      </div>

      {/* Prism fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PrescriptionFieldCard
          label="PRISMA"
          value="2"
          range="Rango: 0 a 20 Δ"
          unit="Δ"
        />
        <PrescriptionFieldCard
          label="BASE PRISMA"
          value="Superior"
          range="Opciones: Superior, Inferior, Nasal, Temporal"
        />
        <PrescriptionFieldCard
          label="ALTURA/CENTRO"
          value="18"
          range="Rango: 10 mm a 50 mm"
          unit="mm"
        />
      </div>
    </div>
  ),
};

// Mobile responsive
export const MobileView = {
  args: {} as any,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-4">
      <PrescriptionFieldCard
        label="ESFERA"
        value={-2.5}
        range="Rango: -20.00 D a +20.00 D"
        formatValue={formatPlusMinus}
      />
      <PrescriptionFieldCard
        label="DNP"
        value="32"
        range="Rango: 15 mm a 70 mm"
        variant="highlighted"
        required={true}
        unit="mm"
      />
    </div>
  ),
};
