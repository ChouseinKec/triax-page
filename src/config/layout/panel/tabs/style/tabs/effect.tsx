"use client";
import React from "react";

// Types
import type { NodeID } from "@/core/block/node/instance/types";

// Components
import GroupLayout from "@/shared/components/layout/group/component";
import { renderStyleRow } from "../factory";

/**
 * Renders the Effects tab content
 * Shows filters, transforms, shadows, and opacity controls
 * 
 * @param NodeID - The selected block identifier
 * @returns JSX for the effects tab
 */
export const renderEffectTab = (NodeID: NodeID): React.ReactElement => {

    return (
        <>
            {/* Effect Properties */}
            <GroupLayout
                content={() => (
                    <>
                        {renderStyleRow({ NodeID, label: "Filter", propertyName: "filter" })}
                        {renderStyleRow({ NodeID, label: "Backdrop", propertyName: "backdrop-filter" })}
                        {renderStyleRow({ NodeID, label: "Transform", propertyName: "transform" })}
                        {renderStyleRow({ NodeID, label: "Box-Shadow", propertyName: "box-shadow" })}
                        {renderStyleRow({ NodeID, label: "Opacity", propertyName: "opacity" })}
                    </>
                )}
            />
        </>
    );
};
