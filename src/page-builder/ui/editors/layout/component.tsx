"use client";
import React, { useMemo, memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import LayoutPanel from "@/src/page-builder/ui/editors/layout/components/panel/component";
import LayoutBar from "@/src/page-builder/ui/editors/layout/components/bar/component";
import LayoutInfo from "@/src/page-builder/ui/editors/layout/components/info/component";
import ActionGroup from "@/src/shared/components/group/action/component";

// Managers
import { useSelectedWorkbenchID } from "@/src/page-builder/services/managers/page";

import { useAllPanels, useOpenPanels, togglePanel, getBarsByWorkbench, getInfosByWorkbench } from "@/src/page-builder/services/managers/layout";

/**
 * LayoutEditor Component
 * Renders the layout editor UI, including LayoutPanel actions and open LayoutPanels.
 * @param props - LayoutEditorProps
 * @returns ReactElement
 */
const LayoutEditor: React.FC = () => {
    const selectedWorkbench = useSelectedWorkbenchID();
    const allPanels = useAllPanels(selectedWorkbench);
    const openPanels = useOpenPanels(selectedWorkbench);
    const allBars = getBarsByWorkbench(selectedWorkbench);
    const allInfos = getInfosByWorkbench(selectedWorkbench);

    /**
     * Renders LayoutBar components for all open LayoutBars.
     */
    const barInstances = useMemo(() => (
        allBars && allBars.length > 0
            ? allBars.map(bar => (
                <LayoutBar
                    key={bar.id}
                    barID={bar.id}
                    position={bar.position}
                    size={bar.size}
                    title={bar.title}
                    isTransparent={bar.isTransparent}
                />
            ))
            : null
    ), [allBars]
    );

    /**
     * Renders LayoutInfo components for all infos.
     */
    const infoInstances = useMemo(() => (
        allInfos && allInfos.length > 0
            ? allInfos.map(info => (
                <LayoutInfo
                    key={info.id}
                    infoID={info.id}
                    position={info.position}
                    size={info.size}
                    grid={info.grid}
                    title={info.title}
                />
            ))
            : null
    ), [allInfos]
    );

    /**
     * Renders LayoutPanel components for all open LayoutPanels.
     */
    const panelInstances = useMemo(() => (
        openPanels && openPanels.length > 0
            ? openPanels.map(panel => (
                <LayoutPanel
                    key={panel.id}
                    initialPosition={panel.initialPosition}
                    initialSize={panel.initialSize}
                    initialLocked={panel.initialLocked}
                    title={panel.title}
                    onClose={() => togglePanel(panel.id)}
                    tabs={panel.tabs}
                />
            ))
            : null
    ), [openPanels]
    );

    /**
     * Renders action buttons for toggling LayoutPanel visibility.
     */
    const panelActionInstances = useMemo(() => (
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
                {panelActionInstances}
            </div>

            {/* Render all open LayoutPanels */}
            {panelInstances}

            {/* Render all LayoutBars */}
            {barInstances}

            {/* Render all LayoutInfos */}
            {infoInstances}

        </div >
    );
};

export default memo(LayoutEditor);