import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import HomeIcon from './HomeIcon';

const meta: Meta<typeof HomeIcon> = {
  component: HomeIcon,
  tags: ['autodocs'],
  title: 'Icons/Navigation/HomeIcon',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'currentColor',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <HomeIcon size="md" className="text-gray-600" />
        <span className="text-xs text-gray-500">Gray</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HomeIcon size="md" className="text-blue-600" />
        <span className="text-xs text-gray-500">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HomeIcon size="md" className="text-green-600" />
        <span className="text-xs text-gray-500">Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HomeIcon size="md" className="text-amber-600" />
        <span className="text-xs text-gray-500">Amber</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <HomeIcon size="sm" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HomeIcon size="md" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HomeIcon size="lg" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="p-3 bg-gray-100 rounded-lg">
        <HomeIcon size="md" className="text-gray-700" />
      </div>
      <div className="p-3 bg-blue-100 rounded-lg">
        <HomeIcon size="md" className="text-blue-700" />
      </div>
      <div className="p-3 bg-amber-100 rounded-lg">
        <HomeIcon size="md" className="text-amber-700" />
      </div>
    </div>
  ),
};
