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
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "contained", "outlined"],
      description: "The variant to use",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info"],
      description: "The color of the component",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of the component",
    },
    disabled: {
      control: "boolean",
      description: "If true, the component is disabled",
    },
    loading: {
      control: "boolean",
      description: "If true, the loading indicator is shown",
    },
    fullWidth: {
      control: "boolean",
      description:
        "If true, the button will take up the full width of its container",
    },
    disableElevation: {
      control: "boolean",
      description: "If true, no elevation is used",
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

// ============================================
// Basic Variants
// ============================================

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
};

export const Contained: Story = {
  args: {
    variant: "contained",
    children: "Contained Button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined Button",
  },
};

// ============================================
// Colors - Text Variant
// ============================================

export const TextColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="text" color="primary">
        Primary
      </Button>
      <Button variant="text" color="secondary">
        Secondary
      </Button>
      <Button variant="text" color="success">
        Success
      </Button>
      <Button variant="text" color="error">
        Error
      </Button>
      <Button variant="text" color="warning">
        Warning
      </Button>
      <Button variant="text" color="info">
        Info
      </Button>
    </div>
  ),
};

// ============================================
// Colors - Contained Variant
// ============================================

export const ContainedColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" color="success">
        Success
      </Button>
      <Button variant="contained" color="error">
        Error
      </Button>
      <Button variant="contained" color="warning">
        Warning
      </Button>
      <Button variant="contained" color="info">
        Info
      </Button>
    </div>
  ),
};

// ============================================
// Colors - Outlined Variant
// ============================================

export const OutlinedColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="outlined" color="primary">
        Primary
      </Button>
      <Button variant="outlined" color="secondary">
        Secondary
      </Button>
      <Button variant="outlined" color="success">
        Success
      </Button>
      <Button variant="outlined" color="error">
        Error
      </Button>
      <Button variant="outlined" color="warning">
        Warning
      </Button>
      <Button variant="outlined" color="info">
        Info
      </Button>
    </div>
  ),
};

// ============================================
// Sizes
// ============================================

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button size="small" variant="contained">
        Small
      </Button>
      <Button size="medium" variant="contained">
        Medium
      </Button>
      <Button size="large" variant="contained">
        Large
      </Button>
    </div>
  ),
};

export const SizesText: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button size="small" variant="text">
        Small
      </Button>
      <Button size="medium" variant="text">
        Medium
      </Button>
      <Button size="large" variant="text">
        Large
      </Button>
    </div>
  ),
};

export const SizesOutlined: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button size="small" variant="outlined">
        Small
      </Button>
      <Button size="medium" variant="outlined">
        Medium
      </Button>
      <Button size="large" variant="outlined">
        Large
      </Button>
    </div>
  ),
};

// ============================================
// With Icons
// ============================================

const DeleteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

export const WithStartIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="text" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </div>
  ),
};

export const WithEndIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="text" endIcon={<SendIcon />}>
        Send
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
      <Button variant="outlined" endIcon={<SendIcon />}>
        Send
      </Button>
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button size="small" variant="contained" startIcon={<SendIcon />}>
        Small
      </Button>
      <Button size="medium" variant="contained" startIcon={<SendIcon />}>
        Medium
      </Button>
      <Button size="large" variant="contained" startIcon={<SendIcon />}>
        Large
      </Button>
    </div>
  ),
};

// ============================================
// Loading State
// ============================================

export const Loading: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="text" loading>
        Loading
      </Button>
      <Button variant="contained" loading>
        Loading
      </Button>
      <Button variant="outlined" loading>
        Loading
      </Button>
    </div>
  ),
};

export const LoadingWithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="contained" loading startIcon={<SendIcon />}>
        Submit
      </Button>
      <Button variant="outlined" loading endIcon={<SendIcon />}>
        Send
      </Button>
    </div>
  ),
};

// ============================================
// Disabled State
// ============================================

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="text" disabled>
        Disabled
      </Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="outlined" disabled>
        Disabled
      </Button>
    </div>
  ),
};

// ============================================
// Full Width
// ============================================

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Button variant="contained" fullWidth>
        Full Width Button
      </Button>
    </div>
  ),
};

// ============================================
// Disable Elevation
// ============================================

export const DisableElevation: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button variant="contained">With Elevation</Button>
      <Button variant="contained" disableElevation>
        No Elevation
      </Button>
    </div>
  ),
};

// ============================================
// As Link
// ============================================

export const AsLink: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="text" href="https://mui.com" target="_blank">
        Text Link
      </Button>
      <Button variant="contained" href="https://mui.com" target="_blank">
        Contained Link
      </Button>
      <Button variant="outlined" href="https://mui.com" target="_blank">
        Outlined Link
      </Button>
    </div>
  ),
};

// ============================================
// Interactive Playground
// ============================================

export const Playground: Story = {
  args: {
    variant: "contained",
    color: "primary",
    size: "medium",
    children: "Button",
    disabled: false,
    loading: false,
    fullWidth: false,
    disableElevation: false,
  },
};
