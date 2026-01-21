"use client";
import React, { useMemo } from "react";

// Components
import ActionGroup from "@/shared/components/group/action/component";

// Registry
import { getRegisteredTabs } from "@/core/layout/panel/registries";

// Managers
import { setSelectedTab, useSelectedTab } from "@/core/layout/panel/managers";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { TabProps } from "./types";

/**
 * Tabs Component
 * Manages and renders the tabs for a panel, including tab buttons and current tab content.
 */
const Tab: React.FC<TabProps> = ({ panelKey }) => {
    // Get registered tabs for this panel
    const tabs = getRegisteredTabs(panelKey);

    // Get currently selected tab key from store
    const selectedTabKey = useSelectedTab(panelKey);

    /**
     * Memoized tab button elements.
     */
    const tabButtons = useMemo(() => {
        return Object.values(tabs).map((tab) => (
            <button
                key={tab.key}
                className={CSS.Tab}
                data-is-active={tab.key === selectedTabKey}
                onClick={() => setSelectedTab(panelKey, tab.key)}
                title={tab.title}
            >
                {tab.icon}
            </button>
        ));
    }, [tabs, selectedTabKey, panelKey]
    );

    const currentTabContent = useMemo(() => {
        if (!selectedTabKey) return <p>No tab selected</p>;

        const Content = tabs[selectedTabKey]?.component;

        if (!Content) return <p>Tab content not available</p>;

        return <Content />;
    }, [selectedTabKey, tabs]
    );

    return (
        <>
            {/* Render tab elements if there are multiple tabs */}
            {tabButtons.length > 1 && (
                <ActionGroup direction="vertical">
                    {tabButtons}
                </ActionGroup>
            )}

            {/* Render current tab content */}
            {currentTabContent}
        </>
    );
};

export default Tab;