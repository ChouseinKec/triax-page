// Types
import type { LayoutProps } from '@/editors/style/components/layout/types';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';

export const useFontLayout = (): LayoutProps => {
    const { renderValue, renderTextView } = useStyleFactory();
    const icon = <svg aria-label='Font & Text Icon' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill="black" d="M60.59,175.24a8,8,0,0,0,10.65-3.83L87.9,136h80.2l16.66,35.41a8,8,0,1,0,14.48-6.82l-64-136a8,8,0,0,0-14.48,0l-64,136A8,8,0,0,0,60.59,175.24ZM128,50.79,160.57,120H95.43ZM224,216a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,216Z" /></svg>;
    return {
        label: icon,
        title: 'Font&Text',
        groups: [
            {
                styles: { gridTemplateColumns: '1fr', position: 'sticky', top: '0', zIndex: 1, boxShadow: 'inset 0 0 20px 20px #ffffff' },
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
                styles: { gridTemplateColumns: '1fr' },
                properties: [

                    // Size
                    {
                        label: 'Size',
                        property: 'font-size',
                        component: () => renderValue('font-size')
                    },

                    // Weight
                    {
                        label: 'Weight',
                        property: 'font-weight',
                        component: () => renderValue('font-weight'),
                    },

                    // Height
                    {
                        label: 'Height',
                        property: 'line-height',
                        component: () => renderValue('line-height')
                    },

                    // Family
                    {
                        label: 'Family',
                        property: 'font-family',
                        component: () => renderValue('font-family'),
                    },


                    // Style
                    {
                        label: 'Style',
                        property: 'font-style',
                        component: () => renderValue('font-style')
                    },
                ],
            },

            {
                styles: { gridTemplateColumns: '1fr' },
                expandTitle: 'Text',
                properties:
                    [
                        // Color
                        {
                            label: 'Color',
                            property: 'color',
                            component: () => renderValue('color'),
                        },


                        // Align
                        {
                            label: 'Align',
                            property: 'text-align',
                            component: () => renderValue('text-align')
                        },


                        // Decoration
                        {
                            label: 'Decoration',
                            property: 'text-decoration',
                            component: () => renderValue('text-decoration')
                        },

                        // Text Shadow
                        {
                            label: 'Shadow',
                            property: 'text-shadow',
                            component: () => renderValue('text-shadow')
                        },

                        // Transform
                        {
                            label: 'Transform',
                            property: 'text-transform',
                            component: () => renderValue('text-transform')
                        },

                        // Text Indent
                        {
                            label: 'Indent',
                            property: 'text-indent',
                            component: () => renderValue('text-indent')
                        },

                        // Text Overflow
                        {
                            label: 'Overflow',
                            property: 'text-overflow',
                            component: () => renderValue('text-overflow'),
                        },

                        // Text Orientation
                        {
                            label: 'Orientation',
                            property: 'text-orientation',
                            component: () => renderValue('text-orientation'),
                        },


                        // Text Align Last
                        {
                            label: 'Align Last',
                            property: 'text-align-last',
                            component: () => renderValue('text-align-last'),
                        },

                        // Text Combine Upright
                        {
                            label: 'Combine Upright',
                            property: 'text-combine-upright',
                            component: () => renderValue('text-combine-upright'),
                        },


                    ],
            },

            {
                expandTitle: 'Spacing',
                styles: { gridTemplateColumns: '1fr' },
                properties: [
                    // Writing Mode
                    {
                        label: 'Writing Mode',
                        property: 'writing-mode',
                        component: () => renderValue('writing-mode'),
                    },

                    // Word-Break
                    {
                        label: 'Word-Break',
                        property: 'word-break',
                        component: () => renderValue('word-break'),
                    },

                    // Line-Break
                    {
                        label: 'Line-Break',
                        property: 'line-break',
                        component: () => renderValue('line-break'),
                    },

                    // White-Space
                    {
                        label: 'White-Space',
                        property: 'white-space',
                        component: () => renderValue('white-space'),
                    },

                    // Letter Spacing
                    {
                        label: 'Letter Spacing',
                        property: 'letter-spacing',
                        component: () => renderValue('letter-spacing')
                    },

                    // Word Spacing
                    {
                        label: 'Word Spacing',
                        property: 'word-spacing',
                        component: () => renderValue('word-spacing'),
                    },
                ],
            },

            {
                isExpandable: true,
                expandTitle: 'Column',
                styles: { gridTemplateColumns: '1fr' },
                properties: [

                    // Column Count
                    {
                        label: 'Count',
                        property: 'column-count',
                        component: () => renderValue('column-count'),
                    },

                    // Column Width
                    {
                        label: 'Width',
                        property: 'column-width',
                        component: () => renderValue('column-width'),
                    },

                    // Column Gap
                    {
                        label: 'Gap',
                        property: 'column-gap',
                        component: () => renderValue('column-gap'),
                    },

                    // Column Rule Width
                    {
                        label: 'Rule Width',
                        property: 'column-rule-width',
                        component: () => renderValue('column-rule-width'),
                    },

                    // Column Rule Style
                    {
                        label: 'Rule Style',
                        property: 'column-rule-style',
                        component: () => renderValue('column-rule-style'),
                    },

                    // Column Rule Color
                    {
                        label: 'Rule Color',
                        property: 'column-rule-color',
                        component: () => renderValue('column-rule-color'),
                    },

                    // Break Before
                    {
                        label: 'Break Before',
                        property: 'break-before',
                        component: () => renderValue('break-before'),
                    },

                    // Break Inside
                    {
                        label: 'Break Inside',
                        property: 'break-inside',
                        component: () => renderValue('break-inside'),
                    },

                    // Break After
                    {
                        label: 'Break After',
                        property: 'break-after',
                        component: () => renderValue('break-after'),
                    },

                    // Column Span
                    {
                        label: 'Column Span',
                        property: 'column-span',
                        component: () => renderValue('column-span'),
                    },

                    // Column Fill
                    {
                        label: 'Column Fill',
                        property: 'column-fill',
                        component: () => renderValue('column-fill'),
                    },
                ],
            },
        ],
    };
};