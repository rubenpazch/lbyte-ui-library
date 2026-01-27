import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Chip, { type ChipProps } from "./Chip";
import { CheckIcon, InfoIcon, CloseIcon } from "@rubenpazch/icons";

const meta: Meta<ChipProps> = {
  title: "Components/Chip",
  component: Chip as any,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<ChipProps>;

export const Filled: Story = {
  args: {
    label: "Primary Chip",
    color: "primary",
    variant: "filled",
  },
};

export const Outlined: Story = {
  args: {
    label: "Outlined Chip",
    color: "primary",
    variant: "outlined",
  },
};

export const Soft: Story = {
  args: {
    label: "Soft Chip",
    color: "primary",
    variant: "soft",
  },
};

export const Clickable: Story = {
  args: {
    label: "Clickable",
    color: "primary",
    variant: "soft",
    clickable: true,
    onClick: () => {},
  },
};

export const Deletable: Story = {
  args: {
    label: "Removable",
    color: "primary",
    clickable: true,
    onDelete: () => {},
    deleteIcon: <CloseIcon size="sm" />,
  },
};

export const WithIcon: Story = {
  args: {
    label: "With Icon",
    color: "success",
    variant: "soft",
    icon: <CheckIcon size="sm" />,
  },
};

export const WithAvatar: Story = {
  args: {
    label: "Avatar Chip",
    color: "info",
    variant: "soft",
    avatar: (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 24,
          height: 24,
          borderRadius: "9999px",
          background: "#e0f2fe",
          color: "#0ea5e9",
          fontWeight: 700,
          fontSize: 12,
        }}
      >
        RP
      </span>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Chip size="sm" label="Small" color="default" />
      <Chip size="md" label="Medium" color="default" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", maxWidth: 520 }}>
      <Chip label="Default" color="default" variant="soft" />
      <Chip label="Primary" color="primary" variant="filled" />
      <Chip label="Success" color="success" variant="filled" />
      <Chip label="Warning" color="warning" variant="filled" />
      <Chip label="Error" color="error" variant="filled" />
      <Chip label="Info" color="info" variant="filled" />
    </div>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Chip label="Selected" color="primary" selected clickable />
        <Chip label="Disabled" color="primary" clickable disabled />
        <Chip
          label="With Delete"
          color="primary"
          clickable
          onDelete={() => {}}
        />
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Chip
          label="Custom Delete"
          color="warning"
          variant="outlined"
          clickable
          onDelete={() => {}}
          deleteIcon={<CloseIcon size="sm" />}
        />
        <Chip
          label="Info chip"
          color="info"
          variant="soft"
          icon={<InfoIcon size="sm" />}
        />
      </div>
    </div>
  ),
};
