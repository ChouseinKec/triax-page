"use client";
import React, { useMemo } from "react";

// Types
import type { NodeID } from "@/core/block/node/types/instance";

// Components
import GroupLayout from "@/shared/components/layout/group/component";
import { renderStyleRow } from "../factory/component";

// Managers
import { useBlockStyle } from "@/core/block/style/managers";

/**
 * Renders the Display & Layout tab content
 * Shows display property and conditionally renders flex or grid specific controls
 * 
 * @param NodeID - The selected block identifier
 * @returns JSX for the display tab
 */
export const renderDisplayTab = (NodeID: NodeID): React.ReactElement => {
    const displayValue = useBlockStyle(NodeID, "display");
    const flexWrapValue = useBlockStyle(NodeID, "flex-wrap");

    const displayIsFlex = useMemo(() => displayValue === "flex", [displayValue]);
    const displayIsGrid = useMemo(() => displayValue === "grid", [displayValue]);
    const isAlignContentDisabled = useMemo(() => flexWrapValue === "nowrap" || flexWrapValue === "", [flexWrapValue]);

    return (
        <>
            {/* Display Property */}
            <GroupLayout
                styles={{ gridTemplateColumns: "minmax(0,1fr)" }}
                content={() => renderStyleRow({ NodeID, label: "Display", propertyName: "display" })}
            />

            {/* Flex-specific Properties */}
            {displayIsFlex && (
                <GroupLayout
                    dividerTitle=""
                    styles={{ gridTemplateColumns: "repeat(2,minmax(0, 1fr))" }}
                    content={() => (
                        <>
                            {renderStyleRow({ NodeID, label: "Direction", propertyName: "flex-direction" })}
                            {renderStyleRow({ NodeID, label: "Wrap", propertyName: "flex-wrap" })}
                            {renderStyleRow({ NodeID, label: "Align Items", propertyName: "align-items", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ NodeID, label: "Align Content", propertyName: "align-content", styles: { gridColumn: "1/-1" }, disabled: isAlignContentDisabled })}
                            {renderStyleRow({ NodeID, label: "Justify Content", propertyName: "justify-content", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ NodeID, label: "Row Gap", propertyName: "row-gap" })}
                            {renderStyleRow({ NodeID, label: "Column Gap", propertyName: "column-gap" })}
                        </>
                    )}
                />
            )}

            {/* Grid-specific Properties */}
            {displayIsGrid && (
                <GroupLayout
                    dividerTitle=""
                    styles={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}
                    content={() => (
                        <>
                            {renderStyleRow({ NodeID, label: "Justify Content", propertyName: "justify-content", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ NodeID, label: "Justify Items", propertyName: "justify-items", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ NodeID, label: "Align Content", propertyName: "align-content", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ NodeID, label: "Align Items", propertyName: "align-items", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ NodeID, label: "Auto Flow", propertyName: "grid-auto-flow", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ NodeID, label: "Auto Rows", propertyName: "grid-auto-rows" })}
                            {renderStyleRow({ NodeID, label: "Auto Columns", propertyName: "grid-auto-columns" })}
                            {renderStyleRow({ NodeID, label: "Template Rows", propertyName: "grid-template-rows" })}
                            {renderStyleRow({ NodeID, label: "Template Columns", propertyName: "grid-template-columns" })}
                            {renderStyleRow({ NodeID, label: "Row Gap", propertyName: "row-gap", styles: { gridColumn: "1" } })}
                            {renderStyleRow({ NodeID, label: "Column Gap", propertyName: "column-gap", styles: { gridColumn: "2" } })}
                        </>
                    )}
                />
            )}

            {/* Generic Layout Properties */}
            <GroupLayout
                dividerTitle=""
                styles={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ NodeID, label: "Direction", propertyName: "direction" })}
                        {renderStyleRow({ NodeID, label: "Box Sizing", propertyName: "box-sizing" })}
                        {renderStyleRow({ NodeID, label: "Visibility", propertyName: "visibility" })}
                        {renderStyleRow({ NodeID, label: "Float", propertyName: "float" })}
                        {renderStyleRow({ NodeID, label: "Clear", propertyName: "clear" })}
                        {renderStyleRow({ NodeID, label: "Object Position", propertyName: "object-position", styles: { gridColumn: "2/-1" } })}
                        {renderStyleRow({ NodeID, label: "Object Fit", propertyName: "object-fit", styles: { gridColumn: "1/-1" } })}
                    </>
                )}
            />
        </>
    );
};
