"use client";
import React, { useMemo } from "react";

// Components
import PanelGroup from "@/components/group/panel/component";

// Hooks
import useWindowSize from "@/hooks/interface/useWindowSize";

// Context
import { RightPanel as RightPanelContext } from "@/context/layout/manager";

export default function RightPanel() {
    // Get right panel items from context
    const { items } = RightPanelContext.usePanel();

    // Get current window size
    const { width: windowWidth, height: windowHeight } = useWindowSize();

    // Panel layout constants
    const panelWidth = 300;
    const panelOffset = 30;
    const panelHeight = windowHeight - panelOffset;

    // Memoize panel item components for performance
    const panelItems = useMemo(() =>
        items
            .filter(item => item.component !== undefined)
            .map(item => item.component),
        [items]
    );

    // If there are no items, render nothing
    if (!panelItems || panelItems.length === 0) {
        return null;
    }

    return (
        <PanelGroup
            initialPosition={{
                top: panelOffset / 2,
                left: windowWidth - panelWidth - panelOffset / 2,
            }}
            initialSize={{
                width: panelWidth,
                height: panelHeight,
                minWidth: 250,
                minHeight: 250,
            }}
        >
            {panelItems}
        </PanelGroup>
    );
}