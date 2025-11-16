"use client";
import React, { useState } from "react";

// Types
import type { BlockID } from "@/src/core/block/instance/types";
import type { StyleKey } from "@/src/core/block/style/types";
import type { Side } from "@/src/shared/components/select/position/types";

// Components
import GroupLayout from "@/src/shared/components/layout/group/component";
import PositionSelect from "@/src/shared/components/select/position/component";
import Property from "@/src/shared/components/layout/property/component";
import { renderStyleRow } from "./factory";

// Utilities
import { generateStyleKey } from "@/src/core/block/style/utilities";

// Managers
import { useBlockStyle } from "@/src/core/block/instance/manager";

/**
 * Renders the Size & Position tab content
 * Shows width/height controls, position controls, and scroll properties
 * 
 * @param blockID - The selected block identifier
 * @returns JSX for the size tab
 */
export const renderSizeTab = (blockID: BlockID): React.ReactElement => {
    const positionValue = useBlockStyle(blockID, "position") || '';
    const [currentSide, setCurrentSide] = useState<Side>("top");

    const padding = generateStyleKey("padding", currentSide) || "padding";
    const margin = generateStyleKey("margin", currentSide) || "margin";

    return (
        <>
            {/* Width & Height */}
            <GroupLayout
                styles={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ blockID, label: "Width", propertyName: "width" })}
                        {renderStyleRow({ blockID, label: "Min Width", propertyName: "min-width" })}
                        {renderStyleRow({ blockID, label: "Max Width", propertyName: "max-width" })}
                        {renderStyleRow({ blockID, label: "Height", propertyName: "height" })}
                        {renderStyleRow({ blockID, label: "Min Height", propertyName: "min-height" })}
                        {renderStyleRow({ blockID, label: "Max Height", propertyName: "max-height" })}
                        {renderStyleRow({ blockID, label: "Aspect Ratio", propertyName: "aspect-ratio", styles: { gridColumn: "1 / -1" } })}
                        {renderStyleRow({ blockID, label: "Overflow", propertyName: "overflow", styles: { gridColumn: "1 / -1" } })}
                    </>
                )}
            />

            {/* Position */}
            <GroupLayout
                dividerTitle=""
                styles={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ blockID, label: "Position", propertyName: "position", styles: { gridColumn: "1/-1", gridRow: "2" } })}

                        <Property
                            label={null}
                            name="Position Selector"
                            description="Select a side to edit its padding, margin, or position value"
                            styles={{ gridColumn: "1/2", gridRow: "3/5" }}
                            content={() => (
                                <PositionSelect
                                    onChangeSide={setCurrentSide}
                                    onChangeCorner={() => { }}
                                    isCornerSelectable={false}
                                    isCenterSelectable={true}
                                />
                            )}
                            actions={() => null}
                        />

                        {renderStyleRow({ blockID, label: "Padding", propertyName: padding as StyleKey })}
                        {renderStyleRow({ blockID, label: "Margin", propertyName: margin as StyleKey })}
                        {renderStyleRow({
                            blockID,
                            label: currentSide || "...",
                            propertyName: (currentSide?.toLowerCase() as StyleKey) || "top",
                            disabled: !["absolute", "fixed", "sticky"].includes(positionValue) || !currentSide,
                        })}
                        {renderStyleRow({ blockID, label: "Z-Index", propertyName: "z-index" })}
                    </>
                )}
            />

            {/* Scroll Properties */}
            <GroupLayout
                isExpandable={true}
                dividerTitle="Scroll"
                styles={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ blockID, label: "Behavior", propertyName: "scroll-behavior", styles: { gridColumn: "1 / 3" } })}
                        {renderStyleRow({ blockID, label: "Snap Stop", propertyName: "scroll-snap-stop", styles: { gridColumn: "3 / -1" } })}
                        {renderStyleRow({ blockID, label: "Overscroll", propertyName: "overscroll-behavior", styles: { gridColumn: "1 / -1" } })}
                        {renderStyleRow({ blockID, label: "Snap Type", propertyName: "scroll-snap-type", styles: { gridColumn: "1 / -1" } })}
                        {renderStyleRow({ blockID, label: "Snap Align", propertyName: "scroll-snap-align", styles: { gridColumn: "1 / -1" } })}
                        {renderStyleRow({ blockID, label: "Margin", propertyName: "scroll-margin", styles: { gridColumn: "1 / -1" } })}
                        {renderStyleRow({ blockID, label: "Margin Block", propertyName: "scroll-margin-block", styles: { gridColumn: "1 / 3" } })}
                        {renderStyleRow({ blockID, label: "Margin Inline", propertyName: "scroll-margin-inline", styles: { gridColumn: "3 / -1" } })}
                        {renderStyleRow({ blockID, label: "Padding", propertyName: "scroll-padding", styles: { gridColumn: "1 / -1" } })}
                        {renderStyleRow({ blockID, label: "Padding Block", propertyName: "scroll-padding-block", styles: { gridColumn: "1 / 3" } })}
                        {renderStyleRow({ blockID, label: "Padding Inline", propertyName: "scroll-padding-inline", styles: { gridColumn: "3 / -1" } })}
                    </>
                )}
            />
        </>
    );
};
