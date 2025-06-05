// Components
import Value from '@/editors/style/components/value/value';

// Types
import { STYLE_LAYOUT } from '@/editors/style/components/layout/types';

/**
 * Custom hook for managing the "Size & Overflow" section layout in the style editor.
 *
 * @returns {STYLE_LAYOUT} Configuration for size and overflow properties in the style editor.
*/
export const useSizeLayout = (): STYLE_LAYOUT => {
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
                        component: () => <Value property="width" />,
                    },
                ],
            },
        ],
    };
};