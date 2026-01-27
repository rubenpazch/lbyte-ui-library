import React from "react";
import { ChevronBarIcon, ChevronIcon } from "@rubenpazch/icons";
import styles from "./PaginationItem.module.css";
import type {
  PaginationShape,
  PaginationSize,
  PaginationVariant,
} from "./Pagination";

export interface PaginationItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> {
  /** The page number */
  page: number;
  /** The type of pagination item */
  type:
    | "page"
    | "first"
    | "last"
    | "next"
    | "previous"
    | "start-ellipsis"
    | "end-ellipsis";
  /** If true, the item is selected/active */
  selected?: boolean;
  /** The shape of the pagination items */
  shape?: PaginationShape;
  /** The size of the component */
  size?: PaginationSize;
  /** The variant to use */
  variant?: PaginationVariant;
}

const classNames = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ");

const iconSizeMap: Record<PaginationSize, "sm" | "md" | "lg"> = {
  small: "sm",
  medium: "md",
  large: "lg",
};

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  (
    {
      page,
      type,
      selected = false,
      disabled = false,
      shape = "rounded",
      size = "medium",
      variant = "text",
      className,
      ...props
    },
    ref,
  ) => {
    // Ellipsis are not interactive
    if (type === "start-ellipsis" || type === "end-ellipsis") {
      // Use ASCII ellipsis to keep output portable across environments
      return (
        <div
          className={classNames(
            styles.item,
            styles.ellipsis,
            styles[`size-${size}`],
          )}
        >
          ...
        </div>
      );
    }

    const isNavigationButton =
      type === "first" ||
      type === "last" ||
      type === "next" ||
      type === "previous";

    const renderNavigationIcon = () => {
      const iconSize = iconSizeMap[size];

      if (type === "first") {
        return (
          <ChevronBarIcon
            direction="left"
            size={iconSize}
            className={styles.icon}
            aria-hidden="true"
          />
        );
      }

      if (type === "last") {
        return (
          <ChevronBarIcon
            direction="right"
            size={iconSize}
            className={styles.icon}
            aria-hidden="true"
          />
        );
      }

      if (type === "next") {
        return (
          <ChevronIcon
            direction="right"
            size={iconSize}
            className={styles.icon}
            aria-hidden="true"
          />
        );
      }

      if (type === "previous") {
        return (
          <ChevronIcon
            direction="left"
            size={iconSize}
            className={styles.icon}
            aria-hidden="true"
          />
        );
      }

      return null;
    };

    const getButtonContent = () => {
      switch (type) {
        case "first":
        case "last":
        case "next":
        case "previous":
          return renderNavigationIcon();
        default:
          return page;
      }
    };

    const classes = classNames(
      styles.item,
      styles.button,
      styles[`size-${size}`],
      styles[`shape-${shape}`],
      styles[`variant-${variant}`],
      selected && styles.selected,
      disabled && styles.disabled,
      isNavigationButton && styles.navigation,
      className,
    );

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        disabled={disabled}
        aria-label={
          type === "first"
            ? "Go to first page"
            : type === "last"
              ? "Go to last page"
              : type === "next"
                ? "Go to next page"
                : type === "previous"
                  ? "Go to previous page"
                  : `Go to page ${page}`
        }
        aria-current={selected ? "true" : undefined}
        {...props}
      >
        {getButtonContent()}
      </button>
    );
  },
);

PaginationItem.displayName = "PaginationItem";

export default PaginationItem;
