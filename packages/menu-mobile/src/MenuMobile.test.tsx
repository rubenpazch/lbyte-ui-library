import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MenuMobile from "./MenuMobile";

const sampleItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

describe("MenuMobile", () => {
  afterEach(() => {
    // Reset body overflow after each test
    document.body.style.overflow = '';
  });

  it("renders hamburger toggle button", () => {
    render(<MenuMobile items={sampleItems} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    expect(toggle).toBeTruthy();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("opens mobile menu when toggle is clicked", () => {
    render(<MenuMobile items={sampleItems} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    fireEvent.click(toggle);
    
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const mobileMenu = screen.getByRole("dialog");
    expect(mobileMenu).toHaveAttribute("aria-hidden", "false");
  });

  it("closes mobile menu when close button is clicked", () => {
    render(<MenuMobile items={sampleItems} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    // Open menu
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    
    // Close menu using close button
    const closeButton = screen.getByLabelText("Close menu");
    fireEvent.click(closeButton);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("renders menu items correctly", () => {
    render(<MenuMobile items={sampleItems} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    fireEvent.click(toggle);
    
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("About")).toBeTruthy();
    expect(screen.getByText("Contact")).toBeTruthy();
  });

  it("renders brand when provided", () => {
    const brand = <span>Test Brand</span>;
    render(<MenuMobile items={sampleItems} brand={brand} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    fireEvent.click(toggle);
    
    expect(screen.getByText("Test Brand")).toBeTruthy();
  });

  it("renders custom content when provided", () => {
    const customContent = <div data-testid="custom-content">Custom Content</div>;
    render(<MenuMobile items={sampleItems}>{customContent}</MenuMobile>);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    fireEvent.click(toggle);
    
    expect(screen.getByTestId("custom-content")).toBeTruthy();
  });

  it("renders footer content when provided", () => {
    const footerContent = <div data-testid="footer-content">Footer</div>;
    render(<MenuMobile items={sampleItems} footerContent={footerContent} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    fireEvent.click(toggle);
    
    expect(screen.getByTestId("footer-content")).toBeTruthy();
  });

  it("handles item clicks correctly", () => {
    const handleClick = jest.fn();
    const itemsWithClick = [
      { id: "test", label: "Test", onClick: handleClick },
    ];

    render(<MenuMobile items={itemsWithClick} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    fireEvent.click(toggle);
    
    const testButton = screen.getByText("Test");
    fireEvent.click(testButton);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
    // Menu should close after item click
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("applies active state to menu items", () => {
    const activeItems = [
      { id: "home", label: "Home", href: "/", active: true },
      { id: "about", label: "About", href: "/about" },
    ];

    render(<MenuMobile items={activeItems} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    fireEvent.click(toggle);
    
    const homeLink = screen.getByText("Home");
    expect(homeLink.className).toContain("menuItemActive");
  });

  it("disables menu items when disabled prop is true", () => {
    const disabledItems = [
      { id: "disabled", label: "Disabled", href: "/", disabled: true },
    ];

    render(<MenuMobile items={disabledItems} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    fireEvent.click(toggle);
    
    const disabledLink = screen.getByText("Disabled");
    expect(disabledLink.className).toContain("menuItemDisabled");
    expect(disabledLink).toHaveAttribute("aria-disabled", "true");
  });

  it("renders with different positions", () => {
    const { rerender } = render(<MenuMobile items={sampleItems} position="left" />);
    let toggle = screen.getByTestId("mobile-menu-toggle");
    
    fireEvent.click(toggle);
    
    let mobileMenu = screen.getByRole("dialog");
    expect(mobileMenu.className).toContain("position-left");
    
    // Close menu
    fireEvent.click(toggle);
    
    rerender(<MenuMobile items={sampleItems} position="right" />);
    toggle = screen.getByTestId("mobile-menu-toggle");
    
    fireEvent.click(toggle);
    
    mobileMenu = screen.getByRole("dialog");
    expect(mobileMenu.className).toContain("position-right");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<MenuMobile items={sampleItems} size="sm" />);
    let toggle = screen.getByTestId("mobile-menu-toggle");
    expect(toggle.className).toContain("size-sm");

    rerender(<MenuMobile items={sampleItems} size="md" />);
    toggle = screen.getByTestId("mobile-menu-toggle");
    expect(toggle.className).toContain("size-md");

    rerender(<MenuMobile items={sampleItems} size="lg" />);
    toggle = screen.getByTestId("mobile-menu-toggle");
    expect(toggle.className).toContain("size-lg");
  });

  it("handles controlled state", () => {
    const handleToggle = jest.fn();
    render(
      <MenuMobile
        items={sampleItems}
        isOpen={true}
        onToggle={handleToggle}
      />
    );

    const toggle = screen.getByTestId("mobile-menu-toggle");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    
    fireEvent.click(toggle);
    expect(handleToggle).toHaveBeenCalledWith(false);
  });

  it("closes menu on escape key", () => {
    render(<MenuMobile items={sampleItems} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    // Open menu
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    
    // Press escape key
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes menu when clicking overlay", () => {
    render(<MenuMobile items={sampleItems} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    // Open menu
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    
    // Click overlay
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      fireEvent.click(overlay);
      expect(toggle).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("renders items with icons", () => {
    const itemsWithIcons = [
      { id: "home", label: "Home", href: "/", icon: <span data-testid="home-icon">🏠</span> },
    ];

    render(<MenuMobile items={itemsWithIcons} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    fireEvent.click(toggle);
    
    expect(screen.getByTestId("home-icon")).toBeTruthy();
  });

  it("prevents body scroll when menu is open", () => {
    render(<MenuMobile items={sampleItems} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    // Initially body overflow should be normal
    expect(document.body.style.overflow).toBe('');
    
    // Open menu
    fireEvent.click(toggle);
    expect(document.body.style.overflow).toBe('hidden');
    
    // Close menu
    fireEvent.click(toggle);
    expect(document.body.style.overflow).toBe('');
  });

  it("has proper accessibility attributes", () => {
    render(<MenuMobile items={sampleItems} />);
    const toggle = screen.getByTestId("mobile-menu-toggle");
    
    fireEvent.click(toggle);
    
    const mobileMenu = screen.getByRole("dialog");
    expect(mobileMenu).toHaveAttribute("aria-modal", "true");
    expect(mobileMenu).toHaveAttribute("aria-labelledby", "mobile-menu-title");
    
    const menuTitle = screen.getByText("Navigation Menu");
    expect(menuTitle).toHaveAttribute("id", "mobile-menu-title");
  });
});
