// Types
import { LayoutProps } from '@/editors/style/components/layout/types';

// Factory
import { useStyleFactory } from '@/hooks/style/factory';

/**
 * Custom hook for managing the "Size & Overflow" section layout in the style editor.
 *
 * @returns {LayoutProps} Configuration for size and overflow properties in the style editor.
*/
export const useSizeLayout = (): LayoutProps => {
    const { renderValue } = useStyleFactory();

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
                        component: () => renderValue('grid-template-columns'),
                    },
                ],
            },
        ],
    };
};