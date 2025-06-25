// React hook for managing local state
import { useState } from 'react';

// Types
import type { LayoutProps } from '@/editors/style/components/layout/types';
import type { Side, Corner } from '@/components/Select/Position/types';
import type { CSSProperties } from '@/types/style/property';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';
import { useStyleManager } from '@/hooks/style/manager';

/**
 * Custom hook for managing the "Position & Spacing" section layout in the style editor.
 *
 * @returns {LayoutProps} Configuration for the position and spacing properties in the style editor.
 */
export const usePositionLayout = (): LayoutProps => {
    const { renderValue, renderPositionSelect } = useStyleFactory();
    const { getStyle } = useStyleManager();

    const [currentSide, setCurrentSide] = useState<Side>('top');
    const [, setCurrentCorner] = useState<Corner>('top-left');

    return {
        label: 'Position & Spacing',
        groups: [
            {
                columns: '0.2fr 1fr 1fr',
                rows: 'auto auto',
                properties: [
                    // Position Select (side and corner)
                    {
                        label: null,
                        column: '1',
                        row: '1/-1',
                        component: () => renderPositionSelect(setCurrentSide, setCurrentCorner, false),
                    },

                    // Position (e.g., absolute, relative).
                    {
                        label: 'Position',
                        column: '2',
                        direction: 'column',
                        component: () => renderValue('position'),
                    },

                    // Top-Right-Bottom-Left
                    {
                        label: currentSide, // Label dynamic based on selected side (e.g., 'Top')
                        column: '3',
                        direction: 'column',
                        disabled: !['absolute', 'fixed', 'sticky'].includes(getStyle('position')), // Disable if position is not absolute, fixed, or sticky
                        component: () => renderValue(currentSide?.toLowerCase() as CSSProperties || 'top'),
                    },

                    // Padding dynamic based on current side selected.
                    {
                        label: 'Padding',
                        column: '2',
                        direction: 'column',
                        component: () => renderValue(`padding-${currentSide || 'top'}`),
                    },

                    // Margin dynamic based on current side selected.
                    {
                        label: 'Margin',
                        column: '3',
                        direction: 'column',
                        component: () => renderValue(`margin-${currentSide || 'top'}`),
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
