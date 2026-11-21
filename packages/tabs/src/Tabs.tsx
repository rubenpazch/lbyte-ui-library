import React, { useEffect, useId, useRef, useState } from "react";
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

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  /**
   * Pestaña activa (modo controlado). Úsalo cuando la pestaña vive en la URL o en el estado de la
   * app: el componente no la cambia solo, avisa con `onChange`. Sin `value` funciona como antes.
   */
  value?: string;
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
  /** Nombre accesible del grupo de pestañas (por defecto "Pestañas"). */
  ariaLabel?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  value,
  onChange,
  onLoad,
  loading = false,
  loadingComponent,
  renderContent,
  lazy = false,
  orientation = "horizontal",
  className,
  ariaLabel = "Pestañas",
}) => {
  const baseId = useId();
  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = `${baseId}-panel`;
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [internalTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const controlled = value !== undefined;
  const activeTab = controlled ? value : internalTab;
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(
    new Set([defaultTab || tabs[0]?.id]),
  );

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab?.disabled) return;

    const isFirstVisit = lazy && !visitedTabs.has(tabId);

    if (!controlled) setActiveTab(tabId);

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

  // Teclado del patrón tablist: flechas, Inicio y Fin; salta las pestañas deshabilitadas.
  const handleKeyDown = (event: React.KeyboardEvent, currentId: string) => {
    const enabled = tabs.filter((t) => !t.disabled);
    const i = enabled.findIndex((t) => t.id === currentId);
    const next = isVertical ? "ArrowDown" : "ArrowRight";
    const prev = isVertical ? "ArrowUp" : "ArrowLeft";
    let target: Tab | undefined;
    if (event.key === next) target = enabled[(i + 1) % enabled.length];
    else if (event.key === prev)
      target = enabled[(i - 1 + enabled.length) % enabled.length];
    else if (event.key === "Home") target = enabled[0];
    else if (event.key === "End") target = enabled[enabled.length - 1];
    if (!target) return;
    event.preventDefault();
    handleTabChange(target.id);
    tabRefs.current[target.id]?.focus();
  };

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
        <div
          role="tablist"
          aria-label={ariaLabel}
          aria-orientation={isVertical ? "vertical" : "horizontal"}
          className={classNames(
            styles.nav,
            isVertical ? styles.navVertical : styles.navHorizontal,
          )}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isDisabled = tab.disabled;

            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                type="button"
                role="tab"
                id={tabId(tab.id)}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                disabled={isDisabled}
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
        </div>
      </div>

      {/* Tab Content */}
      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(activeTab)}
        tabIndex={0}
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
