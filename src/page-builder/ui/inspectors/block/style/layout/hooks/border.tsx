"use client";
import { useState } from "react";

// Types
import type { LayoutProps } from "./types";
import type { Side, Corner } from "@/src/shared/components/select/position/types";

// Components
import PositionSelect from "@/src/shared/components/select/position/component";

// Managers
import { useSelectedBlockID } from "@/src/page-builder/services/managers/block";

// Utilities
import { generateStyleKey } from "@/src/page-builder/core/block/style/utilities/key";

// Factory
import { StyleValueRenderer } from "@/src/page-builder/ui/inspectors/block/style/layout/hooks/factory";


/**
 * useBorderLayout Hook
 * Custom hook to render the layout for the border and shadow styles.
 * This hook generates the structure and behavior of the "Border & Shadow" section in the style editor.
 *
 * @returns {LayoutProps} The layout configuration for border and shadow settings.
 */
export const useBorderLayout = (): LayoutProps => {
    const [currentSide, setCurrentSide] = useState<Side>("top");
    const [currentCorner, setCurrentCorner] = useState<Corner>(null);

    const borderWidth = generateStyleKey("border", currentSide, "width") || "border-width";
    const borderStyle = generateStyleKey("border", currentSide, "style") || "border-style";
    const borderColor = generateStyleKey("border", currentSide, "color") || "border-color";
    const borderRadius = generateStyleKey("border", currentCorner, "radius") || "border-radius";
    const selectedBlockID = useSelectedBlockID();
    const layoutIcon = <svg aria-label="Border & Outline Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill="black" d="M200,80v32a8,8,0,0,1-16,0V88H160a8,8,0,0,1,0-16h32A8,8,0,0,1,200,80ZM96,168H72V144a8,8,0,0,0-16,0v32a8,8,0,0,0,8,8H96a8,8,0,0,0,0-16ZM232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Z" /></svg>;

    if (!selectedBlockID) return { label: layoutIcon, title: "Border & Outline Icon", groups: [] };

    return {
        label: layoutIcon,
        title: "Border & Outline",
        groups: [
            {
                styles: { gridTemplateColumns: "repeat(3,minmax(0, 1fr))" },
                properties: [

                    {
                        label: null,
                        styles: { gridColumn: "1", gridRow: "1/3" },
                        component: () => <PositionSelect onChangeSide={setCurrentSide} onChangeCorner={setCurrentCorner} isCornerSelectable={true} isCenterSelectable={true} />,
                    },

                    // Border Width
                    {
                        label: "Width",
                        property: borderWidth,
                        disabled: currentSide === null && currentCorner !== null,
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName={borderWidth} />,
                    },

                    // Border Style
                    {
                        label: "Style",
                        property: borderStyle,
                        disabled: currentSide === null && currentCorner !== null,
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName={borderStyle} />,
                    },

                    // Border Radius
                    {
                        label: "Radius",
                        property: borderRadius,
                        disabled: currentCorner === null && currentSide !== null,
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName={borderRadius} />,
                    },

                    // Border Color
                    {
                        label: "Color",
                        property: borderColor,
                        disabled: currentSide === null && currentCorner !== null,
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName={borderColor} />,
                    },


                    // Border Image Source
                    {
                        label: "Image Source",
                        property: "border-image-source",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="border-image-source" />,
                    },

                    // Border Image Repeat
                    {
                        label: "Image Repeat",
                        property: "border-image-repeat",
                        styles: { gridColumn: "2/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="border-image-repeat" />,
                    },

                    // Border Image Slice
                    {
                        label: "Image Slice",
                        property: "border-image-slice",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="border-image-slice" />,
                    },

                    // Border Image Width
                    {
                        label: "Image Width",
                        property: "border-image-width",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="border-image-width" />,
                    },

                    // Border Image Outset
                    {
                        label: "Image Outset",
                        property: "border-image-outset",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="border-image-outset" />,
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
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="outline-width" />,
                    },

                    // Outline Offset
                    {
                        label: "Offset",
                        property: "outline-offset",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="outline-offset" />,
                    },


                    // Outline Style
                    {
                        label: "Style",
                        property: "outline-style",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="outline-style" />,
                    },

                    // Outline Color
                    {
                        label: "Color",
                        property: "outline-color",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="outline-color" />,
                    },

                ],
            },

        ],
    }
};
