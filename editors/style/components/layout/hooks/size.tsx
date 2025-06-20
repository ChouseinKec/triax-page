// Components
import HorizontalDivider from '@/components/Divider/Horizontal/component';
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
    const { renderValue } = useStyleFactory();
    const { getStyle } = useStyleManager();

    return {
        label: 'Size & Overflow',
        groups: [
            {
                columns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
                properties: [
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

                    // Flex
                    {
                        label: '',
                        column: '1/-1',
                        direction: 'column',
                        component: () => <HorizontalDivider type='bracket'/>,
                    },

                    // Overflow
                    {
                        label: 'Overflow',
                        column: '1/-1',
                        direction: 'column',
                        property: 'overflow',
                        component: () => renderValue('overflow'),
                    },

                    // Aspect-Ratio(width / height).
                    {
                        label: 'Aspect-Ratio',
                        column: '1/-1',
                        direction: 'column',
                        component: () => renderValue('aspect-ratio'),
                    },

                    // Object-Fit (e.g., cover, contain).
                    {
                        label: 'Object-Fit',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('object-fit'),
                    },

                    // Box-Sizing(e.g., border-box, content-box).
                    {
                        label: 'Box-Sizing',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('box-sizing'),
                    },


                ],
            },
        ],
    };
};