import React from "react";

export interface FileSpreadsheetIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  "ref"
> {
  /** sm 16px · md 20px · lg 24px. */
  size?: "sm" | "md" | "lg";
  /** Texto para lectores de pantalla. Sin él, el icono es decorativo (aria-hidden). */
  title?: string;
}

const PX = { sm: 16, md: 20, lg: 24 } as const;

/** Exportar a Excel o hojas de cálculo. */
export default function FileSpreadsheetIcon({
  size = "md",
  title,
  ...props
}: FileSpreadsheetIconProps) {
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
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <path d="M8 13h2" />
      <path d="M14 13h2" />
      <path d="M8 17h2" />
      <path d="M14 17h2" />
    </svg>
  );
}
