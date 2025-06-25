import { useState } from 'react';

// Types
import { LayoutProps } from '@/editors/style/components/layout/types';
import { Side, Corner } from '@/components/select/position/types';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';

/**
 * Custom hook to render the layout for the border and shadow styles.
 * This hook generates the structure and behavior of the "Border & Shadow" section in the style editor.
 * 
 * @returns {LayoutProps} The layout configuration for border and shadow settings.
 */
export const useEffectLayout = (): LayoutProps => {
    const { renderPositionSelect, ColorSelect, InputGroup, RadioSelect, DropdownSelect, LengthInput } = useStyleFactory();
    const [currentSide, setCurrentSide] = useState<Side>('Top');
    const [currentCorner, setCurrentCorner] = useState<Corner>(null);

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
