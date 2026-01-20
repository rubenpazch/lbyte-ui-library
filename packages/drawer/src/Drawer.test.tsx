/**
 * @jest-environment jsdom
 */
/// <reference types="@testing-library/jest-dom" />
import {
  expect,
  describe,
  it,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import matchers from "@testing-library/jest-dom/matchers";
import Drawer from "./Drawer";

expect.extend(matchers);

declare module "expect" {
  // Augment Jest's matcher typings with the jest-dom matchers we use in this suite.
  interface Matchers<R = void, T = unknown> {
    toBeInTheDocument(): R;
    toHaveAttribute(attr: string, value?: unknown): R;
  }
}

// Mock the icons module with proper React element
jest.mock("@rubenpazch/icons", () => ({
  CloseIcon: (props: any) => (
    <svg data-testid="close-icon" {...props}>
      X
    </svg>
  ),
}));

describe("Drawer Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe("Rendering", () => {
    it("should render drawer when isOpen is true", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose} title="Test Drawer">
          <div>Drawer Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        expect(screen.getByText("Drawer Content")).toBeInTheDocument();
        expect(screen.getByText("Test Drawer")).toBeInTheDocument();
      });
    });

    it("should not render drawer when isOpen is false", () => {
      const { container } = render(
        <Drawer isOpen={false} onClose={mockOnClose}>
          <div>Drawer Content</div>
        </Drawer>,
      );

      expect(container.firstChild).toBeNull();
      expect(screen.queryByText("Drawer Content")).not.toBeInTheDocument();
    });

    it("should render with footer when provided", async () => {
      render(
        <Drawer
          isOpen={true}
          onClose={mockOnClose}
          footer={
            <div>
              <button>Apply</button>
              <button>Cancel</button>
            </div>
          }
        >
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        expect(screen.getByText("Apply")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
      });
    });

    it("should render close icon button", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose} title="Test">
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId("close-icon")).toBeInTheDocument();
      });
    });
  });

  describe("Close Behavior", () => {
    it("should call onClose when close button is clicked", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose} title="Test">
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        expect(screen.getByLabelText("Close drawer")).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText("Close drawer");
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when overlay is clicked", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose}>
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const overlay = screen.getByRole("dialog").firstChild as HTMLElement;
      fireEvent.click(overlay);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should not call onClose when overlay is clicked if closeOnOverlayClick is false", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose} closeOnOverlayClick={false}>
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const overlay = screen.getByRole("dialog").firstChild as HTMLElement;
      fireEvent.click(overlay);

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("should call onClose when Escape key is pressed", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose}>
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        expect(screen.getByText("Content")).toBeInTheDocument();
      });

      fireEvent.keyDown(document, { key: "Escape" });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should not call onClose when Escape is pressed if closeOnEscape is false", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose} closeOnEscape={false}>
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        expect(screen.getByText("Content")).toBeInTheDocument();
      });

      fireEvent.keyDown(document, { key: "Escape" });

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe("Positioning", () => {
    it("should apply left position classes", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose} position="left">
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        const drawer = screen
          .getByRole("dialog")
          .querySelector('div[tabindex="-1"]');
        expect(drawer).toHaveAttribute("data-position", "left");
      });
    });

    it("should apply right position classes", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose} position="right">
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        const drawer = screen
          .getByRole("dialog")
          .querySelector('div[tabindex="-1"]');
        expect(drawer).toHaveAttribute("data-position", "right");
      });
    });

    it("should apply top position classes", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose} position="top">
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        const drawer = screen
          .getByRole("dialog")
          .querySelector('div[tabindex="-1"]');
        expect(drawer).toHaveAttribute("data-position", "top");
      });
    });

    it("should apply bottom position classes", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose} position="bottom">
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        const drawer = screen
          .getByRole("dialog")
          .querySelector('div[tabindex="-1"]');
        expect(drawer).toHaveAttribute("data-position", "bottom");
      });
    });
  });

  describe("Size", () => {
    it("should apply medium size by default", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose}>
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        const drawer = screen
          .getByRole("dialog")
          .querySelector('div[tabindex="-1"]');
        expect(drawer).toHaveAttribute("data-size", "md");
      });
    });

    it("should apply small size", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose} size="sm">
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        const drawer = screen
          .getByRole("dialog")
          .querySelector('div[tabindex="-1"]');
        expect(drawer).toHaveAttribute("data-size", "sm");
      });
    });

    it("should apply large size", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose} size="lg">
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        const drawer = screen
          .getByRole("dialog")
          .querySelector('div[tabindex="-1"]');
        expect(drawer).toHaveAttribute("data-size", "lg");
      });
    });
  });

  describe("Overlay", () => {
    it("should show overlay by default", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose}>
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        const overlay = screen.getByTestId("drawer-overlay");
        expect(overlay).toBeInTheDocument();
      });
    });

    it("should hide overlay when showOverlay is false", async () => {
      render(
        <Drawer isOpen={true} onClose={mockOnClose} showOverlay={false}>
          <div>Content</div>
        </Drawer>,
      );

      await waitFor(() => {
        const overlay = screen.queryByTestId("drawer-overlay");
        expect(overlay).not.toBeInTheDocument();
      });
    });
  });
});
