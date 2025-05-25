import { useState } from 'react';

// Types
import { STYLE_LAYOUT } from '@/editors/style/layout/types';
import { POSITION_SELECT_SIDE, POSITION_SELECT_CORNER } from '@/components/Select/Position/types';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';

/**
 * Custom hook to render the layout for the border and shadow styles.
 * This hook generates the structure and behavior of the "Border & Shadow" section in the style editor.
 * 
 * @returns {STYLE_LAYOUT} The layout configuration for border and shadow settings.
 */
export const useEffectLayout = (): STYLE_LAYOUT => {
    const { renderPositionSelect, ColorSelect, InputGroup, RadioSelect, DropdownSelect, LengthInput } = useStyleFactory();
    const [currentSide, setCurrentSide] = useState<POSITION_SELECT_SIDE>('Top');
    const [currentCorner, setCurrentCorner] = useState<POSITION_SELECT_CORNER>(null);

    return {
        label: 'Shadow & Effects',
        groups: [
            {
                columns: '0.2fr 1fr 1fr',
                rows: 'auto',
                properties: [

                    // Box Shadow (e.g., x-offset, y-offset, blur, spread, color)
                    {
                        label: 'Shadow',
                        column: '1/-1',
                        direction: 'column',
                        component: () => InputGroup('boxShadow', ','),
                    },

                ],
            },
        ],
    };
};
