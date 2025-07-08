// Components
import HorizontalDivider from '@/components/divider/horizontal/component';
// Types
import { LayoutProps } from '@/editors/style/components/layout/types';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';

/**
 * Custom hook for managing the "Size & Overflow" section layout in the style editor.
 *
 * @returns {LayoutProps} Configuration for size and overflow properties in the style editor.
*/
export const useSizeLayout = (): LayoutProps => {
    const { renderValue, renderSizeView } = useStyleFactory();
    const icon = <svg aria-label='Size & Overflow Icon' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill="black" d="M136,112H48a8,8,0,0,0-8,8v88a8,8,0,0,0,8,8h88a8,8,0,0,0,8-8V120A8,8,0,0,0,136,112Zm-8,88H56V128h72Zm88-16v16a16,16,0,0,1-16,16H176a8,8,0,0,1,0-16h24V184a8,8,0,0,1,16,0Zm0-72v32a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm0-56V72a8,8,0,0,1-16,0V56H184a8,8,0,0,1,0-16h16A16,16,0,0,1,216,56Zm-64-8a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,48ZM40,80V56A16,16,0,0,1,56,40H72a8,8,0,0,1,0,16H56V80a8,8,0,0,1-16,0Z" /></svg>;

    return {
        label: icon,
        title: 'Size&Overflow',
        groups: [
            {
                styles: { gridTemplateColumns: '1fr', position: 'sticky', top: '0', zIndex: 1, boxShadow: 'inset 0 0 20px 20px #ffffff' },
                properties: [
                    // Size View
                    {
                        label: null,
                        component: () => renderSizeView(),
                    },
                ]
            },
            {
                styles: { gridTemplateColumns: '1fr' },
                properties: [


                    // Width
                    {
                        label: 'Width',
                        property: 'width',
                        component: () => renderValue('width'),
                    },

                    // Min-Width
                    {
                        label: 'Min-Width',
                        property: 'min-width',
                        component: () => renderValue('min-width'),
                    },

                    // Max-Width
                    {
                        label: 'Max-Width',
                        property: 'max-width',
                        component: () => renderValue('max-width'),
                    },

                    // Height
                    {
                        label: 'Height',
                        property: 'height',
                        component: () => renderValue('height'),
                    },

                    // Min-Height
                    {
                        label: 'Min-Height',
                        property: 'min-height',
                        component: () => renderValue('min-height'),
                    },

                    // Max-Height
                    {
                        label: 'Max-Height',
                        property: 'max-height',
                        component: () => renderValue('max-height'),
                    },


                    // Aspect-Ratio(width / height).
                    {
                        label: 'Aspect-Ratio',
                        property: 'aspect-ratio',
                        component: () => renderValue('aspect-ratio'),
                    },


                    // Overflow
                    {
                        label: 'Overflow',
                        property: 'overflow',
                        component: () => renderValue('overflow'),
                    },

                ],

            },

            {

                styles: { gridTemplateColumns: '1fr' },
                properties: [

                    // Divider
                    {
                        label: null,
                        component: () => <HorizontalDivider title='Scroll' />,
                    },


                    // Scroll Behavior
                    {
                        label: 'Behavior',
                        property: 'scroll-behavior',
                        component: () => renderValue('scroll-behavior'),
                    },

                    // Overscroll Behavior
                    {
                        label: 'Overscroll',
                        property: 'overscroll-behavior',
                        component: () => renderValue('overscroll-behavior'),
                    },

                    // Scroll Snap Type
                    {
                        label: 'Snap Type',
                        property: 'scroll-snap-type',
                        component: () => renderValue('scroll-snap-type'),
                    },
                    // Scroll Snap Align
                    {
                        label: 'Snap Align',
                        property: 'scroll-snap-align',
                        component: () => renderValue('scroll-snap-align'),
                    },
                    // Scroll Snap Stop
                    {
                        label: 'Snap Stop',
                        property: 'scroll-snap-stop',
                        component: () => renderValue('scroll-snap-stop'),
                    },
                    // Scroll Margin
                    {
                        label: 'Margin',
                        property: 'scroll-margin',
                        component: () => renderValue('scroll-margin'),
                    },
                    // Scroll Margin Block
                    {
                        label: 'Margin Block',
                        property: 'scroll-margin-block',
                        component: () => renderValue('scroll-margin-block'),
                    },
                    // Scroll Margin Inline
                    {
                        label: 'Margin Inline',
                        property: 'scroll-margin-inline',
                        component: () => renderValue('scroll-margin-inline'),
                    },
                    // Scroll Padding
                    {
                        label: 'Padding',
                        property: 'scroll-padding',
                        component: () => renderValue('scroll-padding'),
                    },
                    // Scroll Padding Block
                    {
                        label: 'Padding Block',
                        property: 'scroll-padding-block',
                        component: () => renderValue('scroll-padding-block'),
                    },
                    // Scroll Padding Inline
                    {
                        label: 'Padding Inline',
                        property: 'scroll-padding-inline',
                        component: () => renderValue('scroll-padding-inline'),
                    },



                ]
            }
        ],
    };
};