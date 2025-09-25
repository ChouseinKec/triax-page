"use client";

// Types
import type { BlockStylesLayoutProps } from "@/src/page-builder/ui/inspectors/block/types";

// Factory
import { StyleValueRenderer } from "@/src/page-builder/ui/inspectors/block/style/layout/hooks/factory";

// Managers
import { useSelectedBlockID } from "@/src/page-builder/services/managers/block";

/**
 * useFontLayout Hook
 * Custom hook for the Font & Text section configuration in the style editor.
 * This defines the structure and properties for typography and text styling.
 *
 * @returns {BlockStylesLayoutProps} The layout configuration for font and text settings.
 */
export const useFontLayout = (): BlockStylesLayoutProps => {
    const selectedBlockID = useSelectedBlockID();
    const layoutIcon = <svg aria-label="Font & Text Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill="black" d="M60.59,175.24a8,8,0,0,0,10.65-3.83L87.9,136h80.2l16.66,35.41a8,8,0,1,0,14.48-6.82l-64-136a8,8,0,0,0-14.48,0l-64,136A8,8,0,0,0,60.59,175.24ZM128,50.79,160.57,120H95.43ZM224,216a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,216Z" /></svg>;

    if (!selectedBlockID) return { label: layoutIcon, title: "Font & Text", groups: [] };

    return {
        label: layoutIcon,
        title: "Font & Text",
        groups: [

            {
                styles: { gridTemplateColumns: "repeat(3, minmax(0, 1fr))" },
                properties: [

                    // Size
                    {
                        label: "Size",
                        property: "font-size",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="font-size" />,
                    },

                    // Weight
                    {
                        label: "Weight",
                        property: "font-weight",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="font-weight" />,
                    },

                    // Height
                    {
                        label: "Height",
                        property: "line-height",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="line-height" />,
                    },

                    // Family
                    {
                        label: "Family",
                        property: "font-family",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="font-family" />,
                    },


                    // Style
                    {
                        label: "Style",
                        property: "font-style",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="font-style" />,
                    },

                    // Color
                    {
                        label: "Color",
                        property: "color",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="color" />,
                    },

                ],
            },

            {
                styles: { gridTemplateColumns: "repeat(3,minmax(0, 1fr))" },
                dividerTitle: "Text",
                properties:
                    [

                        // Align
                        {
                            label: "Align",
                            property: "text-align",
                            component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="text-align" />,
                        },

                        // Text Align Last
                        {
                            label: "Align Last",
                            property: "text-align-last",
                            component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="text-align-last" />,
                        },

                        // Transform
                        {
                            label: "Transform",
                            property: "text-transform",
                            component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="text-transform" />,
                        },

                        // Text Combine Upright
                        {
                            label: "Combine Upright",
                            property: "text-combine-upright",
                            component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="text-combine-upright" />,
                        },

                        // Text Overflow
                        {
                            label: "Overflow",
                            property: "text-overflow",
                            component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="text-overflow" />,
                        },

                        // Text OrientationDefinition
                        {
                            label: "OrientationDefinition",
                            property: "text-orientation",
                            component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="text-orientation" />,
                        },

                        // Decoration
                        {
                            label: "Decoration",
                            property: "text-decoration",
                            styles: { gridColumn: "1/-1" },
                            component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="text-decoration" />,
                        },

                        // Text Shadow
                        {
                            label: "Shadow",
                            property: "text-shadow",
                            styles: { gridColumn: "1/-1" },
                            component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="text-shadow" />,
                        },


                        // Text Indent
                        {
                            label: "Indent",
                            property: "text-indent",
                            styles: { gridColumn: "1/3" },
                            component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="text-indent" />,
                        },
                    ],
            },

            {
                dividerTitle: "Spacing",
                styles: { gridTemplateColumns: "repeat(4,minmax(0, 1fr))" },
                properties: [
                    // Writing Mode
                    {
                        label: "Writing Mode",
                        property: "writing-mode",
                        styles: { gridColumn: "1/3" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="writing-mode" />,
                    },


                    // White-Space
                    {
                        label: "White Space",
                        property: "white-space",
                        styles: { gridColumn: "3/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="white-space" />,
                    },

                    // Word-Break
                    {
                        label: "Word Break",
                        property: "word-break",
                        styles: { gridColumn: "1/3" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="word-break" />,
                    },

                    // Line-Break
                    {
                        label: "Line Break",
                        property: "line-break",
                        styles: { gridColumn: "3/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="line-break" />,
                    },


                    // Letter Spacing
                    {
                        label: "Letter Spacing",
                        property: "letter-spacing",
                        styles: { gridColumn: "1/3" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="letter-spacing" />,
                    },

                    // Word Spacing
                    {
                        label: "Word Spacing",
                        property: "word-spacing",
                        styles: { gridColumn: "3/-1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="word-spacing" />,
                    },
                ],
            },

            {
                isExpandable: true,
                dividerTitle: "Column",
                styles: { gridTemplateColumns: "repeat(3,minmax(0, 1fr))" },
                properties: [

                    // Column Count
                    {
                        label: "Count",
                        property: "column-count",
                        styles: { gridColumn: "1" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="column-count" />,
                    },

                    // Column Width
                    {
                        label: "Width",
                        property: "column-width",
                        styles: { gridColumn: "2" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="column-width" />,
                    },

                    // Column Gap
                    {
                        label: "Gap",
                        property: "column-gap",
                        styles: { gridColumn: "3" },
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="column-gap" />,
                    },

                    // Column Rule Width
                    {
                        label: "Rule Width",
                        property: "column-rule-width",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="column-rule-width" />,
                    },

                    // Column Rule Style
                    {
                        label: "Rule Style",
                        property: "column-rule-style",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="column-rule-style" />,
                    },

                    // Column Rule Color
                    {
                        label: "Rule Color",
                        property: "column-rule-color",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="column-rule-color" />,
                    },

                    // Break Before
                    {
                        label: "Break Before",
                        property: "break-before",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="break-before" />,
                    },

                    // Break Inside
                    {
                        label: "Break Inside",
                        property: "break-inside",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="break-inside" />,
                    },

                    // Break After
                    {
                        label: "Break After",
                        property: "break-after",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="break-after" />,
                    },

                    // Column Span
                    {
                        label: "Column Span",
                        property: "column-span",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="column-span" />,
                    },

                    // Column Fill
                    {
                        label: "Column Fill",
                        property: "column-fill",
                        component: () => <StyleValueRenderer blockID={selectedBlockID} propertyName="column-fill" />,
                    },
                ],
            },
        ],
    };
};
