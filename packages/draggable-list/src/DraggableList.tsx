import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./DraggableList.module.css";

interface DraggableItemProps {
  id: string | number;
  children: React.ReactNode;
  className?: string;
  variant: "default" | "outline" | "subtle";
  size: "sm" | "md" | "lg";
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  children,
  className = "",
  variant,
  size,
}) => {
  const toPascal = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data-testid={`draggable-item-${id}`}
      className={[
        styles.item,
        styles[
          `itemVariant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`
        ],
        styles[`itemSize${toPascal(size)}`],
        className,
        isDragging && styles.itemDragging,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
};

export interface DraggableListProps<T> {
  items: T[];
  onReorder: (newItems: T[]) => void;
  getItemId: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  variant?: "default" | "outline" | "subtle";
  size?: "sm" | "md" | "lg";
  gap?: "sm" | "md" | "lg";
}

function DraggableList<T>({
  items,
  onReorder,
  getItemId,
  renderItem,
  className = "",
  itemClassName = "",
  variant = "default",
  size = "md",
  gap = "md",
}: DraggableListProps<T>) {
  const classNames = (...classes: Array<string | undefined | false>) =>
    classes.filter(Boolean).join(" ");

  const toPascal = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex(
        (item) => getItemId(item).toString() === active.id,
      );
      const newIndex = items.findIndex(
        (item) => getItemId(item).toString() === over.id,
      );

      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => getItemId(item).toString())}
        strategy={verticalListSortingStrategy}
      >
        <div
          className={classNames(
            styles.list,
            styles[`listGap${toPascal(gap)}`],
            className,
          )}
          data-testid="draggable-list"
        >
          {items.map((item) => (
            <DraggableItem
              key={getItemId(item)}
              id={getItemId(item)}
              className={itemClassName}
              variant={variant}
              size={size}
            >
              {renderItem(item)}
            </DraggableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default DraggableList;
