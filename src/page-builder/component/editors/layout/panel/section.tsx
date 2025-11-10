"use client";
import React, { memo } from "react";

// Components
import Panel from "./instance";

// Types
import type { PanelSectionProps } from "./types";

// Managers
import { useOpenPanels, togglePanel } from "@/src/page-builder/service/managers/layout";

const InfoSection: React.FC<PanelSectionProps> = ({ selectedWorkbenchID }) => {
    const openPanels = useOpenPanels(selectedWorkbenchID);

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

export default memo(InfoSection);