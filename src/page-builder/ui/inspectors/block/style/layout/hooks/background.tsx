"use client";

// Types
import type { LayoutProps } from "./types";

// Factory
import { StyleValueRenderer } from "@/src/page-builder/ui/inspectors/block/style/layout/hooks/factory";

// Managers
import { useSelectedBlockID } from "@/src/page-builder/services/managers/block";

/**
 * useBackgroundLayout Hook
 * Custom hook to render the layout for the background styles.
 * This hook generates the structure and behavior of the "Background" section in the style editor.
 *
 * @returns {LayoutProps} The layout configuration for background settings.
 */
export const useBackgroundLayout = (): LayoutProps => {
    const selectedBlockID = useSelectedBlockID();
    const layoutIcon = <svg aria-label="Background & Mask Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill="black" d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z" /></svg>;

    if (!selectedBlockID) return { label: layoutIcon, title: "Background & Mask", groups: [] };

    return {
        label: layoutIcon,
        title: "Background & Mask",
        groups: [
            {
                styles: { gridTemplateColumns: "repeat(3,minmax(0, 1fr))" },
                properties: [
                    // Background-Image
                    {
                        label: "Image",
                        property: "background-image",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="background-image" />,
                    },

                    // Background-Color
                    {
                        label: "Color",
                        property: "background-color",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="background-color" />,
                    },

                    // Background-Blend-Mode
                    {
                        label: "Blend",
                        property: "background-blend-mode",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="background-blend-mode" />,
                    },

                    // Background-Repeat
                    {
                        label: "Repeat",
                        property: "background-repeat",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="background-repeat" />,
                    },

                    // Background-Attachment
                    {
                        label: "Attachment",
                        property: "background-attachment",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="background-attachment" />,
                    },

                    // Background-Clip
                    {
                        label: "Clip",
                        property: "background-clip",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="background-clip" />,
                    },

                    // Background-Origin
                    {
                        label: "Origin",
                        property: "background-origin",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="background-origin" />,
                    },

                    // Background-Size
                    {
                        label: "Size",
                        property: "background-size",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="background-size" />,
                    },

                    // Background-Position
                    {
                        label: "Position",
                        property: "background-position",
                        styles: { gridColumn: "2/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="background-position" />,
                    },

                ]
            },

            {

                styles: { gridTemplateColumns: "repeat(3,minmax(0, 1fr))" },
                dividerTitle: "Mask",
                properties: [
                    // Mask-Image
                    {
                        label: "Image",
                        property: "mask-image",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="mask-image" />,
                    },

                    // Mask-Type
                    {
                        label: "Type",
                        property: "mask-type",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="mask-type" />,
                    },

                    // Mask-Mode
                    {
                        label: "Mode",
                        property: "mask-mode",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="mask-mode" />,
                    },


                    // Mask-Clip
                    {
                        label: "Clip",
                        property: "mask-clip",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="mask-clip" />,
                    },

                    // Mask-Repeat
                    {
                        label: "Repeat",
                        property: "mask-repeat",
                        styles: { gridColumn: "1/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="mask-repeat" />,
                    },

                    // Mask-Composite
                    {
                        label: "Composite",
                        property: "mask-composite",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="mask-composite" />,
                    },


                    // Mask-Origin
                    {
                        label: "Origin",
                        property: "mask-origin",
                        styles: { gridColumn: "2/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="mask-origin" />,
                    },

                    // Mask-Size
                    {
                        label: "Size",
                        property: "mask-size",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="mask-size" />,
                    },

                    // Mask-Position
                    {
                        label: "Position",
                        property: "mask-position",
                        styles: { gridColumn: "2/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="mask-position" />,
                    },

                ]
            },

        ],
    };
};
