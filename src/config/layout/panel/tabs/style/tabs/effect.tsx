"use client";
import React from "react";

// Types
import type { NodeID } from "@/core/block/node/types/instance";

// Components
import GroupLayout from "@/shared/components/layout/group/component";
import { renderStyleRow } from "../factory/component";

/**
 * Renders the Effects tab content
 * Shows filters, transforms, shadows, and opacity controls
 * 
 * @param nodeID - The selected block identifier
 * @returns JSX for the effects tab
 */
export const renderEffectTab = (nodeID: NodeID): React.ReactElement => {

    return (
        <>
            {/* Effect Properties */}
            <GroupLayout
                dividerTitle="Generic"
                content={() => (
                    <>
                        {renderStyleRow({ nodeID, label: "Filter", propertyName: "filter" })}
                        {renderStyleRow({ nodeID, label: "Backdrop", propertyName: "backdrop-filter" })}
                        {renderStyleRow({ nodeID, label: "Transform", propertyName: "transform" })}
                        {renderStyleRow({ nodeID, label: "Box-Shadow", propertyName: "box-shadow" })}
                        {renderStyleRow({ nodeID, label: "Opacity", propertyName: "opacity" })}
                    </>
                )}
            />
        </>
    );
};
