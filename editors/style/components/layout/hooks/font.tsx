"use client";

// Types
import type { LayoutProps } from "@/editors/style/components/layout/types";

// Hooks
import { useStyleFactory } from "@/hooks/style/factory";

export const useFontLayout = (): LayoutProps => {
    const { renderValue } = useStyleFactory();
    const icon = <svg aria-label="Font & Text Icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill="black" d="M60.59,175.24a8,8,0,0,0,10.65-3.83L87.9,136h80.2l16.66,35.41a8,8,0,1,0,14.48-6.82l-64-136a8,8,0,0,0-14.48,0l-64,136A8,8,0,0,0,60.59,175.24ZM128,50.79,160.57,120H95.43ZM224,216a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,216Z" /></svg>;
    return {
        label: icon,
        title: "Font & Text",
        groups: [

            {
                styles: { gridTemplateColumns: "repeat(3, minmax(0, 1fr))" },
                properties: [

                    // Size
                    {
                        label: "Size",
                        property: "font-size",
                        component: () => renderValue("font-size")
                    },

                    // Weight
                    {
                        label: "Weight",
                        property: "font-weight",
                        component: () => renderValue("font-weight"),
                    },

                    // Height
                    {
                        label: "Height",
                        property: "line-height",
                        component: () => renderValue("line-height")
                    },

                    // Family
                    {
                        label: "Family",
                        property: "font-family",
                        component: () => renderValue("font-family"),
                    },


                    // Style
                    {
                        label: "Style",
                        property: "font-style",
                        component: () => renderValue("font-style")
                    },

                    // Color
                    {
                        label: "Color",
                        property: "color",
                        component: () => renderValue("color"),
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
                            component: () => renderValue("text-align")
                        },

                        // Text Align Last
                        {
                            label: "Align Last",
                            property: "text-align-last",
                            component: () => renderValue("text-align-last"),
                        },

                        // Transform
                        {
                            label: "Transform",
                            property: "text-transform",
                            component: () => renderValue("text-transform")
                        },

                        // Text Combine Upright
                        {
                            label: "Combine Upright",
                            property: "text-combine-upright",
                            component: () => renderValue("text-combine-upright"),
                        },

                        // Text Overflow
                        {
                            label: "Overflow",
                            property: "text-overflow",
                            component: () => renderValue("text-overflow"),
                        },

                        // Text Orientation
                        {
                            label: "Orientation",
                            property: "text-orientation",
                            component: () => renderValue("text-orientation"),
                        },

                        // Decoration
                        {
                            label: "Decoration",
                            property: "text-decoration",
                            styles: { gridColumn: "1/-1" },
                            component: () => renderValue("text-decoration")
                        },

                        // Text Shadow
                        {
                            label: "Shadow",
                            property: "text-shadow",
                            styles: { gridColumn: "1/-1" },
                            component: () => renderValue("text-shadow")
                        },


                        // Text Indent
                        {
                            label: "Indent",
                            property: "text-indent",
                            styles: { gridColumn: "1/3" },
                            component: () => renderValue("text-indent")
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
                        component: () => renderValue("writing-mode"),
                    },


                    // White-Space
                    {
                        label: "White Space",
                        property: "white-space",
                        styles: { gridColumn: "3/-1" },
                        component: () => renderValue("white-space"),
                    },

                    // Word-Break
                    {
                        label: "Word Break",
                        property: "word-break",
                        styles: { gridColumn: "1/3" },
                        component: () => renderValue("word-break"),
                    },

                    // Line-Break
                    {
                        label: "Line Break",
                        property: "line-break",
                        styles: { gridColumn: "3/-1" },
                        component: () => renderValue("line-break"),
                    },


                    // Letter Spacing
                    {
                        label: "Letter Spacing",
                        property: "letter-spacing",
                        styles: { gridColumn: "1/3" },
                        component: () => renderValue("letter-spacing")
                    },

                    // Word Spacing
                    {
                        label: "Word Spacing",
                        property: "word-spacing",
                        styles: { gridColumn: "3/-1" },
                        component: () => renderValue("word-spacing"),
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
                        component: () => renderValue("column-count"),
                    },

                    // Column Width
                    {
                        label: "Width",
                        property: "column-width",
                        styles: { gridColumn: "2" },
                        component: () => renderValue("column-width"),
                    },

                    // Column Gap
                    {
                        label: "Gap",
                        property: "column-gap",
                        styles: { gridColumn: "3" },
                        component: () => renderValue("column-gap"),
                    },

                    // Column Rule Width
                    {
                        label: "Rule Width",
                        property: "column-rule-width",
                        component: () => renderValue("column-rule-width"),
                    },

                    // Column Rule Style
                    {
                        label: "Rule Style",
                        property: "column-rule-style",
                        component: () => renderValue("column-rule-style"),
                    },

                    // Column Rule Color
                    {
                        label: "Rule Color",
                        property: "column-rule-color",
                        component: () => renderValue("column-rule-color"),
                    },

                    // Break Before
                    {
                        label: "Break Before",
                        property: "break-before",
                        component: () => renderValue("break-before"),
                    },

                    // Break Inside
                    {
                        label: "Break Inside",
                        property: "break-inside",
                        component: () => renderValue("break-inside"),
                    },

                    // Break After
                    {
                        label: "Break After",
                        property: "break-after",
                        component: () => renderValue("break-after"),
                    },

                    // Column Span
                    {
                        label: "Column Span",
                        property: "column-span",
                        component: () => renderValue("column-span"),
                    },

                    // Column Fill
                    {
                        label: "Column Fill",
                        property: "column-fill",
                        component: () => renderValue("column-fill"),
                    },
                ],
            },
        ],
    };
};