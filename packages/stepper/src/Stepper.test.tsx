/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressSteps from "./Stepper";
import styles from "./Stepper.module.css";

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

  it("highlights current step with active state", () => {
    render(<ProgressSteps steps={twoSteps} currentStep={1} />);

    const step1 = screen.getByTestId("step-circle-1");
    const step2 = screen.getByTestId("step-circle-2");

    expect(step1).toHaveAttribute("data-active", "true");
    expect(step1.className).toContain(styles.circleActive);
    expect(step2).toHaveAttribute("data-future", "true");
    expect(step2.className).toContain(styles.circleFuture);
  });

  it("highlights completed steps correctly", () => {
    render(<ProgressSteps steps={twoSteps} currentStep={2} />);

    const step1 = screen.getByTestId("step-circle-1");
    const step2 = screen.getByTestId("step-circle-2");

    // Step 1 is completed, step 2 is active
    expect(step1).toHaveAttribute("data-completed", "true");
    expect(step1.className).toContain(styles.circleCompleted);
    expect(step2).toHaveAttribute("data-active", "true");
    expect(step2.className).toContain(styles.circleActive);
  });

  it("applies correct color to current and completed step titles", () => {
    render(<ProgressSteps steps={twoSteps} currentStep={1} />);

    const step1Title = screen.getByTestId("step-title-1");
    const step2Title = screen.getByTestId("step-title-2");

    expect(step1Title.className).toContain(styles.titleActive);
    expect(step2Title.className).toContain(styles.titleFuture);
  });

  it("applies correct classes to completed step titles", () => {
    render(<ProgressSteps steps={threeSteps} currentStep={3} />);

    const step1Title = screen.getByTestId("step-title-1");
    const step2Title = screen.getByTestId("step-title-2");
    const step3Title = screen.getByTestId("step-title-3");

    expect(step1Title.className).toContain(styles.titleCompleted);
    expect(step2Title.className).toContain(styles.titleCompleted);
    expect(step3Title.className).toContain(styles.titleActive);
  });

  it("renders connector lines between steps", () => {
    render(<ProgressSteps steps={twoSteps} currentStep={1} />);

    // Should have 1 connector line for 2 steps
    const connector = screen.getByTestId("connector-1");
    expect(connector).toBeInTheDocument();
    expect(connector.className).toContain(styles.connector);
  });

  it("highlights connector line when step is completed", () => {
    render(<ProgressSteps steps={twoSteps} currentStep={2} />);

    const connector = screen.getByTestId("connector-1");
    expect(connector.className).toContain(styles.connectorCompleted);
  });

  it("does not highlight connector line for incomplete steps", () => {
    render(<ProgressSteps steps={twoSteps} currentStep={1} />);

    const connector = screen.getByTestId("connector-1");
    expect(connector.className).toContain(styles.connectorIncomplete);
  });

  it("renders correct number of connectors for multiple steps", () => {
    render(<ProgressSteps steps={threeSteps} currentStep={1} />);

    // Should have 2 connector lines for 3 steps
    const connector1 = screen.getByTestId("connector-1");
    const connector2 = screen.getByTestId("connector-2");
    expect(connector1).toBeInTheDocument();
    expect(connector2).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <ProgressSteps
        steps={twoSteps}
        currentStep={1}
        className="custom-class"
      />,
    );

    const container = screen.getByTestId("progress-steps");
    expect(container.className).toContain("custom-class");
  });

  it("handles single step without connector", () => {
    render(
      <ProgressSteps
        steps={[{ number: 1, title: "Only Step" }]}
        currentStep={1}
      />,
    );

    const connector = screen.queryByTestId("connector-1");
    expect(connector).not.toBeInTheDocument();
  });

  it("handles step numbers greater than current step", () => {
    render(<ProgressSteps steps={threeSteps} currentStep={1} />);

    const step2 = screen.getByTestId("step-circle-2");
    const step3 = screen.getByTestId("step-circle-3");

    expect(step2).toHaveAttribute("data-future", "true");
    expect(step3).toHaveAttribute("data-future", "true");
  });

  it("renders with container class", () => {
    render(<ProgressSteps steps={twoSteps} currentStep={1} />);

    const container = screen.getByTestId("progress-steps");
    expect(container.className).toContain(styles.container);
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

  it("uses medium size by default", () => {
    render(
      <ProgressSteps
        steps={[
          { number: 1, title: "Step 1" },
          { number: 2, title: "Step 2" },
        ]}
        currentStep={1}
      />,
    );
    const stepCircle = screen.getByTestId("step-circle-1");
    expect(stepCircle.className).toContain(styles.circleMedium);
  });
});
