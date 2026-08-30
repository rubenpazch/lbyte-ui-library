/**
 * Lbyte design tokens as typed JavaScript values.
 *
 * These mirror the CSS custom properties in `tokens.css` and exist for
 * consumers that style with inline objects instead of CSS (for example the
 * single-spa microfrontends). Keep this file in sync with tokens.css.
 */

export const fontFamily = {
  sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  mono: 'ui-monospace, "SFMono-Regular", "Menlo", "Consolas", monospace',
} as const;

export const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  h1: "2.25rem",
  h2: "1.875rem",
  h3: "1.5rem",
  h4: "1.25rem",
  h5: "1.125rem",
  h6: "1rem",
  body: "1rem",
  small: "0.875rem",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeight = {
  tight: 1.15,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.7,
} as const;

export const letterSpacing = {
  tight: "-0.01em",
  normal: "0",
  wide: "0.04em",
} as const;

export const color = {
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  primary: "#2563eb",
  primaryHover: "#1d4ed8",
  primaryForeground: "#ffffff",
  success: "#16a34a",
  successForeground: "#ffffff",
  warning: "#d97706",
  warningForeground: "#ffffff",
  danger: "#dc2626",
  dangerForeground: "#ffffff",
  info: "#0ea5e9",
  infoForeground: "#ffffff",
  accent: {
    blue: {
      subtle: "#eff6ff",
      border: "#bfdbfe",
      accent: "#3b82f6",
      strong: "#1d4ed8",
    },
    amber: {
      subtle: "#fef3c7",
      border: "#fde68a",
      accent: "#ca8a04",
      strong: "#a16207",
    },
    emerald: {
      subtle: "#ecfdf5",
      border: "#a7f3d0",
      accent: "#10b981",
      strong: "#047857",
    },
    red: {
      subtle: "#fef2f2",
      border: "#fecaca",
      accent: "#ef4444",
      strong: "#b91c1c",
    },
    violet: {
      subtle: "#faf5ff",
      border: "#e9d5ff",
      accent: "#a855f7",
      strong: "#7e22ce",
    },
    indigo: {
      subtle: "#eef2ff",
      border: "#c7d2fe",
      accent: "#6366f1",
      strong: "#4338ca",
    },
    orange: {
      subtle: "#fff7ed",
      border: "#fed7aa",
      accent: "#f97316",
      strong: "#9a3412",
    },
  },
  background: "#ffffff",
  foreground: "#0f172a",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  border: "#e2e8f0",
  ring: "#2563eb",
  link: "#2563eb",
  linkHover: "#1d4ed8",
} as const;

export const space = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
} as const;

export const radius = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

export const shadow = {
  sm: "0 1px 2px rgba(15, 23, 42, 0.08)",
  md: "0 8px 20px rgba(15, 23, 42, 0.08)",
  lg: "0 12px 30px rgba(15, 23, 42, 0.12)",
} as const;

export const tokens = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color,
  space,
  radius,
  shadow,
} as const;

export type Tokens = typeof tokens;

/** Reference a CSS custom property by token name, e.g. cssVar("color-primary"). */
export function cssVar(name: string): string {
  return `var(--lb-${name})`;
}
