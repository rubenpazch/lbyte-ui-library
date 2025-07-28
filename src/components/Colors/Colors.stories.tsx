import type { Meta, StoryObj } from "@storybook/react";

import Colors from "./Colors";
import React from "react";

type Story = StoryObj<typeof Colors>;

export default {
  component: Colors,
  tags: ["autodocs"],
} satisfies Meta<typeof Colors>;

export const Default: Story = {
  args: {
    color: "primary",
    title: "default",
    children: <>#7367f0</>,
  },
};

export const PrimaryColors: Story = {
  name: "Primary",
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "start",
        }}
      >
        <Colors color="primary" tone="lightest" title="Light">
          {"#c7c2f9"}
        </Colors>
        <Colors color="primary" tone="lighter" title="Lighter">
          {"#aba4f6"}
        </Colors>
        <Colors color="primary" tone="light" title="Lightest">
          {"#8f85f3"}
        </Colors>
        <Colors color="primary" tone="regular-light" title="Regular">
          {"#8f85f3"}
        </Colors>
        <Colors color="primary" tone="regular" title="Regular-Light">
          {"#7367f0"}
        </Colors>
        <Colors color="primary" tone="regular-dark" title="Regular-Lighter">
          {"#675dd8"}
        </Colors>
        <Colors color="primary" tone="dark" title="Dark">
          {"#6258cc"}
        </Colors>
        <Colors color="primary" tone="darker" title="Darker">
          {"#5c52c0"}
        </Colors>
        <Colors color="primary" tone="darkest" title="Darkest">
          {"#564db4"}
        </Colors>
      </div>
    );
  },
};

export const PrimaryOpacityColors: Story = {
  name: "Primary/Opacity",
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "start",
        }}
      >
        <Colors opacity="lighter" title="Lighter">
          {"#7367f008 (8%)"}
        </Colors>
        <Colors opacity="light" title="Light">
          {"#7367f016 (16%)"}
        </Colors>
        <Colors opacity="main" title="Main">
          {"#7367f024 (24%)"}
        </Colors>
        <Colors opacity="dark" title="Dark">
          {"#7367f032 (32%)"}
        </Colors>
        <Colors opacity="darker" title="Darker">
          {"#7367f038 (38%)"}
        </Colors>
      </div>
    );
  },
};

export const PrimaryShadows: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "start",
        }}
      >
        <Colors color="primary" title="Shadow" shadow="small">
          Small
        </Colors>
        <Colors color="primary" title="Shadow" shadow="medium">
          Medium
        </Colors>
        <Colors color="primary" title="Shadow" shadow="large">
          Large
        </Colors>
      </div>
    );
  },
};

export const SecondaryColors: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "start",
        }}
      >
        <Colors color="secondary" tone="lightest" title="Light">
          {"#e6e6e9"}
        </Colors>
        <Colors color="secondary" tone="lighter" title="Lighter">
          {"#cccdd3"}
        </Colors>
        <Colors color="secondary" tone="light" title="Lightest">
          {"#b3b5bc"}
        </Colors>
        <Colors color="secondary" tone="regular-light" title="Regular">
          {"#999ca6"}
        </Colors>
        <Colors color="secondary" tone="regular" title="Regular-Light">
          {"#808390"}
        </Colors>
        <Colors color="secondary" tone="regular-dark" title="Regular-Lighter">
          {"#737682"}
        </Colors>
        <Colors color="secondary" tone="dark" title="Dark">
          {"#6d6f7a"}
        </Colors>
        <Colors color="secondary" tone="darker" title="Darker">
          {"#666973"}
        </Colors>
        <Colors color="secondary" tone="darkest" title="Darkest">
          {"#60626c"}
        </Colors>
      </div>
    );
  },
};
