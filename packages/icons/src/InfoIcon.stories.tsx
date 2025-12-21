import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InfoIcon from './InfoIcon';

const meta = {
  title: 'Icons/Feedback/InfoIcon',
  component: InfoIcon,
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
} satisfies Meta<typeof InfoIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Info Icon
 * Shows the info/information icon in medium size
 */
export const Default: Story = {
  args: {
    size: 'md',
  },
};

/**
 * Small Info Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/**
 * Large Info Icon
 * Suitable for prominently featured information
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/**
 * Info Icon with Blue Color
 * Commonly used for informational content
 */
export const BlueColor: Story = {
  args: {
    size: 'md',
    className: 'text-blue-600',
  },
};

/**
 * Info Icon with Gray Color
 */
export const GrayColor: Story = {
  args: {
    size: 'md',
    className: 'text-gray-600',
  },
};

/**
 * Info Icon with Custom Color
 */
export const CustomColor: Story = {
  args: {
    size: 'md',
    className: 'text-cyan-500',
  },
};

/**
 * Multiple Sizes Comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <InfoIcon size="sm" />
      <InfoIcon size="md" />
      <InfoIcon size="lg" />
    </div>
  ),
};
