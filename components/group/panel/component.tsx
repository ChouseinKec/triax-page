"use client";

import React, { memo, ReactNode, useCallback, useState, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import RadioSelect from "@/components/select/radio/component";

// Types
import type { PanelGroupProps } from "./types";
import type { OptionData } from "@/types/option";

// Utilities
import { devLog } from "@/utilities/dev";

/**
 * PanelGroup Component
 * 
 * A collapsible panel navigation component that displays content based on selected panel.
 * Shows only radio buttons when no panel is selected (collapsed state).
 * Displays content when a panel is selected (expanded state).
 * 
 * @param props - Component properties
 * @param props.items - Array of panel configurations
 * @param props.defaultCollapsed - Whether to start in collapsed state (default: true)
 * @param props.ariaLabel - ARIA label for the panel group
 * @returns Memoized PanelGroup component
 */
const PanelGroup: React.FC<PanelGroupProps> = (props) => {
    const {
        items,
        tabPosition = 'right'
    } = props;

    const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
    const isCollapsed = selectedIndex === null;

    /**
     * Handles panel selection changes with toggle functionality
     * Clicking the same panel again will collapse it
     * 
     * @param value - The selected panel index as string
     */
    const handlePanelChange = useCallback((value: string): void => {
        if (value.length === 0) return setSelectedIndex(null);
        setSelectedIndex(value);
    }, []
    );

    /**
     * Transforms panel items into RadioSelect-compatible options
     * Memoized to prevent unnecessary recalculations
     */
    const panelOptions = useMemo((): OptionData[] => {
        return items.map((item, index) => ({
            name: item.title || `Panel ${index + 1}`,
            icon: item.label || undefined,
            value: index.toString(),
        }));
    }, [items]
    );

    /**
     * Returns content for currently selected panel
     * Returns null when collapsed (no panel selected)
     */
    const activeContent = useMemo((): ReactNode => {
        // Return null when collapsed
        if (selectedIndex === null) return null;

        const index = parseInt(selectedIndex, 10);

        // Validate index bounds
        if (isNaN(index) || index < 0 || index >= items.length) {
            devLog.warn(`[PanelGroup] Invalid panel index: ${selectedIndex}`);
            return null;
        }

        const selectedItem = items[index];
        if (!selectedItem?.content) {
            devLog.warn(`[PanelGroup] No content found for panel ${index}`);
            return null;
        }

        return selectedItem.content;
    }, [items, selectedIndex]
    );

    // Early return for empty items
    if (!items?.length) {
        devLog.warn("[PanelGroup] No items provided");
        return null;
    }


    return (
        <div
            className={`${CSS.PanelGroup}`}
            data-collapsed={isCollapsed}
            data-tab-position={tabPosition}
        >
            {/* Content area - only shows when expanded */}
            <div className={CSS.Content}>
                {activeContent}
            </div>

            {/* Navigation controls - always visible */}
            <RadioSelect
                options={panelOptions}
                value={selectedIndex || ""}
                onChange={handlePanelChange}
            />
        </div>
    );
};

export default memo(PanelGroup);