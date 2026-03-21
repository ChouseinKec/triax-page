"use client";
import React from "react";

// Types
import type { NodeID } from "@/core/block/node/types/instance";

// Components
import GroupLayout from "@/shared/components/layout/group/component";
import { renderStyleRow } from "../factory/component";

/**
 * Renders the Background & Mask tab content
 * Shows background image, color, blend mode, and mask properties
 * 
 * @param nodeID - The selected block identifier
 * @returns JSX for the background tab
 */
export const renderBackgroundTab = (nodeID: NodeID): React.ReactElement => {

    return (
        <>
            {/* Background Properties */}
            <GroupLayout
                dividerTitle="Background"
                styles={{ gridTemplateColumns: "repeat(3,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ nodeID, label: "Image", propertyName: "background-image" })}
                        {renderStyleRow({ nodeID, label: "Color", propertyName: "background-color" })}
                        {renderStyleRow({ nodeID, label: "Blend", propertyName: "background-blend-mode" })}

                        {renderStyleRow({ nodeID, label: "Attachment", propertyName: "background-attachment" })}
                        {renderStyleRow({ nodeID, label: "Clip", propertyName: "background-clip" })}
                        {renderStyleRow({ nodeID, label: "Origin", propertyName: "background-origin" })}

                        {renderStyleRow({ nodeID, label: "Size", propertyName: "background-size" })}
                        {renderStyleRow({ nodeID, label: "Position", propertyName: "background-position" })}
                        {renderStyleRow({ nodeID, label: "Repeat", propertyName: "background-repeat" })}

                    </>
                )}
            />

            {/* Mask Properties */}
            <GroupLayout
                dividerTitle="Mask"
                styles={{ gridTemplateColumns: "repeat(3,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ nodeID, label: "Image", propertyName: "mask-image" })}
                        {renderStyleRow({ nodeID, label: "Type", propertyName: "mask-type" })}
                        {renderStyleRow({ nodeID, label: "Mode", propertyName: "mask-mode" })}

                        {renderStyleRow({ nodeID, label: "Composite", propertyName: "mask-composite" })}
                        {renderStyleRow({ nodeID, label: "Clip", propertyName: "mask-clip" })}
                        {renderStyleRow({ nodeID, label: "Origin", propertyName: "mask-origin" })}

                        {renderStyleRow({ nodeID, label: "Size", propertyName: "mask-size" })}
                        {renderStyleRow({ nodeID, label: "Position", propertyName: "mask-position" })}
                        {renderStyleRow({ nodeID, label: "Repeat", propertyName: "mask-repeat" })}
                    </>
                )}
            />


            <GroupLayout
                dividerTitle="Generic"
                styles={{ gridTemplateColumns: "repeat(3,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ nodeID, label: "Blend Mode", propertyName: "mix-blend-mode" })}
                    </>
                )}
            />
        </>
    );
};
