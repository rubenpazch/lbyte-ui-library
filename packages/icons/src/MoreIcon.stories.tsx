import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MoreIcon from './MoreIcon';

const meta: Meta<typeof MoreIcon> = {
  title: 'Icons/Actions/MoreIcon',
  component: MoreIcon,
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
type Story = StoryObj<typeof MoreIcon>;

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
    className: 'text-gray-700',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <MoreIcon size="sm" />
      <MoreIcon size="md" />
      <MoreIcon size="lg" />
      <MoreIcon size="xl" />
    </div>
  ),
};
