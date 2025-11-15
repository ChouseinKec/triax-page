"use client";
import React, { useState } from "react";

// Types
import type { BlockID } from "@/src/core/block/instance/types";
import type { Side, Corner } from "@/src/shared/components/select/position/types";

// Components
import GroupLayout from "@/src/shared/components/layout/group/component";
import PositionSelect from "@/src/shared/components/select/position/component";
import Property from "@/src/shared/components/layout/property/component";
import { renderStyleRow } from "./factory";

// Utilities
import { generateStyleKey } from "@/src/core/block/style/core/utilities/key";
//

/**
 * Renders the Border & Outline tab content
 * Shows border width/style/color controls, border-radius, outline, and box-decoration
 * 
 * @param blockID - The selected block identifier
 * @returns JSX for the border tab
 */
export const renderBorderTab = (blockID: BlockID): React.ReactElement => {
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

                        {renderStyleRow({ blockID, label: "Width", propertyName: borderWidth as any, disabled: sideControlsDisabled })}
                        {renderStyleRow({ blockID, label: "Style", propertyName: borderStyle as any, disabled: sideControlsDisabled })}
                        {renderStyleRow({ blockID, label: "Radius", propertyName: borderRadius as any, disabled: cornerControlsDisabled })}
                        {renderStyleRow({ blockID, label: "Color", propertyName: borderColor as any, disabled: sideControlsDisabled })}
                        {renderStyleRow({ blockID, label: "Image Source", propertyName: "border-image-source" })}
                        {renderStyleRow({ blockID, label: "Image Repeat", propertyName: "border-image-repeat", styles: { gridColumn: "2/-1" } })}
                        {renderStyleRow({ blockID, label: "Image Slice", propertyName: "border-image-slice" })}
                        {renderStyleRow({ blockID, label: "Image Width", propertyName: "border-image-width" })}
                        {renderStyleRow({ blockID, label: "Image Outset", propertyName: "border-image-outset" })}
                    </>
                )}
            />

            {/* Outline Properties */}
            <GroupLayout
                dividerTitle="Outline"
                styles={{ gridTemplateColumns: "repeat(3,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ blockID, label: "Width", propertyName: "outline-width" })}
                        {renderStyleRow({ blockID, label: "Style", propertyName: "outline-style" })}
                        {renderStyleRow({ blockID, label: "Color", propertyName: "outline-color" })}
                        {renderStyleRow({ blockID, label: "Offset", propertyName: "outline-offset", styles: { gridColumn: "1/3" } })}
                    </>
                )}
            />


        </>
    );
};
