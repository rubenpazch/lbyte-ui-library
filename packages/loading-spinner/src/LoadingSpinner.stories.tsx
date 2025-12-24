import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const meta: Meta<typeof LoadingSpinner> = {
  title: "Components/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "Optional message to display below the spinner",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the spinner",
    },
    variant: {
      control: "select",
      options: ["spinner", "dots", "pulse", "ring"],
      description: "Visual style of the loading indicator",
    },
    inline: {
      control: "boolean",
      description: "If true, removes centering for inline use",
    },
    color: {
      control: "select",
      options: ["blue", "gray", "white"],
      description: "Color scheme",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

// Spinner Variant (default)
export const SpinnerSmall: Story = {
  args: {
    size: "sm",
    variant: "spinner",
    message: "Cargando...",
  },
};

export const SpinnerMedium: Story = {
  args: {
    size: "md",
    variant: "spinner",
    message: "Cargando información",
  },
};

export const SpinnerLarge: Story = {
  args: {
    size: "lg",
    variant: "spinner",
    message: "Procesando datos",
  },
};

// Dots Variant
export const DotsSmall: Story = {
  args: {
    size: "sm",
    variant: "dots",
    message: "Cargando...",
  },
};

export const DotsMedium: Story = {
  args: {
    size: "md",
    variant: "dots",
    message: "Cargando información",
  },
};

export const DotsLarge: Story = {
  args: {
    size: "lg",
    variant: "dots",
    message: "Procesando datos",
  },
};

// Pulse Variant
export const PulseSmall: Story = {
  args: {
    size: "sm",
    variant: "pulse",
    message: "Cargando...",
  },
};

export const PulseMedium: Story = {
  args: {
    size: "md",
    variant: "pulse",
    message: "Cargando información",
  },
};

export const PulseLarge: Story = {
  args: {
    size: "lg",
    variant: "pulse",
    message: "Procesando datos",
  },
};

// Ring Variant
export const RingSmall: Story = {
  args: {
    size: "sm",
    variant: "ring",
    message: "Cargando...",
  },
};

export const RingMedium: Story = {
  args: {
    size: "md",
    variant: "ring",
    message: "Cargando información",
  },
};

export const RingLarge: Story = {
  args: {
    size: "lg",
    variant: "ring",
    message: "Procesando datos",
  },
};

// Color Variations
export const ColorBlue: Story = {
  args: {
    size: "md",
    variant: "spinner",
    color: "blue",
    message: "Blue spinner",
  },
};

export const ColorGray: Story = {
  args: {
    size: "md",
    variant: "spinner",
    color: "gray",
    message: "Gray spinner",
  },
};

export const ColorWhite: Story = {
  render: () => (
    <div className="bg-gray-800 p-8 rounded">
      <LoadingSpinner
        size="md"
        variant="spinner"
        color="white"
        message="White spinner"
      />
    </div>
  ),
};

// Inline Usage
export const InlineInButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <button className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2">
        <LoadingSpinner size="sm" variant="dots" inline color="white" />
        Loading...
      </button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2">
        <LoadingSpinner size="sm" variant="spinner" inline color="white" />
        Processing
      </button>
    </div>
  ),
};

export const InlineInInput: Story = {
  render: () => (
    <div className="w-64">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded pr-10"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <LoadingSpinner size="sm" variant="dots" inline />
        </div>
      </div>
    </div>
  ),
};

// All Variants Comparison
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Spinner</h3>
        <div className="flex gap-8 items-center">
          <LoadingSpinner size="sm" variant="spinner" />
          <LoadingSpinner size="md" variant="spinner" />
          <LoadingSpinner size="lg" variant="spinner" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Dots</h3>
        <div className="flex gap-8 items-center">
          <LoadingSpinner size="sm" variant="dots" />
          <LoadingSpinner size="md" variant="dots" />
          <LoadingSpinner size="lg" variant="dots" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Pulse</h3>
        <div className="flex gap-8 items-center">
          <LoadingSpinner size="sm" variant="pulse" />
          <LoadingSpinner size="md" variant="pulse" />
          <LoadingSpinner size="lg" variant="pulse" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Ring</h3>
        <div className="flex gap-8 items-center">
          <LoadingSpinner size="sm" variant="ring" />
          <LoadingSpinner size="md" variant="ring" />
          <LoadingSpinner size="lg" variant="ring" />
        </div>
      </div>
    </div>
  ),
};

export const WithoutMessage: Story = {
  args: {
    size: "md",
    variant: "spinner",
  },
};

export const FullPage: Story = {
  render: () => (
    <div className="h-screen">
      <LoadingSpinner
        size="md"
        variant="spinner"
        message="Cargando prescripción"
        className="h-full"
      />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};
