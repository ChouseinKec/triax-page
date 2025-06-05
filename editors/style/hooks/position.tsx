// React hook for managing local state
import { useState } from 'react';

// Types
import { STYLE_PROPERTIES } from '@/editors/style/constants/styles'; 
import { STYLE_LAYOUT } from '@/editors/style/components/layout/types';
import { POSITION_SELECT_SIDE, POSITION_SELECT_CORNER } from '@/components/Select/Position/types'; 

// Hooks
import { useStyleFactory } from '@/hooks/style/factory'; 
import { useStyleManager } from '@/hooks/style/manager'; 

/**
 * Custom hook for managing the "Position & Spacing" section layout in the style editor.
 *
 * @returns {STYLE_LAYOUT} Configuration for the position and spacing properties in the style editor.
 */
export const usePositionLayout = (): STYLE_LAYOUT => {
    const { InputGroup, RadioSelect, DropdownSelect, LengthInput, renderPositionSelect } = useStyleFactory();
    const { getStyle } = useStyleManager();
    const [currentSide, setCurrentSide] = useState<POSITION_SELECT_SIDE>('Top');
    const [, setCurrentCorner] = useState<POSITION_SELECT_CORNER>('TopLeft');

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
                        component: () => DropdownSelect('position'), 
                    },

                    // Top-Right-Bottom-Left
                    {
                        label: currentSide, // Label dynamic based on selected side (e.g., 'Top')
                        column: '3', 
                        direction: 'column', 
                        disabled: !['absolute', 'fixed', 'sticky'].includes(getStyle('position')), // Disable if position is not absolute, fixed, or sticky
                        component: () => LengthInput(currentSide?.toLowerCase() as STYLE_PROPERTIES || 'top'), 
                    },

                    // Padding dynamic based on current side selected.
                    {
                        label: 'Padding', 
                        column: '2', 
                        direction: 'column', 
                        component: () => LengthInput(`padding${currentSide || 'Top'}`), 
                    },

                    // Margin dynamic based on current side selected.
                    {
                        label: 'Margin', 
                        column: '3', 
                        direction: 'column', 
                        component: () => LengthInput(`margin${currentSide || 'Top'}`), 
                    },
                ],
            },

            {
                columns: '1fr', 
                rows: 'auto auto', 
                properties: [
                    // Float (left/right).
                    {
                        label: 'Float', 
                        column: '1/-1', 
                        component: () => RadioSelect('float'), 
                    },

                    // Clear
                    {
                        label: 'Clear', 
                        column: '1/-1', 
                        component: () => RadioSelect('clear'),
                    },

                    // Transform (e.g., translate, rotate).
                    {
                        label: 'Transform', 
                        column: '1/-1', 
                        labelAlign: 'flex-start', 
                        component: () => InputGroup('transform', ' '), 
                    },
                ],
            },
        ],
    };
};
