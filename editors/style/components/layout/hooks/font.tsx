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
                columns: 'repeat(3,minmax(0, 1fr))',
                properties: [
                    // Text View
                    {
                        label: null,
                        column: '1/-1',
                        direction: 'column',
                        component: () => renderTextView()
                    },

                ],
            },

            {
                columns: 'repeat(3,minmax(0, 1fr))',
                properties: [

                    // Size
                    {
                        label: 'Size',
                        direction: 'column',
                        property: 'font-size',
                        component: () => renderValue('font-size')
                    },

                    // Weight
                    {
                        label: 'Weight',
                        direction: 'column',
                        property: 'font-weight',
                        component: () => renderValue('font-weight'),
                    },

                    // Height
                    {
                        label: 'Height',
                        direction: 'column',
                        property: 'line-height',
                        component: () => renderValue('line-height')
                    },

                    // Family
                    {
                        label: 'Family',
                        direction: 'column',
                        property: 'font-family',
                        component: () => renderValue('font-family'),
                    },


                    // Style
                    {
                        label: 'Style',
                        column: 'auto',
                        direction: 'column',
                        property: 'font-style',
                        component: () => renderValue('font-style')
                    },
                ],
            },

            {
                columns: 'repeat(3,minmax(0, 1fr))',
                properties:
                    [

                        // Horizontal Divider
                        {
                            label: '',
                            column: '1/-1',
                            direction: 'column',
                            component: () => <HorizontalDivider title='Text' />,
                        },
                        // Color
                        {
                            label: 'Color',
                            direction: 'column',
                            property: 'color',
                            component: () => renderValue('color'),
                        },


                        // Align
                        {
                            label: 'Align',
                            direction: 'column',
                            property: 'text-align',
                            component: () => renderValue('text-align')
                        },


                        // Decoration
                        {
                            label: 'Decoration',
                            direction: 'column',
                            property: 'text-decoration',
                            component: () => renderValue('text-decoration')
                        },

                        // Text Shadow
                        {
                            label: 'Shadow',
                            direction: 'column',
                            property: 'text-shadow',
                            component: () => renderValue('text-shadow')
                        },

                        // Transform
                        {
                            label: 'Transform',
                            column: '2/-1',
                            direction: 'column',
                            property: 'text-transform',
                            component: () => renderValue('text-transform')
                        },

                        // Text Indent
                        {
                            label: 'Indent',
                            column: 'auto',
                            direction: 'column',
                            property: 'text-indent',
                            component: () => renderValue('text-indent')
                        },

                        // Text Overflow
                        {
                            label: 'Overflow',
                            column: 'auto',
                            direction: 'column',
                            property: 'text-overflow',
                            component: () => renderValue('text-overflow'),
                        },

                        // Text Orientation
                        {
                            label: 'Orientation',
                            column: 'auto',
                            direction: 'column',
                            property: 'text-orientation',
                            component: () => renderValue('text-orientation'),
                        },


                        // Text Align Last
                        {
                            label: 'Align Last',
                            column: 'auto',
                            direction: 'column',
                            property: 'text-align-last',
                            component: () => renderValue('text-align-last'),
                        },

                        // Text Combine Upright
                        {
                            label: 'Combine Upright',
                            column: 'auto',
                            direction: 'column',
                            property: 'text-combine-upright',
                            component: () => renderValue('text-combine-upright'),
                        },


                    ],
            },

            {
                isExpandable: true,
                expandTitle: 'Spacing',
                columns: 'repeat(3,minmax(0, 1fr))',
                properties: [
                    // Writing Mode
                    {
                        label: 'Writing Mode',
                        column: 'auto',
                        direction: 'column',
                        property: 'writing-mode',
                        component: () => renderValue('writing-mode'),
                    },

                    // Word-Break
                    {
                        label: 'Word-Break',
                        column: 'auto',
                        direction: 'column',
                        property: 'word-break',
                        component: () => renderValue('word-break'),
                    },

                    // Line-Break
                    {
                        label: 'Line-Break',
                        column: 'auto',
                        direction: 'column',
                        property: 'line-break',
                        component: () => renderValue('line-break'),
                    },

                    // White-Space
                    {
                        label: 'White-Space',
                        column: 'auto',
                        direction: 'column',
                        property: 'white-space',
                        component: () => renderValue('white-space'),
                    },

                    // Letter Spacing
                    {
                        label: 'Letter Spacing',
                        column: 'auto',
                        direction: 'column',
                        property: 'letter-spacing',
                        component: () => renderValue('letter-spacing')
                    },

                    // Word Spacing
                    {
                        label: 'Word Spacing',
                        column: 'auto',
                        direction: 'column',
                        property: 'word-spacing',
                        component: () => renderValue('word-spacing'),
                    },
                ],
            },

            {
                isExpandable: true,
                expandTitle: 'Column',
                columns: 'repeat(3,minmax(0, 1fr))',
                properties: [

                    // Column Count
                    {
                        label: 'Count',
                        column: 'auto',
                        direction: 'column',
                        property: 'column-count',
                        component: () => renderValue('column-count'),
                    },

                    // Column Width
                    {
                        label: 'Width',
                        column: 'auto',
                        direction: 'column',
                        property: 'column-width',
                        component: () => renderValue('column-width'),
                    },

                    // Column Gap
                    {
                        label: 'Gap',
                        column: 'auto',
                        direction: 'column',
                        property: 'column-gap',
                        component: () => renderValue('column-gap'),
                    },

                    // Column Rule Width
                    {
                        label: 'Rule Width',
                        column: 'auto',
                        direction: 'column',
                        property: 'column-rule-width',
                        component: () => renderValue('column-rule-width'),
                    },

                    // Column Rule Style
                    {
                        label: 'Rule Style',
                        column: 'auto',
                        direction: 'column',
                        property: 'column-rule-style',
                        component: () => renderValue('column-rule-style'),
                    },

                    // Column Rule Color
                    {
                        label: 'Rule Color',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('column-rule-color'),
                    },

                    // Break Before
                    {
                        label: 'Break Before',
                        column: 'auto',
                        direction: 'column',
                        property: 'break-before',
                        component: () => renderValue('break-before'),
                    },

                    // Break Inside
                    {
                        label: 'Break Inside',
                        column: 'auto',
                        direction: 'column',
                        property: 'break-inside',
                        component: () => renderValue('break-inside'),
                    },

                    // Break After
                    {
                        label: 'Break After',
                        column: 'auto',
                        direction: 'column',
                        property: 'break-after',
                        component: () => renderValue('break-after'),
                    },

                    // Column Span
                    {
                        label: 'Column Span',
                        column: 'auto',
                        direction: 'column',
                        property: 'column-span',
                        component: () => renderValue('column-span'),
                    },

                    // Column Fill
                    {
                        label: 'Column Fill',
                        column: 'auto',
                        direction: 'column',
                        property: 'column-fill',
                        component: () => renderValue('column-fill'),
                    },
                ],
            },
        ],
    };
};