import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageUpload, { type ImageUploadLabels } from "./ImageUpload";
import styles from "./ImageUpload.module.css";

// Helper to get file input - file inputs don't have a semantic role
const getFileInput = () => {
  const inputs = document.querySelectorAll('input[type="file"]');
  return inputs[0] as HTMLInputElement;
};

// Mock FileReader class
class MockFileReader {
  result = "data:image/jpeg;base64,mockdata";
  onloadend: (() => void) | null = null;
  readAsDataURL() {
    setTimeout(() => this.onloadend?.(), 0);
  }
}

describe("ImageUpload", () => {
  const mockOnUpload = jest.fn();
  const mockOnRemove = jest.fn();
  const labels: ImageUploadLabels = {
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

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(globalThis, "FileReader")
      .mockImplementation(() => new MockFileReader() as FileReader);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<ImageUpload onUpload={mockOnUpload} labels={labels} />);
      expect(screen.getByText("Upload image")).toBeInTheDocument();
      expect(screen.getByText("Click to upload")).toBeInTheDocument();
    });

    it("renders with custom label", () => {
      render(
        <ImageUpload
          label="Company Logo"
          onUpload={mockOnUpload}
          labels={labels}
        />,
      );
      expect(screen.getByText("Company Logo")).toBeInTheDocument();
    });

    it("displays accepted formats and max size", () => {
      render(
        <ImageUpload onUpload={mockOnUpload} maxSizeMB={2} labels={labels} />,
      );
      expect(screen.getByText(/up to 2MB/i)).toBeInTheDocument();
      expect(screen.getByText(/JPEG, PNG, SVG/i)).toBeInTheDocument();
    });

    it("renders with current image preview", () => {
      render(
        <ImageUpload
          currentImageUrl="https://example.com/image.jpg"
          onUpload={mockOnUpload}
          labels={labels}
        />,
      );
      const img = screen.getByAltText("Preview");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
    });

    it("shows change and remove buttons when image is present", () => {
      render(
        <ImageUpload
          currentImageUrl="https://example.com/image.jpg"
          onUpload={mockOnUpload}
          onRemove={mockOnRemove}
          labels={labels}
        />,
      );
      expect(screen.getByText("Change image")).toBeInTheDocument();
      expect(screen.getByText("Remove")).toBeInTheDocument();
    });

    it("does not show remove button when onRemove is not provided", () => {
      render(
        <ImageUpload
          currentImageUrl="https://example.com/image.jpg"
          onUpload={mockOnUpload}
          labels={labels}
        />,
      );
      expect(screen.getByText("Change image")).toBeInTheDocument();
      expect(screen.queryByText("Remove")).not.toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <ImageUpload
          onUpload={mockOnUpload}
          className="custom-class"
          labels={labels}
        />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("renders in disabled state", () => {
      render(
        <ImageUpload onUpload={mockOnUpload} disabled={true} labels={labels} />,
      );
      const input = getFileInput();
      expect(input).toBeDisabled();
    });
  });

  describe("File Selection", () => {
    it("triggers file input when upload area is clicked", async () => {
      const user = userEvent.setup();
      render(<ImageUpload onUpload={mockOnUpload} labels={labels} />);

      const uploadArea = screen.getByTestId("image-upload-dropzone");
      const fileInput = getFileInput();

      const clickSpy = jest.spyOn(fileInput, "click");

      await user.click(uploadArea);
      expect(clickSpy).toHaveBeenCalled();
    });

    it("does not trigger file input when disabled", async () => {
      const user = userEvent.setup();
      render(
        <ImageUpload onUpload={mockOnUpload} disabled={true} labels={labels} />,
      );

      const uploadArea = screen.getByTestId("image-upload-dropzone");
      const fileInput = getFileInput();

      const clickSpy = jest.spyOn(fileInput, "click");

      await user.click(uploadArea);
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it("accepts valid file types", () => {
      render(<ImageUpload onUpload={mockOnUpload} labels={labels} />);
      const input = getFileInput();
      expect(input).toHaveAttribute(
        "accept",
        "image/jpeg,image/png,image/svg+xml",
      );
    });

    it("accepts custom file formats", () => {
      render(
        <ImageUpload
          onUpload={mockOnUpload}
          acceptedFormats={["image/png", "image/webp"]}
          labels={labels}
        />,
      );
      const input = getFileInput();
      expect(input).toHaveAttribute("accept", "image/png,image/webp");
    });
  });

  describe("File Validation", () => {
    it("shows error for invalid file type", async () => {
      render(
        <ImageUpload
          onUpload={mockOnUpload}
          acceptedFormats={["image/jpeg"]}
          labels={labels}
        />,
      );

      const file = new File(["content"], "test.txt", { type: "text/plain" });
      const input = getFileInput();

      // Use fireEvent instead of userEvent for more direct file upload
      fireEvent.change(input, { target: { files: [file] } });

      // Wait for error to appear
      const errorElement = await screen.findByText(
        /invalid file type/i,
        {},
        { timeout: 3000 },
      );
      expect(errorElement).toBeInTheDocument();
      expect(mockOnUpload).not.toHaveBeenCalled();
    });

    it("shows error for file exceeding max size", async () => {
      render(
        <ImageUpload onUpload={mockOnUpload} maxSizeMB={1} labels={labels} />,
      );

      // Create a 2MB file
      const largeContent = new Array(2 * 1024 * 1024).fill("a").join("");
      const file = new File([largeContent], "large.jpg", {
        type: "image/jpeg",
      });
      const input = getFileInput();

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText(/exceeds.*limit/i)).toBeInTheDocument();
      });
      expect(mockOnUpload).not.toHaveBeenCalled();
    });

    it("accepts valid file", async () => {
      mockOnUpload.mockResolvedValue(undefined);
      render(<ImageUpload onUpload={mockOnUpload} labels={labels} />);

      const file = new File(["content"], "test.jpg", { type: "image/jpeg" });
      const input = getFileInput();

      // Mock FileReader
      class MockFileReader {
        result = "data:image/jpeg;base64,mockdata";
        onloadend: (() => void) | null = null;
        readAsDataURL() {
          setTimeout(() => this.onloadend?.(), 0);
        }
      }

      jest
        .spyOn(globalThis, "FileReader")
        .mockImplementation(() => new MockFileReader() as FileReader);

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(mockOnUpload).toHaveBeenCalledWith(file);
      });
    });
  });

  describe("Upload Process", () => {
    it("shows uploading state", async () => {
      let resolveUpload: () => void;
      const uploadPromise = new Promise<void>((resolve) => {
        resolveUpload = resolve;
      });
      mockOnUpload.mockReturnValue(uploadPromise);

      render(<ImageUpload onUpload={mockOnUpload} labels={labels} />);

      const file = new File(["content"], "test.jpg", { type: "image/jpeg" });
      const input = getFileInput();

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText(/uploading/i)).toBeInTheDocument();
      });

      resolveUpload!();
    });

    it("shows error when upload fails", async () => {
      mockOnUpload.mockRejectedValue(new Error("Upload failed"));
      render(<ImageUpload onUpload={mockOnUpload} labels={labels} />);

      const file = new File(["content"], "test.jpg", { type: "image/jpeg" });
      const input = getFileInput();

      // Mock FileReader
      class MockFileReader {
        result = "data:image/jpeg;base64,mockdata";
        onloadend: (() => void) | null = null;
        readAsDataURL() {
          setTimeout(() => this.onloadend?.(), 0);
        }
      }

      jest
        .spyOn(globalThis, "FileReader")
        .mockImplementation(() => new MockFileReader() as FileReader);

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText("Upload failed")).toBeInTheDocument();
      });
    });
  });

  describe("Drag and Drop", () => {
    it("highlights drop zone on drag enter", () => {
      const { container } = render(
        <ImageUpload onUpload={mockOnUpload} labels={labels} />,
      );
      const dropZone = container.querySelector(
        `[data-testid="image-upload-dropzone"]`,
      ) as HTMLElement;

      fireEvent.dragEnter(dropZone);

      expect(dropZone).toHaveClass(styles.dropzoneActive);
    });

    it("removes highlight on drag leave", () => {
      const { container } = render(
        <ImageUpload onUpload={mockOnUpload} labels={labels} />,
      );
      const dropZone = container.querySelector(
        `[data-testid="image-upload-dropzone"]`,
      ) as HTMLElement;

      fireEvent.dragEnter(dropZone);
      expect(dropZone).toHaveClass(styles.dropzoneActive);

      fireEvent.dragLeave(dropZone);
      expect(dropZone).not.toHaveClass(styles.dropzoneActive);
    });

    it("handles file drop", async () => {
      mockOnUpload.mockResolvedValue(undefined);
      const { container } = render(
        <ImageUpload onUpload={mockOnUpload} labels={labels} />,
      );
      const dropZone = container.querySelector(
        `[data-testid="image-upload-dropzone"]`,
      ) as HTMLElement;

      const file = new File(["content"], "test.jpg", { type: "image/jpeg" });

      // Mock FileReader
      class MockFileReader {
        result = "data:image/jpeg;base64,mockdata";
        onloadend: (() => void) | null = null;
        readAsDataURL() {
          setTimeout(() => this.onloadend?.(), 0);
        }
      }

      jest
        .spyOn(globalThis, "FileReader")
        .mockImplementation(() => new MockFileReader() as FileReader);

      fireEvent.drop(dropZone, {
        dataTransfer: {
          files: [file],
        },
      });

      await waitFor(() => {
        expect(mockOnUpload).toHaveBeenCalledWith(file);
      });
    });
  });

  describe("Remove Functionality", () => {
    it("calls onRemove when remove button is clicked", async () => {
      mockOnRemove.mockResolvedValue(undefined);
      const user = userEvent.setup();

      render(
        <ImageUpload
          currentImageUrl="https://example.com/image.jpg"
          onUpload={mockOnUpload}
          onRemove={mockOnRemove}
          labels={labels}
        />,
      );

      const removeButton = screen.getByText("Remove");
      await user.click(removeButton);

      await waitFor(() => {
        expect(mockOnRemove).toHaveBeenCalled();
      });
    });

    it("clears preview after successful remove", async () => {
      mockOnRemove.mockResolvedValue(undefined);
      const user = userEvent.setup();

      render(
        <ImageUpload
          currentImageUrl="https://example.com/image.jpg"
          onUpload={mockOnUpload}
          onRemove={mockOnRemove}
          labels={labels}
        />,
      );

      const removeButton = screen.getByText("Remove");
      await user.click(removeButton);

      await waitFor(() => {
        expect(screen.queryByAltText("Preview")).not.toBeInTheDocument();
      });
    });

    it("shows error when remove fails", async () => {
      mockOnRemove.mockRejectedValue(new Error("Remove failed"));
      const user = userEvent.setup();

      render(
        <ImageUpload
          currentImageUrl="https://example.com/image.jpg"
          onUpload={mockOnUpload}
          onRemove={mockOnRemove}
          labels={labels}
        />,
      );

      const removeButton = screen.getByText("Remove");
      await user.click(removeButton);

      await waitFor(() => {
        expect(screen.getByText("Remove failed")).toBeInTheDocument();
      });
    });
  });

  describe("Preview Sizing", () => {
    it("applies custom preview dimensions", () => {
      render(
        <ImageUpload
          currentImageUrl="https://example.com/image.jpg"
          onUpload={mockOnUpload}
          previewWidth={300}
          previewHeight={150}
          labels={labels}
        />,
      );

      const img = screen.getByAltText("Preview");
      expect(img).toHaveStyle({ maxWidth: "300px", maxHeight: "150px" });
    });

    it("uses default preview dimensions", () => {
      render(
        <ImageUpload
          currentImageUrl="https://example.com/image.jpg"
          onUpload={mockOnUpload}
          labels={labels}
        />,
      );

      const img = screen.getByAltText("Preview");
      expect(img).toHaveStyle({ maxWidth: "200px", maxHeight: "200px" });
    });
  });

  describe("Accessibility", () => {
    it("has proper file input for screen readers", () => {
      render(<ImageUpload onUpload={mockOnUpload} labels={labels} />);
      const input = getFileInput();
      expect(input).toHaveAttribute("type", "file");
    });

    it("has descriptive label", () => {
      render(
        <ImageUpload
          label="Upload your profile picture"
          onUpload={mockOnUpload}
          labels={labels}
        />,
      );
      expect(
        screen.getByText("Upload your profile picture"),
      ).toBeInTheDocument();
    });
  });

  it("renders PDF preview and links", () => {
    render(
      <ImageUpload
        currentImageUrl="https://example.com/document.pdf"
        onUpload={mockOnUpload}
        onRemove={mockOnRemove}
        labels={labels}
      />,
    );

    expect(screen.getByText(labels.pdfDocument)).toBeInTheDocument();
    expect(screen.getByText(labels.viewDocument)).toBeInTheDocument();
    expect(screen.getByText(labels.downloadDocument)).toBeInTheDocument();
  });

  it("sets PDF placeholder when non-image file is selected", async () => {
    mockOnUpload.mockResolvedValue(undefined);

    render(
      <ImageUpload
        onUpload={mockOnUpload}
        labels={labels}
        acceptedFormats={["application/pdf"]}
      />,
    );

    const file = new File(["pdf"], "sample.pdf", { type: "application/pdf" });
    const input = getFileInput();

    await userEvent.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText(labels.pdfDocument)).toBeInTheDocument();
    });
  });

  it("does not update on file input change when no file selected", () => {
    render(<ImageUpload onUpload={mockOnUpload} labels={labels} />);

    const input = getFileInput();
    fireEvent.change(input, { target: { files: [] } });

    expect(mockOnUpload).not.toHaveBeenCalled();
  });
});
