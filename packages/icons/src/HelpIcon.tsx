import React from "react";

export interface HelpIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  "ref"
> {
  /** sm 16px · md 20px · lg 24px. */
  size?: "sm" | "md" | "lg";
  /** Texto para lectores de pantalla. Sin él, el icono es decorativo (aria-hidden). */
  title?: string;
}

const PX = { sm: 16, md: 20, lg: 24 } as const;

/** Ayuda o preguntas frecuentes. */
export default function HelpIcon({
  size = "md",
  title,
  ...props
}: HelpIconProps) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}
