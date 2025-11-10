"use client";
import React, { useMemo, memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import ActionGroup from "@/src/shared/components/group/action/component";

import BarSection from "@/src/page-builder/ui/editors/layout/bar/section";
import InfoSection from "@/src/page-builder/ui/editors/layout/info/section";
import PanelSection from "@/src/page-builder/ui/editors/layout/panel/section";

// Managers
import { useSelectedWorkbenchID } from "@/src/page-builder/services/managers/page";

import { usePanelsByWorkbench, togglePanel } from "@/src/page-builder/services/managers/layout";

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
            <div className={CSS.LayoutEditor__Bar}>
                {panelToggleInstances}
            </div>

            <PanelSection selectedWorkbenchID={selectedWorkbenchID} />

            <BarSection selectedWorkbenchID={selectedWorkbenchID} />

            <InfoSection selectedWorkbenchID={selectedWorkbenchID} />

        </div >
    );
};

export default memo(LayoutEditor);