"use client";
import React, { memo, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { WorkbenchProps } from "./types";

// Managers
import { usePanels, togglePanel } from "@/src/core/layout/panel/managers";

// Components
import Viewport from "@/src/core/layout/viewport/components/editor";
import PanelEditor from "@/src/core/layout/panel/components/editor";
import BarEditor from "@/src/core/layout/bar/components/editor";
import ActionGroup from "@/src/shared/components/group/action/component";

/**
 * Workbench Component
 * Renders the workbench editor UI, including the current workbench and workbench selection actions.
 *
 * @returns The rendered workbench editor with selection controls
 */
const Workbench: React.FC<WorkbenchProps> = ({ selectedWorkbench }) => {
    const allPanels = usePanels(selectedWorkbench?.key, { workbench: true });

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
        <div className={CSS.Workbench}>

            {selectedWorkbench
                ?
                <>
                    <div className={CSS.Toolbar}>
                        {panelToggleInstances}
                    </div>
                    <div className={CSS.Bench}>
                        <selectedWorkbench.component>

                            <div className={CSS.Layout}>
                                <PanelEditor selectedWorkbenchKey={selectedWorkbench.key} />
                                <BarEditor selectedWorkbenchKey={selectedWorkbench.key} />
                            </div>

                            <Viewport selectedWorkbench={selectedWorkbench} />

                        </selectedWorkbench.component>
                    </div>
                </>
                : <p className={CSS.Fallback}>No workbench is currently selected. Please ensure a workbench has been registered and selected.</p>
            }
        </div>

    );
};

export default memo(Workbench);