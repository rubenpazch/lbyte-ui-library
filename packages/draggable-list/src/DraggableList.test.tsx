import React from "react";
import { render, screen } from "@testing-library/react";
import DraggableList from "./DraggableList";
import styles from "./DraggableList.module.css";

const items = [
  { id: "1", label: "First" },
  { id: "2", label: "Second" },
  { id: "3", label: "Third" },
];

test("renders DraggableList", () => {
  render(
    <DraggableList
      items={items}
      onReorder={() => {}}
      getItemId={(item) => item.id}
      renderItem={(item) => <span>{item.label}</span>}
    />,
  );

  const element = screen.getByTestId("draggable-list");
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass(styles.list);
  expect(screen.getByText("First")).toBeInTheDocument();
  expect(screen.getByText("Second")).toBeInTheDocument();
  expect(screen.getByText("Third")).toBeInTheDocument();
});

test("applies variant, size, and gap classes", () => {
  render(
    <DraggableList
      items={items}
      onReorder={() => {}}
      getItemId={(item) => item.id}
      renderItem={(item) => <span>{item.label}</span>}
      variant="subtle"
      size="sm"
      gap="lg"
      itemClassName="custom-item"
    />,
  );

  const list = screen.getByTestId("draggable-list");
  expect(list).toHaveClass(styles.list);
  expect(list).toHaveClass(styles.listGapLg);

  const firstItem = screen.getByTestId("draggable-item-1");
  expect(firstItem).toHaveClass(styles.itemVariantSubtle);
  expect(firstItem).toHaveClass(styles.itemSizeSm);
  expect(firstItem).toHaveClass("custom-item");
});
