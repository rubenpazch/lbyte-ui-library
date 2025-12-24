import React from "react";

export interface Step {
  number: number;
  title: string;
}

interface Stepper {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const ProgressSteps: React.FC<Stepper> = ({
  steps,
  currentStep,
  className = "",
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step.number <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {step.number}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  step.number <= currentStep ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-4 mt-[-20px] ${
                  step.number < currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
