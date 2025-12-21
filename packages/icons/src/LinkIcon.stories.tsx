import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import LinkIcon from './LinkIcon';

const meta: Meta<typeof LinkIcon> = {
  component: LinkIcon,
  tags: ['autodocs'],
  title: 'Icons/Actions/LinkIcon',
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

export const Medium: Story = {
  args: {
    size: 'md',
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
        <LinkIcon size="md" className="text-gray-600" />
        <span className="text-xs text-gray-500">Gray</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LinkIcon size="md" className="text-indigo-600" />
        <span className="text-xs text-indigo-500">Indigo</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LinkIcon size="md" className="text-purple-600" />
        <span className="text-xs text-purple-500">Purple</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LinkIcon size="md" className="text-blue-600" />
        <span className="text-xs text-blue-500">Blue</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-8 items-end">
      <div className="flex flex-col items-center gap-2">
        <LinkIcon size="sm" className="text-indigo-600" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LinkIcon size="md" className="text-indigo-600" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LinkIcon size="lg" className="text-indigo-600" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="flex gap-4">
      <button className="p-2 rounded hover:bg-gray-100 transition-colors">
        <LinkIcon size="md" className="text-gray-700" />
      </button>
      <button className="p-2 rounded bg-indigo-600 hover:bg-indigo-700 transition-colors">
        <LinkIcon size="md" color="white" />
      </button>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm">
        <LinkIcon size="sm" className="text-indigo-600" />
        <span>Prescripciones Vinculadas</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <LinkIcon size="md" className="text-indigo-600" />
        <span>2 vinculadas</span>
      </div>
    </div>
  ),
};
