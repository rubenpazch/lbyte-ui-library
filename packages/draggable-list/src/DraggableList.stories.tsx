import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import DraggableList from "./DraggableList";

type TaskItem = { id: string; label: string };
type StatusItem = { id: string; label: string; count: number };

const meta: Meta<typeof DraggableList> = {
  title: "Components/DraggableList",
  component: DraggableList as any,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "subtle"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "md",
    gap: "md",
  },
  render: (args) => {
    const [items, setItems] = useState<TaskItem[]>([
      { id: "1", label: "Prepare report" },
      { id: "2", label: "Review designs" },
      { id: "3", label: "Schedule meeting" },
      { id: "4", label: "Send updates" },
    ]);

    return (
      <DraggableList
        {...args}
        items={items}
        onReorder={setItems}
        getItemId={(item) => item.id}
        renderItem={(item) => (
          <div>
            <strong>{item.label}</strong>
          </div>
        )}
      />
    );
  },
};

export const WithCustomItem: Story = {
  args: {
    variant: "outline",
    size: "md",
    gap: "md",
  },
  render: (args) => {
    const [items, setItems] = useState<StatusItem[]>([
      { id: "1", label: "Inbox", count: 12 },
      { id: "2", label: "In Progress", count: 5 },
      { id: "3", label: "Done", count: 19 },
    ]);

    return (
      <DraggableList
        {...args}
        items={items}
        onReorder={setItems}
        getItemId={(item) => item.id}
        renderItem={(item) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>{item.label}</span>
            <span>{item.count}</span>
          </div>
        )}
        itemClassName="custom-item"
      />
    );
  },
};

export const CompactSubtle: Story = {
  args: {
    variant: "subtle",
    size: "sm",
    gap: "sm",
  },
  render: (args) => {
    const [items, setItems] = useState<TaskItem[]>([
      { id: "1", label: "Sync roadmap" },
      { id: "2", label: "Triage bugs" },
      { id: "3", label: "Update docs" },
    ]);

    return (
      <DraggableList
        {...args}
        items={items}
        onReorder={setItems}
        getItemId={(item) => item.id}
        renderItem={(item) => <span>{item.label}</span>}
      />
    );
  },
};

export const SpaciousOutline: Story = {
  args: {
    variant: "outline",
    size: "lg",
    gap: "lg",
  },
  render: (args) => {
    const [items, setItems] = useState<TaskItem[]>([
      { id: "1", label: "Plan sprint" },
      { id: "2", label: "Review PRs" },
      { id: "3", label: "Demo features" },
    ]);

    return (
      <DraggableList
        {...args}
        items={items}
        onReorder={setItems}
        getItemId={(item) => item.id}
        renderItem={(item) => <span>{item.label}</span>}
      />
    );
  },
};
