import React, { useEffect, useRef, useState } from "react";
import { DocumentIcon, SpinnerIcon, UploadIcon } from "@rubenpazch/icons";
import Button from "@rubenpazch/button";
import styles from "./ImageUpload.module.css";

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const interpolate = (
  template: string,
  values: Record<string, string | number>,
) => template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));

export type ImageUploadLabels = {
  uploadImage: string;
  uploading: string;
  invalidFileType: string;
  fileSizeExceeded: string;
  uploadFailed: string;
  removeFailed: string;
  viewDocument: string;
  downloadDocument: string;
  downloadImage: string;
  changeImage: string;
  remove: string;
  clickToUpload: string;
  dragAndDrop: string;
  upTo: string;
  uploadError: string;
  pdfDocument: string;
  previewAltText: string;
};

interface ImageUploadProps {
  label?: string;
  currentImageUrl?: string;
  onUpload: (file: File) => Promise<void>;
  onRemove?: () => Promise<void>;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  previewWidth?: number;
  previewHeight?: number;
  className?: string;
  disabled?: boolean;
  labels: ImageUploadLabels;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  currentImageUrl,
  onUpload,
  onRemove,
  maxSizeMB = 5,
  acceptedFormats = ["image/jpeg", "image/png", "image/svg+xml"],
  previewWidth = 200,
  previewHeight = 200,
  className = "",
  disabled = false,
  labels,
}) => {
  const displayLabel = label || labels.uploadImage;
  const [preview, setPreview] = useState<string | null>(
    currentImageUrl || null,
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview with currentImageUrl prop
  useEffect(() => {
    setPreview(currentImageUrl || null);
  }, [currentImageUrl]);

  const formatFileSize = (bytes: number): string =>
    (bytes / (1024 * 1024)).toFixed(2);

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!acceptedFormats.includes(file.type)) {
      const formats = acceptedFormats.join(", ");
      return interpolate(labels.invalidFileType, { formats });
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      return interpolate(labels.fileSizeExceeded, {
        size: formatFileSize(file.size),
        maxSize: maxSizeMB,
      });
    }

    return null;
  };

  const handleFileChange = async (file: File) => {
    setError(null);

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Create preview (only for images, not PDFs)
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // For PDFs, just set a placeholder to indicate file is selected
      setPreview("PDF_PLACEHOLDER");
    }

    // Upload file
    try {
      setUploading(true);
      await onUpload(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : labels.uploadFailed);
      setPreview(currentImageUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleRemove = async () => {
    if (onRemove) {
      try {
        setUploading(true);
        await onRemove();
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : labels.removeFailed);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={classNames(styles.container, className)}
      data-testid="image-upload"
    >
      <label className={styles.label}>{displayLabel}</label>

      <div className={styles.content}>
        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
          className={classNames(
            styles.dropzone,
            dragActive && styles.dropzoneActive,
            disabled && styles.dropzoneDisabled,
            Boolean(preview) && styles.dropzoneFilled,
          )}
          data-testid="image-upload-dropzone"
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleInputChange}
            accept={acceptedFormats.join(",")}
            className={styles.inputHidden}
            disabled={disabled || uploading}
            data-testid="image-upload-input"
          />

          {uploading ? (
            <div className={styles.uploading}>
              <SpinnerIcon size="lg" className={styles.uploadingIcon} />
              <p className={styles.uploadingText}>{labels.uploading}</p>
            </div>
          ) : preview ? (
            <div className={styles.preview}>
              {preview.endsWith(".pdf") ||
              preview === "PDF_PLACEHOLDER" ||
              currentImageUrl?.endsWith(".pdf") ? (
                // PDF preview
                <div className={styles.pdfPreview}>
                  <DocumentIcon className={styles.pdfIcon} />
                  <p className={styles.pdfLabel}>{labels.pdfDocument}</p>
                  {currentImageUrl && (
                    <div className={styles.linkGroup}>
                      <a
                        href={currentImageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkPrimary}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {labels.viewDocument}
                      </a>
                      <a
                        href={currentImageUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkSecondary}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {labels.downloadDocument}
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                // Image preview
                <div className={styles.imagePreview}>
                  <img
                    src={preview}
                    alt={labels.previewAltText}
                    style={{ maxWidth: previewWidth, maxHeight: previewHeight }}
                    className={styles.previewImage}
                  />
                  {currentImageUrl && (
                    <div className={styles.linkGroup}>
                      <a
                        href={currentImageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkPrimary}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {labels.viewDocument}
                      </a>
                      <a
                        href={currentImageUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkSecondary}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {labels.downloadImage}
                      </a>
                    </div>
                  )}
                </div>
              )}
              <div className={styles.actions}>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    event.stopPropagation();
                    handleClick();
                  }}
                  disabled={disabled}
                >
                  {labels.changeImage}
                </Button>
                {onRemove && (
                  <Button
                    type="button"
                    variant="outlined"
                    color="warning"
                    size="small"
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      event.stopPropagation();
                      handleRemove();
                    }}
                    disabled={disabled}
                  >
                    {labels.remove}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.prompt}>
              <UploadIcon className={styles.uploadIcon} />
              <p className={styles.promptText}>
                <span className={styles.promptAction}>
                  {labels.clickToUpload}
                </span>{" "}
                {labels.dragAndDrop}
              </p>
              <p className={styles.helperText}>
                {acceptedFormats
                  .map((format) => format.split("/")[1].toUpperCase())
                  .join(", ")}{" "}
                {labels.upTo} {maxSizeMB}MB
              </p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.error}>
            <h3 className={styles.errorTitle}>{labels.uploadError}</h3>
            <p className={styles.errorMessage}>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
