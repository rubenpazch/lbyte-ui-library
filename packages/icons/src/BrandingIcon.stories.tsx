import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import BrandingIcon from "./BrandingIcon";

const meta = {
  title: "Icons/Actions/BrandingIcon",
  component: BrandingIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the icon",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for styling",
    },
  },
} satisfies Meta<typeof BrandingIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Branding Icon
 * Shows the paintbrush icon in medium size
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * Small Branding Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Large Branding Icon
 * Suitable for prominent branding/customization sections
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Branding Icon with Purple Color
 * Commonly used for creative/design features
 */
export const PurpleColor: Story = {
  args: {
    size: "md",
    className: "text-purple-600",
  },
};

/**
 * Branding Icon with Pink Color
 * For design and branding features
 */
export const PinkColor: Story = {
  args: {
    size: "md",
    className: "text-pink-600",
  },
};

/**
 * Branding Icon with Custom Color
 */
export const CustomColor: Story = {
  args: {
    size: "md",
    className: "text-indigo-500",
  },
};

/**
 * Multiple Sizes Comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col items-center gap-2">
        <BrandingIcon size="sm" className="text-purple-600" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BrandingIcon size="md" className="text-purple-600" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BrandingIcon size="lg" className="text-purple-600" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};

/**
 * Color Variants
 */
export const ColorVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <BrandingIcon size="md" className="text-purple-600" />
        <span className="text-xs text-gray-500">Purple</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BrandingIcon size="md" className="text-pink-600" />
        <span className="text-xs text-gray-500">Pink</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BrandingIcon size="md" className="text-indigo-600" />
        <span className="text-xs text-gray-500">Indigo</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BrandingIcon size="md" className="text-blue-600" />
        <span className="text-xs text-gray-500">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BrandingIcon size="md" className="text-gray-600" />
        <span className="text-xs text-gray-500">Gray</span>
      </div>
    </div>
  ),
};

/**
 * With Different Backgrounds
 */
export const WithBackground: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="p-3 bg-purple-100 rounded-lg">
        <BrandingIcon size="md" className="text-purple-700" />
      </div>
      <div className="p-3 bg-pink-100 rounded-lg">
        <BrandingIcon size="md" className="text-pink-700" />
      </div>
      <div className="p-3 bg-indigo-100 rounded-lg">
        <BrandingIcon size="md" className="text-indigo-700" />
      </div>
      <div className="p-3 bg-gray-100 rounded-lg">
        <BrandingIcon size="md" className="text-gray-700" />
      </div>
    </div>
  ),
};

/**
 * In Settings Card
 */
export const InSettingsCard: Story = {
  render: () => (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <BrandingIcon size="md" className="text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Branding Settings</h3>
          <p className="text-sm text-gray-500">
            Customize your brand appearance
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        Upload your logo and configure your brand colors to match your company
        identity.
      </p>
    </div>
  ),
};

/**
 * Settings Tab Example
 */
export const InTabContext: Story = {
  render: () => (
    <div className="flex gap-2">
      <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 border-b-2 border-purple-700 rounded-t-lg">
        <BrandingIcon size="sm" />
        <span className="text-sm font-medium">Branding</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-t-lg">
        <BrandingIcon size="sm" />
        <span className="text-sm font-medium">Branding</span>
      </div>
    </div>
  ),
};

/**
 * In Button Context
 */
export const InButton: Story = {
  render: () => (
    <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
      <BrandingIcon size="sm" />
      <span>Customize Branding</span>
    </button>
  ),
};

/**
 * Feature List Item
 */
export const InFeatureList: Story = {
  render: () => (
    <div className="flex items-start gap-3 max-w-md">
      <div className="flex-shrink-0 mt-1">
        <BrandingIcon size="sm" className="text-purple-600" />
      </div>
      <div>
        <h4 className="font-medium text-gray-900">Custom Branding</h4>
        <p className="text-sm text-gray-600">
          Upload your company logo and customize colors to match your brand
          identity across the entire application.
        </p>
      </div>
    </div>
  ),
};
