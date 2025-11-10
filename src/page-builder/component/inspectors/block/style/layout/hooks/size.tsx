"use client";
import { useState } from "react";

// Types
import type { LayoutProps } from "./types";
import type { Side } from "@/src/shared/components/select/position/types";
import type { StyleKey } from "@/src/page-builder/core/block/style/types";

// Components
import PositionSelect from "@/src/shared/components/select/position/component";

// Factory
import { StyleValueRenderer } from "@/src/page-builder/component/inspectors/block/style/layout/hooks/factory";

// Managers
import { useBlockStyle,useSelectedBlockID} from "@/src/page-builder/service/managers/block";

// Utilities
import { generateStyleKey } from "@/src/page-builder/core/block/style/utilities";

/**
 * Custom hook for managing the "Size & Overflow" section layout in the style editor.
 *
 * @returns {LayoutProps} Configuration for size and overflow properties in the style editor.
*/
export const useSizeLayout = (): LayoutProps => {
    const selectedBlockID = useSelectedBlockID();
    const layoutIcon = <svg aria-label="Size & Overflow Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill="black" d="M136,112H48a8,8,0,0,0-8,8v88a8,8,0,0,0,8,8h88a8,8,0,0,0,8-8V120A8,8,0,0,0,136,112Zm-8,88H56V128h72Zm88-16v16a16,16,0,0,1-16,16H176a8,8,0,0,1,0-16h24V184a8,8,0,0,1,16,0Zm0-72v32a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm0-56V72a8,8,0,0,1-16,0V56H184a8,8,0,0,1,0-16h16A16,16,0,0,1,216,56Zm-64-8a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,48ZM40,80V56A16,16,0,0,1,56,40H72a8,8,0,0,1,0,16H56V80a8,8,0,0,1-16,0Z" /></svg>;

    // Always call hooks in the same order
    const positionValue = useBlockStyle(selectedBlockID || "", "position") || '';
    const [currentSide, setCurrentSide] = useState<Side>("top");
    const padding = generateStyleKey("padding", currentSide) || "padding";
    const margin = generateStyleKey("margin", currentSide) || "margin";

    if (!selectedBlockID) return { label: layoutIcon, title: "Size & Position", groups: [] };

    return {
        label: layoutIcon,
        title: "Size & Position",
        groups: [
            {
                styles: { gridTemplateColumns: "repeat(3, minmax(0, 1fr))" },
                properties: [
                    // Width
                    {
                        label: "Width",
                        property: "width",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="width" />,
                    },

                    // Min-Width
                    {
                        label: "Min Width",
                        property: "min-width",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="min-width" />,
                    },

                    // Max-Width
                    {
                        label: "Max Width",
                        property: "max-width",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="max-width" />,
                    },

                    // Height
                    {
                        label: "Height",
                        property: "height",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="height" />,
                    },

                    // Min-Height
                    {
                        label: "Min Height",
                        property: "min-height",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="min-height" />,
                    },

                    // Max-Height
                    {
                        label: "Max Height",
                        property: "max-height",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="max-height" />,
                    },

                    // Aspect-Ratio(width / height).
                    {
                        label: "Aspect Ratio",
                        property: "aspect-ratio",
                        styles: { gridColumn: "1 / -1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="aspect-ratio" />,
                    },

                    // Overflow
                    {
                        label: "Overflow",
                        property: "overflow",
                        styles: { gridColumn: "1 / -1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="overflow" />,
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
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="position" />,
                    },

                    // Position Select
                    {
                        label: null,
                        styles: { gridColumn: "1/2", gridRow: "3/5" },
                        component: () => <PositionSelect onChangeSide={setCurrentSide} onChangeCorner={() => { }} isCornerSelectable={false} isCenterSelectable={true} />,
                    },

                    // Padding dynamic based on current side selected.
                    {
                        label: "Padding",
                        property: padding,
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName={padding} />,
                    },

                    // Margin dynamic based on current side selected.
                    {
                        label: "Margin",
                        property: margin,
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName={margin} />,
                    },

                    // Top-Right-Bottom-Left
                    {
                        label: currentSide || "...",
                        disabled: selectedBlockID ? (!["absolute", "fixed", "sticky"].includes(positionValue) || !currentSide) : true,
                        property: currentSide ? currentSide.toLowerCase() as StyleKey : "top",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName={currentSide?.toLowerCase() as StyleKey || "top"} />,
                    },

                    // Z-Index
                    {
                        label: "Z-Index",
                        property: "z-index",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="z-index" />,
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
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="scroll-behavior" />,
                    },

                    // Scroll Snap Stop
                    {
                        label: "Snap Stop",
                        property: "scroll-snap-stop",
                        styles: { gridColumn: "3 / -1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="scroll-snap-stop" />,
                    },

                    // Overscroll Behavior
                    {
                        label: "Overscroll",
                        property: "overscroll-behavior",
                        styles: { gridColumn: "1 / -1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="overscroll-behavior" />,
                    },

                    // Scroll Snap Type
                    {
                        label: "Snap Type",
                        property: "scroll-snap-type",
                        styles: { gridColumn: "1 / -1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="scroll-snap-type" />,
                    },
                    // Scroll Snap Align
                    {
                        label: "Snap Align",
                        property: "scroll-snap-align",
                        styles: { gridColumn: "1 / -1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="scroll-snap-align" />,
                    },

                    // Scroll Margin
                    {
                        label: "Margin",
                        property: "scroll-margin",
                        styles: { gridColumn: "1 / -1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="scroll-margin" />,
                    },
                    // Scroll Margin Block
                    {
                        label: "Margin Block",
                        property: "scroll-margin-block",
                        styles: { gridColumn: "1 / 3" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="scroll-margin-block" />,
                    },
                    // Scroll Margin Inline
                    {
                        label: "Margin Inline",
                        property: "scroll-margin-inline",
                        styles: { gridColumn: "3 / -1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="scroll-margin-inline" />,
                    },
                    // Scroll Padding
                    {
                        label: "Padding",
                        property: "scroll-padding",
                        styles: { gridColumn: "1 / -1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="scroll-padding" />,
                    },
                    // Scroll Padding Block
                    {
                        label: "Padding Block",
                        property: "scroll-padding-block",
                        styles: { gridColumn: "1 / 3" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="scroll-padding-block" />,
                    },
                    // Scroll Padding Inline
                    {
                        label: "Padding Inline",
                        property: "scroll-padding-inline",
                        styles: { gridColumn: "3 / -1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="scroll-padding-inline" />,
                    },



                ]
            }
        ],
    };
};