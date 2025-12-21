import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LocationIcon from './LocationIcon';

const meta: Meta<typeof LocationIcon> = {
  title: 'Icons/Location/LocationIcon',
  component: LocationIcon,
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
type Story = StoryObj<typeof LocationIcon>;

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
    className: 'text-red-600',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <LocationIcon size="sm" />
      <LocationIcon size="md" />
      <LocationIcon size="lg" />
      <LocationIcon size="xl" />
    </div>
  ),
};
