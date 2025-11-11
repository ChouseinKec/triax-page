"use client";
import React, { memo } from "react";

// Components
import Bar from "./instance";

// Types
import type { BarSectionProps } from "./types";

// Managers
import { getBarsByWorkbench } from "@/src/page/layout/service/manager";

/**
 * LayoutEditor Component
 * Renders the layout editor UI, including LayoutPanel actions and open LayoutPanels.
 * @param props - LayoutEditorProps
 * @returns ReactElement
 */
const BarSection: React.FC<BarSectionProps> = ({ selectedWorkbenchID }) => {
    const allBars = getBarsByWorkbench(selectedWorkbenchID);

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

export default memo(BarSection);