import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Drawer from "./Drawer";

describe("Drawer", () => {
  it("renders without crashing", () => {
    render(<Drawer />);
  });

  it("renders children when open", () => {
    render(
      <Drawer open={true}>
        <div>Drawer content</div>
      </Drawer>
    );

    expect(screen.getByText("Drawer content")).toBeInTheDocument();
  });

  it("does not render children when closed", () => {
    render(
      <Drawer open={false}>
        <div>Drawer content</div>
      </Drawer>
    );

    expect(screen.queryByText("Drawer content")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Drawer open={true} onClose={onClose} showCloseButton={true}>
        <div>Drawer content</div>
      </Drawer>
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Drawer
        open={true}
        onClose={onClose}
        closeOnBackdropClick={true}
        showBackdrop={true}
      >
        <div>Drawer content</div>
      </Drawer>
    );

    const backdrop = document.querySelector('.backdrop');
    if (backdrop) await user.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when closeOnBackdropClick is false", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Drawer
        open={true}
        onClose={onClose}
        closeOnBackdropClick={false}
        showBackdrop={true}
      >
        <div>Drawer content</div>
      </Drawer>
    );

    const backdrop = document.querySelector('.backdrop');
    if (backdrop) await user.click(backdrop);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Escape key is pressed", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Drawer open={true} onClose={onClose} closeOnEscape={true}>
        <div>Drawer content</div>
      </Drawer>
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when closeOnEscape is false", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Drawer open={true} onClose={onClose} closeOnEscape={false}>
        <div>Drawer content</div>
      </Drawer>
    );

    await user.keyboard("{Escape}");

    expect(onClose).not.toHaveBeenCalled();
  });

  it("applies correct direction classes", () => {
    const { rerender } = render(
      <Drawer open={true} direction="left">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("direction-left");

    rerender(
      <Drawer open={true} direction="right">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("direction-right");

    rerender(
      <Drawer open={true} direction="top">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("direction-top");

    rerender(
      <Drawer open={true} direction="bottom">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("direction-bottom");
  });

  it("applies correct size classes", () => {
    const { rerender } = render(
      <Drawer open={true} size="sm">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("size-sm");

    rerender(
      <Drawer open={true} size="md">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("size-md");

    rerender(
      <Drawer open={true} size="lg">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("size-lg");

    rerender(
      <Drawer open={true} size="xl">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("size-xl");

    rerender(
      <Drawer open={true} size="full">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("size-full");
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(
      <Drawer open={true} variant="default">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("variant-default");

    rerender(
      <Drawer open={true} variant="modal">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("variant-modal");

    rerender(
      <Drawer open={true} variant="persistent">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("variant-persistent");

    rerender(
      <Drawer open={true} variant="temporary">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("variant-temporary");
  });

  it("renders header when provided", () => {
    render(
      <Drawer open={true} header={<h2>Drawer Header</h2>}>
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByText("Drawer Header")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <Drawer open={true} footer={<div>Footer content</div>}>
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("renders custom close button when provided", () => {
    render(
      <Drawer
        open={true}
        closeButton={<button>Custom Close</button>}
        showCloseButton={true}
      >
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByText("Custom Close")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Drawer open={true} className="custom-drawer">
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveClass("custom-drawer");
  });

  it("applies custom style", () => {
    render(
      <Drawer open={true} style={{ backgroundColor: "red" }}>
        <div>Content</div>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toHaveStyle({ backgroundColor: "red" });
  });

  it("sets correct ARIA attributes", () => {
    render(
      <Drawer open={true}>
        <div>Content</div>
      </Drawer>
    );

    const drawer = screen.getByRole("dialog");
    expect(drawer).toHaveAttribute("aria-modal", "true");
  });

  it("does not render backdrop when showBackdrop is false", () => {
    render(
      <Drawer open={true} showBackdrop={false}>
        <div>Content</div>
      </Drawer>
    );

    expect(document.querySelector('.backdrop')).not.toBeInTheDocument();
  });

  it("renders backdrop when showBackdrop is true", () => {
    render(
      <Drawer open={true} showBackdrop={true}>
        <div>Content</div>
      </Drawer>
    );

    expect(document.querySelector('.backdrop')).toBeInTheDocument();
  });

  it("calls onOpen when drawer opens", async () => {
    const onOpen = jest.fn();
    const { rerender } = render(
      <Drawer open={false} onOpen={onOpen}>
        <div>Content</div>
      </Drawer>
    );

    rerender(
      <Drawer open={true} onOpen={onOpen}>
        <div>Content</div>
      </Drawer>
    );

    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });
});
