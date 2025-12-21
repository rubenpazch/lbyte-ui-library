import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PlusIcon from './PlusIcon';

const meta = {
  title: 'Icons/Actions/PlusIcon',
  component: PlusIcon,
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
} satisfies Meta<typeof PlusIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Plus Icon
 * Shows the plus/add icon in medium size
 */
export const Default: Story = {
  args: {
    size: 'md',
  },
};

/**
 * Small Plus Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/**
 * Large Plus Icon
 * Suitable for prominently featured actions
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/**
 * Plus Icon with Green Color
 * Commonly used for positive/create actions
 */
export const GreenColor: Story = {
  args: {
    size: 'md',
    className: 'text-green-600',
  },
};

/**
 * Plus Icon with Blue Color
 */
export const BlueColor: Story = {
  args: {
    size: 'md',
    className: 'text-blue-600',
  },
};

/**
 * Plus Icon with Custom Color
 */
export const CustomColor: Story = {
  args: {
    size: 'md',
    className: 'text-emerald-500',
  },
};

/**
 * Multiple Sizes Comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <PlusIcon size="sm" />
      <PlusIcon size="md" />
      <PlusIcon size="lg" />
    </div>
  ),
};
