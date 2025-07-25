"use client";
import React, { useMemo } from "react";

// Components
import PanelGroup from "@/components/group/panel/component";

// Context
import { LeftPanel as LeftPanelContext } from "@/context/layout/manager";

export default function LeftPanel() {
    // Get Left panel items from context
    const { items } = LeftPanelContext.usePanel();

    // Panel layout constants
    const panelWidth = 300;
    const panelOffset = 30;
    const panelHeight = 175;

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
                left: panelOffset / 2,
            }}
            initialSize={{
                width: panelWidth,
                height: panelHeight,
                minWidth: 250,
                minHeight: 200,
            }}
        >
            {panelItems}
        </PanelGroup>
    );
}