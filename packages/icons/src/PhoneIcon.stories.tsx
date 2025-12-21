import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PhoneIcon from './PhoneIcon';

const meta: Meta<typeof PhoneIcon> = {
  title: 'Icons/Communication/PhoneIcon',
  component: PhoneIcon,
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
type Story = StoryObj<typeof PhoneIcon>;

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
    className: 'text-green-600',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <PhoneIcon size="sm" />
      <PhoneIcon size="md" />
      <PhoneIcon size="lg" />
      <PhoneIcon size="xl" />
    </div>
  ),
};
