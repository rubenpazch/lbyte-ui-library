import * as React from "react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "spinner" | "dots" | "pulse" | "ring";
  inline?: boolean;
  color?: "blue" | "gray" | "white";
}

/**
 * LoadingSpinner component
 * Displays a loading indicator with multiple style variants
 *
 * @param variant - 'spinner' (default circular spinner), 'dots' (three bouncing dots), 'pulse' (pulsing circle), 'ring' (rotating ring)
 * @param inline - If true, removes centering and margins for inline use (e.g., in buttons or inputs)
 * @param color - Color scheme: 'blue' (default), 'gray', 'white'
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  size = "md",
  className = "",
  variant = "spinner",
  inline = false,
  color = "blue",
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const colorClasses = {
    blue: "border-blue-600",
    gray: "border-gray-600",
    white: "border-white",
  };

  const dotColorClasses = {
    blue: "bg-blue-600",
    gray: "bg-gray-600",
    white: "bg-white",
  };

  const dotSizeClasses = {
    sm: "h-1.5 w-1.5",
    md: "h-2.5 w-2.5",
    lg: "h-3.5 w-3.5",
  };

  // Spinner variant (circular border)
  if (variant === "spinner") {
    return (
      <div
        className={
          inline ? className : `flex justify-center items-center ${className}`
        }
      >
        <div className={inline ? "" : "text-center"}>
          <div
            className={`animate-spin rounded-full border-2 ${colorClasses[color]} ${sizeClasses[size]} ${inline ? "" : "mx-auto mb-4"}`}
            style={{
              borderTopColor: "transparent",
              borderRightColor: "transparent",
            }}
          ></div>
          {message && <p className="text-gray-600 text-sm mt-2">{message}</p>}
        </div>
      </div>
    );
  }

  // Dots variant (three bouncing dots)
  if (variant === "dots") {
    return (
      <div
        className={
          inline ? className : `flex justify-center items-center ${className}`
        }
      >
        <div className={inline ? "flex gap-1" : "text-center"}>
          <div className={`flex gap-1 ${inline ? "" : "mx-auto mb-4"}`}>
            <div
              className={`${dotSizeClasses[size]} ${dotColorClasses[color]} rounded-full animate-bounce`}
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className={`${dotSizeClasses[size]} ${dotColorClasses[color]} rounded-full animate-bounce`}
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className={`${dotSizeClasses[size]} ${dotColorClasses[color]} rounded-full animate-bounce`}
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
          {message && <p className="text-gray-600 text-sm mt-2">{message}</p>}
        </div>
      </div>
    );
  }

  // Pulse variant (pulsing circle)
  if (variant === "pulse") {
    return (
      <div
        className={
          inline ? className : `flex justify-center items-center ${className}`
        }
      >
        <div className={inline ? "" : "text-center"}>
          <div
            className={`${sizeClasses[size]} ${dotColorClasses[color]} rounded-full animate-pulse ${inline ? "" : "mx-auto mb-4"}`}
          ></div>
          {message && <p className="text-gray-600 text-sm mt-2">{message}</p>}
        </div>
      </div>
    );
  }

  // Ring variant (rotating ring with gradient)
  if (variant === "ring") {
    const ringColorMap = {
      blue: "border-blue-600",
      gray: "border-gray-600",
      white: "border-white",
    };

    return (
      <div
        className={
          inline ? className : `flex justify-center items-center ${className}`
        }
      >
        <div className={inline ? "" : "text-center"}>
          <div
            className={`relative ${sizeClasses[size]} ${inline ? "" : "mx-auto mb-4"}`}
          >
            <div
              className={`absolute inset-0 rounded-full border-2 ${colorClasses[color]} opacity-25`}
            ></div>
            <div
              className={`absolute inset-0 rounded-full border-2 border-transparent ${ringColorMap[color]} animate-spin`}
              style={{
                borderTopColor: "currentColor",
                borderRightColor: "transparent",
                borderBottomColor: "transparent",
                borderLeftColor: "transparent",
              }}
            ></div>
          </div>
          {message && <p className="text-gray-600 text-sm mt-2">{message}</p>}
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingSpinner;
