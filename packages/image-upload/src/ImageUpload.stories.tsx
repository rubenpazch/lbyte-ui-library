import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ImageUpload, { type ImageUploadLabels } from "./ImageUpload";

const defaultLabels: ImageUploadLabels = {
  uploadImage: "Upload image",
  uploading: "Uploading...",
  invalidFileType: "Invalid file type. Allowed: {formats}",
  fileSizeExceeded: "File size {size}MB exceeds {maxSize}MB limit",
  uploadFailed: "Upload failed",
  removeFailed: "Remove failed",
  viewDocument: "View",
  downloadDocument: "Download",
  downloadImage: "Download image",
  changeImage: "Change image",
  remove: "Remove",
  clickToUpload: "Click to upload",
  dragAndDrop: "or drag and drop",
  upTo: "up to",
  uploadError: "Upload error",
  pdfDocument: "PDF Document",
  previewAltText: "Preview",
};

const spanishLabels: ImageUploadLabels = {
  uploadImage: "Subir imagen",
  uploading: "Subiendo...",
  invalidFileType: "Tipo de archivo inválido. Permitidos: {formats}",
  fileSizeExceeded: "El archivo de {size}MB excede el límite de {maxSize}MB",
  uploadFailed: "Error al subir",
  removeFailed: "Error al eliminar",
  viewDocument: "Ver",
  downloadDocument: "Descargar",
  downloadImage: "Descargar imagen",
  changeImage: "Cambiar imagen",
  remove: "Eliminar",
  clickToUpload: "Haz clic para subir",
  dragAndDrop: "o arrastra y suelta",
  upTo: "hasta",
  uploadError: "Error de carga",
  pdfDocument: "Documento PDF",
  previewAltText: "Vista previa",
};

const createImageDataUrl = (
  label: string,
  background: string,
  width: number,
  height: number,
) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="${background}" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="20" font-family="Arial, sans-serif">${label}</text></svg>`;

  const base64Encode = (value: string) => {
    if (typeof window !== "undefined" && window.btoa) {
      return window.btoa(unescape(encodeURIComponent(value)));
    }

    if (typeof btoa !== "undefined") {
      return btoa(unescape(encodeURIComponent(value)));
    }

    const buffer = (globalThis as any).Buffer;
    if (buffer) {
      return buffer.from(value).toString("base64");
    }

    return encodeURIComponent(value);
  };

  const encoded = base64Encode(svg);

  return `data:image/svg+xml;base64,${encoded}`;
};

const meta = {
  title: "Components/ImageUpload",
  component: ImageUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    labels: {
      control: "object",
      description: "Labels for the component text",
    },
    label: {
      control: "text",
      description: "Label text for the upload component",
    },
    maxSizeMB: {
      control: "number",
      description: "Maximum file size in megabytes",
    },
    acceptedFormats: {
      control: "object",
      description: "Array of accepted MIME types",
    },
    previewWidth: {
      control: "number",
      description: "Maximum width of the preview image in pixels",
    },
    previewHeight: {
      control: "number",
      description: "Maximum height of the preview image in pixels",
    },
    disabled: {
      control: "boolean",
      description: "Disable the upload functionality",
    },
    currentImageUrl: {
      control: "text",
      description: "URL of the current image to display",
    },
  },
} satisfies Meta<typeof ImageUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock upload handler
const mockUpload = async (file: File) => {
  // Simulate upload delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

const mockRemove = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

/**
 * Default ImageUpload
 * Basic usage with default settings
 */
export const Default: Story = {
  args: {
    label: "Upload Image",
    labels: defaultLabels,
    onUpload: mockUpload,
  },
};

/**
 * With Custom Label
 * Shows custom label text
 */
export const CustomLabel: Story = {
  args: {
    label: "Company Logo",
    labels: defaultLabels,
    onUpload: mockUpload,
  },
};

/**
 * With Remove Functionality
 * Includes the ability to remove uploaded images
 */
export const WithRemove: Story = {
  args: {
    label: "Upload Image",
    labels: defaultLabels,
    onUpload: mockUpload,
    onRemove: mockRemove,
  },
};

/**
 * With Existing Image
 * Shows preview of an existing image
 */
export const WithExistingImage: Story = {
  args: {
    label: "Company Logo",
    labels: defaultLabels,
    currentImageUrl: createImageDataUrl("Company Logo", "#4F46E5", 300, 150),
    onUpload: mockUpload,
    onRemove: mockRemove,
  },
};

/**
 * Small Preview Size
 * Uses smaller preview dimensions
 */
export const SmallPreview: Story = {
  args: {
    label: "Profile Picture",
    labels: defaultLabels,
    currentImageUrl: createImageDataUrl("Avatar", "#10B981", 100, 100),
    onUpload: mockUpload,
    onRemove: mockRemove,
    previewWidth: 100,
    previewHeight: 100,
  },
};

/**
 * Large Preview Size
 * Uses larger preview dimensions
 */
export const LargePreview: Story = {
  args: {
    label: "Banner Image",
    labels: defaultLabels,
    currentImageUrl: createImageDataUrl("Banner", "#EF4444", 600, 200),
    onUpload: mockUpload,
    onRemove: mockRemove,
    previewWidth: 600,
    previewHeight: 200,
  },
};

/**
 * Custom File Size Limit
 * Restricts uploads to 1MB
 */
export const CustomSizeLimit: Story = {
  args: {
    label: "Upload Image (Max 1MB)",
    labels: defaultLabels,
    maxSizeMB: 1,
    onUpload: mockUpload,
  },
};

/**
 * Custom Accepted Formats
 * Only accepts PNG and JPEG files
 */
export const CustomFormats: Story = {
  args: {
    label: "Upload Photo (PNG or JPEG only)",
    labels: defaultLabels,
    acceptedFormats: ["image/png", "image/jpeg"],
    onUpload: mockUpload,
  },
};

/**
 * Disabled State
 * Shows disabled upload component
 */
export const Disabled: Story = {
  args: {
    label: "Upload Image (Disabled)",
    labels: defaultLabels,
    disabled: true,
    onUpload: mockUpload,
  },
};

/**
 * Disabled with Image
 * Shows disabled state with existing image
 */
export const DisabledWithImage: Story = {
  args: {
    label: "Company Logo (Disabled)",
    labels: defaultLabels,
    currentImageUrl: createImageDataUrl("Locked", "#6B7280", 300, 150),
    disabled: true,
    onUpload: mockUpload,
    onRemove: mockRemove,
  },
};

/**
 * Spanish Locale
 * Demonstrates localized labels
 */
export const SpanishLocale: Story = {
  args: {
    labels: spanishLabels,
    onUpload: mockUpload,
  },
};

/**
 * Interactive Example
 * Demonstrates state management with upload and remove
 */
export const Interactive = {
  render: () => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (file: File) => {
      setIsUploading(true);

      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create a preview URL
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setIsUploading(false);
    };

    const handleRemove = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setImageUrl(undefined);
    };

    return (
      <div className="w-full max-w-md">
        <ImageUpload
          label="Interactive Upload Example"
          currentImageUrl={imageUrl}
          onUpload={handleUpload}
          onRemove={handleRemove}
          disabled={isUploading}
          labels={defaultLabels}
        />
      </div>
    );
  },
};

/**
 * Logo Upload
 * Real-world example for company logo upload
 */
export const LogoUpload: Story = {
  args: {
    label: "Company Logo",
    labels: defaultLabels,
    currentImageUrl: undefined,
    onUpload: mockUpload,
    onRemove: mockRemove,
    maxSizeMB: 2,
    acceptedFormats: ["image/png", "image/jpeg", "image/svg+xml"],
    previewWidth: 300,
    previewHeight: 150,
  },
};

/**
 * Avatar Upload
 * Square avatar upload with remove option
 */
export const AvatarUpload: Story = {
  args: {
    label: "Profile Picture",
    labels: defaultLabels,
    currentImageUrl: createImageDataUrl("User", "#3B82F6", 150, 150),
    onUpload: mockUpload,
    onRemove: mockRemove,
    maxSizeMB: 5,
    acceptedFormats: ["image/png", "image/jpeg"],
    previewWidth: 150,
    previewHeight: 150,
  },
};

/**
 * Banner Upload
 * Wide banner image upload
 */
export const BannerUpload: Story = {
  args: {
    label: "Cover Photo",
    labels: defaultLabels,
    currentImageUrl: createImageDataUrl("Cover Photo", "#8B5CF6", 800, 200),
    onUpload: mockUpload,
    onRemove: mockRemove,
    maxSizeMB: 10,
    acceptedFormats: ["image/png", "image/jpeg"],
    previewWidth: 800,
    previewHeight: 200,
  },
};

/**
 * With Custom Styling
 * Shows custom className application
 */
export const CustomStyling: Story = {
  args: {
    label: "Styled Upload",
    className: "bg-blue-50 p-4 rounded-lg border-2 border-blue-200",
    labels: defaultLabels,
    onUpload: mockUpload,
    onRemove: mockRemove,
  },
};

/**
 * SVG Upload
 * Specifically for SVG logos
 */
export const SVGUpload: Story = {
  args: {
    label: "SVG Logo",
    labels: defaultLabels,
    acceptedFormats: ["image/svg+xml"],
    onUpload: mockUpload,
    onRemove: mockRemove,
    maxSizeMB: 1,
    previewWidth: 200,
    previewHeight: 200,
  },
};

/**
 * PDF Upload
 * Demonstrates PDF acceptance with no existing document
 */
export const PdfUpload: Story = {
  args: {
    label: "Upload PDF",
    labels: defaultLabels,
    acceptedFormats: ["application/pdf"],
    maxSizeMB: 10,
    onUpload: mockUpload,
    onRemove: mockRemove,
  },
};

/**
 * PDF With Existing Document
 * Shows PDF preview and document actions
 */
export const PdfWithExistingDocument: Story = {
  args: {
    label: "Contract PDF",
    labels: defaultLabels,
    acceptedFormats: ["application/pdf"],
    currentImageUrl: "https://example.com/sample.pdf",
    onUpload: mockUpload,
    onRemove: mockRemove,
  },
};

/**
 * Mixed Formats
 * Accepts both images and PDF documents
 */
export const MixedFormats: Story = {
  args: {
    label: "Upload image or PDF",
    labels: defaultLabels,
    acceptedFormats: [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "application/pdf",
    ],
    maxSizeMB: 10,
    onUpload: mockUpload,
    onRemove: mockRemove,
  },
};

/**
 * Multiple Uploads in Form
 * Shows multiple upload components together
 */
export const MultipleUploads = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <ImageUpload
        label="Logo"
        currentImageUrl={createImageDataUrl("Logo", "#4F46E5", 300, 150)}
        onUpload={mockUpload}
        onRemove={mockRemove}
        previewWidth={300}
        previewHeight={150}
        labels={defaultLabels}
      />
      <ImageUpload
        label="Favicon"
        currentImageUrl={createImageDataUrl("Icon", "#10B981", 64, 64)}
        onUpload={mockUpload}
        onRemove={mockRemove}
        previewWidth={64}
        previewHeight={64}
        maxSizeMB={1}
        labels={defaultLabels}
      />
      <ImageUpload
        label="Banner"
        onUpload={mockUpload}
        onRemove={mockRemove}
        previewWidth={600}
        previewHeight={200}
        labels={defaultLabels}
      />
    </div>
  ),
};

/**
 * Drag and Drop Highlight
 * Instructions for testing drag and drop
 */
export const DragAndDropDemo = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Try Drag & Drop!</h3>
        <p className="text-sm text-blue-800">
          Drag an image file from your computer and drop it on the upload area
          below to see the drag highlight effect.
        </p>
      </div>
      <ImageUpload
        label="Drag an image here"
        onUpload={mockUpload}
        onRemove={mockRemove}
        labels={defaultLabels}
      />
    </div>
  ),
};

/**
 * Error State Simulation
 * Shows how errors are displayed
 */
export const ErrorState = {
  render: () => {
    const handleUploadWithError = async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error("Upload failed: Server error occurred");
    };

    return (
      <div className="w-full max-w-md space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-semibold text-amber-900 mb-2">
            Error Simulation
          </h3>
          <p className="text-sm text-amber-800">
            Try uploading a file to see error handling. Also try uploading a
            file larger than 1MB or an invalid file type.
          </p>
        </div>
        <ImageUpload
          label="Upload with Error Handling"
          onUpload={handleUploadWithError}
          maxSizeMB={1}
          acceptedFormats={["image/jpeg", "image/png"]}
          labels={defaultLabels}
        />
      </div>
    );
  },
};

/**
 * Loading State
 * Shows the uploading indicator
 */
export const LoadingState = {
  render: () => {
    const handleSlowUpload = async (file: File) => {
      // Simulate slow upload
      await new Promise((resolve) => setTimeout(resolve, 5000));
    };

    return (
      <div className="w-full max-w-md space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            Loading State Demo
          </h3>
          <p className="text-sm text-blue-800">
            Upload a file to see the loading spinner for 5 seconds.
          </p>
        </div>
        <ImageUpload
          label="Slow Upload (5 seconds)"
          onUpload={handleSlowUpload}
          labels={defaultLabels}
        />
      </div>
    );
  },
};
