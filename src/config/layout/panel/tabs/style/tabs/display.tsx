"use client";
import React, { useMemo } from "react";

// Types
import type { NodeID } from "@/core/block/node/types/instance";

// Components
import GroupLayout from "@/shared/components/layout/group/component";
import { renderStyleRow } from "../factory/component";

// Managers
import { useBlockStyle } from "@/core/block/style/managers";
import { useBlockNode } from "@/core/block/node/managers";

/**
 * Renders the Display & Layout tab content
 * Shows display property and conditionally renders flex or grid specific controls
 * 
 * @param nodeID - The selected block identifier
 * @returns JSX for the display tab
 */
export const renderDisplayTab = (nodeID: NodeID): React.ReactElement => {
    const displayValue = useBlockStyle(nodeID, "display");
    const flexWrapValue = useBlockStyle(nodeID, "flex-wrap");

    const parentID = useBlockNode(nodeID)?.parentID;
    const parentDisplayValue = useBlockStyle((parentID ?? "") as NodeID, "display");

    const displayIsFlex = useMemo(() => displayValue === "flex", [displayValue]);
    const displayIsGrid = useMemo(() => displayValue === "grid", [displayValue]);
    const isAlignContentDisabled = useMemo(() => flexWrapValue === "nowrap" || flexWrapValue === "", [flexWrapValue]);
    const parentIsFlex = useMemo(() => parentDisplayValue === "flex", [parentDisplayValue]);

    return (
        <>
            {/* Display Property */}
            {
                renderStyleRow({ nodeID, label: "Display", propertyName: "display" })
            }

            {/* Flex-specific Properties */}
            {displayIsFlex && (
                <GroupLayout
                    dividerTitle="Flex"
                    styles={{ gridTemplateColumns: "repeat(2,minmax(0, 1fr))" }}
                    content={() => (
                        <>
                            {renderStyleRow({ nodeID, label: "Flex Direction", propertyName: "flex-direction" })}
                            {renderStyleRow({ nodeID, label: "Flex Wrap", propertyName: "flex-wrap" })}
                            {renderStyleRow({ nodeID, label: "Align Items", propertyName: "align-items", styles: { gridColumn: "1" } })}
                            {renderStyleRow({ nodeID, label: "Align Content", propertyName: "align-content", styles: { gridColumn: "2" }, disabled: isAlignContentDisabled })}
                            {renderStyleRow({ nodeID, label: "Justify Content", propertyName: "justify-content", styles: { gridColumn: "1" } })}
                            {renderStyleRow({ nodeID, label: "Gap", propertyName: "gap" })}
                        </>
                    )}
                />
            )}

            {/* Flex Item Properties (when parent is display: flex) */}
            {parentIsFlex && (
                <GroupLayout
                    dividerTitle="Flex Item"
                    styles={{ gridTemplateColumns: "repeat(2,minmax(0, 1fr))" }}
                    content={() => (
                        <>
                            {renderStyleRow({ nodeID, label: "Flex Grow", propertyName: "flex-grow", styles: { gridColumn: "1" } })}
                            {renderStyleRow({ nodeID, label: "Flex Shrink", propertyName: "flex-shrink", styles: { gridColumn: "2" } })}

                            {renderStyleRow({ nodeID, label: "Flex Basis", propertyName: "flex-basis", styles: { gridColumn: "1" } })}
                            {renderStyleRow({ nodeID, label: "Order", propertyName: "order", styles: { gridColumn: "2" } })}

                            {renderStyleRow({ nodeID, label: "Align Self", propertyName: "align-self", styles: { gridColumn: "1" } })}
                            {renderStyleRow({ nodeID, label: "Justify Self", propertyName: "justify-self", styles: { gridColumn: "2" } })}

                        </>
                    )}
                />
            )}

            {/* Grid-specific Properties */}
            {displayIsGrid && (
                <GroupLayout
                    dividerTitle="Grid"
                    styles={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}
                    content={() => (
                        <>
                            {renderStyleRow({ nodeID, label: "Justify Content", propertyName: "justify-content", styles: { gridColumn: "1" } })}
                            {renderStyleRow({ nodeID, label: "Justify Items", propertyName: "justify-items", styles: { gridColumn: "2" } })}
                            {renderStyleRow({ nodeID, label: "Align Content", propertyName: "align-content", styles: { gridColumn: "1" } })}
                            {renderStyleRow({ nodeID, label: "Align Items", propertyName: "align-items", styles: { gridColumn: "2" } })}
                            {renderStyleRow({ nodeID, label: "Auto Rows", propertyName: "grid-auto-rows" })}
                            {renderStyleRow({ nodeID, label: "Auto Columns", propertyName: "grid-auto-columns" })}
                            {renderStyleRow({ nodeID, label: "Template Rows", propertyName: "grid-template-rows" })}
                            {renderStyleRow({ nodeID, label: "Template Columns", propertyName: "grid-template-columns" })}
                            {renderStyleRow({ nodeID, label: "Auto Flow", propertyName: "grid-auto-flow", styles: { gridColumn: "1" } })}
                            {renderStyleRow({ nodeID, label: "Gap", propertyName: "gap", styles: { gridColumn: "2" } })}
                        </>
                    )}
                />
            )}

            {/* Generic Layout Properties */}
            <GroupLayout
                dividerTitle="Generic"
                isExpandable={parentIsFlex || displayIsFlex || displayIsGrid}
                styles={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ nodeID, label: "Direction", propertyName: "direction" })}
                        {renderStyleRow({ nodeID, label: "Box Sizing", propertyName: "box-sizing" })}
                        {renderStyleRow({ nodeID, label: "Visibility", propertyName: "visibility" })}
                        {renderStyleRow({ nodeID, label: "Float", propertyName: "float" })}
                        {renderStyleRow({ nodeID, label: "Clear", propertyName: "clear" })}
                        {renderStyleRow({ nodeID, label: "Object Position", propertyName: "object-position", styles: { gridColumn: "2/-1" } })}
                        {renderStyleRow({ nodeID, label: "Object Fit", propertyName: "object-fit", styles: { gridColumn: "1/-1" } })}
                    </>
                )}
            />
        </>
    );
};
