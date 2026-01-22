"use client";
import React from "react";

// Types
import type { NodeID } from "@/core/block/node/instance/types";

// Components
import GroupLayout from "@/shared/components/layout/group/component";
import { renderStyleRow } from "../factory";

/**
 * Renders the Background & Mask tab content
 * Shows background image, color, blend mode, and mask properties
 * 
 * @param NodeID - The selected block identifier
 * @returns JSX for the background tab
 */
export const renderBackgroundTab = (NodeID: NodeID): React.ReactElement => {

    return (
        <>
            {/* Background Properties */}
            <GroupLayout
                styles={{ gridTemplateColumns: "repeat(3,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ NodeID, label: "Image", propertyName: "background-image" })}
                        {renderStyleRow({ NodeID, label: "Color", propertyName: "background-color" })}
                        {renderStyleRow({ NodeID, label: "Blend", propertyName: "background-blend-mode" })}
                        {renderStyleRow({ NodeID, label: "Repeat", propertyName: "background-repeat", styles: { gridColumn: "1/-1" } })}
                        {renderStyleRow({ NodeID, label: "Attachment", propertyName: "background-attachment" })}
                        {renderStyleRow({ NodeID, label: "Clip", propertyName: "background-clip" })}
                        {renderStyleRow({ NodeID, label: "Origin", propertyName: "background-origin" })}
                        {renderStyleRow({ NodeID, label: "Size", propertyName: "background-size" })}
                        {renderStyleRow({ NodeID, label: "Position", propertyName: "background-position", styles: { gridColumn: "2/-1" } })}
                    </>
                )}
            />

            {/* Mask Properties */}
            <GroupLayout
                dividerTitle="Mask"
                styles={{ gridTemplateColumns: "repeat(3,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ NodeID, label: "Image", propertyName: "mask-image" })}
                        {renderStyleRow({ NodeID, label: "Type", propertyName: "mask-type" })}
                        {renderStyleRow({ NodeID, label: "Mode", propertyName: "mask-mode" })}
                        {renderStyleRow({ NodeID, label: "Clip", propertyName: "mask-clip", styles: { gridColumn: "1/-1" } })}
                        {renderStyleRow({ NodeID, label: "Repeat", propertyName: "mask-repeat", styles: { gridColumn: "1/-1" } })}
                        {renderStyleRow({ NodeID, label: "Composite", propertyName: "mask-composite" })}
                        {renderStyleRow({ NodeID, label: "Origin", propertyName: "mask-origin", styles: { gridColumn: "2/-1" } })}
                        {renderStyleRow({ NodeID, label: "Size", propertyName: "mask-size" })}
                        {renderStyleRow({ NodeID, label: "Position", propertyName: "mask-position", styles: { gridColumn: "2/-1" } })}
                    </>
                )}
            />
        </>
    );
};
