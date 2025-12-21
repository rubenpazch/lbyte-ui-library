import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TrashIcon from './TrashIcon';

const meta = {
  title: 'Icons/Actions/TrashIcon',
  component: TrashIcon,
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
    color: {
      control: 'color',
      description: 'Color of the icon',
    },
  },
} satisfies Meta<typeof TrashIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Trash Icon
 * Shows the trash/delete icon in medium size
 */
export const Default: Story = {
  args: {
    size: 'md',
  },
};

/**
 * Small Trash Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/**
 * Large Trash Icon
 * Suitable for prominently featured delete actions
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/**
 * Trash Icon with Red Color
 * Commonly used for delete actions to indicate danger
 */
export const RedColor: Story = {
  args: {
    size: 'md',
    className: 'text-red-600',
  },
};

/**
 * Trash Icon with Orange Color
 * Used for warning-level delete actions
 */
export const OrangeColor: Story = {
  args: {
    size: 'md',
    className: 'text-orange-600',
  },
};

/**
 * Trash Icon with Gray Color
 * Subtle appearance for secondary actions
 */
export const GrayColor: Story = {
  args: {
    size: 'md',
    className: 'text-gray-500',
  },
};

/**
 * Multiple Sizes Comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <TrashIcon size="sm" />
      <TrashIcon size="md" />
      <TrashIcon size="lg" />
    </div>
  ),
};

/**
 * Color Variations
 */
export const ColorVariations: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <TrashIcon size="md" className="text-gray-600" />
      <TrashIcon size="md" className="text-orange-600" />
      <TrashIcon size="md" className="text-red-600" />
      <TrashIcon size="md" className="text-red-700" />
    </div>
  ),
};

/**
 * Usage in Button Context
 */
export const InButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <button className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center gap-2 hover:bg-red-700 transition-colors">
        <TrashIcon size="sm" />
        Delete
      </button>
      <button className="px-4 py-2 border border-red-600 text-red-600 rounded-md flex items-center gap-2 hover:bg-red-50 transition-colors">
        <TrashIcon size="sm" />
        Remove
      </button>
    </div>
  ),
};
