import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button, { type ButtonProps } from "./Button";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button as any,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<ButtonProps>;

// Size Stories
export const SmallDefault: Story = {
  args: {
    size: "sm",
    variant: "default",
    children: "Small Button",
  },
};

export const MediumDefault: Story = {
  args: {
    size: "md",
    variant: "default",
    children: "Medium Button",
  },
};

export const LargeDefault: Story = {
  args: {
    size: "lg",
    variant: "default",
    children: "Large Button",
  },
};

// Variant Stories
export const Primary: Story = {
  args: {
    size: "md",
    variant: "default",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    size: "md",
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Black: Story = {
  args: {
    size: "md",
    variant: "black",
    children: "Black Button",
  },
};

export const Blue: Story = {
  args: {
    size: "md",
    variant: "blue",
    children: "Blue Button",
  },
};

export const Pink: Story = {
  args: {
    size: "md",
    variant: "pink",
    children: "Pink Button",
  },
};

export const GradientGreen: Story = {
  args: {
    size: "md",
    variant: "gradient-green",
    children: "Gradient Green",
  },
};

export const SolidGreen: Story = {
  args: {
    size: "md",
    variant: "solid-green",
    children: "Solid Green",
  },
};

export const Warning: Story = {
  args: {
    size: "md",
    variant: "warning",
    children: "Warning Button",
  },
};

// Style Stories
export const Filled: Story = {
  args: {
    size: "md",
    variant: "default",
    filled: true,
    children: "Filled Button",
  },
};

export const Outlined: Story = {
  args: {
    size: "md",
    variant: "default",
    filled: false,
    children: "Outlined Button",
  },
};

export const Quiet: Story = {
  args: {
    size: "md",
    variant: "default",
    quiet: true,
    children: "Quiet Button",
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    size: "md",
    variant: "default",
    disabled: true,
    children: "Disabled Button",
  },
};

export const Loading: Story = {
  args: {
    size: "md",
    variant: "default",
    disabled: true,
    children: "Loading Button",
  },
};

// Special Stories
export const Circled: Story = {
  args: {
    size: "md",
    variant: "default",
    circled: true,
    children: "✓",
  },
};

export const Inverted: Story = {
  args: {
    size: "md",
    variant: "default",
    inverted: true,
    children: "Inverted Button",
  },
};

// Group Story - All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-x-2">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="black">Black</Button>
        <Button variant="blue">Blue</Button>
        <Button variant="pink">Pink</Button>
      </div>
      <div className="space-x-2">
        <Button variant="gradient-green">Gradient Green</Button>
        <Button variant="solid-green">Solid Green</Button>
        <Button variant="warning">Warning</Button>
      </div>
    </div>
  ),
  args: {
    children: "Button",
  },
} as Story;

// Group Story - All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-x-2">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  args: {
    children: "Button",
  },
} as Story;
