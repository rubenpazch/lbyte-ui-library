import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import PrescriptionIcon from "./PrescriptionIcon";

const meta: Meta<typeof PrescriptionIcon> = {
  component: PrescriptionIcon,
  tags: ["autodocs"],
  title: "Icons/Documents/PrescriptionIcon",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    color: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    color: "currentColor",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <PrescriptionIcon size="md" className="text-gray-600" />
        <span className="text-xs text-gray-500">Gray</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PrescriptionIcon size="md" className="text-blue-600" />
        <span className="text-xs text-gray-500">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PrescriptionIcon size="md" className="text-green-600" />
        <span className="text-xs text-gray-500">Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PrescriptionIcon size="md" className="text-purple-600" />
        <span className="text-xs text-gray-500">Purple</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <PrescriptionIcon size="sm" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PrescriptionIcon size="md" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PrescriptionIcon size="lg" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="p-3 bg-gray-100 rounded-lg">
        <PrescriptionIcon size="md" className="text-gray-700" />
      </div>
      <div className="p-3 bg-blue-100 rounded-lg">
        <PrescriptionIcon size="md" className="text-blue-700" />
      </div>
      <div className="p-3 bg-green-100 rounded-lg">
        <PrescriptionIcon size="md" className="text-green-700" />
      </div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <PrescriptionIcon size="lg" className="text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Prescription</h3>
          <p className="text-sm text-gray-500">View and manage prescriptions</p>
        </div>
      </div>
    </div>
  ),
};
