import React from "react";

export interface Step {
  number: number;
  title: string;
  link?: string;
  onClick?: () => void;
}

type StepperSize = "small" | "medium" | "large";
interface Stepper {
  steps: Step[];
  currentStep: number;
  className?: string;
  stepClickable?: boolean;
  onStepChange?: (step: number) => void;
  size?: StepperSize;
}

const sizeMap = {
  small: {
    circle: "w-6 h-6 text-xs",
    title: "text-xs",
    ring: "ring-2",
  },
  medium: {
    circle: "w-10 h-10 text-base",
    title: "text-sm",
    ring: "ring-4",
  },
  large: {
    circle: "w-16 h-16 text-xl",
    title: "text-lg",
    ring: "ring-8",
  },
};

const ProgressSteps: React.FC<Stepper> = ({
  steps,
  currentStep,
  className = "",
  stepClickable = false,
  onStepChange,
  size = "medium",
}) => {
  const sizeStyles = sizeMap[size] || sizeMap.medium;
  const handleStepClick = (step: Step) => {
    if (step.onClick) step.onClick();
    if (onStepChange) onStepChange(step.number);
  };
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isClickable =
            stepClickable && (step.link || step.onClick || onStepChange);
          const isActive = step.number === currentStep;
          const isFuture = step.number > currentStep;
          const isClickableStep = isClickable && !isActive;
          const stepContent = (
            <div className="flex flex-col items-center">
              <div
                className={`rounded-full flex items-center justify-center font-semibold transition-all
                  ${sizeStyles.circle}
                  ${isActive ? `bg-blue-600 text-white ${sizeStyles.ring} ring-blue-300 shadow-lg scale-110` : ""}
                  ${!isActive && !isFuture ? "bg-blue-50 text-blue-600" : ""}
                  ${isFuture ? "bg-gray-300 text-gray-600" : ""}
                `}
              >
                {step.number}
              </div>
              <span
                className={`mt-2 font-medium transition-all
                  ${sizeStyles.title}
                  ${isActive ? "text-blue-700 font-bold" : ""}
                  ${isClickableStep ? "text-blue-600 underline cursor-pointer hover:text-blue-800" : ""}
                  ${!isActive && !isClickableStep && !isFuture ? "text-blue-600" : ""}
                  ${isFuture ? "text-gray-500" : ""}
                `}
              >
                {step.title}
              </span>
            </div>
          );
          return (
            <div key={step.number} className="flex items-center flex-1">
              {isClickable ? (
                step.link ? (
                  <a
                    href={step.link}
                    className="hover:underline focus:outline-none"
                    tabIndex={0}
                  >
                    {stepContent}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStepClick(step)}
                    className="bg-transparent border-none p-0 m-0 focus:outline-none"
                  >
                    {stepContent}
                  </button>
                )
              ) : (
                stepContent
              )}
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-4 mt-[-20px] ${
                    step.number < currentStep ? "bg-blue-600" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;
