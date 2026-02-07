import React, { useEffect, useState } from "react";
import {
  CheckIcon,
  CloseIcon,
  ErrorIcon,
  ExclamationTriangleIcon,
  InfoIcon,
} from "@rubenpazch/icons";
import styles from "./Toast.module.css";

const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export type ToastType = "success" | "error" | "warning" | "info" | "default";

export type ToastAction = {
  label: string;
  onClick: () => void;
};

export type ToastItem = {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  action?: ToastAction;
};

export type ToastBannerProps = {
  toasts: ToastItem[];
  onClose: (id: string) => void;
  closeAriaLabel?: string;
  className?: string;
};

interface ToastBannerItemProps extends ToastItem {
  onClose: (id: string) => void;
  closeAriaLabel: string;
}

const getIcon = (type: ToastType) => {
  switch (type) {
    case "success":
      return <CheckIcon className={styles.iconSvg} size="lg" />;
    case "error":
      return <ErrorIcon className={styles.iconSvg} size="lg" />;
    case "warning":
      return <ExclamationTriangleIcon className={styles.iconSvg} size="lg" />;
    case "info":
      return <InfoIcon className={styles.iconSvg} size="lg" />;
    default:
      return null;
  }
};

const ToastBannerItem: React.FC<ToastBannerItemProps> = ({
  id,
  type,
  title,
  message,
  duration,
  action,
  onClose,
  closeAriaLabel,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const typeClassMap: Record<ToastType, string> = {
    success: styles.toastSuccess,
    error: styles.toastError,
    warning: styles.toastWarning,
    info: styles.toastInfo,
    default: styles.toastDefault,
  };

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(id), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={classNames(styles.toast, typeClassMap[type])} role="alert">
      <div className={styles.icon}>{getIcon(type)}</div>

      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <p className={styles.message}>{message}</p>
      </div>

      {action && (
        <button
          onClick={() => {
            action.onClick();
            setIsVisible(false);
            setTimeout(() => onClose(id), 300);
          }}
          className={classNames(styles.actionButton, styles.actionButtonBase)}
        >
          {action.label}
        </button>
      )}

      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(id), 300);
        }}
        className={styles.closeButton}
        aria-label={closeAriaLabel}
      >
        <CloseIcon className={styles.closeIcon} size="lg" />
      </button>
    </div>
  );
};

export const ToastBanner: React.FC<ToastBannerProps> = ({
  toasts,
  onClose,
  closeAriaLabel = "Close notification",
  className,
}) => {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      className={classNames(styles.banner, className)}
      aria-live="polite"
      aria-atomic="true"
      data-testid="toast-banner"
    >
      {toasts.map((toast) => (
        <ToastBannerItem
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          action={toast.action}
          onClose={onClose}
          closeAriaLabel={closeAriaLabel}
        />
      ))}
    </div>
  );
};

export default ToastBanner;
