"use client";
import React from "react";

// Types
import type { PanelEditorProps } from "./types";

// Components
import Panel from "./panel";

// Managers
import { getPanelDefinitions, usePanelOpenState } from "@/core/layout/panel/managers";

const PanelEditor: React.FC<PanelEditorProps> = ({ benchKey }) => {
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

export default PanelEditor;