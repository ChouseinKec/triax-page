"use client";
import React from "react";

// Types
import type { NodeID } from "@/core/block/node/types/instance";

// Components
import GroupLayout from "@/shared/components/layout/group/component";
import { renderStyleRow } from "../factory/component";

/**
 * Renders the Font & Text tab content
 * Shows typography controls, text formatting, spacing, and column properties
 * 
 * @param nodeID - The selected block identifier
 * @returns JSX for the font tab
 */
export const renderFontTab = (nodeID: NodeID): React.ReactElement => {

    return (
        <>
            {/* Font Properties */}
            <GroupLayout
                dividerTitle="Font"
                styles={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ nodeID, label: "Size", propertyName: "font-size" })}
                        {renderStyleRow({ nodeID, label: "Weight", propertyName: "font-weight" })}
                        {renderStyleRow({ nodeID, label: "Height", propertyName: "line-height" })}
                        {renderStyleRow({ nodeID, label: "Family", propertyName: "font-family" })}
                        {renderStyleRow({ nodeID, label: "Style", propertyName: "font-style" })}
                        {renderStyleRow({ nodeID, label: "Color", propertyName: "color" })}
                    </>
                )}
            />

            {/* Text Properties */}
            <GroupLayout
                dividerTitle="Text"
                styles={{ gridTemplateColumns: "repeat(3,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ nodeID, label: "Align", propertyName: "text-align" })}
                        {renderStyleRow({ nodeID, label: "Align Last", propertyName: "text-align-last" })}
                        {renderStyleRow({ nodeID, label: "Transform", propertyName: "text-transform" })}
                        {renderStyleRow({ nodeID, label: "Combine Upright", propertyName: "text-combine-upright" })}
                        {renderStyleRow({ nodeID, label: "Overflow", propertyName: "text-overflow" })}
                        {renderStyleRow({ nodeID, label: "Orientation", propertyName: "text-orientation" })}
                        {renderStyleRow({ nodeID, label: "Decoration", propertyName: "text-decoration", styles: { gridColumn: "1/-1" } })}
                        {renderStyleRow({ nodeID, label: "Shadow", propertyName: "text-shadow", styles: { gridColumn: "1/-1" } })}
                        {renderStyleRow({ nodeID, label: "Indent", propertyName: "text-indent", styles: { gridColumn: "1/3" } })}
                    </>
                )}
            />

            {/* Spacing Properties */}
            <GroupLayout
                dividerTitle="Spacing"
                styles={{ gridTemplateColumns: "repeat(4,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ nodeID, label: "Writing Mode", propertyName: "writing-mode", styles: { gridColumn: "1/3" } })}
                        {renderStyleRow({ nodeID, label: "White Space", propertyName: "white-space", styles: { gridColumn: "3/-1" } })}
                        {renderStyleRow({ nodeID, label: "Word Break", propertyName: "word-break", styles: { gridColumn: "1/3" } })}
                        {renderStyleRow({ nodeID, label: "Line Break", propertyName: "line-break", styles: { gridColumn: "3/-1" } })}
                        {renderStyleRow({ nodeID, label: "Letter Spacing", propertyName: "letter-spacing", styles: { gridColumn: "1/3" } })}
                        {renderStyleRow({ nodeID, label: "Word Spacing", propertyName: "word-spacing", styles: { gridColumn: "3/-1" } })}
                    </>
                )}
            />

            {/* Column Properties */}
            <GroupLayout
                isExpandable={true}
                dividerTitle="Column"
                styles={{ gridTemplateColumns: "repeat(3,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ nodeID, label: "Count", propertyName: "column-count", styles: { gridColumn: "1" } })}
                        {renderStyleRow({ nodeID, label: "Width", propertyName: "column-width", styles: { gridColumn: "2" } })}
                        {renderStyleRow({ nodeID, label: "Gap", propertyName: "column-gap", styles: { gridColumn: "3" } })}
                        {renderStyleRow({ nodeID, label: "Rule Width", propertyName: "column-rule-width" })}
                        {renderStyleRow({ nodeID, label: "Rule Style", propertyName: "column-rule-style" })}
                        {renderStyleRow({ nodeID, label: "Rule Color", propertyName: "column-rule-color" })}
                        {renderStyleRow({ nodeID, label: "Break Before", propertyName: "break-before" })}
                        {renderStyleRow({ nodeID, label: "Break Inside", propertyName: "break-inside" })}
                        {renderStyleRow({ nodeID, label: "Break After", propertyName: "break-after" })}
                        {renderStyleRow({ nodeID, label: "Column Span", propertyName: "column-span" })}
                        {renderStyleRow({ nodeID, label: "Column Fill", propertyName: "column-fill" })}
                    </>
                )}
            />
        </>
    );
};
