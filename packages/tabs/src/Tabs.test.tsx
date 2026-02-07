import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Tabs, { Tab } from "./Tabs";
import styles from "./Tabs.module.css";

describe("Tabs Component", () => {
  const mockOnChange = jest.fn();
  const mockOnLoad = jest.fn();

  const basicTabs: Tab[] = [
    { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
    { id: "tab2", label: "Tab 2", content: <div>Content 2</div> },
    { id: "tab3", label: "Tab 3", content: <div>Content 3</div> },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders all tabs", () => {
      render(<Tabs tabs={basicTabs} />);

      expect(screen.getByText("Tab 1")).toBeInTheDocument();
      expect(screen.getByText("Tab 2")).toBeInTheDocument();
      expect(screen.getByText("Tab 3")).toBeInTheDocument();
    });

    it("renders first tab content by default", () => {
      render(<Tabs tabs={basicTabs} />);

      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
    });

    it("renders default tab when specified", () => {
      render(<Tabs tabs={basicTabs} defaultTab="tab2" />);

      expect(screen.getByText("Content 2")).toBeInTheDocument();
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Tabs tabs={basicTabs} className="custom-class" />,
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Tab Navigation", () => {
    it("switches content when tab is clicked", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={basicTabs} />);

      expect(screen.getByText("Content 1")).toBeInTheDocument();

      await user.click(screen.getByText("Tab 2"));

      expect(screen.getByText("Content 2")).toBeInTheDocument();
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });

    it("calls onChange callback when tab changes", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={basicTabs} onChange={mockOnChange} />);

      await user.click(screen.getByText("Tab 2"));

      expect(mockOnChange).toHaveBeenCalledWith("tab2");
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it("applies active styles to current tab", () => {
      render(<Tabs tabs={basicTabs} defaultTab="tab2" />);

      const tab2Button = screen.getByText("Tab 2").closest("button");
      expect(tab2Button).toHaveClass(styles.tabActiveHorizontal);
    });

    it("applies inactive styles to other tabs", () => {
      render(<Tabs tabs={basicTabs} defaultTab="tab2" />);

      const tab1Button = screen.getByText("Tab 1").closest("button");
      expect(tab1Button).toHaveClass(styles.tabInactiveHorizontal);
    });
  });

  describe("Icons", () => {
    it("renders icons when provided", () => {
      const tabsWithIcons: Tab[] = [
        {
          id: "tab1",
          label: "Tab 1",
          icon: <span data-testid="icon-1">🏠</span>,
          content: <div>Content 1</div>,
        },
        { id: "tab2", label: "Tab 2", content: <div>Content 2</div> },
      ];

      render(<Tabs tabs={tabsWithIcons} />);

      expect(screen.getByTestId("icon-1")).toBeInTheDocument();
    });

    it("does not render icon wrapper when icon is not provided", () => {
      render(<Tabs tabs={basicTabs} />);

      const tab1Button = screen.getByText("Tab 1").closest("button");
      const iconSpan = tab1Button?.querySelector(`.${styles.icon}`);

      expect(iconSpan).not.toBeInTheDocument();
    });
  });

  describe("Badges", () => {
    it("renders badge when provided", () => {
      const tabsWithBadges: Tab[] = [
        { id: "tab1", label: "Tab 1", badge: 5, content: <div>Content 1</div> },
        {
          id: "tab2",
          label: "Tab 2",
          badge: "12+",
          content: <div>Content 2</div>,
        },
      ];

      render(<Tabs tabs={tabsWithBadges} />);

      expect(screen.getByText("5")).toBeInTheDocument();
      expect(screen.getByText("12+")).toBeInTheDocument();
    });

    it("does not render badge when not provided", () => {
      render(<Tabs tabs={basicTabs} />);

      const badges = screen.queryAllByText(/^\d+$/);
      expect(badges).toHaveLength(0);
    });

    it("renders badge with zero value", () => {
      const tabsWithZeroBadge: Tab[] = [
        { id: "tab1", label: "Tab 1", badge: 0, content: <div>Content 1</div> },
      ];

      render(<Tabs tabs={tabsWithZeroBadge} />);

      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("renders disabled tab", () => {
      const tabsWithDisabled: Tab[] = [
        { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
        {
          id: "tab2",
          label: "Tab 2",
          disabled: true,
          content: <div>Content 2</div>,
        },
      ];

      render(<Tabs tabs={tabsWithDisabled} />);

      const tab2Button = screen.getByText("Tab 2").closest("button");
      expect(tab2Button).toBeDisabled();
      expect(tab2Button).toHaveClass(styles.tabDisabled);
    });

    it("does not switch to disabled tab when clicked", async () => {
      const user = userEvent.setup();
      const tabsWithDisabled: Tab[] = [
        { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
        {
          id: "tab2",
          label: "Tab 2",
          disabled: true,
          content: <div>Content 2</div>,
        },
      ];

      render(<Tabs tabs={tabsWithDisabled} onChange={mockOnChange} />);

      await user.click(screen.getByText("Tab 2"));

      expect(mockOnChange).not.toHaveBeenCalled();
      expect(screen.getByText("Content 1")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("shows default loading spinner when loading is true", () => {
      const { container } = render(<Tabs tabs={basicTabs} loading={true} />);

      const spinner = container.querySelector(`.${styles.spinner}`);
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass(styles.spinner);
    });

    it("shows custom loading component when provided", () => {
      const customLoader = <div data-testid="custom-loader">Loading...</div>;

      render(
        <Tabs
          tabs={basicTabs}
          loading={true}
          loadingComponent={customLoader}
        />,
      );

      expect(screen.getByTestId("custom-loader")).toBeInTheDocument();
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });

    it("does not show loading state when loading is false", () => {
      render(<Tabs tabs={basicTabs} loading={false} />);

      expect(screen.getByText("Content 1")).toBeInTheDocument();
    });
  });

  describe("onLoad Callback", () => {
    it("calls onLoad on mount with default tab", () => {
      render(<Tabs tabs={basicTabs} onLoad={mockOnLoad} />);

      expect(mockOnLoad).toHaveBeenCalledWith("tab1");
    });

    it("calls onLoad when tab changes", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={basicTabs} onLoad={mockOnLoad} />);

      mockOnLoad.mockClear(); // Clear mount call

      await user.click(screen.getByText("Tab 2"));

      expect(mockOnLoad).toHaveBeenCalledWith("tab2");
    });

    it("calls onLoad for every tab switch when lazy is false", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={basicTabs} onLoad={mockOnLoad} lazy={false} />);

      mockOnLoad.mockClear();

      await user.click(screen.getByText("Tab 2"));
      await user.click(screen.getByText("Tab 1"));
      await user.click(screen.getByText("Tab 2"));

      expect(mockOnLoad).toHaveBeenCalledTimes(3);
    });
  });

  describe("Lazy Loading", () => {
    it("calls onLoad only once per tab when lazy is true", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={basicTabs} onLoad={mockOnLoad} lazy={true} />);

      mockOnLoad.mockClear(); // Clear mount call

      // Visit tab 2 twice
      await user.click(screen.getByText("Tab 2"));
      await user.click(screen.getByText("Tab 1"));
      await user.click(screen.getByText("Tab 2"));

      // Should only be called once for tab2 (first visit)
      expect(mockOnLoad).toHaveBeenCalledWith("tab2");
      expect(mockOnLoad).toHaveBeenCalledTimes(1);
    });

    it("tracks visited tabs correctly", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={basicTabs} onLoad={mockOnLoad} lazy={true} />);

      mockOnLoad.mockClear();

      // Visit all tabs
      await user.click(screen.getByText("Tab 2"));
      await user.click(screen.getByText("Tab 3"));

      // Each tab should be loaded exactly once
      expect(mockOnLoad).toHaveBeenNthCalledWith(1, "tab2");
      expect(mockOnLoad).toHaveBeenNthCalledWith(2, "tab3");
      expect(mockOnLoad).toHaveBeenCalledTimes(2);
    });
  });

  describe("renderContent Prop", () => {
    it("uses renderContent function when provided", () => {
      const renderContent = (tabId: string) => <div>Rendered: {tabId}</div>;

      render(<Tabs tabs={basicTabs} renderContent={renderContent} />);

      expect(screen.getByText("Rendered: tab1")).toBeInTheDocument();
    });

    it("updates rendered content when tab changes", async () => {
      const user = userEvent.setup();
      const renderContent = (tabId: string) => <div>Rendered: {tabId}</div>;

      render(<Tabs tabs={basicTabs} renderContent={renderContent} />);

      await user.click(screen.getByText("Tab 2"));

      expect(screen.getByText("Rendered: tab2")).toBeInTheDocument();
    });

    it("prefers renderContent over tab content prop", () => {
      const renderContent = (tabId: string) => (
        <div>From renderContent: {tabId}</div>
      );

      render(<Tabs tabs={basicTabs} renderContent={renderContent} />);

      expect(screen.getByText("From renderContent: tab1")).toBeInTheDocument();
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes on navigation", () => {
      render(<Tabs tabs={basicTabs} />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Tabs");
    });

    it("marks active tab with aria-current", () => {
      render(<Tabs tabs={basicTabs} defaultTab="tab2" />);

      const tab2Button = screen.getByText("Tab 2").closest("button");
      expect(tab2Button).toHaveAttribute("aria-current", "page");
    });

    it("does not mark inactive tabs with aria-current", () => {
      render(<Tabs tabs={basicTabs} defaultTab="tab2" />);

      const tab1Button = screen.getByText("Tab 1").closest("button");
      expect(tab1Button).not.toHaveAttribute("aria-current");
    });

    it("has proper disabled attribute on disabled tabs", () => {
      const tabsWithDisabled: Tab[] = [
        { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
        {
          id: "tab2",
          label: "Tab 2",
          disabled: true,
          content: <div>Content 2</div>,
        },
      ];

      render(<Tabs tabs={tabsWithDisabled} />);

      const tab2Button = screen.getByText("Tab 2").closest("button");
      expect(tab2Button).toHaveAttribute("disabled");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty tabs array", () => {
      render(<Tabs tabs={[]} />);

      expect(screen.queryByRole("navigation")).toBeInTheDocument();
    });

    it("handles tabs without content", () => {
      const tabsWithoutContent: Tab[] = [
        { id: "tab1", label: "Tab 1" },
        { id: "tab2", label: "Tab 2" },
      ];

      render(<Tabs tabs={tabsWithoutContent} />);

      expect(screen.getByText("Tab 1")).toBeInTheDocument();
      expect(screen.getByText("Tab 2")).toBeInTheDocument();
    });

    it("handles switching between tabs quickly", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={basicTabs} onChange={mockOnChange} />);

      await user.click(screen.getByText("Tab 2"));
      await user.click(screen.getByText("Tab 3"));
      await user.click(screen.getByText("Tab 1"));

      expect(mockOnChange).toHaveBeenCalledTimes(3);
      expect(screen.getByText("Content 1")).toBeInTheDocument();
    });

    it("handles async onLoad callback", async () => {
      const asyncOnLoad = jest.fn(async (tabId: string) => {
        await new Promise((resolve) => setTimeout(resolve, 100));
      });

      const user = userEvent.setup();
      render(<Tabs tabs={basicTabs} onLoad={asyncOnLoad} />);

      await user.click(screen.getByText("Tab 2"));

      await waitFor(() => {
        expect(asyncOnLoad).toHaveBeenCalledWith("tab2");
      });
    });
  });

  describe("Vertical Orientation", () => {
    it("renders with vertical orientation", () => {
      const { container } = render(
        <Tabs tabs={basicTabs} orientation="vertical" />,
      );

      // Check for flex layout (parent container)
      expect(container.firstChild).toHaveClass(styles.rootVertical);
    });

    it("applies vertical styles to navigation", () => {
      render(<Tabs tabs={basicTabs} orientation="vertical" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass(styles.navVertical);
    });

    it("applies correct active styles in vertical mode", () => {
      render(
        <Tabs tabs={basicTabs} orientation="vertical" defaultTab="tab2" />,
      );

      const tab2Button = screen.getByText("Tab 2").closest("button");
      expect(tab2Button).toHaveClass(styles.tabActiveVertical);
    });

    it("switches content correctly in vertical mode", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={basicTabs} orientation="vertical" />);

      expect(screen.getByText("Content 1")).toBeInTheDocument();

      await user.click(screen.getByText("Tab 2"));

      expect(screen.getByText("Content 2")).toBeInTheDocument();
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });

    it("renders icons in vertical mode", () => {
      const tabsWithIcons: Tab[] = [
        {
          id: "tab1",
          label: "Tab 1",
          icon: <span data-testid="icon-1">🏠</span>,
          content: <div>Content 1</div>,
        },
      ];

      render(<Tabs tabs={tabsWithIcons} orientation="vertical" />);

      expect(screen.getByTestId("icon-1")).toBeInTheDocument();
    });

    it("renders badges in vertical mode", () => {
      const tabsWithBadges: Tab[] = [
        { id: "tab1", label: "Tab 1", badge: 5, content: <div>Content 1</div> },
      ];

      render(<Tabs tabs={tabsWithBadges} orientation="vertical" />);

      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("uses flex-1 class on content in vertical mode", () => {
      const { container } = render(
        <Tabs tabs={basicTabs} orientation="vertical" />,
      );

      // Find the content div - should use contentVertical class
      const contentArea = container.querySelector(`.${styles.contentVertical}`);
      expect(contentArea).toBeInTheDocument();
      expect(contentArea?.textContent).toContain("Content 1");
    });
  });
});
