import { useState } from 'react';

// Types
import { STYLE_LAYOUT } from '@/editors/style/layout/types';
import { POSITION_SELECT_SIDE, POSITION_SELECT_CORNER } from '@/components/Select/Position/types';

// Hooks
import { useStyleRender } from '@/editors/style/hooks/render';

/**
 * Custom hook to render the layout for the border and shadow styles.
 * This hook generates the structure and behavior of the "Border & Shadow" section in the style editor.
 * 
 * @returns {STYLE_LAYOUT} The layout configuration for border and shadow settings.
 */
export const useBorderLayout = (): STYLE_LAYOUT => {
    const { renderPositionSelect, renderColorSelect, renderInputGroup, renderRadioSelect, renderDropdownSelect, renderUnitInput } = useStyleRender();
    const [currentSide, setCurrentSide] = useState<POSITION_SELECT_SIDE>('Top');
    const [currentCorner, setCurrentCorner] = useState<POSITION_SELECT_CORNER>(null);

    return {
        label: 'Border & Shadow',
        groups: [
            {
                columns: '0.2fr 1fr 1fr',
                rows: 'auto',
                properties: [

                    // Position selector for the border side (Top, Bottom, Left, Right)
                    {
                        label: null,
                        column: '1',
                        row: '1/3',
                        component: () => renderPositionSelect(setCurrentSide, setCurrentCorner, true),
                    },

                    // Border Width
                    {
                        label: 'Width',
                        column: '2',
                        direction: 'column',
                        disabled: currentSide === null, // Disabled if no side is selected
                        component: () => renderUnitInput(`border${currentSide || 'Top'}Width`), // Dynamic length input based on selected side
                    },

                    // Border Radius
                    {
                        label: 'Radius',
                        column: '3',
                        direction: 'column',
                        disabled: currentCorner === null, // Disabled if no corner is selected
                        component: () => renderUnitInput(`border${currentCorner || 'TopLeft'}Radius`), // Dynamic length input based on selected corner
                    },

                    // Border Style (solid, dashed, etc.)
                    {
                        label: 'Style',
                        column: '2',
                        direction: 'column',
                        disabled: currentSide === null, // Disabled if no side is selected
                        component: () => renderRadioSelect(`border${currentSide || 'Top'}Style`), // Dynamic radio selector based on selected side
                    },

                    // Border Color picker
                    {
                        label: 'Color',
                        column: '3',
                        direction: 'column',
                        disabled: currentSide === null, // Disabled if no side is selected
                        component: () => renderColorSelect(`border${currentSide || 'Top'}Color`), // Dynamic color selector based on selected side
                    },

                    // Outline Style
                    {
                        label: 'Outline Style',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderDropdownSelect('outlineStyle'),
                    },

                    // Outline Width
                    {
                        label: 'Outline Width',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderUnitInput('outlineWidth'),
                    },

                    // Outline Color picker
                    {
                        label: 'Outline Color',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderColorSelect('outlineColor'),
                    },



                    
                ],
            },
        ],
    };
};
