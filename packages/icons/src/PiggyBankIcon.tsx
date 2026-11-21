import React from "react";

export interface PiggyBankIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  "ref"
> {
  /** sm 16px · md 20px · lg 24px. */
  size?: "sm" | "md" | "lg";
  /** Texto para lectores de pantalla. Sin él, el icono es decorativo (aria-hidden). */
  title?: string;
}

const PX = { sm: 16, md: 20, lg: 24 } as const;

/** Ahorros o reservas. */
export default function PiggyBankIcon({
  size = "md",
  title,
  ...props
}: PiggyBankIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={PX[size]}
      height={PX[size]}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
      <path d="M16 10h.01" />
      <path d="M2 8v1a2 2 0 0 0 2 2h1" />
    </svg>
  );
}
