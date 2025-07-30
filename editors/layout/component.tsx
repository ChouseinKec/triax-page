"use client";
import React, { ReactElement, useMemo } from "react";

// Styles
import CSS from "./style.module.scss";

// Types
import type { LayoutEditorProps } from "./types";

// Components
import Panel from "@/editors/layout/components/panel/component";
import ActionGroup from "@/components/group/action/component";

// Hooks
import { useLayoutManager } from "@/hooks/layout/manager";



/**
 * LayoutEditor Component
 * Renders the layout editor UI, including panel actions and open panels.
 * @param props - LayoutEditorProps
 * @returns ReactElement
 */
const LayoutEditor: React.FC<LayoutEditorProps> = (props: LayoutEditorProps): ReactElement => {
    // Get panel management methods from layout manager hook
    const { getAllPanels, getOpenPanels, togglePanel } = useLayoutManager();

    // Memoized list of all panels (for action buttons)
    const allPanels = useMemo(() => getAllPanels().filter(panel => panel.tabs && Object.keys(panel.tabs).length > 0), [getAllPanels]);

    // Memoized list of open panels (for rendering)
    const openPanels = useMemo(() => getOpenPanels().filter(panel => panel.tabs && Object.keys(panel.tabs).length > 0), [getOpenPanels]);

    /**
     * Renders Panel components for all open panels.
     */
    const panelElements = useMemo(() => (
        openPanels.map(panel => (
            <Panel
                key={panel.id}
                initialPosition={panel.initialPosition}
                initialSize={panel.initialSize}
                initialLocked={panel.initialLocked}
                title={panel.title}
                onClose={() => togglePanel(panel.id)}
                tabs={panel.tabs}
            />
        ))
    ), [openPanels, togglePanel]
    );

    /**
     * Renders action buttons for toggling panel visibility.
     */
    const actionElements = useMemo(() => (
        allPanels.sort((a, b) => a.order - b.order).map(panel => (
            <button
                key={panel.id}
                onClick={() => togglePanel(panel.id)}
                data-is-active={panel.isOpen}
            >
                {panel.icon}
            </button>
        ))
    ), [allPanels, togglePanel]
    );

    return (
        <div className={CSS.LayoutEditor}>

            {/* Panel action bar */}
            <div className={CSS.Bar}>

                {/* Render only if there are action elements */}
                {actionElements.length > 0 &&
                    <ActionGroup direction="vertical" className="LayoutEditorBarActionGroup">
                        {actionElements}
                    </ActionGroup>
                }
            </div>

            {/* Render all open panels */}
            {panelElements}

        </div>
    );
};

export default LayoutEditor;