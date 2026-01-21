"use client";

import React, { memo, ReactNode, useCallback, useState, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import RadioSelect from "@/shared/components/select/radio/component";

// Types
import type { TabGroupProps } from "./types";
import type { OptionDefinition } from "@/shared/components/types/option";

/**
 * TabGroup Component
 * 
 * A controlled tab navigation component that displays content based on selected tab.
 * Provides accessible tab navigation with radio button selection interface.
 * 
 * @param  props - Component properties
 * @param  props.items - Array of tab configurations
 * @returns Memoized TabGroup component
 */
const TabGroup: React.FC<TabGroupProps> = ({ items, className = '' }) => {
    const [selectedIndex, setSelectedIndex] = useState<string>("0");

    // Handle tab selection changes
    const handleTabChange = useCallback((value: string): void => {
        const index = parseInt(value, 10);

        // Validate index is within bounds
        if (isNaN(index) || index < 0 || index >= items.length) return setSelectedIndex("0");

        setSelectedIndex(value);
    }, [items.length]
    );

    // Prepare tab options for RadioSelect component
    const tabOptions = useMemo((): OptionDefinition[] => {
        return items.map((item, index) => ({
            name: item.title,
            icon: item.label,
            value: index.toString(),
        }));
    },
        [items]
    );

    // Render content for the currently selected tab
    const renderActiveContent = (): ReactNode => {
        const index = parseInt(selectedIndex, 10);

        // Validate index and return content or fallback
        if (index >= 0 && index < items.length && items[index]?.content) {
            return items[index].content;
        }

        // Fallback content for missing or invalid content
        return (
            <div className={CSS.Empty}>
                <p>Content not available for this tab</p>
            </div>
        );
    };

    return (
        <div className={`${CSS.TabGroup} TabGroup ${className}`}>

            {/* Content area - displays selected tab content */}
            {renderActiveContent()}

            {/* Navigation controls - tab selection interface */}
            <RadioSelect
                options={tabOptions}
                value={selectedIndex}
                onChange={(value) => handleTabChange(value as string)}
            />
        </div>
    );
};

TabGroup.displayName = "TabGroup";
export default memo(TabGroup);