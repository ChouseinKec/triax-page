"use client";
import React, { memo } from "react";

// Components
import Panel from "./panel";

// Types
import type { PanelEditorProps } from "./types";

// Managers
import { usePanels, togglePanel } from "@/src/core/layout/panel/managers";

const PanelEditor: React.FC<PanelEditorProps> = ({ selectedWorkbenchKey }) => {
    const openPanels = usePanels(selectedWorkbenchKey, { workbench: true, open: true });

    return (
        openPanels && openPanels.length > 0
            ? openPanels.map(panel => (
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
            : null
    );


};

export default memo(PanelEditor);