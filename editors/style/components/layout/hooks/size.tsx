// Components
import HorizontalDivider from '@/components/divider/horizontal/component';
// Types
import { LayoutProps } from '@/editors/style/components/layout/types';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';
import { useStyleManager } from '@/hooks/style/manager';

/**
 * Custom hook for managing the "Size & Overflow" section layout in the style editor.
 *
 * @returns {LayoutProps} Configuration for size and overflow properties in the style editor.
*/
export const useSizeLayout = (): LayoutProps => {
    const { renderValue, renderSizeView } = useStyleFactory();

    return {
        label: 'Size & Scroll',
        groups: [
            {
                columns: 'repeat(3,minmax(0, 1fr))',
                properties: [

                    // Size View
                    {
                        label: null,
                        column: '1/-1',
                        component: () => renderSizeView(),
                    },

                    // Width
                    {
                        label: 'Width',
                        column: '1/-1',
                        property: 'width',
                        component: () => renderValue('width'),
                    },

                    // Min-Width
                    {
                        label: 'Min-Width',
                        column: '1/-1',
                        property: 'min-width',
                        component: () => renderValue('min-width'),
                    },

                    // Max-Width
                    {
                        label: 'Max-Width',
                        column: '1/-1',
                        property: 'max-width',
                        component: () => renderValue('max-width'),
                    },

                    // Height
                    {
                        label: 'Height',
                        column: '1/-1',
                        property: 'height',
                        component: () => renderValue('height'),
                    },

                    // Min-Height
                    {
                        label: 'Min-Height',
                        column: '1/-1',
                        property: 'min-height',
                        component: () => renderValue('min-height'),
                    },

                    // Max-Height
                    {
                        label: 'Max-Height',
                        column: '1/-1',
                        property: 'max-height',
                        component: () => renderValue('max-height'),
                    },


                    // Aspect-Ratio(width / height).
                    {
                        label: 'Aspect-Ratio',
                        column: '1/-1',
                        property: 'aspect-ratio',
                        component: () => renderValue('aspect-ratio'),
                    },


                    // Overflow
                    {
                        label: 'Overflow',
                        column: '1/-1',
                        property: 'overflow',
                        component: () => renderValue('overflow'),
                    },

                ],

            },

            {

                columns: 'repeat(4,minmax(0, 1fr))',
                properties: [

                    // Divider
                    {
                        label: null,
                        column: '1/-1',
                        component: () => <HorizontalDivider title='Scroll' />,
                    },


                    // Scroll Behavior
                    {
                        label: 'Behavior',
                        column: '1/-1',

                        property: 'scroll-behavior',
                        component: () => renderValue('scroll-behavior'),
                    },

                    // Overscroll Behavior
                    {
                        label: 'Overscroll',
                        column: '1/-1',

                        property: 'overscroll-behavior',
                        component: () => renderValue('overscroll-behavior'),
                    },

                    // Scroll Snap Type
                    {
                        label: 'Snap Type',
                        column: '1/-1',

                        property: 'scroll-snap-type',
                        component: () => renderValue('scroll-snap-type'),
                    },
                    // Scroll Snap Align
                    {
                        label: 'Snap Align',
                        column: '1/-1',

                        property: 'scroll-snap-align',
                        component: () => renderValue('scroll-snap-align'),
                    },
                    // Scroll Snap Stop
                    {
                        label: 'Snap Stop',
                        column: '1/-1',

                        property: 'scroll-snap-stop',
                        component: () => renderValue('scroll-snap-stop'),
                    },
                    // Scroll Margin
                    {
                        label: 'Margin',
                        column: '1/-1',

                        property: 'scroll-margin',
                        component: () => renderValue('scroll-margin'),
                    },
                    // Scroll Margin Block
                    {
                        label: 'Margin Block',
                        column: '1/-1',

                        property: 'scroll-margin-block',
                        component: () => renderValue('scroll-margin-block'),
                    },
                    // Scroll Margin Inline
                    {
                        label: 'Margin Inline',
                        column: '1/-1',

                        property: 'scroll-margin-inline',
                        component: () => renderValue('scroll-margin-inline'),
                    },
                    // Scroll Padding
                    {
                        label: 'Padding',
                        column: '1/-1',

                        property: 'scroll-padding',
                        component: () => renderValue('scroll-padding'),
                    },
                    // Scroll Padding Block
                    {
                        label: 'Padding Block',
                        column: '1/-1',

                        property: 'scroll-padding-block',
                        component: () => renderValue('scroll-padding-block'),
                    },
                    // Scroll Padding Inline
                    {
                        label: 'Padding Inline',
                        column: '1/-1',

                        property: 'scroll-padding-inline',
                        component: () => renderValue('scroll-padding-inline'),
                    },



                ]
            }
        ],
    };
};