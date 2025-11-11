"use client";
import React from "react";

// Types
import type { BlockID } from "@/src/page/core/block/block/types";

// Components
import GroupLayout from "@/src/shared/components/layout/group/component";
import { renderStyleRow } from "./factory";

/**
 * Renders the Background & Mask tab content
 * Shows background image, color, blend mode, and mask properties
 * 
 * @param blockID - The selected block identifier
 * @returns JSX for the background tab
 */
export const renderBackgroundTab = (blockID: BlockID): React.ReactElement => {

    return (
        <>
            {/* Background Properties */}
            <GroupLayout
                styles={{ gridTemplateColumns: "repeat(3,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ blockID, label: "Image", propertyName: "background-image" })}
                        {renderStyleRow({ blockID, label: "Color", propertyName: "background-color" })}
                        {renderStyleRow({ blockID, label: "Blend", propertyName: "background-blend-mode" })}
                        {renderStyleRow({ blockID, label: "Repeat", propertyName: "background-repeat", styles: { gridColumn: "1/-1" } })}
                        {renderStyleRow({ blockID, label: "Attachment", propertyName: "background-attachment" })}
                        {renderStyleRow({ blockID, label: "Clip", propertyName: "background-clip" })}
                        {renderStyleRow({ blockID, label: "Origin", propertyName: "background-origin" })}
                        {renderStyleRow({ blockID, label: "Size", propertyName: "background-size" })}
                        {renderStyleRow({ blockID, label: "Position", propertyName: "background-position", styles: { gridColumn: "2/-1" } })}
                    </>
                )}
            />

            {/* Mask Properties */}
            <GroupLayout
                dividerTitle="Mask"
                styles={{ gridTemplateColumns: "repeat(3,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ blockID, label: "Image", propertyName: "mask-image" })}
                        {renderStyleRow({ blockID, label: "Type", propertyName: "mask-type" })}
                        {renderStyleRow({ blockID, label: "Mode", propertyName: "mask-mode" })}
                        {renderStyleRow({ blockID, label: "Clip", propertyName: "mask-clip", styles: { gridColumn: "1/-1" } })}
                        {renderStyleRow({ blockID, label: "Repeat", propertyName: "mask-repeat", styles: { gridColumn: "1/-1" } })}
                        {renderStyleRow({ blockID, label: "Composite", propertyName: "mask-composite" })}
                        {renderStyleRow({ blockID, label: "Origin", propertyName: "mask-origin", styles: { gridColumn: "2/-1" } })}
                        {renderStyleRow({ blockID, label: "Size", propertyName: "mask-size" })}
                        {renderStyleRow({ blockID, label: "Position", propertyName: "mask-position", styles: { gridColumn: "2/-1" } })}
                    </>
                )}
            />
        </>
    );
};
