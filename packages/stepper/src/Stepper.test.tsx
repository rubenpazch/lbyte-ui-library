/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressSteps from "./Stepper";

describe("ProgressSteps", () => {
  const twoSteps = [
    { number: 1, title: "Basic Information" },
    { number: 2, title: "Lenses and Frames" },
  ];

  const threeSteps = [
    { number: 1, title: "Step One" },
    { number: 2, title: "Step Two" },
    { number: 3, title: "Step Three" },
  ];

  it("renders all steps", () => {
    render(<ProgressSteps steps={twoSteps} currentStep={1} />);

    expect(screen.getByText("Basic Information")).toBeInTheDocument();
    expect(screen.getByText("Lenses and Frames")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("highlights current step with blue background", () => {
    render(<ProgressSteps steps={twoSteps} currentStep={1} />);

    const step1 = screen.getByText("1");
    const step2 = screen.getByText("2");

    expect(step1.className).toContain("bg-blue-600");
    expect(step1.className).toContain("text-white");
    expect(step2.className).toContain("bg-gray-300");
    expect(step2.className).toContain("text-gray-600");
  });

  it("highlights completed steps with blue-50 background and blue text", () => {
    render(<ProgressSteps steps={twoSteps} currentStep={2} />);

    const step1 = screen.getByText("1");
    const step2 = screen.getByText("2");

    // Step 1 is completed, step 2 is active
    expect(step1.className).toContain("bg-blue-50");
    expect(step1.className).toContain("text-blue-600");
    expect(step2.className).toContain("bg-blue-600");
    expect(step2.className).toContain("text-white");
  });

  it("applies correct color to current and completed step titles", () => {
    render(<ProgressSteps steps={twoSteps} currentStep={1} />);

    const step1Title = screen.getByText("Basic Information");
    const step2Title = screen.getByText("Lenses and Frames");

    expect(step1Title.className).toContain("text-blue-700"); // active step title
    expect(step1Title.className).toContain("font-bold");
    expect(step2Title.className).toContain("text-gray-500");
  });

  it("applies blue color to completed step titles, bold and blue-700 to active", () => {
    render(<ProgressSteps steps={threeSteps} currentStep={3} />);

    const step1Title = screen.getByText("Step One");
    const step2Title = screen.getByText("Step Two");
    const step3Title = screen.getByText("Step Three");

    expect(step1Title.className).toContain("text-blue-600");
    expect(step2Title.className).toContain("text-blue-600");
    expect(step3Title.className).toContain("text-blue-700");
    expect(step3Title.className).toContain("font-bold");
  });

  it("renders connector lines between steps", () => {
    const { container } = render(
      <ProgressSteps steps={twoSteps} currentStep={1} />,
    );

    // Should have 1 connector line for 2 steps
    const connectors = container.querySelectorAll(".h-1.flex-1");
    expect(connectors).toHaveLength(1);
  });

  it("highlights connector line when step is completed", () => {
    const { container } = render(
      <ProgressSteps steps={twoSteps} currentStep={2} />,
    );

    const connector = container.querySelector(".h-1.flex-1");
    expect(connector?.className).toContain("bg-blue-600");
  });

  it("does not highlight connector line for incomplete steps", () => {
    const { container } = render(
      <ProgressSteps steps={twoSteps} currentStep={1} />,
    );

    const connector = container.querySelector(".h-1.flex-1");
    expect(connector?.className).toContain("bg-gray-300");
  });

  it("renders correct number of connectors for multiple steps", () => {
    const { container } = render(
      <ProgressSteps steps={threeSteps} currentStep={1} />,
    );

    // Should have 2 connector lines for 3 steps
    const connectors = container.querySelectorAll(".h-1.flex-1");
    expect(connectors).toHaveLength(2);
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProgressSteps
        steps={twoSteps}
        currentStep={1}
        className="custom-class"
      />,
    );

    const wrapper = container.querySelector(".custom-class");
    expect(wrapper).toBeInTheDocument();
  });

  it("handles single step without connector", () => {
    const { container } = render(
      <ProgressSteps
        steps={[{ number: 1, title: "Only Step" }]}
        currentStep={1}
      />,
    );

    const connectors = container.querySelectorAll(".h-1.flex-1");
    expect(connectors).toHaveLength(0);
  });

  it("handles step numbers greater than current step", () => {
    render(<ProgressSteps steps={threeSteps} currentStep={1} />);

    const step2 = screen.getByText("2");
    const step3 = screen.getByText("3");

    expect(step2.className).toContain("bg-gray-300");
    expect(step3.className).toContain("bg-gray-300");
  });

  it("renders with default className when not provided", () => {
    const { container } = render(
      <ProgressSteps steps={twoSteps} currentStep={1} />,
    );

    const wrapper = container.querySelector(".mb-8");
    expect(wrapper).toBeInTheDocument();
  });

  it("renders clickable steps with link and onClick", () => {
    const handleClick = jest.fn();
    render(
      <ProgressSteps
        steps={[
          { number: 1, title: "Step One", link: "#one" },
          { number: 2, title: "Step Two", onClick: handleClick },
          { number: 3, title: "Step Three" },
        ]}
        currentStep={2}
        stepClickable={true}
      />,
    );
    // Link step
    const linkStep = screen.getByText("Step One").closest("a");
    expect(linkStep).toHaveAttribute("href", "#one");
    // Button step
    const buttonStep = screen.getByText("Step Two").closest("button");
    expect(buttonStep).toBeInTheDocument();
    buttonStep && buttonStep.click();
    expect(handleClick).toHaveBeenCalled();
    // Non-clickable step
    const plainStep = screen.getByText("Step Three");
    expect(plainStep.closest("a")).toBeNull();
    expect(plainStep.closest("button")).toBeNull();
  });

  it("calls onStepChange when a step is clicked", () => {
    const handleStepChange = jest.fn();
    render(
      <ProgressSteps
        steps={[
          { number: 1, title: "Step 1" },
          { number: 2, title: "Step 2" },
        ]}
        currentStep={2}
        stepClickable={true}
        onStepChange={handleStepChange}
      />,
    );
    // Only step 1 is clickable (not active)
    const step1 = screen.getByText("Step 1");
    step1.click();
    expect(handleStepChange).toHaveBeenCalledWith(1);
  });

  it("calls both onClick and onStepChange when both are provided", () => {
    const handleStepChange = jest.fn();
    const handleClick = jest.fn();
    render(
      <ProgressSteps
        steps={[
          { number: 1, title: "Step 1", onClick: handleClick },
          { number: 2, title: "Step 2" },
        ]}
        currentStep={2}
        stepClickable={true}
        onStepChange={handleStepChange}
      />,
    );
    const step1 = screen.getByText("Step 1");
    step1.click();
    expect(handleClick).toHaveBeenCalled();
    expect(handleStepChange).toHaveBeenCalledWith(1);
  });

  it("falls back to medium size if invalid size is provided", () => {
    render(
      <ProgressSteps
        steps={[
          { number: 1, title: "Step 1" },
          { number: 2, title: "Step 2" },
        ]}
        currentStep={1}
        size={"giant" as any}
      />,
    );
    // Should use medium size classes
    const stepCircle = screen.getByText("1");
    expect(stepCircle.className).toContain("w-10");
    expect(stepCircle.className).toContain("h-10");
    expect(stepCircle.className).toContain("text-base");
  });
});
