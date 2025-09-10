"use client";
import { useMemo, useCallback } from "react";

// Types
import type { StylesEditorLayoutProps } from "@/editors/block/types/component";

// Managers
import { useStyle } from "@/editors/block/managers/style";
import { useSelectedBlockID } from "@/editors/block/managers/block";

// Factory
import { StyleValueRenderer } from "@/editors/block/components/style/layout/hooks/factory";

/**
 * useDisplayLayout Hook
 * Custom hook for the Display & Layout section configuration in the style editor.
 * Dynamically shows/hides properties based on the selected block's display type.
 *
 * @returns {StylesEditorLayoutProps} The layout configuration for display and layout settings.
 */
export const useDisplayLayout = (): StylesEditorLayoutProps => {
    const selectedBlockID = useSelectedBlockID();
    const layoutIcon = <svg aria-label="Display & Layout Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">            <path fill="black" d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z" /> </svg>
    const displayValue = selectedBlockID ? useStyle(selectedBlockID, "display") : "";
    const flexWrapValue = selectedBlockID ? useStyle(selectedBlockID, "flex-wrap") : "";

    // Memoize display type flags for better performance
    const displayIsFlex = useMemo(() => displayValue === "flex", [displayValue]);
    const displayIsGrid = useMemo(() => displayValue === "grid", [displayValue]);

    // Memoize the disabled state for align-content to prevent unnecessary re-renders
    const isAlignContentDisabled = useMemo(() =>
        selectedBlockID ? (flexWrapValue === "nowrap" || flexWrapValue === "") : true,
        [selectedBlockID, flexWrapValue]
    );

    if (!selectedBlockID) return { label: layoutIcon, title: "Display & Layout", groups: [] };

    return {
        label: layoutIcon,
        title: "Display & Layout",
        groups: [
            // Display 
            {
                styles: { gridTemplateColumns: "minmax(0,1fr)" },
                properties: [
                    // Display (e.g., block, inline, flex, grid)
                    {
                        label: "Display",
                        property: "display",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="display" />, [selectedBlockID])
                    },

                ],
            },

            // Flex 
            {
                dividerTitle: "",
                hidden: !displayIsFlex, // Hide if the selected display type is not "flex"
                styles: { gridTemplateColumns: "repeat(2,minmax(0, 1fr))" },
                properties: [

                    // Flex Direction (row, column, etc.)
                    {
                        label: "Direction",
                        property: "flex-direction",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="flex-direction" />, [selectedBlockID])
                    },

                    // Flex Wrap (wrap, no-wrap, etc.)
                    {
                        label: "Wrap",
                        property: "flex-wrap",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="flex-wrap" />, [selectedBlockID])
                    },

                    // Align Items (flex-start, center, etc.)
                    {
                        label: "Align Items",
                        property: "align-items",
                        styles: { gridColumn: "1/-1" },
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="align-items" />, [selectedBlockID])
                    },

                    // Align Content (flex-start, center, etc.)
                    {
                        disabled: isAlignContentDisabled, // Use memoized disabled state
                        label: "Align Content",
                        property: "align-content",
                        styles: { gridColumn: "1/-1" },
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="align-content" />, [selectedBlockID])
                    },


                    // Justify Content (flex-start, center, etc.)
                    {
                        label: "Justify Content",
                        property: "justify-content",
                        styles: { gridColumn: "1/-1" },
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="justify-content" />, [selectedBlockID]),
                    },

                    // Row Gap for flex container
                    {
                        label: "Row Gap",
                        property: "row-gap",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="row-gap" />, [selectedBlockID]),
                    },

                    // Column Gap for flex container
                    {
                        label: "Column Gap",
                        property: "column-gap",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="column-gap" />, [selectedBlockID]),
                    },
                ],
            },

            // Grid 
            {
                dividerTitle: "",
                hidden: !displayIsGrid, // Hide if the selected display type is not "grid"
                styles: { gridTemplateColumns: "repeat(2,minmax(0,1fr))" },
                properties: [
                    // Justify Content 
                    {
                        label: "Justify Content",
                        property: "justify-content",
                        styles: { gridColumn: "1/-1" },
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="justify-content" />, [selectedBlockID]),
                    },

                    // Justify Items 
                    {
                        label: "Justify Items",
                        property: "justify-items",
                        styles: { gridColumn: "1/-1" },
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="justify-items" />, [selectedBlockID]),
                    },

                    // Align Content 
                    {
                        label: "Align Content",
                        property: "align-content",
                        styles: { gridColumn: "1/-1" },
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="align-content" />, [selectedBlockID]),
                    },

                    // Align Items 
                    {
                        label: "Align Items",
                        property: "align-items",
                        styles: { gridColumn: "1/-1" },
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="align-items" />, [selectedBlockID]),
                    },

                    // Auto Flow 
                    {
                        label: "Auto Flow",
                        property: "grid-auto-flow",
                        styles: { gridColumn: "1/-1" },
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="grid-auto-flow" />, [selectedBlockID]),
                    },

                    // Auto Rows 
                    {
                        label: "Auto Rows",
                        property: "grid-auto-rows",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="grid-auto-rows" />, [selectedBlockID]),
                    },

                    // Auto Columns 
                    {
                        label: "Auto Columns",
                        property: "grid-auto-columns",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="grid-auto-columns" />, [selectedBlockID]),
                    },

                    // Template Rows 
                    {
                        label: "Template Rows",
                        property: "grid-template-rows",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="grid-template-rows" />, [selectedBlockID]),
                    },

                    // Template Columns 
                    {
                        label: "Template Columns",
                        property: "grid-template-columns",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="grid-template-columns" />, [selectedBlockID]),
                    },



                    // Row Gap for grid container
                    {
                        label: "Row Gap",
                        property: "row-gap",
                        styles: { gridColumn: "1" },
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="row-gap" />, [selectedBlockID]),
                    },

                    // Column Gap for grid container
                    {
                        label: "Column Gap",
                        property: "column-gap",
                        styles: { gridColumn: "2" },
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="column-gap" />, [selectedBlockID]),
                    },


                ],
            },

            // Generic
            {
                dividerTitle: "",
                styles: { gridTemplateColumns: "repeat(2,minmax(0,1fr))" },
                properties: [
                    // Direction
                    {
                        label: "Direction",
                        property: "direction",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="direction" />, [selectedBlockID])
                    },

                    // Box-Sizing
                    {
                        label: "Box Sizing",
                        property: "box-sizing",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="box-sizing" />, [selectedBlockID]),
                    },

                    // Visibility
                    {
                        label: "Visibility",
                        property: "visibility",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="visibility" />, [selectedBlockID]),
                    },

                    // Float
                    {
                        label: "Float",
                        property: "float",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="float" />, [selectedBlockID]),
                    },


                    // Clear
                    {
                        label: "Clear",
                        property: "clear",
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="clear" />, [selectedBlockID]),
                    },



                    // Object-Position
                    {
                        label: "Object Position",
                        property: "object-position",
                        styles: { gridColumn: "2/-1" },
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="object-position" />, [selectedBlockID]),
                    },


                    // Object-Fit 
                    {
                        label: "Object Fit",
                        property: "object-fit",
                        styles: { gridColumn: "1/-1" },
                        component: useCallback(() => <StyleValueRenderer blockID={selectedBlockID} propertyName="object-fit" />, [selectedBlockID]),
                    },





                ]
            },
        ],
    };
};
