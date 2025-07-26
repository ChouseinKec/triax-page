"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";

// Components
import PanelGroup from "@/components/group/panel/component";

// Context
import { BlocksPanel as BlocksPanelContext, LeftBar } from "@/context/layout/manager";

export default function BlocksPanel() {
    const [isOpen, setIsOpen] = useState(true);

    // Get Left panel items from context
    const { items } = BlocksPanelContext.usePanel();

    // Panel layout constants
    const initialSize = { width: '200px', height: '250px', minWidth: 200, minHeight: 250 };
    const initialPosition = { top: '7%', left: '3.5%' };

    // Access the LeftBar context to register panel items
    const { addItem, removeItem } = LeftBar.usePanel();

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []
    )

    const handleToggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []
    );

    useEffect(() => {
        const button = (
            <button onClick={handleToggle} data-is-active={isOpen} title="Add Block">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path fill="white" d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" /></svg>
            </button>
        );

        addItem({
            id: "blocks-panel",
            component: button,
            order: 10,
        });

        return () => removeItem("blocks-panel");

    }, [addItem, removeItem, handleToggle, isOpen]
    );


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
            title="Blocks Panel"
            isOpen={isOpen}
            onClose={handleClose}
        >
            {panelItems}
        </PanelGroup>
    );
}