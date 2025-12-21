import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FilterIcon from './FilterIcon';

const meta = {
  title: 'Icons/Actions/FilterIcon',
  component: FilterIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the icon',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
    },
  },
} satisfies Meta<typeof FilterIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Filter Icon
 * Shows the filter/funnel icon in medium size
 */
export const Default: Story = {
  args: {
    size: 'md',
  },
};

/**
 * Small Filter Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/**
 * Large Filter Icon
 * Suitable for prominently featured filter actions
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/**
 * Custom Color Filter Icon
 * Shows how to apply custom colors using className
 */
export const CustomColor: Story = {
  args: {
    size: 'md',
    className: 'text-blue-600',
  },
};

/**
 * Custom Size Filter Icon
 * Shows how to apply custom sizes using className
 */
export const CustomSize: Story = {
  args: {
    className: 'w-10 h-10 text-gray-700',
  },
};

/**
 * All Sizes Comparison
 * Shows all available sizes side by side
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <FilterIcon size="sm" />
        <span className="text-xs text-gray-600">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FilterIcon size="md" />
        <span className="text-xs text-gray-600">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FilterIcon size="lg" />
        <span className="text-xs text-gray-600">Large</span>
      </div>
    </div>
  ),
};

/**
 * Color Variations
 * Shows the icon in different colors
 */
export const ColorVariations: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <FilterIcon size="md" className="text-gray-600" />
        <span className="text-xs text-gray-600">Gray</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FilterIcon size="md" className="text-blue-600" />
        <span className="text-xs text-gray-600">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FilterIcon size="md" className="text-green-600" />
        <span className="text-xs text-gray-600">Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FilterIcon size="md" className="text-red-600" />
        <span className="text-xs text-gray-600">Red</span>
      </div>
    </div>
  ),
};
