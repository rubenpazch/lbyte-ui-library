import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Tabs, { Tab } from "./Tabs";
import {
  DocumentIcon,
  SettingsIcon,
  PatientIcon,
  HomeIcon,
  FilterIcon,
} from "@rubenpazch/icons";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Tabs component for organizing content into separate views.

**Features:**
- Icon support for visual clarity
- Badge support for counts/notifications
- Disabled tab states
- Lazy loading support (load data only when tab is visited)
- Loading states with customizable loading component
- Callback support for dynamic data fetching
- Responsive design

**Use Cases:**
- Settings pages with multiple sections
- Data tables with different categories
- Multi-step forms with navigation
- Dashboard with different views
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    tabs: {
      description: "Array of tab configurations",
    },
    defaultTab: {
      control: "text",
      description: "ID of the tab to show by default",
    },
    onChange: {
      description: "Callback when active tab changes",
    },
    onLoad: {
      description: "Callback for loading data when tab becomes active",
    },
    loading: {
      control: "boolean",
      description: "Show loading state for active tab content",
    },
    lazy: {
      control: "boolean",
      description: "Only load tab data on first visit",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of tabs - horizontal (top) or vertical (left)",
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic tabs with simple text content
 */
const noop = () => undefined;

export const Default: Story = {
  args: {
    onChange: noop,
    onLoad: noop,
    tabs: [
      {
        id: "tab1",
        label: "Tab 1",
        content: (
          <div className="p-4 bg-gray-50 rounded-lg">Content for Tab 1</div>
        ),
      },
      {
        id: "tab2",
        label: "Tab 2",
        content: (
          <div className="p-4 bg-gray-50 rounded-lg">Content for Tab 2</div>
        ),
      },
      {
        id: "tab3",
        label: "Tab 3",
        content: (
          <div className="p-4 bg-gray-50 rounded-lg">Content for Tab 3</div>
        ),
      },
    ],
  },
};

/**
 * Tabs with icons for better visual hierarchy
 */
export const WithIcons: Story = {
  args: {
    onChange: noop,
    onLoad: noop,
    tabs: [
      {
        id: "profile",
        label: "Profile",
        icon: <PatientIcon size="sm" />,
        content: (
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">User Profile</h3>
            <p className="text-gray-600">
              Manage your personal information and preferences.
            </p>
          </div>
        ),
      },
      {
        id: "documents",
        label: "Documents",
        icon: <DocumentIcon size="sm" />,
        content: (
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Documents</h3>
            <p className="text-gray-600">View and manage your documents.</p>
          </div>
        ),
      },
      {
        id: "settings",
        label: "Settings",
        icon: <SettingsIcon size="sm" />,
        content: (
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Settings</h3>
            <p className="text-gray-600">
              Configure your application settings.
            </p>
          </div>
        ),
      },
    ],
  },
};

/**
 * Tabs with badges showing counts or notifications
 */
export const WithBadges: Story = {
  args: {
    onChange: noop,
    onLoad: noop,
    tabs: [
      {
        id: "all",
        label: "All Items",
        badge: 156,
        content: <div className="p-4">All items content (156 total)</div>,
      },
      {
        id: "pending",
        label: "Pending",
        badge: 12,
        content: <div className="p-4">Pending items (12)</div>,
      },
      {
        id: "completed",
        label: "Completed",
        badge: 144,
        content: <div className="p-4">Completed items (144)</div>,
      },
    ],
  },
};

/**
 * Tab with disabled state
 */
export const WithDisabledTab: Story = {
  args: {
    onChange: noop,
    onLoad: noop,
    tabs: [
      {
        id: "available",
        label: "Available",
        content: <div className="p-4">Available content</div>,
      },
      {
        id: "locked",
        label: "Locked",
        disabled: true,
        content: <div className="p-4">This content is locked</div>,
      },
      {
        id: "active",
        label: "Active",
        content: <div className="p-4">Active content</div>,
      },
    ],
  },
};

/**
 * Interactive example with state management
 */
export const Interactive: Story = {
  args: { tabs: [] },
  render: () => {
    const [activeTab, setActiveTab] = useState("home");
    const [loadCount, setLoadCount] = useState(0);

    const tabs: Tab[] = [
      {
        id: "home",
        label: "Home",
        icon: <HomeIcon size="sm" />,
        content: (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Home Tab</h3>
            <p className="text-gray-600">Current tab: {activeTab}</p>
            <p className="text-sm text-gray-500 mt-2">
              Tabs loaded: {loadCount} times
            </p>
          </div>
        ),
      },
      {
        id: "docs",
        label: "Documentation",
        icon: <DocumentIcon size="sm" />,
        badge: 3,
        content: (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Documentation</h3>
            <p className="text-gray-600">Read the docs and learn more.</p>
            <p className="text-sm text-gray-500 mt-2">
              Load count: {loadCount}
            </p>
          </div>
        ),
      },
      {
        id: "settings",
        label: "Settings",
        icon: <SettingsIcon size="sm" />,
        content: (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <p className="text-gray-600">Configure your preferences.</p>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Active Tab:</strong> {activeTab}
          </p>
        </div>
        <Tabs
          tabs={tabs}
          defaultTab="home"
          onChange={(tabId) => {
            setActiveTab(tabId);
            setLoadCount((prev) => prev + 1);
          }}
        />
      </div>
    );
  },
};

/**
 * Lazy loading example - loads data only when tab is first visited
 */
export const LazyLoading: Story = {
  args: { tabs: [] },
  render: () => {
    const [loadedTabs, setLoadedTabs] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(false);

    const handleLoad = async (tabId: string) => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoadedTabs((prev) => ({ ...prev, [tabId]: true }));
      setLoading(false);
    };

    const renderContent = (tabId: string) => {
      const isLoaded = loadedTabs[tabId];

      return (
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            {tabId.charAt(0).toUpperCase() + tabId.slice(1)} Content
          </h3>
          {isLoaded ? (
            <div>
              <p className="text-green-600 mb-2">✓ Data loaded successfully!</p>
              <p className="text-gray-600">
                This content was loaded on-demand.
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Waiting to load...</p>
          )}
        </div>
      );
    };

    return (
      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Lazy Loading:</strong> Each tab loads data only on first
            visit
          </p>
          <p className="text-xs text-yellow-700 mt-1">
            Loaded tabs: {Object.keys(loadedTabs).join(", ") || "none"}
          </p>
        </div>
        <Tabs
          tabs={[
            { id: "categories", label: "Categories", badge: 25 },
            { id: "products", label: "Products", badge: 150 },
            { id: "settings", label: "Settings" },
          ]}
          lazy
          loading={loading}
          onLoad={handleLoad}
          renderContent={renderContent}
        />
      </div>
    );
  },
};

/**
 * Real-world example: Categories Management
 * Simulates loading different category types on demand
 */
export const CategoriesExample: Story = {
  args: { tabs: [] },
  render: () => {
    const [activeTab, setActiveTab] = useState("all");
    const [data, setData] = useState<Record<string, any[]>>({});
    const [loading, setLoading] = useState(false);

    const categoryTypes = [
      { id: "all", label: "All Categories", badge: 156 },
      { id: "frame_material", label: "Frame Material", badge: 12 },
      { id: "frame_color", label: "Frame Color", badge: 24 },
      { id: "lens_type", label: "Lens Type", badge: 8 },
      { id: "lens_coating", label: "Lens Coating", badge: 15 },
    ];

    const loadCategories = async (type: string) => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock data
      const mockData = Array.from(
        { length: Math.floor(Math.random() * 20) + 5 },
        (_, i) => ({
          id: i + 1,
          name: `${type} Item ${i + 1}`,
          key: `${type}_${i + 1}`,
        }),
      );

      setData((prev) => ({ ...prev, [type]: mockData }));
      setLoading(false);
    };

    const renderContent = (tabId: string) => {
      const items = data[tabId] || [];

      if (!items.length && !loading) {
        return (
          <div className="text-center py-8 text-gray-500">
            No data loaded for this category type yet.
          </div>
        );
      }

      return (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-gray-500">{item.key}</span>
              </div>
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Categories Management
            </h2>
            <p className="text-gray-600 mt-1">Manage categories by type</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + New Category
          </button>
        </div>

        <Tabs
          tabs={categoryTypes}
          defaultTab="all"
          onChange={setActiveTab}
          onLoad={loadCategories}
          loading={loading}
          lazy
          renderContent={renderContent}
        />
      </div>
    );
  },
};

/**
 * Custom loading component
 */
export const CustomLoading: Story = {
  args: { tabs: [] },
  render: () => {
    const [loading, setLoading] = useState(false);

    const handleLoad = async (tabId: string) => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false);
    };

    const customLoader = (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-pulse space-y-4 w-full max-w-md">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <p className="text-gray-500 mt-4">Loading content...</p>
      </div>
    );

    return (
      <Tabs
        tabs={[
          {
            id: "tab1",
            label: "Tab 1",
            content: <div className="p-4">Content 1</div>,
          },
          {
            id: "tab2",
            label: "Tab 2",
            content: <div className="p-4">Content 2</div>,
          },
          {
            id: "tab3",
            label: "Tab 3",
            content: <div className="p-4">Content 3</div>,
          },
        ]}
        onLoad={handleLoad}
        loading={loading}
        loadingComponent={customLoader}
      />
    );
  },
};

/**
 * Many tabs example showing overflow handling
 */
export const ManyTabs: Story = {
  args: {
    onChange: noop,
    onLoad: noop,
    tabs: Array.from({ length: 10 }, (_, i) => ({
      id: `tab-${i + 1}`,
      label: `Tab ${i + 1}`,
      content: <div className="p-4">Content for Tab {i + 1}</div>,
    })),
  },
};

/**
 * Vertical Tabs (Left-Aligned)
 * Perfect for settings pages or dashboards with many options
 */
export const VerticalTabs: Story = {
  args: {
    onChange: noop,
    onLoad: noop,
    orientation: "vertical",
    tabs: [
      {
        id: "general",
        label: "General",
        icon: <SettingsIcon size="sm" />,
        content: (
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">General Settings</h3>
            <p className="text-gray-600">
              Configure general application settings.
            </p>
          </div>
        ),
      },
      {
        id: "branding",
        label: "Branding",
        icon: <PatientIcon size="sm" />,
        content: (
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Branding</h3>
            <p className="text-gray-600">
              Customize your brand colors and logo.
            </p>
          </div>
        ),
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: <DocumentIcon size="sm" />,
        badge: 3,
        content: (
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <p className="text-gray-600">Manage notification preferences.</p>
          </div>
        ),
      },
      {
        id: "security",
        label: "Security",
        icon: <SettingsIcon size="sm" />,
        content: (
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Security</h3>
            <p className="text-gray-600">
              Configure security and privacy settings.
            </p>
          </div>
        ),
      },
    ],
  },
};

/**
 * Vertical Tabs with Lazy Loading
 * Demonstrates vertical orientation with on-demand data loading
 */
export const VerticalWithLazyLoading: Story = {
  args: { tabs: [] },
  render: () => {
    const [loadedTabs, setLoadedTabs] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(false);

    const handleLoad = async (tabId: string) => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setLoadedTabs((prev) => ({ ...prev, [tabId]: true }));
      setLoading(false);
    };

    const renderContent = (tabId: string) => {
      const isLoaded = loadedTabs[tabId];

      return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[300px]">
          <h3 className="text-lg font-semibold mb-2">
            {tabId.charAt(0).toUpperCase() + tabId.slice(1)} Settings
          </h3>
          {isLoaded ? (
            <div>
              <p className="text-green-600 mb-2">
                ✓ Settings loaded successfully!
              </p>
              <p className="text-gray-600">
                Configure your {tabId} preferences here.
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Waiting to load...</p>
          )}
        </div>
      );
    };

    return (
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Application Settings</h2>
        <Tabs
          orientation="vertical"
          tabs={[
            {
              id: "profile",
              label: "Profile",
              icon: <PatientIcon size="sm" />,
            },
            {
              id: "account",
              label: "Account",
              icon: <SettingsIcon size="sm" />,
            },
            {
              id: "privacy",
              label: "Privacy",
              icon: <DocumentIcon size="sm" />,
              badge: "New",
            },
            { id: "billing", label: "Billing", icon: <HomeIcon size="sm" /> },
          ]}
          lazy
          loading={loading}
          onLoad={handleLoad}
          renderContent={renderContent}
        />
      </div>
    );
  },
};

/**
 * Categories Management with Vertical Tabs
 * Real-world example showing category management with vertical navigation
 */
export const VerticalCategoriesManagement: Story = {
  args: { tabs: [] },
  render: () => {
    const [activeTab, setActiveTab] = useState("all");
    const [data, setData] = useState<Record<string, any[]>>({});
    const [loading, setLoading] = useState(false);

    const categoryTypes = [
      { id: "all", label: "All Categories", badge: 156 },
      { id: "frame_material", label: "Frame Material", badge: 12 },
      { id: "frame_color", label: "Frame Color", badge: 24 },
      { id: "lens_type", label: "Lens Type", badge: 8 },
      { id: "lens_coating", label: "Lens Coating", badge: 15 },
      { id: "brand", label: "Brand", badge: 18 },
    ];

    const loadCategories = async (type: string) => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 600));

      const mockData = Array.from(
        { length: Math.floor(Math.random() * 15) + 5 },
        (_, i) => ({
          id: i + 1,
          name: `${type.replace("_", " ")} Item ${i + 1}`,
          key: `${type}_${i + 1}`,
        }),
      );

      setData((prev) => ({ ...prev, [type]: mockData }));
      setLoading(false);
    };

    const renderContent = (tabId: string) => {
      const items = data[tabId] || [];

      if (!items.length && !loading) {
        return (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
            No data loaded yet. Select a category to load.
          </div>
        );
      }

      return (
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {tabId === "all"
                ? "All Categories"
                : tabId
                    .replace("_", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
            </h3>
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + Add New
            </button>
          </div>
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-gray-500">{item.key}</span>
              </div>
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className="max-w-5xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Categories Management
          </h2>
          <p className="text-gray-600 mt-1">
            Manage all category types in one place
          </p>
        </div>

        <Tabs
          orientation="vertical"
          tabs={categoryTypes}
          defaultTab="all"
          onChange={setActiveTab}
          onLoad={loadCategories}
          loading={loading}
          lazy
          renderContent={renderContent}
        />
      </div>
    );
  },
};

/**
 * Tabs with loading state (default spinner)
 */
export const LoadingState: Story = {
  args: {
    loading: true,
    tabs: [
      {
        id: "tab1",
        label: "Tab 1",
        content: <div className="p-4">Content 1</div>,
      },
      {
        id: "tab2",
        label: "Tab 2",
        content: <div className="p-4">Content 2</div>,
      },
    ],
  },
};

/**
 * Custom className applied to Tabs wrapper
 */
export const WithCustomClassName: Story = {
  args: {
    className: "ring-1 ring-blue-200 rounded-xl p-4",
    tabs: [
      {
        id: "tab1",
        label: "Overview",
        content: <div className="p-4">Overview</div>,
      },
      {
        id: "tab2",
        label: "Details",
        content: <div className="p-4">Details</div>,
      },
    ],
  },
};

/**
 * Tabs with renderContent override
 */
export const RenderContentOverride: Story = {
  args: {
    tabs: [
      { id: "tab1", label: "Alpha" },
      { id: "tab2", label: "Beta" },
    ],
    renderContent: (tabId) => (
      <div className="p-4 bg-gray-50 rounded-lg">
        Rendered content for {tabId}
      </div>
    ),
  },
};
