import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";

const sampleItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

describe("Navbar", () => {
  it("renders the brand", () => {
    render(<Navbar brand={<span>Test Brand</span>} />);
    expect(screen.getByText("Test Brand")).toBeTruthy();
  });

  it("renders navigation items", () => {
    render(<Navbar items={sampleItems} />);
    // Check for desktop navigation items specifically
    const desktopNav = screen.getByRole("navigation").querySelector('.nav');
    expect(desktopNav).toBeTruthy();

    // Use getAllByText to get both desktop and mobile versions
    const homeItems = screen.getAllByText("Home");
    expect(homeItems).toHaveLength(2); // Desktop and mobile versions
    expect(screen.getAllByText("About")).toHaveLength(2);
    expect(screen.getAllByText("Contact")).toHaveLength(2);
  });

  it("renders right content", () => {
    render(
      <Navbar
        rightContent={<button>Login</button>}
      />
    );
    expect(screen.getByText("Login")).toBeTruthy();
  });

  it("shows mobile toggle when items are present", () => {
    render(<Navbar items={sampleItems} />);
    const mobileToggle = screen.getByLabelText("Open menu");
    expect(mobileToggle).toBeTruthy();
  });

  it("toggles mobile menu when mobile toggle is clicked", () => {
    render(<Navbar items={sampleItems} />);
    const mobileToggle = screen.getByLabelText("Open menu");

    fireEvent.click(mobileToggle);
    expect(screen.getByLabelText("Close menu")).toBeTruthy();
  });

  it("handles custom onClick for nav items", () => {
    const handleClick = jest.fn();
    const itemsWithClick = [
      { id: "test", label: "Test", onClick: handleClick },
    ];

    render(<Navbar items={itemsWithClick} />);
    // Click the first (desktop) version of the button
    const testButtons = screen.getAllByText("Test");
    fireEvent.click(testButtons[0]);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it.skip("applies active state to nav items", () => {
    const activeItems = [
      { id: "home", label: "Home", href: "/", active: true },
      { id: "about", label: "About", href: "/about" },
    ];

    render(<Navbar items={activeItems} />);
    const homeLinks = screen.getAllByText("Home");
    // Check the desktop version (first one)
    expect(homeLinks[0].className).toContain("active");
  });

  it.skip("disables nav items when disabled prop is true", () => {
    const disabledItems = [
      { id: "disabled", label: "Disabled", href: "/", disabled: true },
    ];

    render(<Navbar items={disabledItems} />);
    const disabledLinks = screen.getAllByText("Disabled");
    // Check the desktop version (first one)
    expect(disabledLinks[0].className).toContain("disabled");
    expect(disabledLinks[0]).toHaveAttribute("aria-disabled", "true");
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Navbar variant="default" data-testid="navbar" />);
    expect(screen.getByTestId("navbar").className).toContain("variant-default");

    rerender(<Navbar variant="sticky" data-testid="navbar" />);
    expect(screen.getByTestId("navbar").className).toContain("variant-sticky");

    rerender(<Navbar variant="floating" data-testid="navbar" />);
    expect(screen.getByTestId("navbar").className).toContain("variant-floating");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Navbar size="sm" data-testid="navbar" />);
    expect(screen.getByTestId("navbar").className).toContain("size-sm");

    rerender(<Navbar size="md" data-testid="navbar" />);
    expect(screen.getByTestId("navbar").className).toContain("size-md");

    rerender(<Navbar size="lg" data-testid="navbar" />);
    expect(screen.getByTestId("navbar").className).toContain("size-lg");
  });

  it("applies shadow and border classes", () => {
    const { rerender } = render(<Navbar shadow data-testid="navbar" />);
    expect(screen.getByTestId("navbar").className).toContain("shadow");

    rerender(<Navbar bordered data-testid="navbar" />);
    expect(screen.getByTestId("navbar").className).toContain("bordered");
  });

  it("handles controlled mobile menu state", () => {
    const handleToggle = jest.fn();
    render(
      <Navbar
        items={sampleItems}
        isMobileMenuOpen={true}
        onMobileMenuToggle={handleToggle}
      />
    );

    expect(screen.getByLabelText("Close menu")).toBeTruthy();

    fireEvent.click(screen.getByLabelText("Close menu"));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it("does not show mobile toggle when showMobileToggle is false", () => {
    render(<Navbar items={sampleItems} showMobileToggle={false} />);
    expect(screen.queryByLabelText("Open menu")).toBeNull();
  });

  it("renders with custom content", () => {
    render(
      <Navbar>
        <div data-testid="custom-content">Custom Content</div>
      </Navbar>
    );
    expect(screen.getByTestId("custom-content")).toBeTruthy();
  });

  it("applies fluid class when fluid prop is true", () => {
    render(<Navbar fluid data-testid="navbar" />);
    expect(screen.getByTestId("navbar").className).toContain("fluid");
  });

  it("renders items with icons", () => {
    const itemsWithIcons = [
      { id: "home", label: "Home", href: "/", icon: <span data-testid="home-icon">🏠</span> },
    ];

    render(<Navbar items={itemsWithIcons} />);
    expect(screen.getAllByTestId("home-icon")).toHaveLength(2); // Desktop and mobile
  });

  it("closes mobile menu on escape key", () => {
    render(<Navbar items={sampleItems} />);

    // Open mobile menu
    const mobileToggle = screen.getByLabelText("Open menu");
    fireEvent.click(mobileToggle);
    expect(screen.getByLabelText("Close menu")).toBeTruthy();

    // Press escape key
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByLabelText("Open menu")).toBeTruthy();
  });
});
