"use client";
import React from "react";

// Types
import type { BlockID } from "@/src/page/core/block/block/types";

// Components
import GroupLayout from "@/src/shared/components/layout/group/component";
import { renderStyleRow } from "./factory";

/**
 * Renders the Font & Text tab content
 * Shows typography controls, text formatting, spacing, and column properties
 * 
 * @param blockID - The selected block identifier
 * @returns JSX for the font tab
 */
export const renderFontTab = (blockID: BlockID): React.ReactElement => {

    return (
        <>
            {/* Font Properties */}
            <GroupLayout
                styles={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ blockID, label: "Size", propertyName: "font-size" })}
                        {renderStyleRow({ blockID, label: "Weight", propertyName: "font-weight" })}
                        {renderStyleRow({ blockID, label: "Height", propertyName: "line-height" })}
                        {renderStyleRow({ blockID, label: "Family", propertyName: "font-family" })}
                        {renderStyleRow({ blockID, label: "Style", propertyName: "font-style" })}
                        {renderStyleRow({ blockID, label: "Color", propertyName: "color" })}
                    </>
                )}
            />

            {/* Text Properties */}
            <GroupLayout
                dividerTitle="Text"
                styles={{ gridTemplateColumns: "repeat(3,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ blockID, label: "Align", propertyName: "text-align" })}
                        {renderStyleRow({ blockID, label: "Align Last", propertyName: "text-align-last" })}
                        {renderStyleRow({ blockID, label: "Transform", propertyName: "text-transform" })}
                        {renderStyleRow({ blockID, label: "Combine Upright", propertyName: "text-combine-upright" })}
                        {renderStyleRow({ blockID, label: "Overflow", propertyName: "text-overflow" })}
                        {renderStyleRow({ blockID, label: "OrientationDefinition", propertyName: "text-orientation" })}
                        {renderStyleRow({ blockID, label: "Decoration", propertyName: "text-decoration", styles: { gridColumn: "1/-1" } })}
                        {renderStyleRow({ blockID, label: "Shadow", propertyName: "text-shadow", styles: { gridColumn: "1/-1" } })}
                        {renderStyleRow({ blockID, label: "Indent", propertyName: "text-indent", styles: { gridColumn: "1/3" } })}
                    </>
                )}
            />

            {/* Spacing Properties */}
            <GroupLayout
                dividerTitle="Spacing"
                styles={{ gridTemplateColumns: "repeat(4,minmax(0, 1fr))" }}
                content={() => (
                    <>
                        {renderStyleRow({ blockID, label: "Writing Mode", propertyName: "writing-mode", styles: { gridColumn: "1/3" } })}
                        {renderStyleRow({ blockID, label: "White Space", propertyName: "white-space", styles: { gridColumn: "3/-1" } })}
                        {renderStyleRow({ blockID, label: "Word Break", propertyName: "word-break", styles: { gridColumn: "1/3" } })}
                        {renderStyleRow({ blockID, label: "Line Break", propertyName: "line-break", styles: { gridColumn: "3/-1" } })}
                        {renderStyleRow({ blockID, label: "Letter Spacing", propertyName: "letter-spacing", styles: { gridColumn: "1/3" } })}
                        {renderStyleRow({ blockID, label: "Word Spacing", propertyName: "word-spacing", styles: { gridColumn: "3/-1" } })}
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
                        {renderStyleRow({ blockID, label: "Count", propertyName: "column-count", styles: { gridColumn: "1" } })}
                        {renderStyleRow({ blockID, label: "Width", propertyName: "column-width", styles: { gridColumn: "2" } })}
                        {renderStyleRow({ blockID, label: "Gap", propertyName: "column-gap", styles: { gridColumn: "3" } })}
                        {renderStyleRow({ blockID, label: "Rule Width", propertyName: "column-rule-width" })}
                        {renderStyleRow({ blockID, label: "Rule Style", propertyName: "column-rule-style" })}
                        {renderStyleRow({ blockID, label: "Rule Color", propertyName: "column-rule-color" })}
                        {renderStyleRow({ blockID, label: "Break Before", propertyName: "break-before" })}
                        {renderStyleRow({ blockID, label: "Break Inside", propertyName: "break-inside" })}
                        {renderStyleRow({ blockID, label: "Break After", propertyName: "break-after" })}
                        {renderStyleRow({ blockID, label: "Column Span", propertyName: "column-span" })}
                        {renderStyleRow({ blockID, label: "Column Fill", propertyName: "column-fill" })}
                    </>
                )}
            />
        </>
    );
};
