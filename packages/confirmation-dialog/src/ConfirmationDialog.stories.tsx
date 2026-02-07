import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ConfirmationDialog from "./ConfirmationDialog";
import styles from "./ConfirmationDialog.module.css";

const meta: Meta<typeof ConfirmationDialog> = {
  title: "Components/ConfirmationDialog",
  component: ConfirmationDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default confirmation dialog with standard styling
 */
export const Default: Story = {
  args: {
    isOpen: true,
    title: "Confirm Action",
    message: "Are you sure you want to proceed with this action?",
    confirmText: "Confirm",
    cancelText: "Cancel",
    isDangerous: false,
    isLoading: false,
    onConfirm: () => alert("Confirmed!"),
    onCancel: () => alert("Cancelled!"),
  },
};

/**
 * Dangerous action dialog with red styling to indicate destructive action
 */
export const Dangerous: Story = {
  args: {
    isOpen: true,
    title: "Delete Item",
    message:
      "This action cannot be undone. Are you sure you want to delete this item?",
    confirmText: "Delete",
    cancelText: "Cancel",
    isDangerous: true,
    isLoading: false,
    onConfirm: () => alert("Item deleted!"),
    onCancel: () => alert("Cancelled!"),
  },
};

/**
 * Dialog in loading state with spinner on confirm button
 */
export const Loading: Story = {
  args: {
    isOpen: true,
    title: "Processing",
    message: "Please wait while we process your request...",
    confirmText: "Please Wait",
    cancelText: "Cancel",
    isDangerous: false,
    isLoading: true,
    onConfirm: () => {},
    onCancel: () => alert("Cancelled!"),
  },
};

/**
 * Dangerous dialog in loading state
 */
export const DangerousLoading: Story = {
  args: {
    isOpen: true,
    title: "Deleting",
    message: "Deleting this item. Please wait...",
    confirmText: "Deleting",
    cancelText: "Cancel",
    isDangerous: true,
    isLoading: true,
    onConfirm: () => {},
    onCancel: () => alert("Cancelled!"),
  },
};

/**
 * Dialog with custom text labels
 */
export const CustomLabels: Story = {
  args: {
    isOpen: true,
    title: "Save Changes?",
    message: "You have unsaved changes. Do you want to save before leaving?",
    confirmText: "Save Changes",
    cancelText: "Discard",
    isDangerous: false,
    isLoading: false,
    onConfirm: () => alert("Changes saved!"),
    onCancel: () => alert("Changes discarded!"),
  },
};

/**
 * Dialog with long message text
 */
export const LongMessage: Story = {
  args: {
    isOpen: true,
    title: "Important Notice",
    message:
      "This is a comprehensive confirmation dialog with a longer message that might span multiple lines. It contains important information that the user should read before confirming the action. Please make sure to read all the details carefully before proceeding.",
    confirmText: "I Understand",
    cancelText: "Cancel",
    isDangerous: false,
    isLoading: false,
    onConfirm: () => alert("Confirmed!"),
    onCancel: () => alert("Cancelled!"),
  },
};

/**
 * Dialog in closed state (not visible)
 */
export const Closed: Story = {
  args: {
    isOpen: false,
    title: "Confirm Action",
    message: "Are you sure you want to proceed?",
    confirmText: "Confirm",
    cancelText: "Cancel",
    isDangerous: false,
    isLoading: false,
    onConfirm: () => alert("Confirmed!"),
    onCancel: () => alert("Cancelled!"),
  },
};

/**
 * Interactive story demonstrating dialog state management
 */
export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
        alert("Confirmed successfully!");
      }, 2000);
    };

    return (
      <div className={styles.storyStack}>
        <button onClick={() => setIsOpen(true)} className={styles.storyButton}>
          Open Confirmation Dialog
        </button>
        <ConfirmationDialog
          isOpen={isOpen}
          title="Confirm Action"
          message="Are you sure you want to proceed with this action? Click confirm to see a loading state."
          confirmText="Confirm"
          cancelText="Cancel"
          isDangerous={false}
          isLoading={isLoading}
          onConfirm={handleConfirm}
          onCancel={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

/**
 * Interactive dangerous action story
 */
export const InteractiveDangerous: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
        alert("Item deleted successfully!");
      }, 2000);
    };

    return (
      <div className={styles.storyStack}>
        <button
          onClick={() => setIsOpen(true)}
          className={styles.storyDangerButton}
        >
          Delete Item
        </button>
        <ConfirmationDialog
          isOpen={isOpen}
          title="Delete Item"
          message="This action cannot be undone. Are you sure you want to delete this item permanently?"
          confirmText="Delete"
          cancelText="Keep"
          isDangerous={true}
          isLoading={isLoading}
          onConfirm={handleDelete}
          onCancel={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

/**
 * Comparison of normal vs dangerous dialogs
 */
export const Comparison: Story = {
  render: () => (
    <div className={styles.storyStackLarge}>
      <div>
        <p className={styles.storyHeading}>Normal Dialog</p>
        <ConfirmationDialog
          isOpen={true}
          title="Confirm Submission"
          message="Are you sure you want to submit this form?"
          confirmText="Submit"
          cancelText="Cancel"
          isDangerous={false}
          isLoading={false}
          onConfirm={() => alert("Submitted!")}
          onCancel={() => alert("Cancelled!")}
        />
      </div>
      <div>
        <p className={styles.storyHeading}>Dangerous Dialog</p>
        <ConfirmationDialog
          isOpen={true}
          title="Delete Prescription"
          message="Are you sure you want to delete this prescription? This cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          isDangerous={true}
          isLoading={false}
          onConfirm={() => alert("Deleted!")}
          onCancel={() => alert("Cancelled!")}
        />
      </div>
    </div>
  ),
};
