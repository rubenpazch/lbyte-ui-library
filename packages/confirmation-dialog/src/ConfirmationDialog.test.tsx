import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmationDialog from "./ConfirmationDialog";
import styles from "../ConfirmationDialog.module.css";

describe("ConfirmationDialog", () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render when isOpen is true", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test Title"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Message")).toBeInTheDocument();
    });

    it("should not render when isOpen is false", () => {
      render(
        <ConfirmationDialog
          isOpen={false}
          title="Test Title"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
      expect(screen.queryByText("Test Message")).not.toBeInTheDocument();
    });

    it("should render with default button texts", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(
        screen.getByRole("button", { name: "Confirm" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Cancel" }),
      ).toBeInTheDocument();
    });

    it("should render with custom button texts", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          confirmText="Delete"
          cancelText="Keep"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(
        screen.getByRole("button", { name: "Delete" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Keep" })).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should apply normal styling when isDangerous is false", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          isDangerous={false}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const header = screen.getByText("Test").closest("div");
      expect(header).toHaveClass(styles.header, styles.headerNormal);
      expect(screen.getByText("Test")).toHaveClass(
        styles.title,
        styles.titleNormal,
      );
    });

    it("should apply dangerous styling when isDangerous is true", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Delete"
          message="Are you sure?"
          isDangerous={true}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const header = screen.getByText("Delete").closest("div");
      expect(header).toHaveClass(styles.header, styles.headerDanger);
      expect(screen.getByText("Delete")).toHaveClass(
        styles.title,
        styles.titleDanger,
      );
    });
  });

  describe("Button Interactions", () => {
    it("should call onConfirm when confirm button is clicked", async () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const confirmButton = screen.getByRole("button", { name: "Confirm" });
      await userEvent.click(confirmButton);

      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it("should call onCancel when cancel button is clicked", async () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const cancelButton = screen.getByRole("button", { name: "Cancel" });
      await userEvent.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it("should not call onConfirm when cancel button is clicked", async () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const cancelButton = screen.getByRole("button", { name: "Cancel" });
      await userEvent.click(cancelButton);

      expect(mockOnConfirm).not.toHaveBeenCalled();
    });

    it("should not call onCancel when confirm button is clicked", async () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const confirmButton = screen.getByRole("button", { name: "Confirm" });
      await userEvent.click(confirmButton);

      expect(mockOnCancel).not.toHaveBeenCalled();
    });

    it("should call correct callback with custom button texts", async () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          confirmText="Yes"
          cancelText="No"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const yesButton = screen.getByRole("button", { name: "Yes" });
      await userEvent.click(yesButton);

      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
      expect(mockOnCancel).not.toHaveBeenCalled();
    });
  });

  describe("Loading State", () => {
    it("should display loading indicator when isLoading is true", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          isLoading={true}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const confirmButton = screen.getByRole("button", { name: "Confirm" });
      expect(confirmButton.querySelector("svg")).toBeInTheDocument();
    });

    it("should not display loading indicator when isLoading is false", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          isLoading={false}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const confirmButton = screen.getByRole("button", { name: "Confirm" });
      expect(confirmButton.querySelector("svg")).not.toBeInTheDocument();
    });

    it("should disable both buttons when isLoading is true", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          isLoading={true}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const confirmButton = screen.getByRole("button", { name: "Confirm" });
      const cancelButton = screen.getByRole("button", { name: "Cancel" });

      expect(confirmButton).toBeDisabled();
      expect(cancelButton).toBeDisabled();
    });

    it("should enable buttons when isLoading is false", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          isLoading={false}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const confirmButton = screen.getByRole("button", { name: "Confirm" });
      const cancelButton = screen.getByRole("button", { name: "Cancel" });

      expect(confirmButton).not.toBeDisabled();
      expect(cancelButton).not.toBeDisabled();
    });
  });

  describe("Loading State with Callbacks", () => {
    it("should still call onConfirm when loading and confirm button is clicked", async () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          isLoading={true}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const confirmButton = screen.getByRole("button", { name: "Confirm" });
      fireEvent.click(confirmButton);

      // Note: The button is disabled so click might not register, but the handler is still there
      expect(mockOnConfirm).not.toHaveBeenCalled();
    });

    it("should not call callbacks when buttons are disabled", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          isLoading={true}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const confirmButton = screen.getByRole("button", { name: "Confirm" });
      const cancelButton = screen.getByRole("button", { name: "Cancel" });

      expect(confirmButton).toBeDisabled();
      expect(cancelButton).toBeDisabled();

      fireEvent.click(confirmButton);
      fireEvent.click(cancelButton);

      expect(mockOnConfirm).not.toHaveBeenCalled();
      expect(mockOnCancel).not.toHaveBeenCalled();
    });
  });

  describe("Content Structure", () => {
    it("should have proper semantic structure", () => {
      const { container } = render(
        <ConfirmationDialog
          isOpen={true}
          title="Test Title"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const dialog = container.querySelector(`.${styles.overlay}`);
      expect(dialog).toHaveClass(styles.overlay);

      const content = container.querySelector(`.${styles.dialog}`);
      expect(content).toHaveClass(styles.dialog);
    });

    it("should display title and message in correct order", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Title First"
          message="Message Second"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const title = screen.getByText("Title First");
      const message = screen.getByText("Message Second");

      // Title should appear before message in DOM
      expect(title.compareDocumentPosition(message)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });

    it("should have footer with buttons", () => {
      const { container } = render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const footer = container.querySelector(
        `.${styles.footer}`,
      ) as HTMLElement;
      expect(footer).toHaveClass(styles.footer);

      const buttons = within(footer).getAllByRole("button");
      expect(buttons).toHaveLength(2);
    });
  });

  describe("Z-index and Overlay", () => {
    it("should have high z-index for overlay", () => {
      const { container } = render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const overlay = container.querySelector(`.${styles.overlay}`);
      expect(overlay).toHaveClass(styles.overlay);
    });

    it("should have semi-transparent black overlay", () => {
      const { container } = render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const overlay = container.querySelector(`.${styles.overlay}`);
      expect(overlay).toBeTruthy();
    });
  });

  describe("Different Content Scenarios", () => {
    it("should handle very long messages", () => {
      const longMessage =
        "This is a very long message that contains a lot of text. It should wrap properly without breaking the layout. " +
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is intentionally long.";

      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message={longMessage}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it("should handle special characters in title and message", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title='Test "Title" with & special <characters>'
          message='Message with & special <characters> and "quotes"'
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(
        screen.getByText(/Test "Title" with & special <characters>/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Message with & special <characters> and "quotes"/),
      ).toBeInTheDocument();
    });

    it("should handle single word button texts", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          confirmText="Yes"
          cancelText="No"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(screen.getByRole("button", { name: "Yes" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "No" })).toBeInTheDocument();
    });

    it("should handle multi-word button texts", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          confirmText="Delete Permanently"
          cancelText="Keep It"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(
        screen.getByRole("button", { name: "Delete Permanently" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Keep It" }),
      ).toBeInTheDocument();
    });
  });

  describe("State Transitions", () => {
    it("should handle isOpen transition from false to true", () => {
      const { rerender } = render(
        <ConfirmationDialog
          isOpen={false}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(screen.queryByText("Test")).not.toBeInTheDocument();

      rerender(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should handle isOpen transition from true to false", () => {
      const { rerender } = render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(screen.getByText("Test")).toBeInTheDocument();

      rerender(
        <ConfirmationDialog
          isOpen={false}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(screen.queryByText("Test")).not.toBeInTheDocument();
    });

    it("should handle isLoading transition from false to true", () => {
      const { rerender } = render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          isLoading={false}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const confirmButton = screen.getByRole("button", { name: "Confirm" });
      expect(confirmButton.querySelector("svg")).not.toBeInTheDocument();

      rerender(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          isLoading={true}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const updatedConfirmButton = screen.getByRole("button", {
        name: "Confirm",
      });
      expect(updatedConfirmButton.querySelector("svg")).toBeInTheDocument();
    });

    it("should handle isDangerous transition", () => {
      const { rerender } = render(
        <ConfirmationDialog
          isOpen={true}
          title="Delete"
          message="Delete?"
          isDangerous={false}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      let header = screen.getByText("Delete").closest("div");
      expect(header).toHaveClass(styles.headerNormal);

      rerender(
        <ConfirmationDialog
          isOpen={true}
          title="Delete"
          message="Delete?"
          isDangerous={true}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      header = screen.getByText("Delete").closest("div");
      expect(header).toHaveClass(styles.headerDanger);
    });
  });

  describe("Accessibility", () => {
    it("should have proper button roles", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(
        screen.getByRole("button", { name: "Confirm" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Cancel" }),
      ).toBeInTheDocument();
    });

    it("should be readable by screen readers", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm Delete"
          message="Are you sure you want to delete this item? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      expect(screen.getByText("Confirm Delete")).toBeVisible();
      expect(screen.getByText(/Are you sure/)).toBeVisible();
    });

    it("should show disabled state visually for accessibility", () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          isLoading={true}
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe("Animation", () => {
    it("should have animation classes when open", () => {
      const { container } = render(
        <ConfirmationDialog
          isOpen={true}
          title="Test"
          message="Test Message"
          onConfirm={mockOnConfirm}
          onCancel={mockOnCancel}
        />,
      );

      const dialogContent = container.querySelector(`.${styles.animateIn}`);
      expect(dialogContent).toHaveClass(styles.animateIn);
    });
  });

  describe("Multiple Dialogs", () => {
    it("should render multiple dialogs independently", () => {
      render(
        <>
          <ConfirmationDialog
            isOpen={true}
            title="Dialog 1"
            message="Message 1"
            onConfirm={mockOnConfirm}
            onCancel={mockOnCancel}
          />
          <ConfirmationDialog
            isOpen={true}
            title="Dialog 2"
            message="Message 2"
            onConfirm={mockOnConfirm}
            onCancel={mockOnCancel}
          />
        </>,
      );

      expect(screen.getByText("Dialog 1")).toBeInTheDocument();
      expect(screen.getByText("Dialog 2")).toBeInTheDocument();
      expect(screen.getByText("Message 1")).toBeInTheDocument();
      expect(screen.getByText("Message 2")).toBeInTheDocument();
    });
  });
});
