"use client";
import React from "react";

// Types
import type { BlockID } from "@/src/page/core/block/block/types";

// Components
import GroupLayout from "@/src/shared/components/layout/group/component";
import { renderStyleRow } from "./factory";

/**
 * Renders the Effects tab content
 * Shows filters, transforms, shadows, and opacity controls
 * 
 * @param blockID - The selected block identifier
 * @returns JSX for the effects tab
 */
export const renderEffectTab = (blockID: BlockID): React.ReactElement => {

    return (
        <>
            {/* Effect Properties */}
            <GroupLayout
                content={() => (
                    <>
                        {renderStyleRow({ blockID, label: "Filter", propertyName: "filter" })}
                        {renderStyleRow({ blockID, label: "Backdrop", propertyName: "backdrop-filter" })}
                        {renderStyleRow({ blockID, label: "Transform", propertyName: "transform" })}
                        {renderStyleRow({ blockID, label: "Box-Shadow", propertyName: "box-shadow" })}
                        {renderStyleRow({ blockID, label: "Opacity", propertyName: "opacity" })}
                    </>
                )}
            />
        </>
    );
};
