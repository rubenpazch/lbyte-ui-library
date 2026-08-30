import React from "react";
import styles from "./OverlayLoader.module.css";

export type OverlayLoaderVariant = "default" | "success" | "danger";

export interface OverlayLoaderProps {
  /** Whether the overlay is shown. When false it fades out and stops capturing pointer events. */
  visible: boolean;
  /** Primary line describing what is happening (e.g. "Estamos cargando la aplicación"). */
  message?: string;
  /** Optional emphasized heading rendered above the message. */
  title?: string;
  /** Tone for the spinner accent. */
  variant?: OverlayLoaderVariant;
  /** Accessible label for the spinner (screen readers). Defaults to the message or "Cargando". */
  spinnerLabel?: string;
  /** Extra class applied to the root overlay element. */
  className?: string;
}

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

/**
 * Presentational full-screen loading overlay. It is fully controlled: the
 * consumer decides when it is `visible` and which `message` it shows, so the
 * same component can express every loading state (boot, sign-in, sign-out,…).
 * It keeps no state and performs no side effects — the fade in/out is CSS only.
 */
const OverlayLoader: React.FC<OverlayLoaderProps> = ({
  visible,
  message,
  title,
  variant = "default",
  spinnerLabel,
  className,
}) => {
  return (
    <div
      className={classNames(styles.overlay, styles[variant], className)}
      data-visible={visible ? "true" : "false"}
      role="status"
      aria-live="polite"
      aria-hidden={visible ? undefined : "true"}
    >
      <div className={styles.content}>
        <span
          className={styles.spinner}
          role="progressbar"
          aria-label={spinnerLabel ?? message ?? "Cargando"}
        />
        {title ? <p className={styles.title}>{title}</p> : null}
        {message ? <p className={styles.message}>{message}</p> : null}
      </div>
    </div>
  );
};

export default OverlayLoader;
