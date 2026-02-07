import React, { useState, useEffect } from "react";
import styles from "./Tabs.module.css";

const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number; // Badge to show count or notification
}

export type TabOrientation = "horizontal" | "vertical";

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  /** Called when a tab is activated. Use for lazy loading data */
  onLoad?: (tabId: string) => void | Promise<void>;
  /** Loading state for the active tab content */
  loading?: boolean;
  /** Custom loading component */
  loadingComponent?: React.ReactNode;
  /** Render function for tab content (alternative to content prop in Tab) */
  renderContent?: (tabId: string) => React.ReactNode;
  /** Lazy mode - only calls onLoad when tab is first visited */
  lazy?: boolean;
  /** Orientation of tabs - horizontal (default) or vertical (left-aligned) */
  orientation?: TabOrientation;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  onLoad,
  loading = false,
  loadingComponent,
  renderContent,
  lazy = false,
  orientation = "horizontal",
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(
    new Set([defaultTab || tabs[0]?.id]),
  );

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab?.disabled) return;

    const isFirstVisit = lazy && !visitedTabs.has(tabId);

    setActiveTab(tabId);

    // Track visited tabs for lazy loading
    if (isFirstVisit) {
      setVisitedTabs((prev) => new Set([...prev, tabId]));
    }

    onChange?.(tabId);

    // Call onLoad immediately if this is a new tab in lazy mode or always in non-lazy mode
    if (onLoad) {
      if (lazy) {
        if (isFirstVisit) {
          onLoad(tabId);
        }
      } else {
        onLoad(tabId);
      }
    }
  };

  // Call onLoad on initial mount for the default tab
  useEffect(() => {
    if (!onLoad) return;

    // Only call on mount for the default/active tab
    if (lazy) {
      // In lazy mode, load the first tab only once
      if (visitedTabs.size === 1 && visitedTabs.has(activeTab)) {
        onLoad(activeTab);
      }
    } else {
      // In non-lazy mode, always load on mount
      onLoad(activeTab);
    }
  }, []); // Empty deps - only run on mount

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  // Determine what content to show
  const getContent = () => {
    if (loading && loadingComponent) {
      return loadingComponent;
    }
    if (loading) {
      return (
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner}></div>
        </div>
      );
    }
    if (renderContent) {
      return renderContent(activeTab);
    }
    return activeTabContent;
  };

  const isVertical = orientation === "vertical";

  return (
    <div
      className={classNames(
        styles.root,
        isVertical && styles.rootVertical,
        className,
      )}
    >
      {/* Tab Navigation */}
      <div
        className={classNames(
          styles.navContainer,
          isVertical
            ? styles.navContainerVertical
            : styles.navContainerHorizontal,
        )}
      >
        <nav
          className={classNames(
            styles.nav,
            isVertical ? styles.navVertical : styles.navHorizontal,
          )}
          aria-label="Tabs"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isDisabled = tab.disabled;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                disabled={isDisabled}
                aria-current={isActive ? "page" : undefined}
                className={classNames(
                  styles.tabButton,
                  isVertical
                    ? styles.tabButtonVertical
                    : styles.tabButtonHorizontal,
                  isVertical
                    ? isActive
                      ? styles.tabActiveVertical
                      : styles.tabInactiveVertical
                    : isActive
                      ? styles.tabActiveHorizontal
                      : styles.tabInactiveHorizontal,
                  isDisabled ? styles.tabDisabled : styles.tabEnabled,
                )}
              >
                {tab.icon && <span className={styles.icon}>{tab.icon}</span>}
                <span
                  className={classNames(
                    styles.label,
                    isVertical && styles.labelVertical,
                  )}
                >
                  {tab.label}
                </span>
                {tab.badge !== undefined && tab.badge !== null && (
                  <span className={styles.badge}>{tab.badge}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div
        className={classNames(
          styles.content,
          isVertical ? styles.contentVertical : styles.contentHorizontal,
        )}
      >
        {getContent()}
      </div>
    </div>
  );
};

export default Tabs;
