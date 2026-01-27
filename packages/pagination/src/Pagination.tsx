import React from "react";
import PaginationItem from "./PaginationItem";
import styles from "./Pagination.module.css";

export type PaginationShape = "rounded" | "circular";
export type PaginationSize = "small" | "medium" | "large";
export type PaginationVariant = "text" | "outlined";

export interface PaginationProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "onChange"
> {
  /** Total number of pages */
  count?: number;
  /** The current page (1-based) */
  page?: number;
  /** Default page if uncontrolled */
  defaultPage?: number;
  /** Callback when page changes */
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  /** If true, the component is disabled */
  disabled?: boolean;
  /** If true, hide the next-page button */
  hideNextButton?: boolean;
  /** If true, hide the previous-page button */
  hidePrevButton?: boolean;
  /** If true, show the first-page button */
  showFirstButton?: boolean;
  /** If true, show the last-page button */
  showLastButton?: boolean;
  /** Number of always visible pages at the beginning and end */
  boundaryCount?: number;
  /** Number of always visible pages before and after the current page */
  siblingCount?: number;
  /** The shape of the pagination items */
  shape?: PaginationShape;
  /** The size of the pagination component */
  size?: PaginationSize;
  /** The variant to use */
  variant?: PaginationVariant;
  /** Custom render function for items */
  renderItem?: (item: PaginationItemType) => React.ReactNode;
}

export interface PaginationItemType {
  page: number;
  type:
    | "page"
    | "first"
    | "last"
    | "next"
    | "previous"
    | "start-ellipsis"
    | "end-ellipsis";
  selected: boolean;
  disabled: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const classNames = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// Utility to generate pagination items
const usePagination = (props: {
  count: number;
  page: number;
  boundaryCount: number;
  siblingCount: number;
  showFirstButton: boolean;
  showLastButton: boolean;
  hideNextButton: boolean;
  hidePrevButton: boolean;
}): PaginationItemType[] => {
  const {
    count,
    page,
    boundaryCount,
    siblingCount,
    showFirstButton,
    showLastButton,
    hideNextButton,
    hidePrevButton,
  } = props;

  const items: PaginationItemType[] = [];

  // Helper to create item
  const createItem = (
    pageNum: number,
    type: PaginationItemType["type"],
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  ): PaginationItemType => ({
    page: pageNum,
    type,
    selected: pageNum === page,
    disabled:
      type === "next" ? page >= count : type === "previous" ? page <= 1 : false,
    onClick,
  });

  // First button
  if (showFirstButton) {
    items.push(createItem(1, "first", () => {}));
  }

  // Previous button
  if (!hidePrevButton) {
    items.push(createItem(Math.max(1, page - 1), "previous", () => {}));
  }

  // Start pages
  const startPages: number[] = [];
  for (let i = 1; i <= Math.min(boundaryCount, count); i++) {
    startPages.push(i);
  }

  // End pages
  const endPages: number[] = [];
  for (
    let i = Math.max(count - boundaryCount + 1, boundaryCount + 1);
    i <= count;
    i++
  ) {
    endPages.push(i);
  }

  // Sibling pages
  const siblingStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );

  const siblingEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    count - boundaryCount - 1,
  );

  // Build item list
  const itemList = [
    ...startPages,
    ...(siblingStart > boundaryCount + 2
      ? ["start-ellipsis"]
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...Array.from(
      { length: siblingEnd - siblingStart + 1 },
      (_, i) => siblingStart + i,
    ).filter((p) => p > boundaryCount && p < count - boundaryCount + 1),
    ...(siblingEnd < count - boundaryCount - 1
      ? ["end-ellipsis"]
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),
    ...endPages,
  ];

  // Convert to items
  itemList.forEach((item) => {
    if (item === "start-ellipsis" || item === "end-ellipsis") {
      items.push({
        page: 0,
        type: item,
        selected: false,
        disabled: true,
        onClick: () => {},
      });
    } else if (typeof item === "number") {
      items.push(createItem(item, "page", () => {}));
    }
  });

  // Next button
  if (!hideNextButton) {
    items.push(createItem(Math.min(count, page + 1), "next", () => {}));
  }

  // Last button
  if (showLastButton) {
    items.push(createItem(count, "last", () => {}));
  }

  return items;
};

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      count = 1,
      page: controlledPage,
      defaultPage = 1,
      onChange,
      disabled = false,
      hideNextButton = false,
      hidePrevButton = false,
      showFirstButton = false,
      showLastButton = false,
      boundaryCount = 1,
      siblingCount = 1,
      shape = "rounded",
      size = "medium",
      variant = "text",
      renderItem,
      className,
      ...props
    },
    ref,
  ) => {
    const [page, setPage] = React.useState(defaultPage);
    const currentPage = controlledPage ?? page;

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement>,
      value: number,
    ) => {
      if (!controlledPage) {
        setPage(value);
      }
      if (onChange) {
        onChange(event as any, value);
      }
    };

    const items = usePagination({
      count,
      page: currentPage,
      boundaryCount,
      siblingCount,
      showFirstButton,
      showLastButton,
      hideNextButton,
      hidePrevButton,
    });

    const classes = classNames(styles.root, className);

    return (
      <nav ref={ref} className={classes} {...props}>
        <ul className={styles.ul}>
          {items.map((item, index) => {
            const isDisabled = disabled || item.disabled;

            if (renderItem) {
              return (
                <li key={index}>
                  {renderItem({
                    ...item,
                    disabled: isDisabled,
                    onClick: (e) => {
                      if (!isDisabled && item.type === "page") {
                        handleClick(e, item.page);
                      } else if (!isDisabled && item.type === "next") {
                        handleClick(e, Math.min(count, currentPage + 1));
                      } else if (!isDisabled && item.type === "previous") {
                        handleClick(e, Math.max(1, currentPage - 1));
                      } else if (!isDisabled && item.type === "first") {
                        handleClick(e, 1);
                      } else if (!isDisabled && item.type === "last") {
                        handleClick(e, count);
                      }
                    },
                  })}
                </li>
              );
            }

            return (
              <li key={index}>
                <PaginationItem
                  {...item}
                  disabled={isDisabled}
                  shape={shape}
                  size={size}
                  variant={variant}
                  onClick={(e) => {
                    if (!isDisabled && item.type === "page") {
                      handleClick(e, item.page);
                    } else if (!isDisabled && item.type === "next") {
                      handleClick(e, Math.min(count, currentPage + 1));
                    } else if (!isDisabled && item.type === "previous") {
                      handleClick(e, Math.max(1, currentPage - 1));
                    } else if (!isDisabled && item.type === "first") {
                      handleClick(e, 1);
                    } else if (!isDisabled && item.type === "last") {
                      handleClick(e, count);
                    }
                  }}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";

export default Pagination;
