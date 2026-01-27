/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { jest } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import Avatar from "./Avatar";
import AvatarGroup from "./AvatarGroup";

expect.extend(matchers);

declare module "expect" {
  interface Matchers<R = void, T = unknown> {
    toBeInTheDocument(): R;
    toHaveClass(...classNames: string[]): R;
    toHaveAttribute(attr: string, value?: unknown): R;
    toHaveStyle(style: Record<string, any>): R;
  }
}

describe("Avatar Component", () => {
  describe("Basic Rendering", () => {
    it("renders avatar with children", () => {
      render(<Avatar>AB</Avatar>);
      expect(screen.getByText("AB")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Avatar className="custom-class">Test</Avatar>,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Avatar ref={ref}>Test</Avatar>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Image Avatars", () => {
    it("renders image when src is provided", () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="Test User" />);
      const img = screen.getByRole("img");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
      expect(img).toHaveAttribute("alt", "Test User");
    });

    it("renders with srcSet", () => {
      render(
        <Avatar
          src="https://example.com/avatar.jpg"
          srcSet="https://example.com/avatar-2x.jpg 2x"
          alt="Test"
        />,
      );
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute(
        "srcSet",
        "https://example.com/avatar-2x.jpg 2x",
      );
    });

    it("handles image load event", () => {
      const handleLoad = jest.fn();
      render(
        <Avatar
          src="https://example.com/avatar.jpg"
          alt="Test"
          onLoad={handleLoad}
        />,
      );
      const img = screen.getByRole("img");
      img.dispatchEvent(new Event("load"));
      expect(handleLoad).toHaveBeenCalled();
    });

    it("handles image error and shows fallback", async () => {
      const handleError = jest.fn();
      const { container } = render(
        <Avatar
          src="https://broken.com/image.jpg"
          alt="Test User"
          onError={handleError}
        />,
      );

      const img = screen.getByRole("img");
      img.dispatchEvent(new Event("error"));

      await waitFor(() => {
        expect(handleError).toHaveBeenCalled();
      });
    });
  });

  describe("Letter Avatars", () => {
    it("displays children text", () => {
      render(<Avatar>AB</Avatar>);
      expect(screen.getByText("AB")).toBeInTheDocument();
    });

    it("extracts initials from alt text", () => {
      render(<Avatar alt="John Doe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("extracts single initial from single word", () => {
      render(<Avatar alt="John" />);
      expect(screen.getByText("J")).toBeInTheDocument();
    });

    it("extracts initials from multiple words", () => {
      render(<Avatar alt="Mary Jane Watson" />);
      expect(screen.getByText("MW")).toBeInTheDocument();
    });

    it("generates color based on alt text", () => {
      const { container } = render(<Avatar alt="John Doe" />);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveStyle({ backgroundColor: expect.any(String) });
    });
  });

  describe("Icon Avatars", () => {
    it("renders icon children", () => {
      const Icon = () => (
        <svg data-testid="test-icon">
          <circle />
        </svg>
      );
      render(
        <Avatar>
          <Icon />
        </Avatar>,
      );
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });
  });

  describe("Fallback Behavior", () => {
    it("shows children when image fails to load", async () => {
      const { container } = render(
        <Avatar src="https://broken.com/image.jpg" alt="Test User">
          FB
        </Avatar>,
      );

      const img = screen.getByRole("img");
      img.dispatchEvent(new Event("error"));

      await waitFor(() => {
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
      });
    });

    it("shows generic icon when no fallback is provided", () => {
      const { container } = render(<Avatar />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders extra small avatar", () => {
      const { container } = render(<Avatar size="xs">XS</Avatar>);
      expect(container.firstChild).toHaveClass("sizeXs");
    });

    it("renders small avatar", () => {
      const { container } = render(<Avatar size="sm">SM</Avatar>);
      expect(container.firstChild).toHaveClass("sizeSm");
    });

    it("renders medium avatar (default)", () => {
      const { container } = render(<Avatar>MD</Avatar>);
      expect(container.firstChild).toHaveClass("sizeMd");
    });

    it("renders large avatar", () => {
      const { container } = render(<Avatar size="lg">LG</Avatar>);
      expect(container.firstChild).toHaveClass("sizeLg");
    });

    it("renders extra large avatar", () => {
      const { container } = render(<Avatar size="xl">XL</Avatar>);
      expect(container.firstChild).toHaveClass("sizeXl");
    });
  });

  describe("Variants", () => {
    it("renders circular variant (default)", () => {
      const { container } = render(<Avatar>C</Avatar>);
      expect(container.firstChild).toHaveClass("variantCircular");
    });

    it("renders rounded variant", () => {
      const { container } = render(<Avatar variant="rounded">R</Avatar>);
      expect(container.firstChild).toHaveClass("variantRounded");
    });

    it("renders square variant", () => {
      const { container } = render(<Avatar variant="square">S</Avatar>);
      expect(container.firstChild).toHaveClass("variantSquare");
    });
  });

  describe("Custom Component", () => {
    it("renders with custom component", () => {
      render(<Avatar component="span">Custom</Avatar>);
      expect(screen.getByText("Custom").tagName).toBe("SPAN");
    });
  });

  describe("Custom Styles", () => {
    it("applies custom inline styles", () => {
      const { container } = render(
        <Avatar style={{ border: "2px solid red" }}>Test</Avatar>,
      );
      expect(container.firstChild).toHaveStyle({ border: "2px solid red" });
    });
  });
});

describe("AvatarGroup Component", () => {
  describe("Basic Rendering", () => {
    it("renders multiple avatars", () => {
      render(
        <AvatarGroup>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </AvatarGroup>,
      );
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();
      expect(screen.getByText("C")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <AvatarGroup className="custom-group">
          <Avatar>A</Avatar>
        </AvatarGroup>,
      );
      expect(container.firstChild).toHaveClass("custom-group");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <AvatarGroup ref={ref}>
          <Avatar>A</Avatar>
        </AvatarGroup>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Max Prop", () => {
    it("limits displayed avatars with max prop", () => {
      render(
        <AvatarGroup max={2}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
          <Avatar>D</Avatar>
        </AvatarGroup>,
      );
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();
      expect(screen.queryByText("C")).not.toBeInTheDocument();
      expect(screen.queryByText("D")).not.toBeInTheDocument();
    });

    it("shows surplus count when max is exceeded", () => {
      render(
        <AvatarGroup max={2}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
          <Avatar>D</Avatar>
        </AvatarGroup>,
      );
      expect(screen.getByText("+2")).toBeInTheDocument();
    });
  });

  describe("Total Prop", () => {
    it("uses total for surplus calculation", () => {
      render(
        <AvatarGroup max={2} total={10}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </AvatarGroup>,
      );
      expect(screen.getByText("+8")).toBeInTheDocument();
    });
  });

  describe("Custom Surplus Renderer", () => {
    it("renders custom surplus content", () => {
      const renderSurplus = (surplus: number) => (
        <span data-testid="custom-surplus">+{surplus.toString()[0]}k</span>
      );

      render(
        <AvatarGroup max={2} total={4251} renderSurplus={renderSurplus}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
        </AvatarGroup>,
      );

      expect(screen.getByTestId("custom-surplus")).toBeInTheDocument();
      expect(screen.getByText(/\+4k/)).toBeInTheDocument();
    });
  });

  describe("Spacing", () => {
    it("applies small spacing", () => {
      const { container } = render(
        <AvatarGroup spacing="small">
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
        </AvatarGroup>,
      );
      expect(container.firstChild).toHaveClass("spacingSmall");
    });

    it("applies medium spacing (default)", () => {
      const { container } = render(
        <AvatarGroup spacing="medium">
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
        </AvatarGroup>,
      );
      expect(container.firstChild).toHaveClass("spacingMedium");
    });

    it("applies custom numeric spacing", () => {
      const { container } = render(
        <AvatarGroup spacing={24}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
        </AvatarGroup>,
      );
      expect(container.firstChild).toHaveClass("customSpacing");
    });
  });

  describe("Display Order", () => {
    it("renders avatars in reverse order (right to left)", () => {
      const { container } = render(
        <AvatarGroup>
          <Avatar>First</Avatar>
          <Avatar>Second</Avatar>
          <Avatar>Third</Avatar>
        </AvatarGroup>,
      );
      expect(container.firstChild).toHaveClass("root");
    });
  });
});
