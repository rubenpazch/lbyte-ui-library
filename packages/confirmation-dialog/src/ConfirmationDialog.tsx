import React from "react";
import Button from "@rubenpazch/button";
import Modal from "@rubenpazch/modal";

export interface ConfirmationDialogProps {
  /** Si el diálogo está abierto. */
  isOpen: boolean;
  /** Pregunta o título: "¿Eliminar la convocatoria?". */
  title: string;
  /** Explicación de la consecuencia. */
  message: React.ReactNode;
  /** Texto del botón de confirmar (por defecto "Confirmar"). */
  confirmText?: string;
  /** Texto del botón de cancelar (por defecto "Cancelar"). */
  cancelText?: string;
  /** Acción destructiva: botón rojo. */
  isDangerous?: boolean;
  /** Muestra el botón de confirmar cargando y bloquea los botones. */
  isLoading?: boolean;
  /** Al confirmar. */
  onConfirm: () => void;
  /** Al cancelar, pulsar Escape o hacer clic fuera (si no está cargando). */
  onCancel: () => void;
  /** Contenido extra bajo el mensaje (p. ej. un campo "motivo"). */
  children?: React.ReactNode;
}

/**
 * Diálogo de confirmación (alertdialog) sobre Modal: foco retenido, Escape para cancelar y
 * el foco inicial en "Cancelar", la opción segura.
 */
export default function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isDangerous = false,
  isLoading = false,
  onConfirm,
  onCancel,
  children,
}: ConfirmationDialogProps) {
  const cancel = () => {
    if (!isLoading) onCancel();
  };
  return (
    <Modal
      open={isOpen}
      onClose={cancel}
      role="alertdialog"
      size="sm"
      title={title}
      description={message}
      showCloseButton={false}
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
      footer={
        <>
          <Button
            onClick={cancel}
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
        </>
      }
    >
      {children}
    </Modal>
  );
}
