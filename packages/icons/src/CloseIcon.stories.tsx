import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CloseIcon from './CloseIcon';

const meta: Meta<typeof CloseIcon> = {
  component: CloseIcon,
  tags: ['autodocs'],
  title: 'Icons/Actions/CloseIcon',
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
        <CloseIcon size="md" className="text-gray-600" />
        <span className="text-xs text-gray-500">Gray</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CloseIcon size="md" className="text-red-600" />
        <span className="text-xs text-gray-500">Red</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CloseIcon size="md" className="text-blue-600" />
        <span className="text-xs text-gray-500">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CloseIcon size="md" className="text-green-600" />
        <span className="text-xs text-gray-500">Green</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <CloseIcon size="sm" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CloseIcon size="md" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CloseIcon size="lg" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
        <CloseIcon size="md" className="text-gray-700" />
      </div>
      <div className="p-3 bg-red-100 rounded-lg hover:bg-red-200 cursor-pointer">
        <CloseIcon size="md" className="text-red-700" />
      </div>
      <div className="p-3 bg-blue-100 rounded-lg hover:bg-blue-200 cursor-pointer">
        <CloseIcon size="md" className="text-blue-700" />
      </div>
    </div>
  ),
};
