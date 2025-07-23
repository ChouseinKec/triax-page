"use client";

import React, { memo, ReactNode, useCallback, useState, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import RadioSelect from "@/components/select/radio/component";

// Types
import type { TabGroupProps } from "./types";
import type { OptionData } from "@/types/option";

// Utilities
import { devLog } from "@/utilities/dev";

/**
 * TabGroup Component
 * 
 * A controlled tab navigation component that displays content based on selected tab.
 * Provides accessible tab navigation with radio button selection interface.
 * 
 * @param  props - Component properties
 * @param  props.items - Array of tab configurations
 * @param  props.ariaLabel - ARIA label for the tab group
 * @param  props.ariaDescription - Optional description for the tab group
 * @returns Memoized TabGroup component
 */
const TabGroup: React.FC<TabGroupProps> = (props: TabGroupProps) => {
    const {
        items,
    } = props;

    // State management for active tab selection
    // Default to first tab (index 0) for consistent behavior
    const [selectedIndex, setSelectedIndex] = useState<string>("0");

    /**
     * Handles tab selection changes with validation
     * Ensures selected index is within valid range
     * 
     * @param {string} value - The selected tab index as string
     */
    const handleTabChange = useCallback((value: string): void => {
        const index = parseInt(value, 10);

        // Validate index is within bounds
        if (isNaN(index) || index < 0 || index >= items.length) {
            devLog.warn(`[TabGroup] Invalid tab index ${value}, resetting to 0`);
            setSelectedIndex("0");
            return;
        }

        setSelectedIndex(value);
    }, [items.length]
    );

    /**
     * Transforms tab items into RadioSelect-compatible options
     * 
     * @returns {OptionData[]} Array of options for RadioSelect
     */
    const tabOptions = useMemo((): OptionData[] => {
        return items.map((item, index) => ({
            name: item.title || `Tab ${index + 1}`,
            icon: typeof item.label === "object" ? item.label : undefined,
            value: index.toString(),
        }));
    },
        [items]
    );

    /**
     * Returns content for currently selected tab with error boundary
     * 
     * @returns {ReactNode} The content of the active tab
     */
    const activeContent = useMemo((): ReactNode => {
        const index = parseInt(selectedIndex, 10);

        // Validate index and return content or fallback
        if (index >= 0 && index < items.length && items[index]?.content) {
            return items[index].content;
        }


        // Fallback content for missing or invalid content
        return (
            <div className={CSS.TabContentError} role="alert">
                <p>Content not available for this tab</p>
            </div>
        );
    },
        [items, selectedIndex]
    );

    // Guard Clause
    if (!items || items.length === 0) {
        devLog.warn("[TabGroup] No items provided");
        return null;
    }

    return (
        <div className={CSS.TabGroup}>
            {/* Content area - displays selected tab content */}
            {activeContent}

            {/* Navigation controls - tab selection interface */}
            <RadioSelect
                options={tabOptions}
                value={selectedIndex}
                onChange={handleTabChange}
                ariaLabel={"List Selection"}
            />
        </div>
    );
};

export default memo(TabGroup);