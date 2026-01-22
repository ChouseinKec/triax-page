"use client";
import React, { useState } from "react";

// Types
import type { NodeID } from "@/core/block/node/instance/types/instance";
import type { StyleKey } from "@/core/block/style/definition/types";
import type { Side } from "@/shared/components/select/position/types";

// Components
import GroupLayout from "@/shared/components/layout/group/component";
import PositionSelect from "@/shared/components/select/position/component";
import Property from "@/shared/components/layout/property/component";
import { renderStyleRow } from "../factory";

// Utilities
import { generateStyleKey } from "@/core/block/style/instance/utilities";

// Managers
import { useBlockStyle } from "@/core/block/style/instance/managers";

/**
 * Renders the Size & Position tab content
 * Shows width/height controls, position controls, and scroll properties
 * 
 * @param NodeID - The selected block identifier
 * @returns JSX for the size tab
 */
export const renderSizeTab = (NodeID: NodeID): React.ReactElement => {
    const positionValue = useBlockStyle(NodeID, "position") || '';
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
                        {renderStyleRow({ NodeID, label: "Width", propertyName: "width" })}
                        {renderStyleRow({ NodeID, label: "Min Width", propertyName: "min-width" })}
                        {renderStyleRow({ NodeID, label: "Max Width", propertyName: "max-width" })}
                        {renderStyleRow({ NodeID, label: "Height", propertyName: "height" })}
                        {renderStyleRow({ NodeID, label: "Min Height", propertyName: "min-height" })}
                        {renderStyleRow({ NodeID, label: "Max Height", propertyName: "max-height" })}
                        {renderStyleRow({ NodeID, label: "Aspect Ratio", propertyName: "aspect-ratio", styles: { gridColumn: "1 / -1" } })}
                        {renderStyleRow({ NodeID, label: "Overflow", propertyName: "overflow", styles: { gridColumn: "1 / -1" } })}
                        {renderStyleRow({
                            NodeID,
                            label: "Z-Index",
                            propertyName: "z-index",
                            styles: { gridColumn: "1/-1" }
                        })}
                    </>
                )}
            />

            {/* Position */}
            <GroupLayout
                dividerTitle=""
                styles={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ NodeID, label: "Position", propertyName: "position", styles: { gridColumn: "1/-1", gridRow: "1" } })}

                        <Property
                            label={null}
                            name="Position Selector"
                            description="Select a side to edit its padding, margin, or position value"
                            styles={{ gridColumn: "1/2", gridRow: "2/5" }}
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

                        {renderStyleRow({
                            NodeID,
                            label: "Padding",
                            propertyName: padding,
                            styles: { gridColumn: "2/-1", gridRow: "2", flexDirection: "row" }
                        })}

                        {renderStyleRow({
                            NodeID,
                            label: "Margin",
                            propertyName: margin,
                            styles: { gridColumn: "2/-1", gridRow: "3", flexDirection: "row" }
                        })}
                        {renderStyleRow({
                            NodeID,
                            label: currentSide || "...",
                            propertyName: (currentSide?.toLowerCase()) || "top",
                            disabled: !["absolute", "fixed", "sticky"].includes(positionValue) || !currentSide,
                            styles: { gridColumn: "2/-1", gridRow: "4", flexDirection: "row" }
                        })}

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
                        {renderStyleRow({ NodeID, label: "Behavior", propertyName: "scroll-behavior", styles: { gridColumn: "1 / 3" } })}
                        {renderStyleRow({ NodeID, label: "Snap Stop", propertyName: "scroll-snap-stop", styles: { gridColumn: "3 / -1" } })}
                        {renderStyleRow({ NodeID, label: "Overscroll", propertyName: "overscroll-behavior", styles: { gridColumn: "1 / -1" } })}
                        {renderStyleRow({ NodeID, label: "Snap Type", propertyName: "scroll-snap-type", styles: { gridColumn: "1 / -1" } })}
                        {renderStyleRow({ NodeID, label: "Snap Align", propertyName: "scroll-snap-align", styles: { gridColumn: "1 / -1" } })}
                        {renderStyleRow({ NodeID, label: "Margin", propertyName: "scroll-margin", styles: { gridColumn: "1 / -1" } })}
                        {renderStyleRow({ NodeID, label: "Margin Block", propertyName: "scroll-margin-block", styles: { gridColumn: "1 / 3" } })}
                        {renderStyleRow({ NodeID, label: "Margin Inline", propertyName: "scroll-margin-inline", styles: { gridColumn: "3 / -1" } })}
                        {renderStyleRow({ NodeID, label: "Padding", propertyName: "scroll-padding", styles: { gridColumn: "1 / -1" } })}
                        {renderStyleRow({ NodeID, label: "Padding Block", propertyName: "scroll-padding-block", styles: { gridColumn: "1 / 3" } })}
                        {renderStyleRow({ NodeID, label: "Padding Inline", propertyName: "scroll-padding-inline", styles: { gridColumn: "3 / -1" } })}
                    </>
                )}
            />
        </>
    );
};
