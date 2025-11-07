"use client";
import { useMemo } from "react";

// Types
import type { LayoutProps } from "./types";

// Managers
import { useBlockStyle,useSelectedBlockID } from "@/src/page-builder/services/managers/block/";

// Factory
import { StyleValueRenderer } from "@/src/page-builder/ui/inspectors/block/style/layout/hooks/factory";

/**
 * useDisplayLayout Hook
 * Custom hook for the Display & Layout section configuration in the style editor.
 * Dynamically shows/hides properties based on the selected block's display type.
 *
 * @returns {LayoutProps} The layout configuration for display and layout settings.
 */
export const useDisplayLayout = (): LayoutProps => {
    const selectedBlockID = useSelectedBlockID();
    const layoutIcon = <svg aria-label="Display & Layout Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">            <path fill="black" d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z" /> </svg>
    
    // Always call hooks in the same order
    const displayValue = useBlockStyle(selectedBlockID || "", "display");
    const flexWrapValue = useBlockStyle(selectedBlockID || "", "flex-wrap");

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
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="display" />
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
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="flex-direction" />
                    },

                    // Flex Wrap (wrap, no-wrap, etc.)
                    {
                        label: "Wrap",
                        property: "flex-wrap",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="flex-wrap" />
                    },

                    // Align Items (flex-start, center, etc.)
                    {
                        label: "Align Items",
                        property: "align-items",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="align-items" />
                    },

                    // Align Content (flex-start, center, etc.)
                    {
                        disabled: isAlignContentDisabled, // Use memoized disabled state
                        label: "Align Content",
                        property: "align-content",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="align-content" />
                    },


                    // Justify Content (flex-start, center, etc.)
                    {
                        label: "Justify Content",
                        property: "justify-content",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="justify-content" />,
                    },

                    // Row Gap for flex container
                    {
                        label: "Row Gap",
                        property: "row-gap",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="row-gap" />,
                    },

                    // Column Gap for flex container
                    {
                        label: "Column Gap",
                        property: "column-gap",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="column-gap" />,
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
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="justify-content" />,
                    },

                    // Justify Items 
                    {
                        label: "Justify Items",
                        property: "justify-items",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="justify-items" />,
                    },

                    // Align Content 
                    {
                        label: "Align Content",
                        property: "align-content",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="align-content" />,
                    },

                    // Align Items 
                    {
                        label: "Align Items",
                        property: "align-items",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="align-items" />,
                    },

                    // Auto Flow 
                    {
                        label: "Auto Flow",
                        property: "grid-auto-flow",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="grid-auto-flow" />,
                    },

                    // Auto Rows 
                    {
                        label: "Auto Rows",
                        property: "grid-auto-rows",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="grid-auto-rows" />,
                    },

                    // Auto Columns 
                    {
                        label: "Auto Columns",
                        property: "grid-auto-columns",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="grid-auto-columns" />,
                    },

                    // Template Rows 
                    {
                        label: "Template Rows",
                        property: "grid-template-rows",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="grid-template-rows" />,
                    },

                    // Template Columns 
                    {
                        label: "Template Columns",
                        property: "grid-template-columns",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="grid-template-columns" />,
                    },



                    // Row Gap for grid container
                    {
                        label: "Row Gap",
                        property: "row-gap",
                        styles: { gridColumn: "1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="row-gap" />,
                    },

                    // Column Gap for grid container
                    {
                        label: "Column Gap",
                        property: "column-gap",
                        styles: { gridColumn: "2" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="column-gap" />,
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
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="direction" />
                    },

                    // Box-Sizing
                    {
                        label: "Box Sizing",
                        property: "box-sizing",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="box-sizing" />,
                    },

                    // Visibility
                    {
                        label: "Visibility",
                        property: "visibility",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="visibility" />,
                    },

                    // Float
                    {
                        label: "Float",
                        property: "float",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="float" />,
                    },


                    // Clear
                    {
                        label: "Clear",
                        property: "clear",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="clear" />,
                    },



                    // Object-Position
                    {
                        label: "Object Position",
                        property: "object-position",
                        styles: { gridColumn: "2/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="object-position" />,
                    },


                    // Object-Fit 
                    {
                        label: "Object Fit",
                        property: "object-fit",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="object-fit" />,
                    },





                ]
            },
        ],
    };
};
