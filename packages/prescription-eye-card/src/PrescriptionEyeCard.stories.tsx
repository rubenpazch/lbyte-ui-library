import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import PrescriptionEyeCard, {
  PrescriptionEyeCardLabels,
  type PrescriptionEyeCardProps,
} from "./PrescriptionEyeCard";

const labels: PrescriptionEyeCardLabels = {
  eyeOD: "Right Eye",
  eyeOI: "Left Eye",
  rx: "RX",
  neutro: "Neutro",
  balance: "Balance",
  compensado: "Compensado",
  sphere: "Sphere",
  cylinder: "Cylinder",
  axis: "Axis",
  dnp: "DNP",
  add: "ADD",
  intermediateAdd: "Intermediate Add",
  prism: "Prism",
  prismBase: "Prism Base",
  height: "Height",
  notes: "Notes",
  prismBaseFallback: "-",
  axisUnit: "°",
  millimetersUnit: "mm",
  prismUnit: "Δ",
};

const prismBaseLookup = {
  getNameByKey: (key: string) => (key === "UP" ? "Up" : key),
};

const meta: Meta<PrescriptionEyeCardProps> = {
  title: "Components/PrescriptionEyeCard",
  component: PrescriptionEyeCard as any,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<PrescriptionEyeCardProps>;

export const Default: Story = {
  args: {
    eye: "OD",
    labels,
    prismBaseLookup,
    eyeInfo: {
      sphere: -2,
      cylinder: -0.5,
      axis: 180,
      add: 1.5,
      intermediate_add: 0.75,
      prism: 1,
      prism_base: "UP",
      dnp: 62,
      height: 18,
    },
  },
};

export const LeftEye: Story = {
  args: {
    eye: "OI",
    labels,
    prismBaseLookup,
    eyeInfo: {
      sphere: -1.75,
      cylinder: -0.25,
      axis: 170,
      add: 1.25,
      intermediate_add: 0.5,
      prism: 0,
      prism_base: "DOWN",
      dnp: 61,
      height: 17,
    },
  },
};

export const WithFlagsAndNotes: Story = {
  args: {
    eye: "OD",
    labels,
    prismBaseLookup,
    eyeInfo: {
      sphere: 1.0,
      cylinder: 0.75,
      axis: 90,
      add: 2.0,
      intermediate_add: 1.0,
      prism: 0.5,
      prism_base: "UP",
      dnp: 63,
      height: 20,
      notes: "Use thinner lenses",
      rx: true,
      neutro: true,
      balance: true,
      compensado: true,
    },
  },
};
