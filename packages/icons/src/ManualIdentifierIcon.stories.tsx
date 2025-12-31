import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ManualIdentifierIcon from "./ManualIdentifierIcon";
import SystemIdentifierIcon from "./SystemIdentifierIcon";

const meta: Meta<typeof ManualIdentifierIcon> = {
  title: "Icons/System/ManualIdentifierIcon",
  component: ManualIdentifierIcon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the icon",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for styling",
    },
  },
};
export default meta;
type Story = StoryObj<typeof ManualIdentifierIcon>;

export const Default: Story = {
  args: { size: "md" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const CustomColor: Story = {
  args: { size: "md", className: "text-orange-600" },
};

export const WarningColor: Story = {
  args: { size: "md", className: "text-orange-500" },
};

export const PurpleColor: Story = {
  args: { size: "md", className: "text-purple-500" },
};

export const InfoColor: Story = {
  args: { size: "md", className: "text-cyan-500" },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <ManualIdentifierIcon size="sm" className="text-orange-500" />
        <span className="text-sm text-gray-600">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ManualIdentifierIcon size="md" className="text-orange-600" />
        <span className="text-sm text-gray-600">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ManualIdentifierIcon size="lg" className="text-orange-700" />
        <span className="text-sm text-gray-600">Large</span>
      </div>
    </div>
  ),
};

export const UsageExample: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200 w-full max-w-md">
      <ManualIdentifierIcon
        size="md"
        className="text-orange-600 flex-shrink-0"
      />
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900">
          Manual Identifier
        </h3>
        <p className="text-xs text-gray-500">Entered manually by user</p>
        <p className="text-sm font-mono text-orange-700 mt-1">3247862837462</p>
      </div>
    </div>
  ),
};

export const ComparisonWithSystemIcon: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <SystemIdentifierIcon
          size="md"
          className="text-blue-600 flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">System</h3>
          <p className="text-xs text-gray-500">Auto-generated</p>
          <p className="text-sm font-mono text-blue-700 mt-1">03112025-001</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
        <ManualIdentifierIcon
          size="md"
          className="text-orange-600 flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">Manual</h3>
          <p className="text-xs text-gray-500">User entered</p>
          <p className="text-sm font-mono text-orange-700 mt-1">
            3247862837462
          </p>
        </div>
      </div>
    </div>
  ),
};
