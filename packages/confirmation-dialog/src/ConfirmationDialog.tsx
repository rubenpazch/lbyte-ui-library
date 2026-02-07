import React from "react";
import Button from "@rubenpazch/button";
import styles from "./ConfirmationDialog.module.css";

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDangerous = false,
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={classNames(styles.dialog, styles.animateIn)}>
        {/* Header */}
        <div
          className={classNames(
            styles.header,
            isDangerous ? styles.headerDanger : styles.headerNormal,
          )}
        >
          <h2
            className={classNames(
              styles.title,
              isDangerous ? styles.titleDanger : styles.titleNormal,
            )}
          >
            {title}
          </h2>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <p className={styles.message}>{message}</p>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Button
            onClick={onCancel}
            disabled={isLoading}
            variant="outlined"
            color="secondary"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            loading={isLoading}
            variant="contained"
            color={isDangerous ? "error" : "primary"}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
