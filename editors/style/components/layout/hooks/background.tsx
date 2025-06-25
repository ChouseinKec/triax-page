import { useState } from 'react';

// Components
import HorizontalDivider from '@/components/divider/horizontal/component';

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
export const useBackgroundLayout = (): LayoutProps => {
    const { renderValue, renderPositionSelect, renderBackgroundView } = useStyleFactory();

    const [currentSide, setCurrentSide] = useState<Side>('top');
    const [currentCorner, setCurrentCorner] = useState<Corner>(null);

    return {
        label: 'Background & Border',
        groups: [
            {
                columns: '0.2fr 1fr 1fr',
                properties: [

                    // Position selector for the border side (Top, Bottom, Left, Right)
                    {
                        label: null,
                        column: '1',
                        row: '1',
                        component: () => renderPositionSelect(setCurrentSide, setCurrentCorner, true),
                    },

                    // Position selector for the border side (Top, Bottom, Left, Right)
                    {
                        label: null,
                        column: '2/-1',
                        row: '1',
                        component: () => renderBackgroundView(),
                    },


                    // Border Width
                    {
                        label: 'Border Width',
                        column: '1',
                        row: '2',
                        direction: 'column',
                        property: 'border-width',
                        hidden: currentSide === null, // Disabled if no side is selected
                        component: () => renderValue(`border-${currentSide || 'top'}-width`), // Dynamic length input based on selected side
                    },

                    // Border Style (solid, dashed, etc.)
                    {
                        label: 'Border Style',
                        column: '2',
                        row: '2',
                        direction: 'column',
                        property: 'border-style',
                        hidden: currentSide === null, // Disabled if no side is selected
                        component: () => renderValue(`border-${currentSide || 'top'}-style`), // Dynamic radio selector based on selected side
                    },

                    // Border Color picker
                    {
                        label: 'Border Color',
                        column: '3',
                        row: '2',
                        direction: 'column',
                        property: 'border-color',
                        hidden: currentSide === null, // Disabled if no side is selected
                        component: () => renderValue(`border-${currentSide || 'top'}-color`), // Dynamic color selector based on selected side
                    },

                    // Border Radius
                    {
                        label: 'Border Radius',
                        direction: 'column',
                        property: 'border-radius',
                        row: '2',
                        column: '1/-1',
                        hidden: currentCorner === null, // Disabled if no corner is selected
                        component: () => renderValue(`border-${currentCorner || 'top-left'}-radius`), // Dynamic length input based on selected corner
                    },

                    // Outline Width
                    {
                        label: 'Outline Width',
                        direction: 'column',
                        property: 'outline-width',
                        row: '3',
                        column: '1',
                        component: () => renderValue('outline-width'),
                    },

                    // Outline Style
                    {
                        label: 'Outline Style',
                        direction: 'column',
                        property: 'outline-style',
                        row: '3',
                        column: '2',
                        component: () => renderValue('outline-style'),
                    },

                    // Outline Color
                    {
                        label: 'Outline Color',
                        direction: 'column',
                        property: 'outline-color',
                        row: '3',
                        column: '3',
                        component: () => renderValue('outline-color'),
                    },
                ],
            },

            {
                columns: '0.2fr 1fr 1fr',
                isExpandable: true,
                properties: [
                    // Background-Image
                    {
                        label: 'Image',
                        column: '1/3',
                        direction: 'column',
                        property: 'background-image',
                        component: () => renderValue('background-image'),
                    },

                    // Background-Color
                    {
                        label: 'Color',
                        column: 'auto',
                        direction: 'column',
                        property: 'background-color',
                        component: () => renderValue('background-color'),
                    },

                    {
                        label: 'Size',
                        column: 'auto',
                        direction: 'column',
                        property: 'background-size',
                        component: () => renderValue('background-size'),
                    },

                    // Background-Position
                    {
                        label: 'Position',
                        column: 'auto',
                        direction: 'column',
                        property: 'background-position',
                        component: () => renderValue('background-position'),
                    },

                    // Background-Repeat
                    {
                        label: 'Repeat',
                        column: 'auto',
                        direction: 'column',
                        property: 'background-repeat',
                        component: () => renderValue('background-repeat'),
                    },

                    // Background-Attachment
                    {
                        label: 'Attachment',
                        column: 'auto',
                        direction: 'column',
                        property: 'background-attachment',
                        component: () => renderValue('background-attachment'),
                    },

                    // Background-Clip
                    {
                        label: 'Clip',
                        column: 'auto',
                        direction: 'column',
                        property: 'background-clip',
                        component: () => renderValue('background-clip'),
                    },

                    // Background-Origin
                    {
                        label: 'Origin',
                        column: 'auto',
                        direction: 'column',
                        property: 'background-origin',
                        component: () => renderValue('background-origin'),
                    },

                ]
            }
        ],
    };
};