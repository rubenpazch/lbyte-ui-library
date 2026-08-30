import React from "react";
import styles from "./InlineLoader.module.css";

export type InlineLoaderVariant = "default" | "success" | "danger";

export interface InlineLoaderProps {
  /** Optional line describing what is loading (e.g. "Cargando módulo…"). */
  message?: string;
  /** Tone for the spinner accent. */
  variant?: InlineLoaderVariant;
  /**
   * Stretch to fill the available width and height of the parent and center
   * its content, instead of rendering as a compact inline card. Use it when the
   * loader owns a whole region (e.g. a route's content slot).
   */
  fill?: boolean;
  /** Accessible label for the spinner. Defaults to the message or "Cargando". */
  spinnerLabel?: string;
  /** Extra class applied to the root element. */
  className?: string;
}

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

/**
 * Contained, non-blocking loading indicator. Unlike `OverlayLoader` it flows
 * inside its parent (no fixed positioning), so it can fill just a content
 * region — e.g. the microfrontend slot while its bundle mounts — without
 * covering the rest of the shell (the sidebar stays interactive).
 */
const InlineLoader: React.FC<InlineLoaderProps> = ({
  message,
  variant = "default",
  fill = false,
  spinnerLabel,
  className,
}) => {
  return (
    <div
      className={classNames(
        styles.loader,
        styles[variant],
        fill && styles.fill,
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <span
        className={styles.spinner}
        role="progressbar"
        aria-label={spinnerLabel ?? message ?? "Cargando"}
      />
      {message ? <span className={styles.message}>{message}</span> : null}
    </div>
  );
};

export default InlineLoader;
