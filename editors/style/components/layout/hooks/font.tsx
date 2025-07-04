// Components
import HorizontalDivider from '@/components/divider/horizontal/component';

// Types
import type { LayoutProps } from '@/editors/style/components/layout/types';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';

export const useFontLayout = (): LayoutProps => {
    const { renderValue, renderTextView } = useStyleFactory();

    return {
        label: 'Font & Text',
        groups: [
            {
                columns: '1fr',
                properties: [
                    // Text View
                    {
                        label: null,
                        column: 'auto',
                        component: () => renderTextView()
                    },

                ],
            },

            {
                columns: 'repeat(1,minmax(0, 1fr))',
                properties: [

                    // Size
                    {
                        label: 'Size',
                        column: 'auto',
                        property: 'font-size',
                        component: () => renderValue('font-size')
                    },

                    // Weight
                    {
                        label: 'Weight',
                        column: 'auto',
                        property: 'font-weight',
                        component: () => renderValue('font-weight'),
                    },

                    // Height
                    {
                        label: 'Height',
                        column: 'auto',
                        property: 'line-height',
                        component: () => renderValue('line-height')
                    },

                    // Family
                    {
                        label: 'Family',
                        column: 'auto',
                        property: 'font-family',
                        component: () => renderValue('font-family'),
                    },


                    // Style
                    {
                        label: 'Style',
                        column: 'auto',
                        property: 'font-style',
                        component: () => renderValue('font-style')
                    },
                ],
            },

            {
                columns: 'repeat(1,minmax(0, 1fr))',
                expandTitle: 'Text',
                properties:
                    [
                        // Color
                        {
                            label: 'Color',
                            column: 'auto',
                            property: 'color',
                            component: () => renderValue('color'),
                        },


                        // Align
                        {
                            label: 'Align',
                            column: 'auto',
                            property: 'text-align',
                            component: () => renderValue('text-align')
                        },


                        // Decoration
                        {
                            label: 'Decoration',
                            column: 'auto',
                            property: 'text-decoration',
                            component: () => renderValue('text-decoration')
                        },

                        // Text Shadow
                        {
                            label: 'Shadow',
                            column: 'auto',
                            property: 'text-shadow',
                            component: () => renderValue('text-shadow')
                        },

                        // Transform
                        {
                            label: 'Transform',
                            column: 'auto',
                            property: 'text-transform',
                            component: () => renderValue('text-transform')
                        },

                        // Text Indent
                        {
                            label: 'Indent',
                            column: 'auto',
                            property: 'text-indent',
                            component: () => renderValue('text-indent')
                        },

                        // Text Overflow
                        {
                            label: 'Overflow',
                            column: 'auto',
                            property: 'text-overflow',
                            component: () => renderValue('text-overflow'),
                        },

                        // Text Orientation
                        {
                            label: 'Orientation',
                            column: 'auto',
                            property: 'text-orientation',
                            component: () => renderValue('text-orientation'),
                        },


                        // Text Align Last
                        {
                            label: 'Align Last',
                            column: 'auto',
                            property: 'text-align-last',
                            component: () => renderValue('text-align-last'),
                        },

                        // Text Combine Upright
                        {
                            label: 'Combine Upright',
                            column: 'auto',
                            property: 'text-combine-upright',
                            component: () => renderValue('text-combine-upright'),
                        },


                    ],
            },

            {
                expandTitle: 'Spacing',
                columns: 'repeat(1,minmax(0, 1fr))',
                properties: [
                    // Writing Mode
                    {
                        label: 'Writing Mode',
                        column: 'auto',
                        property: 'writing-mode',
                        component: () => renderValue('writing-mode'),
                    },

                    // Word-Break
                    {
                        label: 'Word-Break',
                        column: 'auto',
                        property: 'word-break',
                        component: () => renderValue('word-break'),
                    },

                    // Line-Break
                    {
                        label: 'Line-Break',
                        column: 'auto',
                        property: 'line-break',
                        component: () => renderValue('line-break'),
                    },

                    // White-Space
                    {
                        label: 'White-Space',
                        column: 'auto',
                        property: 'white-space',
                        component: () => renderValue('white-space'),
                    },

                    // Letter Spacing
                    {
                        label: 'Letter Spacing',
                        column: 'auto',
                        property: 'letter-spacing',
                        component: () => renderValue('letter-spacing')
                    },

                    // Word Spacing
                    {
                        label: 'Word Spacing',
                        column: 'auto',
                        property: 'word-spacing',
                        component: () => renderValue('word-spacing'),
                    },
                ],
            },

            {
                expandTitle: 'Column',
                columns: 'repeat(1,minmax(0, 1fr))',
                properties: [

                    // Column Count
                    {
                        label: 'Count',
                        column: 'auto',
                        property: 'column-count',
                        component: () => renderValue('column-count'),
                    },

                    // Column Width
                    {
                        label: 'Width',
                        column: 'auto',
                        property: 'column-width',
                        component: () => renderValue('column-width'),
                    },

                    // Column Gap
                    {
                        label: 'Gap',
                        column: 'auto',
                        property: 'column-gap',
                        component: () => renderValue('column-gap'),
                    },

                    // Column Rule Width
                    {
                        label: 'Rule Width',
                        column: 'auto',
                        property: 'column-rule-width',
                        component: () => renderValue('column-rule-width'),
                    },

                    // Column Rule Style
                    {
                        label: 'Rule Style',
                        column: 'auto',
                        property: 'column-rule-style',
                        component: () => renderValue('column-rule-style'),
                    },

                    // Column Rule Color
                    {
                        label: 'Rule Color',
                        column: 'auto',
                        property: 'column-rule-color',
                        component: () => renderValue('column-rule-color'),
                    },

                    // Break Before
                    {
                        label: 'Break Before',
                        column: 'auto',
                        property: 'break-before',
                        component: () => renderValue('break-before'),
                    },

                    // Break Inside
                    {
                        label: 'Break Inside',
                        column: 'auto',
                        property: 'break-inside',
                        component: () => renderValue('break-inside'),
                    },

                    // Break After
                    {
                        label: 'Break After',
                        column: 'auto',
                        property: 'break-after',
                        component: () => renderValue('break-after'),
                    },

                    // Column Span
                    {
                        label: 'Column Span',
                        column: 'auto',
                        property: 'column-span',
                        component: () => renderValue('column-span'),
                    },

                    // Column Fill
                    {
                        label: 'Column Fill',
                        column: 'auto',
                        property: 'column-fill',
                        component: () => renderValue('column-fill'),
                    },
                ],
            },
        ],
    };
};