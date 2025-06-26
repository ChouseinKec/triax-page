// React hook for managing local state
import { useState } from 'react';

// Types
import type { LayoutProps } from '@/editors/style/components/layout/types';
import type { Side, Corner } from '@/components/select/position/types';
import type { CSSProperties } from '@/types/style/property';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';
import { useStyleManager } from '@/hooks/style/manager';


function generatePropertyName(property: string, position: Side | Corner): CSSProperties {
    if (!position) return property as CSSProperties;
    return `${property}-${position}` as CSSProperties;
}


/**
 * Custom hook for managing the "Position & Spacing" section layout in the style editor.
 *
 * @returns {LayoutProps} Configuration for the position and spacing properties in the style editor.
 */
export const usePositionLayout = (): LayoutProps => {
    const { renderValue, renderPositionSelect, renderPositionView } = useStyleFactory();
    const { getStyle } = useStyleManager();

    const [currentSide, setCurrentSide] = useState<Side>('top');
    const [currentCorner, setCurrentCorner] = useState<Corner>('top-left');

    return {
        label: 'Position & Spacing',
        groups: [
            {
                columns: 'repeat(4,1fr)',
                rows: 'auto auto',
                properties: [
                    // Position Select (side and corner)
                    {
                        label: null,
                        column: '1',
                        row: '1',
                        component: () => renderPositionSelect(setCurrentSide, setCurrentCorner, false, true),
                    },

                    // Position View
                    {
                        label: null,
                        column: '2/-1',
                        row: '1',
                        component: () => renderPositionView(),
                    },


                    // Position (e.g., absolute, relative).
                    {
                        label: 'Position',
                        column: '1/3',
                        direction: 'column',
                        component: () => renderValue('position'),
                    },

                    // Top-Right-Bottom-Left
                    {
                        label: currentSide || '...',
                        column: '3/-1',
                        direction: 'column',
                        disabled: !['absolute', 'fixed', 'sticky'].includes(getStyle('position')) || !currentSide,
                        component: () => renderValue(currentSide?.toLowerCase() as CSSProperties || 'top'),
                    },

                    // Padding dynamic based on current side selected.
                    {
                        label: 'Padding',
                        column: '1/3',
                        direction: 'column',
                        component: () => renderValue(generatePropertyName('padding', currentSide)),
                    },

                    // Margin dynamic based on current side selected.
                    {
                        label: 'Margin',
                        column: '3/-1',
                        direction: 'column',
                        component: () => renderValue(generatePropertyName('margin', currentSide)),
                    },
                ],
            },

            {
                columns: '1fr',
                rows: 'auto auto',
                properties: [


                    // Transform (e.g., translate, rotate).
                    {
                        label: 'Transform',
                        column: '1/-1',
                        labelAlign: 'flex-start',
                        component: () => renderValue('transform'),
                    },
                ],
            },
        ],
    };
};
