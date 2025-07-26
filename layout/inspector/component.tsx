"use client";
import React, { useMemo, useState, useCallback, useEffect } from "react";

// Components
import PanelGroup from "@/components/group/panel/component";

// Context
import { InspectorPanel as InspectorPanelContext, LeftBar } from "@/context/layout/manager";

export default function InspectorPanel() {
    const [isOpen, setIsOpen] = useState(true);

    // Get Right panel items from context
    const { items } = InspectorPanelContext.usePanel();

    // Panel layout constants
    const initialSize = { width: '300px', height: '91%', minWidth: 300, minHeight: 250 };
    const initialPosition = { top: '7%', left: '79.5%' };

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

    // Memoize panel item components for performance
    const panelItems = useMemo(() =>
        items
            .filter(item => item.component !== undefined)
            .map(item => item.component),
        [items]
    );


    useEffect(() => {
        const button = (
            <button onClick={handleToggle} data-is-active={isOpen} title="Inspector Panel">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path fill="white" d="M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z" /></svg>
            </button>
        );

        addItem({
            id: "inspector-panel",
            component: button,
            order: 20,
        });

        return () => removeItem("inspector-panel");

    }, [addItem, removeItem, handleToggle, isOpen]
    );


    // If there are no items, render nothing
    if (!panelItems || panelItems.length === 0) {
        return null;
    }

    return (
        <PanelGroup
            initialPosition={initialPosition}
            initialSize={initialSize}
            title="Inspector Panel"
            isOpen={isOpen}
            onClose={handleClose}
        >
            {panelItems}
        </PanelGroup>
    );
}