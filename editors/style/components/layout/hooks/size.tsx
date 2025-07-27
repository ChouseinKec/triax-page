"use client";

import { useState } from "react";

// Types
import { LayoutProps } from "@/editors/style/components/layout/types";
import type { Side, Corner } from "@/components/select/position/types";
import type { StylePropertyKeys } from "@/types/style/property";

// Hooks
import { useStyleFactory } from "@/hooks/style/factory";
import { useStyleManager } from "@/hooks/style/manager";

// Utilities
import { generatePropertyName } from "@/utilities/style/property";



/**
 * Custom hook for managing the "Size & Overflow" section layout in the style editor.
 *
 * @returns {LayoutProps} Configuration for size and overflow properties in the style editor.
*/
export const useSizeLayout = (): LayoutProps => {
    const { renderValue, renderPositionSelect } = useStyleFactory();
    const { getStyle } = useStyleManager();

    const [currentSide, setCurrentSide] = useState<Side>("top");
    const [, setCurrentCorner] = useState<Corner>("top-left");

    const icon = <svg aria-label="Size & Overflow Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill="black" d="M136,112H48a8,8,0,0,0-8,8v88a8,8,0,0,0,8,8h88a8,8,0,0,0,8-8V120A8,8,0,0,0,136,112Zm-8,88H56V128h72Zm88-16v16a16,16,0,0,1-16,16H176a8,8,0,0,1,0-16h24V184a8,8,0,0,1,16,0Zm0-72v32a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm0-56V72a8,8,0,0,1-16,0V56H184a8,8,0,0,1,0-16h16A16,16,0,0,1,216,56Zm-64-8a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,48ZM40,80V56A16,16,0,0,1,56,40H72a8,8,0,0,1,0,16H56V80a8,8,0,0,1-16,0Z" /></svg>;

    return {
        label: icon,
        title: "Size & Position",
        groups: [
            {
                styles: { gridTemplateColumns: "repeat(3, minmax(0, 1fr))" },
                properties: [
                    // Width
                    {
                        label: "Width",
                        property: "width",
                        component: () => renderValue("width"),
                    },

                    // Min-Width
                    {
                        label: "Min Width",
                        property: "min-width",
                        component: () => renderValue("min-width"),
                    },

                    // Max-Width
                    {
                        label: "Max Width",
                        property: "max-width",
                        component: () => renderValue("max-width"),
                    },

                    // Height
                    {
                        label: "Height",
                        property: "height",
                        component: () => renderValue("height"),
                    },

                    // Min-Height
                    {
                        label: "Min Height",
                        property: "min-height",
                        component: () => renderValue("min-height"),
                    },

                    // Max-Height
                    {
                        label: "Max Height",
                        property: "max-height",
                        component: () => renderValue("max-height"),
                    },

                    // Aspect-Ratio(width / height).
                    {
                        label: "Aspect Ratio",
                        property: "aspect-ratio",
                        styles: { gridColumn: "1 / -1" },
                        component: () => renderValue("aspect-ratio"),
                    },

                    // Overflow
                    {
                        label: "Overflow",
                        property: "overflow",
                        styles: { gridColumn: "1 / -1" },
                        component: () => renderValue("overflow"),
                    },
                ],
            },

            {
                dividerTitle: "",
                styles: { gridTemplateColumns: "repeat(3, minmax(0, 1fr))" },
                properties: [

                    // Position
                    {
                        label: "Position",
                        property: "position",
                        styles: { gridColumn: "1/-1", gridRow: "2" },
                        component: () => renderValue("position"),
                    },

                    // Position Select
                    {
                        label: null,
                        styles: { gridColumn: "1/2", gridRow: "3/5" },
                        component: () => renderPositionSelect(setCurrentSide, setCurrentCorner, false, true),
                    },

                    // Padding dynamic based on current side selected.
                    {
                        label: currentSide ? `Padding` : "Padding",
                        property: generatePropertyName("padding", currentSide),
                        component: () => renderValue(generatePropertyName("padding", currentSide)),
                    },

                    // Margin dynamic based on current side selected.
                    {
                        label: currentSide ? `Margin` : "Margin",
                        property: generatePropertyName("margin", currentSide),
                        component: () => renderValue(generatePropertyName("margin", currentSide)),
                    },

                    // Top-Right-Bottom-Left
                    {
                        label: currentSide || "...",
                        disabled: !["absolute", "fixed", "sticky"].includes(getStyle("position")) || !currentSide,
                        property: currentSide ? currentSide.toLowerCase() as StylePropertyKeys : "top",
                        component: () => renderValue(currentSide?.toLowerCase() as StylePropertyKeys || "top"),
                    },

                    // Z-Index
                    {
                        label: "Z-Index",
                        property: "z-index",
                        component: () => renderValue("z-index"),
                    },


                ]
            },

            {
                isExpandable: true,
                dividerTitle: "Scroll",
                styles: { gridTemplateColumns: "repeat(4, minmax(0, 1fr))" },
                properties: [
                    // Scroll Behavior
                    {
                        label: "Behavior",
                        property: "scroll-behavior",
                        styles: { gridColumn: "1 / 3" },
                        component: () => renderValue("scroll-behavior"),
                    },

                    // Scroll Snap Stop
                    {
                        label: "Snap Stop",
                        property: "scroll-snap-stop",
                        styles: { gridColumn: "3 / -1" },
                        component: () => renderValue("scroll-snap-stop"),
                    },

                    // Overscroll Behavior
                    {
                        label: "Overscroll",
                        property: "overscroll-behavior",
                        styles: { gridColumn: "1 / -1" },
                        component: () => renderValue("overscroll-behavior"),
                    },

                    // Scroll Snap Type
                    {
                        label: "Snap Type",
                        property: "scroll-snap-type",
                        styles: { gridColumn: "1 / -1" },
                        component: () => renderValue("scroll-snap-type"),
                    },
                    // Scroll Snap Align
                    {
                        label: "Snap Align",
                        property: "scroll-snap-align",
                        styles: { gridColumn: "1 / -1" },
                        component: () => renderValue("scroll-snap-align"),
                    },

                    // Scroll Margin
                    {
                        label: "Margin",
                        property: "scroll-margin",
                        styles: { gridColumn: "1 / -1" },
                        component: () => renderValue("scroll-margin"),
                    },
                    // Scroll Margin Block
                    {
                        label: "Margin Block",
                        property: "scroll-margin-block",
                        styles: { gridColumn: "1 / 3" },
                        component: () => renderValue("scroll-margin-block"),
                    },
                    // Scroll Margin Inline
                    {
                        label: "Margin Inline",
                        property: "scroll-margin-inline",
                        styles: { gridColumn: "3 / -1" },
                        component: () => renderValue("scroll-margin-inline"),
                    },
                    // Scroll Padding
                    {
                        label: "Padding",
                        property: "scroll-padding",
                        styles: { gridColumn: "1 / -1" },
                        component: () => renderValue("scroll-padding"),
                    },
                    // Scroll Padding Block
                    {
                        label: "Padding Block",
                        property: "scroll-padding-block",
                        styles: { gridColumn: "1 /3" },
                        component: () => renderValue("scroll-padding-block"),
                    },
                    // Scroll Padding Inline
                    {
                        label: "Padding Inline",
                        property: "scroll-padding-inline",
                        styles: { gridColumn: "3 / -1" },
                        component: () => renderValue("scroll-padding-inline"),
                    },



                ]
            }
        ],
    };
};