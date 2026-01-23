"use client";
import React from "react";

// Types
import type { NodeID } from "@/core/block/node/instance/types/instance";

// Components
import GroupLayout from "@/shared/components/layout/group/component";
import { renderStyleRow } from "../factory/component";

/**
 * Renders the Font & Text tab content
 * Shows typography controls, text formatting, spacing, and column properties
 * 
 * @param NodeID - The selected block identifier
 * @returns JSX for the font tab
 */
export const renderFontTab = (NodeID: NodeID): React.ReactElement => {

    return (
        <>
            {/* Font Properties */}
            <GroupLayout
                styles={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ NodeID, label: "Size", propertyName: "font-size" })}
                        {renderStyleRow({ NodeID, label: "Weight", propertyName: "font-weight" })}
                        {renderStyleRow({ NodeID, label: "Height", propertyName: "line-height" })}
                        {renderStyleRow({ NodeID, label: "Family", propertyName: "font-family" })}
                        {renderStyleRow({ NodeID, label: "Style", propertyName: "font-style" })}
                        {renderStyleRow({ NodeID, label: "Color", propertyName: "color" })}
                    </>
                )}
            />

            {/* Text Properties */}
            <GroupLayout
                dividerTitle="Text"
                styles={{ gridTemplateColumns: "repeat(3,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ NodeID, label: "Align", propertyName: "text-align" })}
                        {renderStyleRow({ NodeID, label: "Align Last", propertyName: "text-align-last" })}
                        {renderStyleRow({ NodeID, label: "Transform", propertyName: "text-transform" })}
                        {renderStyleRow({ NodeID, label: "Combine Upright", propertyName: "text-combine-upright" })}
                        {renderStyleRow({ NodeID, label: "Overflow", propertyName: "text-overflow" })}
                        {renderStyleRow({ NodeID, label: "OrientationDefinition", propertyName: "text-orientation" })}
                        {renderStyleRow({ NodeID, label: "Decoration", propertyName: "text-decoration", styles: { gridColumn: "1/-1" } })}
                        {renderStyleRow({ NodeID, label: "Shadow", propertyName: "text-shadow", styles: { gridColumn: "1/-1" } })}
                        {renderStyleRow({ NodeID, label: "Indent", propertyName: "text-indent", styles: { gridColumn: "1/3" } })}
                    </>
                )}
            />

            {/* Spacing Properties */}
            <GroupLayout
                dividerTitle="Spacing"
                styles={{ gridTemplateColumns: "repeat(4,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ NodeID, label: "Writing Mode", propertyName: "writing-mode", styles: { gridColumn: "1/3" } })}
                        {renderStyleRow({ NodeID, label: "White Space", propertyName: "white-space", styles: { gridColumn: "3/-1" } })}
                        {renderStyleRow({ NodeID, label: "Word Break", propertyName: "word-break", styles: { gridColumn: "1/3" } })}
                        {renderStyleRow({ NodeID, label: "Line Break", propertyName: "line-break", styles: { gridColumn: "3/-1" } })}
                        {renderStyleRow({ NodeID, label: "Letter Spacing", propertyName: "letter-spacing", styles: { gridColumn: "1/3" } })}
                        {renderStyleRow({ NodeID, label: "Word Spacing", propertyName: "word-spacing", styles: { gridColumn: "3/-1" } })}
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
                        {renderStyleRow({ NodeID, label: "Count", propertyName: "column-count", styles: { gridColumn: "1" } })}
                        {renderStyleRow({ NodeID, label: "Width", propertyName: "column-width", styles: { gridColumn: "2" } })}
                        {renderStyleRow({ NodeID, label: "Gap", propertyName: "column-gap", styles: { gridColumn: "3" } })}
                        {renderStyleRow({ NodeID, label: "Rule Width", propertyName: "column-rule-width" })}
                        {renderStyleRow({ NodeID, label: "Rule Style", propertyName: "column-rule-style" })}
                        {renderStyleRow({ NodeID, label: "Rule Color", propertyName: "column-rule-color" })}
                        {renderStyleRow({ NodeID, label: "Break Before", propertyName: "break-before" })}
                        {renderStyleRow({ NodeID, label: "Break Inside", propertyName: "break-inside" })}
                        {renderStyleRow({ NodeID, label: "Break After", propertyName: "break-after" })}
                        {renderStyleRow({ NodeID, label: "Column Span", propertyName: "column-span" })}
                        {renderStyleRow({ NodeID, label: "Column Fill", propertyName: "column-fill" })}
                    </>
                )}
            />
        </>
    );
};
