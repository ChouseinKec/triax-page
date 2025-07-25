"use client";
import React, { useMemo } from "react";


// Components
import PanelGroup from "@/components/group/panel/component";

// Context
import { RightPanel as RightPanelContext } from "@/context/layout/manager";

export default function RightPanel() {
    // Get Right panel items from context
    const { items } = RightPanelContext.usePanel();

    // Panel layout constants
    const initialSize = { width: '250px', height: '96%', minWidth: 250, minHeight: 250 };
    const initialPosition = { top: '2%', left: '83%' };

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