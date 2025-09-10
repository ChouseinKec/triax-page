"use client";
import React, { ReactElement, useMemo } from "react";

// Styles
import CSS from "./style.module.scss";


// Components
import Panel from "./components/panel/component";
import ActionGroup from "@/components/group/action/component";


// Context
import { useLayoutContext } from "@/editors/layout/context";


/**
 * LayoutEditor Component
 * Renders the layout editor UI, including panel actions and open panels.
 * @param props - LayoutEditorProps
 * @returns ReactElement
 */
const LayoutEditor: React.FC = (): ReactElement => {
    // Get panel management methods from layout manager hook
    const { panels, togglePanel } = useLayoutContext();

    // Memoized list of all panels (for action buttons)
    const allPanels = useMemo(() => Object.values(panels).filter(panel => panel.tabs && Object.keys(panel.tabs).length > 0), [panels]);

    // Memoized list of open panels (for rendering)
    const openPanels = useMemo(() => allPanels.filter(panel => panel.isOpen), [panels]);

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
        <ActionGroup direction="vertical" className="LayoutEditorBarActionGroup">
            {allPanels.sort((a, b) => a.order - b.order).map(panel => (
                <button
                    key={panel.id}
                    onClick={() => togglePanel(panel.id)}
                    data-is-active={panel.isOpen}
                >
                    {panel.icon}
                </button>
            ))}
        </ActionGroup>
    ), [allPanels, ]
    );

    return (
        <div className={CSS.LayoutEditor}>

            {/* Panel action bar */}
            <div className={CSS.Bar}>
                {/* Render panel action buttons */}
                {actionElements}
            </div>

            {/* Render all open panels */}
            {panelElements}

        </div >
    );
};

export default LayoutEditor;