import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MapIcon from './MapIcon';

const meta: Meta<typeof MapIcon> = {
  title: 'Icons/Location/MapIcon',
  component: MapIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the icon',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MapIcon>;

export const Default: Story = {
  args: {
    size: 'md',
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

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
};

export const CustomColor: Story = {
  args: {
    size: 'md',
    className: 'text-indigo-600',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <MapIcon size="sm" />
      <MapIcon size="md" />
      <MapIcon size="lg" />
      <MapIcon size="xl" />
    </div>
  ),
};
