import React from "react";
import { toLegacySize } from "@rubenpazch/shared";
import styles from "./Stepper.module.css";

export interface Step {
  number: number;
  title: string;
  link?: string;
  onClick?: () => void;
}

export type StepperSize = "small" | "medium" | "large" | "sm" | "md" | "lg";
interface Stepper {
  steps: Step[];
  currentStep: number;
  className?: string;
  stepClickable?: boolean;
  /** Nombre accesible de la navegación de pasos (por defecto "Progreso"). */
  ariaLabel?: string;
  onStepChange?: (step: number) => void;
  size?: StepperSize;
}

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const sizeMap = {
  small: {
    circle: styles.circleSmall,
    title: styles.titleSmall,
    ring: styles.circleActiveSmall,
  },
  medium: {
    circle: styles.circleMedium,
    title: styles.titleMedium,
    ring: styles.circleActiveMedium,
  },
  large: {
    circle: styles.circleLarge,
    title: styles.titleLarge,
    ring: styles.circleActiveLarge,
  },
};

const ProgressSteps: React.FC<Stepper> = ({
  steps,
  currentStep,
  className = "",
  stepClickable = false,
  onStepChange,
  ariaLabel = "Progreso",
  size: sizeProp = "medium",
}) => {
  const size = toLegacySize(sizeProp);
  const sizeStyles = sizeMap[size] || sizeMap.medium;
  const handleStepClick = (step: Step) => {
    if (step.onClick) step.onClick();
    if (onStepChange) onStepChange(step.number);
  };
  return (
    <nav
      aria-label={ariaLabel}
      className={classNames(styles.container, className)}
      data-testid="progress-steps"
    >
      <div className={styles.stepsContainer} role="list">
        {steps.map((step, index) => {
          const isClickable =
            stepClickable && (step.link || step.onClick || onStepChange);
          const isActive = step.number === currentStep;
          const isFuture = step.number > currentStep;
          const isClickableStep = isClickable && !isActive;
          const stepContent = (
            <div className={styles.stepContent}>
              <div
                className={classNames(
                  styles.circle,
                  sizeStyles.circle,
                  isActive && styles.circleActive,
                  isActive && sizeStyles.ring,
                  !isActive && !isFuture && styles.circleCompleted,
                  isFuture && styles.circleFuture,
                )}
                data-testid={`step-circle-${step.number}`}
                data-active={isActive}
                data-completed={!isActive && !isFuture}
                data-future={isFuture}
              >
                {step.number}
              </div>
              <span
                className={classNames(
                  styles.title,
                  sizeStyles.title,
                  isActive && styles.titleActive,
                  isClickableStep && styles.titleClickable,
                  !isActive &&
                    !isClickableStep &&
                    !isFuture &&
                    styles.titleCompleted,
                  isFuture && styles.titleFuture,
                )}
                data-testid={`step-title-${step.number}`}
              >
                {step.title}
              </span>
            </div>
          );
          return (
            <div
              key={step.number}
              className={styles.stepWrapper}
              role="listitem"
              aria-current={isActive ? "step" : undefined}
            >
              {isClickable ? (
                step.link ? (
                  <a href={step.link} className={styles.link} tabIndex={0}>
                    {stepContent}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStepClick(step)}
                    className={styles.button}
                  >
                    {stepContent}
                  </button>
                )
              ) : (
                stepContent
              )}
              {index < steps.length - 1 && (
                <div
                  className={classNames(
                    styles.connector,
                    step.number < currentStep
                      ? styles.connectorCompleted
                      : styles.connectorIncomplete,
                  )}
                  data-testid={`connector-${step.number}`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default ProgressSteps;
