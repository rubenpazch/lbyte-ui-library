import React from "react";

export interface IdCardIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  "ref"
> {
  /** sm 16px · md 20px · lg 24px. */
  size?: "sm" | "md" | "lg";
  /** Texto para lectores de pantalla. Sin él, el icono es decorativo (aria-hidden). */
  title?: string;
}

const PX = { sm: 16, md: 20, lg: 24 } as const;

/** Carnets, credenciales y membresías. */
export default function IdCardIcon({
  size = "md",
  title,
  ...props
}: IdCardIconProps) {
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
      <path d="M16 10h2" />
      <path d="M16 14h2" />
      <path d="M6.17 15a3 3 0 0 1 5.66 0" />
      <circle cx="9" cy="11" r="2" />
      <rect x="2" y="5" width="20" height="14" rx="2" />
    </svg>
  );
}
