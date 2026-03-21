"use client";
import React, { useState } from "react";

// Types
import type { NodeID } from "@/core/block/node/types/instance";
import type { Side, Corner } from "@/shared/components/select/position/types";

// Components
import GroupLayout from "@/shared/components/layout/group/component";
import PositionSelect from "@/shared/components/select/position/component";
import Property from "@/shared/components/layout/property/component";
import { renderStyleRow } from "../factory/component";

// Utilities
import { generateStyleKey } from "@/core/block/style/utilities/key";
//

/**
 * Renders the Border & Outline tab content
 * Shows border width/style/color controls, border-radius, outline, and box-decoration
 * 
 * @param nodeID - The selected block identifier
 * @returns JSX for the border tab
 */
export const renderBorderTab = (nodeID: NodeID): React.ReactElement => {
    const [currentSide, setCurrentSide] = useState<Side>("top");
    const [currentCorner, setCurrentCorner] = useState<Corner>(null);

    const borderWidth = generateStyleKey("border", currentSide, "width") || "border-width";
    const borderStyle = generateStyleKey("border", currentSide, "style") || "border-style";
    const borderColor = generateStyleKey("border", currentSide, "color") || "border-color";
    const borderRadius = generateStyleKey("border", currentCorner, "radius") || "border-radius";

    // Disable logic helpers
    const sideControlsDisabled = currentSide === null && currentCorner !== null;
    const cornerControlsDisabled = currentCorner === null && currentSide !== null;

    return (
        <>
            {/* Border Properties */}
            <GroupLayout
                dividerTitle="Border"
                styles={{ gridTemplateColumns: "repeat(3,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        <Property
                            label={null}
                            name="Position Selector"
                            description="Select a side or corner to edit border properties"
                            styles={{ gridColumn: "1", gridRow: "1/3" }}
                            content={() => (
                                <PositionSelect
                                    onChangeSide={setCurrentSide}
                                    onChangeCorner={setCurrentCorner}
                                    isCornerSelectable={true}
                                    isCenterSelectable={true}
                                />
                            )}
                            actions={() => null}
                        />

                        {renderStyleRow({ nodeID, label: "Width", propertyName: borderWidth as any, disabled: sideControlsDisabled })}
                        {renderStyleRow({ nodeID, label: "Style", propertyName: borderStyle as any, disabled: sideControlsDisabled })}
                        {renderStyleRow({ nodeID, label: "Radius", propertyName: borderRadius as any, disabled: cornerControlsDisabled })}
                        {renderStyleRow({ nodeID, label: "Color", propertyName: borderColor as any, disabled: sideControlsDisabled })}
                        {renderStyleRow({ nodeID, label: "Image Source", propertyName: "border-image-source" })}
                        {renderStyleRow({ nodeID, label: "Image Repeat", propertyName: "border-image-repeat", styles: { gridColumn: "2/-1" } })}
                        {renderStyleRow({ nodeID, label: "Image Slice", propertyName: "border-image-slice" })}
                        {renderStyleRow({ nodeID, label: "Image Width", propertyName: "border-image-width" })}
                        {renderStyleRow({ nodeID, label: "Image Outset", propertyName: "border-image-outset" })}
                    </>
                )}
            />

            {/* Outline Properties */}
            <GroupLayout
                dividerTitle="Outline"
                styles={{ gridTemplateColumns: "repeat(2,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ nodeID, label: "Width", propertyName: "outline-width" })}
                        {renderStyleRow({ nodeID, label: "Style", propertyName: "outline-style" })}
                        {renderStyleRow({ nodeID, label: "Color", propertyName: "outline-color" })}
                        {renderStyleRow({ nodeID, label: "Offset", propertyName: "outline-offset"})}
                    </>
                )}
            />


        </>
    );
};
