import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CalendarIcon from './CalendarIcon';

const meta = {
  title: 'Icons/DateTime/CalendarIcon',
  component: CalendarIcon,
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
} satisfies Meta<typeof CalendarIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Calendar Icon
 * Shows the calendar icon in medium size
 */
export const Default: Story = {
  args: {
    size: 'md',
  },
};

/**
 * Small Calendar Icon
 * Useful for inline usage or compact layouts
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/**
 * Large Calendar Icon
 * Suitable for prominently featured calendar displays
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/**
 * Calendar Icon with Blue Color
 * Commonly used for date selection and scheduling
 */
export const BlueColor: Story = {
  args: {
    size: 'md',
    className: 'text-blue-600',
  },
};

/**
 * Calendar Icon with Green Color
 * Can be used for available dates or confirmed appointments
 */
export const GreenColor: Story = {
  args: {
    size: 'md',
    className: 'text-green-600',
  },
};

/**
 * Calendar Icon with Purple Color
 */
export const PurpleColor: Story = {
  args: {
    size: 'md',
    className: 'text-purple-600',
  },
};

/**
 * Calendar Icon with Gray Color
 * Useful for disabled or inactive states
 */
export const GrayColor: Story = {
  args: {
    size: 'md',
    className: 'text-gray-400',
  },
};

/**
 * Multiple Sizes Comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <CalendarIcon size="sm" />
      <CalendarIcon size="md" />
      <CalendarIcon size="lg" />
    </div>
  ),
};

/**
 * Calendar Icon in a Button Context
 * Example of how the icon might be used in a date picker button
 */
export const InButton: Story = {
  render: () => (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      <CalendarIcon size="md" />
      <span>Select Date</span>
    </button>
  ),
};

/**
 * Calendar Icon with Custom Styling
 * Shows icon with custom size via className
 */
export const CustomStyling: Story = {
  args: {
    className: 'w-8 h-8 text-indigo-500',
  },
};

/**
 * Calendar Icons in Different States
 * Demonstrates various use cases for the calendar icon
 */
export const MultipleStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <CalendarIcon size="md" className="text-blue-600" />
        <span className="text-sm">Active/Selected</span>
      </div>
      <div className="flex items-center gap-2">
        <CalendarIcon size="md" className="text-gray-400" />
        <span className="text-sm text-gray-400">Disabled</span>
      </div>
      <div className="flex items-center gap-2">
        <CalendarIcon size="md" className="text-green-600" />
        <span className="text-sm">Available</span>
      </div>
      <div className="flex items-center gap-2">
        <CalendarIcon size="md" className="text-red-600" />
        <span className="text-sm">Unavailable</span>
      </div>
    </div>
  ),
};
