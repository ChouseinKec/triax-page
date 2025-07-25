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
    const initialSize = { width: '250px', height: '250px', minWidth: 250, minHeight: 250 };
    const initialPosition = { top: '2%', left: '1%' };

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
            initialPosition={initialPosition}
            initialSize={initialSize}
        >
            {panelItems}
        </PanelGroup>
    );
}