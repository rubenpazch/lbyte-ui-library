import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ToastBanner, { type ToastBannerProps } from "./Toast";

const meta: Meta<ToastBannerProps> = {
  title: "Components/Toast",
  component: ToastBanner,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<ToastBannerProps>;

const ToastTemplate = (args: ToastBannerProps) => {
  const [toasts, setToasts] = React.useState(args.toasts);

  return (
    <ToastBanner
      {...args}
      toasts={toasts}
      onClose={(id) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
        args.onClose(id);
      }}
    />
  );
};

export const Default: Story = {
  args: {
    toasts: [
      {
        id: "toast-1",
        type: "success",
        title: "Saved",
        message: "Changes saved successfully.",
      },
    ],
    onClose: () => undefined,
  },
  render: ToastTemplate,
};

export const WithAction: Story = {
  args: {
    toasts: [
      {
        id: "toast-2",
        type: "error",
        title: "Sync failed",
        message: "Unable to sync. Try again.",
        action: {
          label: "Retry",
          onClick: () => undefined,
        },
      },
    ],
    onClose: () => undefined,
  },
  render: ToastTemplate,
};

export const Multiple: Story = {
  args: {
    toasts: [
      {
        id: "toast-3",
        type: "warning",
        title: "Low storage",
        message: "You are running low on storage space.",
      },
      {
        id: "toast-4",
        type: "info",
        title: "Heads up",
        message: "A new update is available.",
      },
    ],
    onClose: () => undefined,
  },
  render: ToastTemplate,
};

export const AutoDismiss: Story = {
  args: {
    toasts: [
      {
        id: "toast-5",
        type: "default",
        title: "Draft saved",
        message: "Draft will auto-dismiss shortly.",
        duration: 1500,
      },
    ],
    onClose: () => undefined,
  },
  render: ToastTemplate,
};
