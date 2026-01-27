import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Pagination, { type PaginationProps } from "./Pagination";

const meta: Meta<PaginationProps> = {
  title: "Components/Pagination",
  component: Pagination as any,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: { type: "number", min: 1, max: 100 },
      description: "The total number of pages",
    },
    page: {
      control: { type: "number", min: 1 },
      description: "The current page (1-based, controlled)",
    },
    defaultPage: {
      control: { type: "number", min: 1 },
      description: "The default page (1-based, uncontrolled)",
    },
    boundaryCount: {
      control: { type: "number", min: 0, max: 5 },
      description: "Number of pages at the beginning and end",
    },
    siblingCount: {
      control: { type: "number", min: 0, max: 5 },
      description: "Number of pages before and after current page",
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      description: "Size of the pagination component",
    },
    shape: {
      control: "radio",
      options: ["rounded", "circular"],
      description: "Shape of pagination items",
    },
    variant: {
      control: "radio",
      options: ["text", "outlined"],
      description: "Variant style",
    },
    disabled: {
      control: "boolean",
      description: "Disable all pagination controls",
    },
    showFirstButton: {
      control: "boolean",
      description: "Show first page button",
    },
    showLastButton: {
      control: "boolean",
      description: "Show last page button",
    },
    hideNextButton: {
      control: "boolean",
      description: "Hide next page button",
    },
    hidePrevButton: {
      control: "boolean",
      description: "Hide previous page button",
    },
  },
};

export default meta;
type Story = StoryObj<PaginationProps>;

export const Default: Story = {
  args: {
    count: 10,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Pagination
          {...args}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
        />
        <div style={{ fontSize: "0.875rem", color: "#666" }}>
          Current page: {page}
        </div>
      </div>
    );
  },
  args: {
    count: 10,
  },
};

export const WithFirstLast: Story = {
  args: {
    count: 10,
    showFirstButton: true,
    showLastButton: true,
  },
};

export const WithFirstLastIcons: Story = {
  render: (args) => {
    const [page, setPage] = useState(5);
    const [count] = useState(12);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Pagination
          {...args}
          count={count}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          showFirstButton
          showLastButton
        />
        <div style={{ fontSize: "0.875rem", color: "#666" }}>
          Showing navigation icons with first/last controls (page {page} of{" "}
          {count})
        </div>
      </div>
    );
  },
  args: {
    count: 12,
  },
};

export const SmallSize: Story = {
  args: {
    count: 10,
    size: "small",
  },
};

export const LargeSize: Story = {
  args: {
    count: 10,
    size: "large",
  },
};

export const CircularShape: Story = {
  args: {
    count: 10,
    shape: "circular",
  },
};

export const OutlinedVariant: Story = {
  args: {
    count: 10,
    variant: "outlined",
  },
};

export const OutlinedCircular: Story = {
  args: {
    count: 10,
    variant: "outlined",
    shape: "circular",
  },
};

export const CustomBoundaryCount: Story = {
  args: {
    count: 20,
    boundaryCount: 2,
    defaultPage: 10,
  },
};

export const CustomSiblingCount: Story = {
  args: {
    count: 20,
    siblingCount: 2,
    defaultPage: 10,
  },
};

export const ZeroSiblings: Story = {
  args: {
    count: 20,
    siblingCount: 0,
    defaultPage: 10,
  },
};

export const LargePagination: Story = {
  args: {
    count: 100,
    boundaryCount: 1,
    siblingCount: 1,
    showFirstButton: true,
    showLastButton: true,
    defaultPage: 50,
  },
};

export const Disabled: Story = {
  args: {
    count: 10,
    disabled: true,
    defaultPage: 5,
  },
};

export const MinimalControls: Story = {
  args: {
    count: 10,
    hideNextButton: true,
    hidePrevButton: true,
  },
};

export const EdgeStatesWithIcons: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    const count = 8;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Pagination
          {...args}
          count={count}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          showFirstButton
          showLastButton
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => setPage(1)}>Go to first</button>
          <button onClick={() => setPage(count)}>Go to last</button>
        </div>
        <div style={{ fontSize: "0.875rem", color: "#666" }}>
          Edges demonstrate disabled navigation icons when at boundaries
        </div>
      </div>
    );
  },
  args: {
    count: 8,
  },
};

export const SmallOutlined: Story = {
  args: {
    count: 10,
    size: "small",
    variant: "outlined",
    shape: "circular",
    showFirstButton: true,
    showLastButton: true,
  },
};

export const LargeOutlined: Story = {
  args: {
    count: 10,
    size: "large",
    variant: "outlined",
    showFirstButton: true,
    showLastButton: true,
  },
};

export const CustomRender: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Pagination
          {...args}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          renderItem={(item) => {
            if (item.type === "page") {
              return (
                <button
                  onClick={item.onClick}
                  disabled={item.disabled}
                  style={{
                    padding: "8px 16px",
                    border: item.selected
                      ? "2px solid #ff6b6b"
                      : "1px solid #ddd",
                    backgroundColor: item.selected ? "#ff6b6b" : "white",
                    color: item.selected ? "white" : "#333",
                    cursor: item.disabled ? "not-allowed" : "pointer",
                    borderRadius: "4px",
                    fontWeight: item.selected ? "bold" : "normal",
                  }}
                >
                  {item.page}
                </button>
              );
            }
            return null;
          }}
        />
        <div style={{ fontSize: "0.875rem", color: "#666" }}>
          Custom styled pagination (page numbers only)
        </div>
      </div>
    );
  },
  args: {
    count: 10,
    hideNextButton: true,
    hidePrevButton: true,
  },
};

export const WithPageInput: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    const [inputValue, setInputValue] = useState("1");
    const count = args.count ?? 10;

    const clampPage = (value: number) => Math.min(count, Math.max(1, value));

    const updatePageFromInput = () => {
      const parsed = parseInt(inputValue, 10);
      if (Number.isNaN(parsed)) {
        setInputValue(String(page));
        return;
      }
      const nextPage = clampPage(parsed);
      setPage(nextPage);
      setInputValue(String(nextPage));
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <label htmlFor="page-input">Go to page</label>
          <input
            id="page-input"
            type="number"
            min={1}
            max={count}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={updatePageFromInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updatePageFromInput();
              }
            }}
            style={{ padding: "4px 8px", width: "5rem" }}
          />
          <span style={{ color: "#666", fontSize: "0.875rem" }}>/ {count}</span>
        </div>
        <Pagination
          {...args}
          count={count}
          page={page}
          onChange={(_, newPage) => {
            const nextPage = clampPage(newPage);
            setPage(nextPage);
            setInputValue(String(nextPage));
          }}
          showFirstButton
          showLastButton
        />
        <div style={{ fontSize: "0.875rem", color: "#666" }}>
          Page {page} of {count}
        </div>
      </div>
    );
  },
  args: {
    count: 12,
  },
};

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(10);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <label>
            Total Pages:
            <input
              type="number"
              value={count}
              onChange={(e) =>
                setCount(Math.max(1, parseInt(e.target.value) || 1))
              }
              style={{ marginLeft: "0.5rem", padding: "4px 8px" }}
              min="1"
            />
          </label>
        </div>
        <Pagination
          count={count}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          showFirstButton
          showLastButton
        />
        <div style={{ fontSize: "0.875rem", color: "#666" }}>
          Page {page} of {count}
        </div>
      </div>
    );
  },
};
