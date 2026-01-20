import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./LoadingSpinner.module.css";

describe("LoadingSpinner Component", () => {
  describe("Basic Rendering", () => {
    it("renders spinner variant by default", () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByTestId("loading-spinner");
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute("data-variant", "spinner");
    });

    it("renders with message", () => {
      render(<LoadingSpinner message="Loading data..." />);
      expect(screen.getByText("Loading data...")).toBeInTheDocument();
    });

    it("renders without message", () => {
      const { container } = render(<LoadingSpinner />);
      expect(
        container.querySelector(`.${styles.message}`),
      ).not.toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("renders small size", () => {
      render(<LoadingSpinner size="sm" />);
      const spinner = screen.getByTestId("loading-spinner");
      expect(spinner).toHaveAttribute("data-size", "sm");
    });

    it("renders medium size", () => {
      render(<LoadingSpinner size="md" />);
      const spinner = screen.getByTestId("loading-spinner");
      expect(spinner).toHaveAttribute("data-size", "md");
    });

    it("renders large size", () => {
      render(<LoadingSpinner size="lg" />);
      const spinner = screen.getByTestId("loading-spinner");
      expect(spinner).toHaveAttribute("data-size", "lg");
    });
  });

  describe("Visual Variants", () => {
    it("renders spinner variant", () => {
      const { container } = render(<LoadingSpinner variant="spinner" />);
      expect(container.querySelector(`.${styles.spinner}`)).toBeInTheDocument();
    });

    it("renders dots variant", () => {
      const { container } = render(<LoadingSpinner variant="dots" />);
      const dots = container.querySelectorAll(`.${styles.dot}`);
      expect(dots).toHaveLength(3);
    });

    it("renders pulse variant", () => {
      const { container } = render(<LoadingSpinner variant="pulse" />);
      expect(container.querySelector(`.${styles.pulse}`)).toBeInTheDocument();
    });

    it("renders ring variant", () => {
      const { container } = render(<LoadingSpinner variant="ring" />);
      const ringContainer = container.querySelector(`.${styles.ringContainer}`);
      expect(ringContainer).toBeInTheDocument();
    });
  });

  describe("Color Variants", () => {
    it("renders blue color by default", () => {
      render(<LoadingSpinner variant="spinner" />);
      const spinner = screen.getByTestId("loading-spinner");
      expect(spinner).toHaveAttribute("data-color", "blue");
    });

    it("renders gray color", () => {
      render(<LoadingSpinner variant="spinner" color="gray" />);
      const spinner = screen.getByTestId("loading-spinner");
      expect(spinner).toHaveAttribute("data-color", "gray");
    });

    it("renders white color", () => {
      render(<LoadingSpinner variant="spinner" color="white" />);
      const spinner = screen.getByTestId("loading-spinner");
      expect(spinner).toHaveAttribute("data-color", "white");
    });

    it("renders dots with blue color", () => {
      const { container } = render(
        <LoadingSpinner variant="dots" color="blue" />,
      );
      const dots = container.querySelectorAll(`.${styles.dotColorBlue}`);
      expect(dots.length).toBeGreaterThan(0);
    });

    it("renders dots with gray color", () => {
      const { container } = render(
        <LoadingSpinner variant="dots" color="gray" />,
      );
      const dots = container.querySelectorAll(`.${styles.dotColorGray}`);
      expect(dots.length).toBeGreaterThan(0);
    });
  });

  describe("Inline Mode", () => {
    it("renders inline without centering classes", () => {
      const { container } = render(<LoadingSpinner inline />);
      expect(
        container.querySelector(`.${styles.containerInline}`),
      ).toBeInTheDocument();
    });

    it("renders inline with custom className", () => {
      const { container } = render(
        <LoadingSpinner inline className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("removes margins when inline", () => {
      const { container } = render(<LoadingSpinner variant="spinner" inline />);
      const spinner = container.querySelector(`.${styles.spinner}`);
      expect(spinner).not.toHaveClass(styles.spacingDefault);
    });
  });

  describe("Custom ClassName", () => {
    it("applies custom className", () => {
      const { container } = render(
        <LoadingSpinner className="custom-spinner" />,
      );
      expect(container.firstChild).toHaveClass("custom-spinner");
    });

    it("combines custom className with default classes when not inline", () => {
      const { container } = render(
        <LoadingSpinner className="my-custom-class" />,
      );
      expect(container.firstChild).toHaveClass(
        "my-custom-class",
        styles.container,
      );
    });
  });

  describe("Message Styling", () => {
    it("renders message with correct styling", () => {
      render(<LoadingSpinner message="Test message" />);
      const message = screen.getByText("Test message");
      expect(message).toHaveClass(styles.message);
    });
  });
});
