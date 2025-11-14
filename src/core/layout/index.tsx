"use client";
import React, { useMemo, memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import ActionGroup from "@/src/shared/components/group/action/component";

import BarSection from "@/src/core/layout/bar/component/section";
import PanelSection from "@/src/core/layout/panel/component/section";

// Managers
import { useSelectedWorkbenchID } from "@/src/core/layout/page/manager";

import { usePanelsByWorkbench, togglePanel } from "@/src/core/layout/panel/manager";

/**
 * LayoutEditor Component
 * Renders the layout editor UI, including LayoutPanel actions and open LayoutPanels.
 * @param props - LayoutEditorProps
 * @returns ReactElement
 */
const LayoutEditor: React.FC = () => {
    const selectedWorkbenchID = useSelectedWorkbenchID();
    const allPanels = usePanelsByWorkbench(selectedWorkbenchID);

    /**
     * Renders action buttons for toggling LayoutPanel visibility.
     */
    const panelToggleInstances = useMemo(() => (
        allPanels && allPanels.length > 0
            ? (
                <ActionGroup direction="vertical" className="LayoutEditorActionBar">
                    {allPanels
                        .map(panel => (
                            <button
                                key={panel.id}
                                onClick={() => togglePanel(panel.id)}
                                data-is-active={panel.isOpen}
                            >
                                {panel.icon}
                            </button>
                        ))}
                </ActionGroup>
            )
            : null
    ), [allPanels]
    );

    return (
        <div className={CSS.LayoutEditor}>

            {/* Render LayoutPanel action buttons */}
            <div className={CSS.Bar}>
                {panelToggleInstances}
            </div>

            <PanelSection selectedWorkbenchID={selectedWorkbenchID} />

            <BarSection selectedWorkbenchID={selectedWorkbenchID} />

        </div >
    );
};

export default memo(LayoutEditor);