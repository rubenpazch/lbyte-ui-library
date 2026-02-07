import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToastBanner from "./Toast";
import styles from "./Toast.module.css";

const toastItem = {
  id: "toast-1",
  type: "success" as const,
  title: "Saved",
  message: "Changes saved successfully.",
};

describe("ToastBanner", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders toast content", () => {
    render(<ToastBanner toasts={[toastItem]} onClose={jest.fn()} />);

    expect(screen.getByTestId("toast-banner")).toBeInTheDocument();
    expect(screen.getByText(toastItem.title)).toBeInTheDocument();
    expect(screen.getByText(toastItem.message)).toBeInTheDocument();

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass(styles.toast);
    expect(alert).toHaveClass(styles.toastSuccess);
  });

  test("does not render when no toasts", () => {
    render(<ToastBanner toasts={[]} onClose={jest.fn()} />);

    expect(screen.queryByTestId("toast-banner")).toBeNull();
  });

  test("close button triggers onClose", async () => {
    jest.useFakeTimers();

    const onClose = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <ToastBanner
        toasts={[toastItem]}
        onClose={onClose}
        closeAriaLabel="Close toast"
      />,
    );

    await user.click(screen.getByLabelText("Close toast"));

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(onClose).toHaveBeenCalledWith("toast-1");
  });

  test("action button triggers action and onClose", async () => {
    jest.useFakeTimers();

    const onClose = jest.fn();
    const onAction = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ToastBanner
        toasts={[
          {
            ...toastItem,
            action: { label: "Retry", onClick: onAction },
          },
        ]}
        onClose={onClose}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Retry" }));
    expect(onAction).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(onClose).toHaveBeenCalledWith("toast-1");
  });

  test("auto dismisses after duration", () => {
    jest.useFakeTimers();

    const onClose = jest.fn();
    render(
      <ToastBanner
        toasts={[{ ...toastItem, duration: 200 }]}
        onClose={onClose}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onClose).toHaveBeenCalledWith("toast-1");
  });
});
