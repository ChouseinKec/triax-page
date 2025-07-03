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
                        column: 'auto',
                        direction: 'column',
                        property: 'width',
                        component: () => renderValue('width'),
                    },

                    // Min-Width
                    {
                        label: 'Min',
                        column: 'auto',
                        direction: 'column',
                        property: 'min-width',
                        component: () => renderValue('min-width'),
                    },

                    // Max-Width
                    {
                        label: 'Max',
                        column: 'auto',
                        direction: 'column',
                        property: 'max-width',
                        component: () => renderValue('max-width'),
                    },

                    // Height
                    {
                        label: 'Height',
                        column: 'auto',
                        direction: 'column',
                        property: 'height',
                        component: () => renderValue('height'),
                    },

                    // Min-Height
                    {
                        label: 'Min',
                        column: 'auto',
                        direction: 'column',
                        property: 'min-height',
                        component: () => renderValue('min-height'),
                    },

                    // Max-Height
                    {
                        label: 'Max',
                        column: 'auto',
                        direction: 'column',
                        property: 'max-height',
                        component: () => renderValue('max-height'),
                    },


                    // Aspect-Ratio(width / height).
                    {
                        label: 'Aspect-Ratio',
                        column: '1/3',
                        direction: 'column',
                        property: 'aspect-ratio',
                        component: () => renderValue('aspect-ratio'),
                    },


                    // Overflow
                    {
                        label: 'Overflow',
                        column: 'auto',
                        direction: 'column',
                        property: 'overflow',
                        component: () => renderValue('overflow'),
                    },

                ],

            },

            {

                columns: 'repeat(3,minmax(0, 1fr))',
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
                        column: '1',
                        direction: 'column',
                        property: 'scroll-behavior',
                        component: () => renderValue('scroll-behavior'),
                    },

                    // Overscroll Behavior
                    {
                        label: 'Overscroll',
                        column: '2/-1',
                        direction: 'column',
                        property: 'overscroll-behavior',
                        component: () => renderValue('overscroll-behavior'),
                    },

                    // Scroll Snap Type
                    {
                        label: 'Snap Type',
                        column: 'auto',
                        direction: 'column',
                        property: 'scroll-snap-type',
                        component: () => renderValue('scroll-snap-type'),
                    },
                    // Scroll Snap Align
                    {
                        label: 'Snap Align',
                        column: 'auto',
                        direction: 'column',
                        property: 'scroll-snap-align',
                        component: () => renderValue('scroll-snap-align'),
                    },
                    // Scroll Snap Stop
                    {
                        label: 'Snap Stop',
                        column: 'auto',
                        direction: 'column',
                        property: 'scroll-snap-stop',
                        component: () => renderValue('scroll-snap-stop'),
                    },
                    // Scroll Margin
                    {
                        label: 'Margin',
                        column: 'auto',
                        direction: 'column',
                        property: 'scroll-margin',
                        component: () => renderValue('scroll-margin'),
                    },
                    // Scroll Margin Block
                    {
                        label: 'Margin Block',
                        column: 'auto',
                        direction: 'column',
                        property: 'scroll-margin-block',
                        component: () => renderValue('scroll-margin-block'),
                    },
                    // Scroll Margin Inline
                    {
                        label: 'Margin Inline',
                        column: 'auto',
                        direction: 'column',
                        property: 'scroll-margin-inline',
                        component: () => renderValue('scroll-margin-inline'),
                    },
                    // Scroll Padding
                    {
                        label: 'Padding',
                        column: 'auto',
                        direction: 'column',
                        property: 'scroll-padding',
                        component: () => renderValue('scroll-padding'),
                    },
                    // Scroll Padding Block
                    {
                        label: 'Padding Block',
                        column: 'auto',
                        direction: 'column',
                        property: 'scroll-padding-block',
                        component: () => renderValue('scroll-padding-block'),
                    },
                    // Scroll Padding Inline
                    {
                        label: 'Padding Inline',
                        column: 'auto',
                        direction: 'column',
                        property: 'scroll-padding-inline',
                        component: () => renderValue('scroll-padding-inline'),
                    },



                ]
            }
        ],
    };
};