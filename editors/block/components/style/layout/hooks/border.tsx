"use client";

import { useState } from "react";

// Types
import type { LayoutProps } from "../type";
import type { Side, Corner } from "@/components/select/position/types";

// Hooks
import { useStyleFactory } from "@/hooks/block/style/factory";

// Utilities
import { generatePropertyName } from "@/utilities/style/property";


/**
 * Custom hook to render the layout for the border and shadow styles.
 * This hook generates the structure and behavior of the "Border & Shadow" section in the style editor.
 * 
 * @returns {LayoutProps} The layout configuration for border and shadow settings.
 */
export const useBorderLayout = (): LayoutProps => {
    const { renderValue, renderPositionSelect } = useStyleFactory();

    const [currentSide, setCurrentSide] = useState<Side>("top");
    const [currentCorner, setCurrentCorner] = useState<Corner>(null);

    const borderWidth = generatePropertyName("border", currentSide, "width");
    const borderStyle = generatePropertyName("border", currentSide, "style");
    const borderColor = generatePropertyName("border", currentSide, "color");
    const borderRadius = generatePropertyName("border", currentCorner, "radius");

    const icon = <svg aria-label="Border & Outline Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill="black" d="M200,80v32a8,8,0,0,1-16,0V88H160a8,8,0,0,1,0-16h32A8,8,0,0,1,200,80ZM96,168H72V144a8,8,0,0,0-16,0v32a8,8,0,0,0,8,8H96a8,8,0,0,0,0-16ZM232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Z" /></svg>;

    return {
        label: icon,
        title: "Border & Outline",
        groups: [
            {
                styles: { gridTemplateColumns: "repeat(3,minmax(0, 1fr))" },
                properties: [

                    {
                        label: null,
                        styles: { gridColumn: "1", gridRow: "1/3" },
                        component: () => renderPositionSelect(setCurrentSide, setCurrentCorner, true, true),
                    },

                    // Border Width
                    {
                        label: "Width",
                        property: borderWidth,
                        disabled: currentSide === null && currentCorner !== null,
                        component: () => renderValue(borderWidth),
                    },

                    // Border Style
                    {
                        label: "Style",
                        property: borderStyle,
                        disabled: currentSide === null && currentCorner !== null,
                        component: () => renderValue(borderStyle),
                    },

                    // Border Radius
                    {
                        label: "Radius",
                        property: borderRadius,
                        disabled: currentCorner === null && currentSide !== null,
                        component: () => renderValue(borderRadius),
                    },

                    // Border Color
                    {
                        label: "Color",
                        property: borderColor,
                        disabled: currentSide === null && currentCorner !== null,
                        component: () => renderValue(borderColor),
                    },


                    // Border Image Source
                    {
                        label: "Image Source",
                        property: "border-image-source",
                        component: () => renderValue("border-image-source"),
                    },

                    // Border Image Repeat
                    {
                        label: "Image Repeat",
                        property: "border-image-repeat",
                        styles: { gridColumn: "2/-1" },
                        component: () => renderValue("border-image-repeat"),
                    },

                    // Border Image Slice
                    {
                        label: "Image Slice",
                        property: "border-image-slice",
                        styles: { gridColumn: "1/-1" },
                        component: () => renderValue("border-image-slice"),
                    },

                    // Border Image Width
                    {
                        label: "Image Width",
                        property: "border-image-width",
                        styles: { gridColumn: "1/-1" },
                        component: () => renderValue("border-image-width"),
                    },

                    // Border Image Outset
                    {
                        label: "Image Outset",
                        property: "border-image-outset",
                        styles: { gridColumn: "1/-1" },
                        component: () => renderValue("border-image-outset"),
                    },



                ],
            },

            {
                styles: { gridTemplateColumns: "repeat(4,minmax(0,1fr))" },
                dividerTitle: "Outline",
                properties: [

                    // Outline Width
                    {
                        label: "Width",
                        property: "outline-width",
                        component: () => renderValue("outline-width"),
                    },

                    // Outline Offset
                    {
                        label: "Offset",
                        property: "outline-offset",
                        component: () => renderValue("outline-offset"),
                    },


                    // Outline Style
                    {
                        label: "Style",
                        property: "outline-style",
                        component: () => renderValue("outline-style"),
                    },

                    // Outline Color
                    {
                        label: "Color",
                        property: "outline-color",
                        component: () => renderValue("outline-color"),
                    },

                ],
            },

        ],
    };
};