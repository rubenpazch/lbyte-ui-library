import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import UserManagementIcon from './UserManagementIcon';

const meta: Meta<typeof UserManagementIcon> = {
  component: UserManagementIcon,
  tags: ['autodocs'],
  title: 'Icons/Users/UserManagementIcon',
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
        <UserManagementIcon size="md" className="text-gray-600" />
        <span className="text-xs text-gray-500">Gray</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserManagementIcon size="md" className="text-blue-600" />
        <span className="text-xs text-gray-500">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserManagementIcon size="md" className="text-purple-600" />
        <span className="text-xs text-gray-500">Purple</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserManagementIcon size="md" className="text-orange-600" />
        <span className="text-xs text-gray-500">Orange</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <UserManagementIcon size="sm" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserManagementIcon size="md" />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserManagementIcon size="lg" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="p-3 bg-gray-100 rounded-lg">
        <UserManagementIcon size="md" className="text-gray-700" />
      </div>
      <div className="p-3 bg-blue-100 rounded-lg">
        <UserManagementIcon size="md" className="text-blue-700" />
      </div>
      <div className="p-3 bg-purple-100 rounded-lg">
        <UserManagementIcon size="md" className="text-purple-700" />
      </div>
    </div>
  ),
};

export const InMenuContext: Story = {
  render: () => (
    <div className="w-64 bg-gray-50 rounded-lg p-3 space-y-2">
      <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
        <UserManagementIcon size="md" className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">User Management</span>
      </div>
      <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer pl-8">
        <span className="text-xs text-gray-600">Users</span>
      </div>
      <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer pl-8">
        <span className="text-xs text-gray-600">Roles</span>
      </div>
      <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer pl-8">
        <span className="text-xs text-gray-600">Permissions</span>
      </div>
    </div>
  ),
};
