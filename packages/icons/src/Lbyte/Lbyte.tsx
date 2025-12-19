import React, { SVGAttributes } from "react";
import styles from "../index.module.css";
import { SVGAttributesProps } from "../shared";

export type IconSVGAttributes = SVGAttributes<HTMLElement> & SVGAttributesProps;

const Lbyte = ({ size, width, height }: IconSVGAttributes) => {
  const remSize =
    size === "small"
      ? "1rem"
      : size === "medium"
        ? "2rem"
        : size === "large"
          ? "3rem"
          : size === "x-large"
            ? "4rem"
            : "2rem";
  const custom = width && height ? width : "2rem";

  return (
    <svg
      width={size ? remSize : custom}
      height={size ? remSize : custom}
      className={styles.color}
      viewBox="0 0 128.29 59.134"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          id="rect4505"
          d="M-889.496 416.46H-787.345V584.616H-889.496z"
        ></path>
      </defs>
      <g transform="translate(-29.522 -122.167)">
        <g>
          <g transform="translate(0 4.078)">
            <rect
              width="36.591"
              height="59.134"
              x="29.522"
              y="118.089"
              fill="#ff7f2a"
              strokeWidth="0.265"
              ry="3.209"
            ></rect>
            <text
              fill="#fff"
              fillOpacity="1"
              stroke="none"
              fontFamily="American Typewriter"
              fontSize="96"
              fontStretch="normal"
              fontStyle="normal"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(.45241 0 0 .63728 436.557 -161.175)"
              xmlSpace="preserve"
              style={{
                lineHeight: "1.45",
                whiteSpace: "pre",
              }}
            >
              <tspan x="-889.496" y="514.222">
                L
              </tspan>
            </text>
          </g>
          <text
            xmlSpace="preserve"
            style={{ lineHeight: "1.25" }}
            x="76.84"
            y="153.447"
            fill="#ff7f2a"
            fillOpacity="1"
            stroke="none"
            strokeWidth="1.183"
            fontFamily="sans-serif"
            fontSize="47.326"
            fontStyle="normal"
            fontWeight="normal"
            transform="scale(.90539 1.1045)"
          >
            <tspan
              style={{}}
              x="76.84"
              y="153.447"
              fill="#ff7f2a"
              strokeWidth="1.183"
              fontFamily="American Typewriter"
              fontStretch="normal"
              fontStyle="normal"
              fontVariant="normal"
              fontWeight="normal"
            >
              byte
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
};

export default Lbyte;
