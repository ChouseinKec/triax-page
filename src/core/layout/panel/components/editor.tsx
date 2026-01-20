"use client";
import React from "react";

// Types
import type { PanelsProps } from "./types";

// Components
import Panel from "./panel";

// Managers
import { getPanelDefinitions, usePanelOpenState } from "@/src/core/layout/panel/managers";

const Panels: React.FC<PanelsProps> = ({ benchKey }) => {
    const panelDefinitions = getPanelDefinitions(benchKey);

    return (
        <>
            {panelDefinitions.map(panelDef => {
                const isOpen = usePanelOpenState(panelDef.key);
                return isOpen ? (
                    <Panel
                        key={panelDef.key}
                        panelKey={panelDef.key}
                    />
                ) : null;
            })}
        </>
    );
};

export default Panels;