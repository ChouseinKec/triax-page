"use client";

// Types
import type { LayoutProps } from "../type";

// Hooks
import { useStyleFactory } from "@/hooks/style/factory";
import { useStyleManager } from "@/hooks/style/manager";


/**
 * Custom hook to render the layout for the "Display & Layout" section.
 * This hook dynamically renders display properties (e.g., flex, grid) based on the selected display type.
 * 
 * @returns {LayoutProps} The layout configuration for display and layout settings.
 */
export const useDisplayLayout = (): LayoutProps => {
    const { renderValue } = useStyleFactory();
    const { getStyle } = useStyleManager();
    const icon = <svg aria-label="Display & Layout Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill="black" d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z" /></svg>;

    return {
        label: icon,
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
                        component: () => renderValue("display")
                    },

                ],
            },

            // Flex 
            {
                dividerTitle: "",
                hidden: getStyle("display") !== "flex", // Hide if the selected display type is "flex"
                styles: { gridTemplateColumns: "repeat(2,minmax(0, 1fr))" },
                properties: [

                    // Flex Direction (row, column, etc.)
                    {
                        label: "Direction",
                        property: "flex-direction",
                        component: () => renderValue("flex-direction"),
                    },

                    // Flex Wrap (wrap, no-wrap, etc.)
                    {
                        label: "Wrap",
                        property: "flex-wrap",
                        component: () => renderValue("flex-wrap"),
                    },

                    // Align Items (flex-start, center, etc.)
                    {
                        label: "Align Items",
                        property: "align-items",
                        styles: { gridColumn: "1/-1" },
                        component: () => renderValue("align-items"),
                    },

                    // Align Content (flex-start, center, etc.)
                    {
                        disabled: getStyle("flex-wrap") === "nowrap" || getStyle("flex-wrap") === "", // Hide if flex-direction is column
                        label: "Align Content",
                        property: "align-content",
                        styles: { gridColumn: "1/-1" },
                        component: () => renderValue("align-content"),
                    },


                    // Justify Content (flex-start, center, etc.)
                    {
                        label: "Justify Content",
                        property: "justify-content",
                        styles: { gridColumn: "1/-1" },
                        component: () => renderValue("justify-content"),
                    },

                    // Row Gap for flex container
                    {
                        label: "Row Gap",
                        property: "row-gap",
                        component: () => renderValue("row-gap")
                    },

                    // Column Gap for flex container
                    {
                        label: "Column Gap",
                        property: "column-gap",
                        component: () => renderValue("column-gap")
                    },
                ],
            },

            // Grid 
            {
                dividerTitle: "",
                hidden: getStyle("display") !== "grid", // Hide if the selected display type is "grid"
                styles: { gridTemplateColumns: "repeat(2,minmax(0,1fr))" },
                properties: [
                    // Justify Content 
                    {
                        label: "Justify Content",
                        property: "justify-content",
                        styles: { gridColumn: "1/-1" },
                        component: () => renderValue("justify-content"),
                    },

                    // Justify Items 
                    {
                        label: "Justify Items",
                        property: "justify-items",
                        styles: { gridColumn: "1/-1" },
                        component: () => renderValue("justify-items"),
                    },

                    // Align Content 
                    {
                        label: "Align Content",
                        property: "align-content",
                        styles: { gridColumn: "1/-1" },
                        component: () => renderValue("align-content"),
                    },

                    // Align Items 
                    {
                        label: "Align Items",
                        property: "align-items",
                        styles: { gridColumn: "1/-1" },
                        component: () => renderValue("align-items"),
                    },

                    // Auto Flow 
                    {
                        label: "Auto Flow",
                        property: "grid-auto-flow",
                        styles: { gridColumn: "1/-1" },
                        component: () => renderValue("grid-auto-flow"),
                    },

                    // Auto Rows 
                    {
                        label: "Auto Rows",
                        property: "grid-auto-rows",
                        component: () => renderValue("grid-auto-rows"),
                    },

                    // Auto Columns 
                    {
                        label: "Auto Columns",
                        property: "grid-auto-columns",
                        component: () => renderValue("grid-auto-columns"),
                    },

                    // Template Rows 
                    {
                        label: "Template Rows",
                        property: "grid-template-rows",
                        component: () => renderValue("grid-template-rows"),
                    },

                    // Template Columns 
                    {
                        label: "Template Columns",
                        property: "grid-template-columns",
                        component: () => renderValue("grid-template-columns"),
                    },



                    // Row Gap for grid container
                    {
                        label: "Row Gap",
                        property: "row-gap",
                        styles: { gridColumn: "1" },
                        component: () => renderValue("row-gap")
                    },

                    // Column Gap for grid container
                    {
                        label: "Column Gap",
                        property: "column-gap",
                        styles: { gridColumn: "2" },
                        component: () => renderValue("column-gap")
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
                        component: () => renderValue("direction")
                    },

                    // Box-Sizing
                    {
                        label: "Box Sizing",
                        property: "box-sizing",
                        component: () => renderValue("box-sizing"),
                    },

                    // Visibility
                    {
                        label: "Visibility",
                        property: "visibility",
                        component: () => renderValue("visibility"),
                    },

                    // Float
                    {
                        label: "Float",
                        property: "float",
                        component: () => renderValue("float"),
                    },


                    // Clear
                    {
                        label: "Clear",
                        property: "clear",
                        component: () => renderValue("clear"),
                    },



                    // Object-Position
                    {
                        label: "Object Position",
                        property: "object-position",
                        styles: { gridColumn: "2/-1" },
                        component: () => renderValue("object-position"),
                    },


                    // Object-Fit 
                    {
                        label: "Object Fit",
                        property: "object-fit",
                        styles: { gridColumn: "1/-1" },
                        component: () => renderValue("object-fit"),
                    },





                ]
            },
        ],
    };
};
