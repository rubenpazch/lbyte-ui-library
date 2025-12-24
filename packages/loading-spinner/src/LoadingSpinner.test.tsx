import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner Component", () => {
  describe("Basic Rendering", () => {
    it("renders spinner variant by default", () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.querySelector(".animate-spin")).toBeInTheDocument();
    });

    it("renders with message", () => {
      render(<LoadingSpinner message="Loading data..." />);
      expect(screen.getByText("Loading data...")).toBeInTheDocument();
    });

    it("renders without message", () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.querySelector("p")).not.toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("renders small size", () => {
      const { container } = render(<LoadingSpinner size="sm" />);
      const spinner = container.querySelector(".animate-spin");
      expect(spinner).toHaveClass("h-4", "w-4");
    });

    it("renders medium size", () => {
      const { container } = render(<LoadingSpinner size="md" />);
      const spinner = container.querySelector(".animate-spin");
      expect(spinner).toHaveClass("h-8", "w-8");
    });

    it("renders large size", () => {
      const { container } = render(<LoadingSpinner size="lg" />);
      const spinner = container.querySelector(".animate-spin");
      expect(spinner).toHaveClass("h-12", "w-12");
    });
  });

  describe("Visual Variants", () => {
    it("renders spinner variant", () => {
      const { container } = render(<LoadingSpinner variant="spinner" />);
      expect(container.querySelector(".animate-spin")).toBeInTheDocument();
    });

    it("renders dots variant", () => {
      const { container } = render(<LoadingSpinner variant="dots" />);
      const dots = container.querySelectorAll(".animate-bounce");
      expect(dots).toHaveLength(3);
    });

    it("renders pulse variant", () => {
      const { container } = render(<LoadingSpinner variant="pulse" />);
      expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    });

    it("renders ring variant", () => {
      const { container } = render(<LoadingSpinner variant="ring" />);
      const rings = container.querySelectorAll(".rounded-full");
      expect(rings.length).toBeGreaterThan(0);
    });
  });

  describe("Color Variants", () => {
    it("renders blue color by default", () => {
      const { container } = render(<LoadingSpinner variant="spinner" />);
      const spinner = container.querySelector(".border-blue-600");
      expect(spinner).toBeInTheDocument();
    });

    it("renders gray color", () => {
      const { container } = render(
        <LoadingSpinner variant="spinner" color="gray" />,
      );
      const spinner = container.querySelector(".border-gray-600");
      expect(spinner).toBeInTheDocument();
    });

    it("renders white color", () => {
      const { container } = render(
        <LoadingSpinner variant="spinner" color="white" />,
      );
      const spinner = container.querySelector(".border-white");
      expect(spinner).toBeInTheDocument();
    });

    it("renders dots with blue color", () => {
      const { container } = render(
        <LoadingSpinner variant="dots" color="blue" />,
      );
      const dots = container.querySelectorAll(".bg-blue-600");
      expect(dots.length).toBeGreaterThan(0);
    });

    it("renders dots with gray color", () => {
      const { container } = render(
        <LoadingSpinner variant="dots" color="gray" />,
      );
      const dots = container.querySelectorAll(".bg-gray-600");
      expect(dots.length).toBeGreaterThan(0);
    });
  });

  describe("Inline Mode", () => {
    it("renders inline without centering classes", () => {
      const { container } = render(<LoadingSpinner inline />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).not.toHaveClass("flex", "justify-center", "items-center");
    });

    it("renders inline with custom className", () => {
      const { container } = render(
        <LoadingSpinner inline className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("removes margins when inline", () => {
      const { container } = render(<LoadingSpinner variant="spinner" inline />);
      const spinner = container.querySelector(".animate-spin");
      expect(spinner).not.toHaveClass("mx-auto", "mb-4");
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
        "flex",
        "justify-center",
      );
    });
  });

  describe("Message Styling", () => {
    it("renders message with correct styling", () => {
      render(<LoadingSpinner message="Test message" />);
      const message = screen.getByText("Test message");
      expect(message).toHaveClass("text-gray-600", "text-sm", "mt-2");
    });
  });
});
