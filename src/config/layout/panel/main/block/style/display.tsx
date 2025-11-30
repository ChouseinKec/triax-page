"use client";
import React, { useMemo } from "react";

// Types
import type { BlockID } from "@/src/core/block/instance/types";

// Components
import GroupLayout from "@/src/shared/components/layout/group/component";
import { renderStyleRow } from "./factory";

// Managers
import { useBlockStyle } from "@/src/core/block/style/manager/";

/**
 * Renders the Display & Layout tab content
 * Shows display property and conditionally renders flex or grid specific controls
 * 
 * @param blockID - The selected block identifier
 * @returns JSX for the display tab
 */
export const renderDisplayTab = (blockID: BlockID): React.ReactElement => {
    const displayValue = useBlockStyle(blockID, "display");
    const flexWrapValue = useBlockStyle(blockID, "flex-wrap");

    const displayIsFlex = useMemo(() => displayValue === "flex", [displayValue]);
    const displayIsGrid = useMemo(() => displayValue === "grid", [displayValue]);
    const isAlignContentDisabled = useMemo(() => flexWrapValue === "nowrap" || flexWrapValue === "", [flexWrapValue]);

    return (
        <>
            {/* Display Property */}
            <GroupLayout
                styles={{ gridTemplateColumns: "minmax(0,1fr)" }}
                content={() => renderStyleRow({ blockID, label: "Display", propertyName: "display" })}
            />

            {/* Flex-specific Properties */}
            {displayIsFlex && (
                <GroupLayout
                    dividerTitle=""
                    styles={{ gridTemplateColumns: "repeat(2,minmax(0, 1fr))" }}
                    content={() => (
                        <>
                            {renderStyleRow({ blockID, label: "Direction", propertyName: "flex-direction" })}
                            {renderStyleRow({ blockID, label: "Wrap", propertyName: "flex-wrap" })}
                            {renderStyleRow({ blockID, label: "Align Items", propertyName: "align-items", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ blockID, label: "Align Content", propertyName: "align-content", styles: { gridColumn: "1/-1" }, disabled: isAlignContentDisabled })}
                            {renderStyleRow({ blockID, label: "Justify Content", propertyName: "justify-content", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ blockID, label: "Row Gap", propertyName: "row-gap" })}
                            {renderStyleRow({ blockID, label: "Column Gap", propertyName: "column-gap" })}
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
                            {renderStyleRow({ blockID, label: "Justify Content", propertyName: "justify-content", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ blockID, label: "Justify Items", propertyName: "justify-items", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ blockID, label: "Align Content", propertyName: "align-content", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ blockID, label: "Align Items", propertyName: "align-items", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ blockID, label: "Auto Flow", propertyName: "grid-auto-flow", styles: { gridColumn: "1/-1" } })}
                            {renderStyleRow({ blockID, label: "Auto Rows", propertyName: "grid-auto-rows" })}
                            {renderStyleRow({ blockID, label: "Auto Columns", propertyName: "grid-auto-columns" })}
                            {renderStyleRow({ blockID, label: "Template Rows", propertyName: "grid-template-rows" })}
                            {renderStyleRow({ blockID, label: "Template Columns", propertyName: "grid-template-columns" })}
                            {renderStyleRow({ blockID, label: "Row Gap", propertyName: "row-gap", styles: { gridColumn: "1" } })}
                            {renderStyleRow({ blockID, label: "Column Gap", propertyName: "column-gap", styles: { gridColumn: "2" } })}
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
                        {renderStyleRow({ blockID, label: "Direction", propertyName: "direction" })}
                        {renderStyleRow({ blockID, label: "Box Sizing", propertyName: "box-sizing" })}
                        {renderStyleRow({ blockID, label: "Visibility", propertyName: "visibility" })}
                        {renderStyleRow({ blockID, label: "Float", propertyName: "float" })}
                        {renderStyleRow({ blockID, label: "Clear", propertyName: "clear" })}
                        {renderStyleRow({ blockID, label: "Object Position", propertyName: "object-position", styles: { gridColumn: "2/-1" } })}
                        {renderStyleRow({ blockID, label: "Object Fit", propertyName: "object-fit", styles: { gridColumn: "1/-1" } })}
                    </>
                )}
            />
        </>
    );
};
