import * as React from "react";
import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "spinner" | "dots" | "pulse" | "ring";
  inline?: boolean;
  color?: "blue" | "gray" | "white";
}

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
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
  const sizeClass =
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`];
  const colorClass =
    styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`];
  const dotColorClass =
    styles[`dotColor${color.charAt(0).toUpperCase() + color.slice(1)}`];
  const dotSizeClass =
    styles[`dotSize${size.charAt(0).toUpperCase() + size.slice(1)}`];

  // Spinner variant (circular border)
  if (variant === "spinner") {
    return (
      <div
        className={classNames(
          inline ? styles.containerInline : styles.container,
          className,
        )}
        data-testid="loading-spinner"
        data-variant={variant}
        data-size={size}
        data-color={color}
      >
        <div className={inline ? styles.innerInline : styles.inner}>
          <div
            className={classNames(
              styles.spinner,
              styles.spinnerTransparent,
              colorClass,
              sizeClass,
              !inline ? styles.spacingDefault : undefined,
            )}
          ></div>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    );
  }

  // Dots variant (three bouncing dots)
  if (variant === "dots") {
    return (
      <div
        className={classNames(
          inline ? styles.containerInline : styles.container,
          className,
        )}
        data-testid="loading-spinner"
        data-variant={variant}
        data-size={size}
        data-color={color}
      >
        <div className={inline ? styles.innerInline : styles.inner}>
          <div
            className={classNames(
              inline ? styles.dotsContainerInline : styles.dotsContainer,
              !inline ? styles.spacingDefault : undefined,
            )}
          >
            <div
              className={classNames(
                styles.dot,
                dotSizeClass,
                dotColorClass,
                styles.dotDelay1,
              )}
            ></div>
            <div
              className={classNames(
                styles.dot,
                dotSizeClass,
                dotColorClass,
                styles.dotDelay2,
              )}
            ></div>
            <div
              className={classNames(
                styles.dot,
                dotSizeClass,
                dotColorClass,
                styles.dotDelay3,
              )}
            ></div>
          </div>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    );
  }

  // Pulse variant (pulsing circle)
  if (variant === "pulse") {
    return (
      <div
        className={classNames(
          inline ? styles.containerInline : styles.container,
          className,
        )}
        data-testid="loading-spinner"
        data-variant={variant}
        data-size={size}
        data-color={color}
      >
        <div className={inline ? styles.innerInline : styles.inner}>
          <div
            className={classNames(
              styles.pulse,
              sizeClass,
              dotColorClass,
              !inline ? styles.spacingDefault : undefined,
            )}
          ></div>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    );
  }

  // Ring variant (rotating ring with gradient)
  if (variant === "ring") {
    const ringSpinnerColorClass =
      styles[`ringSpinner${color.charAt(0).toUpperCase() + color.slice(1)}`];

    return (
      <div
        className={classNames(
          inline ? styles.containerInline : styles.container,
          className,
        )}
        data-testid="loading-spinner"
        data-variant={variant}
        data-size={size}
        data-color={color}
      >
        <div className={inline ? styles.innerInline : styles.inner}>
          <div
            className={classNames(
              styles.ringContainer,
              sizeClass,
              !inline ? styles.spacingDefault : undefined,
            )}
          >
            <div
              className={classNames(styles.ringBackground, colorClass)}
            ></div>
            <div
              className={classNames(
                styles.ringSpinner,
                styles.ringTransparent,
                ringSpinnerColorClass,
              )}
            ></div>
          </div>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingSpinner;
