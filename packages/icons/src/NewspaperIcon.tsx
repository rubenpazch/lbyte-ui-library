import React from "react";

export interface NewspaperIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  "ref"
> {
  /** sm 16px · md 20px · lg 24px. */
  size?: "sm" | "md" | "lg";
  /** Texto para lectores de pantalla. Sin él, el icono es decorativo (aria-hidden). */
  title?: string;
}

const PX = { sm: 16, md: 20, lg: 24 } as const;

/** Prensa, noticias y acreditaciones de medios. */
export default function NewspaperIcon({
  size = "md",
  title,
  ...props
}: NewspaperIconProps) {
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
      <path d="M15 18h-5" />
      <path d="M18 14h-8" />
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
      <rect width="8" height="4" x="10" y="6" rx="1" />
    </svg>
  );
}
