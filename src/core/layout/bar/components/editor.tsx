"use client";
import React, { memo } from "react";

// Components
import Bar from "./bar";

// Types
import type { BarEditorProps } from "./types";

// Managers
import { getBarsByWorkbench } from "@/src/core/layout/bar/managers";

/**
 * LayoutEditor Component
 * Renders the layout editor UI, including LayoutPanel actions and open LayoutPanels.
 * @param props - LayoutEditorProps
 * @returns ReactElement
 */
const BarEditor: React.FC<BarEditorProps> = ({ selectedWorkbenchKey }) => {
    const allBars = getBarsByWorkbench(selectedWorkbenchKey);

    return (
        allBars && allBars.length > 0
            ? allBars.map(bar => (
                <Bar
                    key={bar.id}
                    barID={bar.id}
                    position={bar.position}
                    size={bar.size}
                    title={bar.title}
                    isTransparent={bar.isTransparent}
                />
            ))
            : null
    );

};

export default memo(BarEditor);