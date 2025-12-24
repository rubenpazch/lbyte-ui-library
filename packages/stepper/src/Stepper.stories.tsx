import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Stepper from "./Stepper";

const meta = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    currentStep: {
      control: { type: "number", min: 1, max: 5 },
      description: "Current active step number",
    },
    steps: {
      description: "Array of step objects with number and title",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoSteps: Story = {
  args: {
    steps: [
      { number: 1, title: "Basic Information" },
      { number: 2, title: "Lenses and Frames" },
    ],
    currentStep: 1,
  },
};

export const TwoStepsCompleted: Story = {
  args: {
    steps: [
      { number: 1, title: "Basic Information" },
      { number: 2, title: "Lenses and Frames" },
    ],
    currentStep: 2,
  },
};

export const ThreeSteps: Story = {
  args: {
    steps: [
      { number: 1, title: "Patient Details" },
      { number: 2, title: "Prescription" },
      { number: 3, title: "Review & Submit" },
    ],
    currentStep: 2,
  },
};

export const FourSteps: Story = {
  args: {
    steps: [
      { number: 1, title: "Personal Info" },
      { number: 2, title: "Address" },
      { number: 3, title: "Payment" },
      { number: 4, title: "Confirmation" },
    ],
    currentStep: 1,
  },
};

export const FourStepsAtThird: Story = {
  args: {
    steps: [
      { number: 1, title: "Personal Info" },
      { number: 2, title: "Address" },
      { number: 3, title: "Payment" },
      { number: 4, title: "Confirmation" },
    ],
    currentStep: 3,
  },
};

export const FiveStepsAllCompleted: Story = {
  args: {
    steps: [
      { number: 1, title: "Start" },
      { number: 2, title: "Setup" },
      { number: 3, title: "Configure" },
      { number: 4, title: "Test" },
      { number: 5, title: "Complete" },
    ],
    currentStep: 5,
  },
};

export const LongTitles: Story = {
  args: {
    steps: [
      { number: 1, title: "Información Básica del Paciente" },
      { number: 2, title: "Datos de Prescripción Médica" },
      { number: 3, title: "Lentes y Montura Seleccionada" },
    ],
    currentStep: 2,
  },
};

export const SingleStep: Story = {
  args: {
    steps: [{ number: 1, title: "Only Step" }],
    currentStep: 1,
  },
};

export const ClickableSteps: Story = {
  args: {
    steps: [
      { number: 1, title: "Personal Info", link: "#personal" },
      { number: 2, title: "Address", onClick: () => alert("Go to Address") },
      { number: 3, title: "Payment", link: "#payment" },
      { number: 4, title: "Confirmation" },
    ],
    currentStep: 2,
    stepClickable: true,
  },
};

export const SmallSteps: Story = {
  args: {
    steps: [
      { number: 1, title: "Step 1" },
      { number: 2, title: "Step 2" },
      { number: 3, title: "Step 3" },
    ],
    currentStep: 2,
    size: "small",
  },
};

export const MediumSteps: Story = {
  args: {
    steps: [
      { number: 1, title: "Step 1" },
      { number: 2, title: "Step 2" },
      { number: 3, title: "Step 3" },
    ],
    currentStep: 2,
    size: "medium",
  },
};

export const LargeSteps: Story = {
  args: {
    steps: [
      { number: 1, title: "Step 1" },
      { number: 2, title: "Step 2" },
      { number: 3, title: "Step 3" },
    ],
    currentStep: 2,
    size: "large",
  },
};

/**
 * How to use Stepper with URL updates (React Router example):
 *
 * import { useNavigate } from 'react-router-dom';
 * import { useState } from 'react';
 *
 * const steps = [
 *   { number: 1, title: 'Personal Info' },
 *   { number: 2, title: 'Address' },
 *   { number: 3, title: 'Payment' },
 * ];
 *
 * const MyStepper = () => {
 *   const navigate = useNavigate();
 *   const [currentStep, setCurrentStep] = useState(1);
 *
 *   const handleStepChange = (step) => {
 *     setCurrentStep(step);
 *     navigate(`/wizard/step/${step}`);
 *   };
 *
 *   return (
 *     <Stepper
 *       steps={steps}
 *       currentStep={currentStep}
 *       onStepChange={handleStepChange}
 *       stepClickable
 *     />
 *   );
 * };
 */
