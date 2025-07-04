import { useState } from 'react';

// Components
import HorizontalDivider from '@/components/divider/horizontal/component';

// Types
import type { LayoutProps } from '@/editors/style/components/layout/types';
import type { Side, Corner } from '@/components/select/position/types';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';

// Utilities
import { generatePropertyName } from '@/utilities/style/property';


/**
 * Custom hook to render the layout for the border and shadow styles.
 * This hook generates the structure and behavior of the "Border & Shadow" section in the style editor.
 * 
 * @returns {LayoutProps} The layout configuration for border and shadow settings.
 */
export const useBorderLayout = (): LayoutProps => {
    const { renderValue, renderPositionSelect, renderBorderView } = useStyleFactory();

    const [currentSide, setCurrentSide] = useState<Side>('top');
    const [currentCorner, setCurrentCorner] = useState<Corner>(null);


    const borderWidth = generatePropertyName('border', currentSide, 'width');
    const borderStyle = generatePropertyName('border', currentSide, 'style');
    const borderColor = generatePropertyName('border', currentSide, 'color');
    const borderRadius = generatePropertyName('border', currentCorner, 'radius');

    return {
        label: 'Border',
        groups: [
            {
                columns: '0.2fr 1fr 1fr',
                properties: [

                    // Position selector for the border side (Top, Bottom, Left, Right)
                    {
                        label: null,
                        column: '1',
                        row: '1',
                        component: () => renderPositionSelect(setCurrentSide, setCurrentCorner, true, true),
                    },

                    // Position selector for the border side (Top, Bottom, Left, Right)
                    {
                        label: null,
                        column: '2/-1',
                        row: '1',
                        component: () => renderBorderView(),
                    },

                ],
            },

            {
                columns: 'repeat(1,minmax(0,1fr))',
                properties: [

                    // Border Width
                    {
                        label: 'Width',
                        column: 'auto',
                        
                        property: borderWidth,
                        disabled: currentSide === null && currentCorner !== null,
                        component: () => renderValue(borderWidth),
                    },

                    // Border Style
                    {
                        label: 'Style',
                        column: 'auto',
                        
                        property: borderStyle,
                        disabled: currentSide === null && currentCorner !== null,
                        component: () => renderValue(borderStyle),
                    },

                    // Border Color
                    {
                        label: 'Color',
                        column: 'auto',
                        
                        property: borderColor,
                        disabled: currentSide === null && currentCorner !== null,
                        component: () => renderValue(borderColor),
                    },

                    // Border Radius
                    {
                        label: 'Radius',
                        
                        property: borderRadius,
                        column: 'auto',
                        disabled: currentCorner === null && currentSide !== null,
                        component: () => renderValue(borderRadius),
                    },


                    // Border Image Source
                    {
                        label: 'Image Source',
                        
                        property: 'border-image-source',
                        column: 'auto',
                        component: () => renderValue('border-image-source'),
                    },


                    // Border Image Slice
                    {
                        label: 'Image Slice',
                        
                        property: 'border-image-slice',
                        column: 'auto',
                        component: () => renderValue('border-image-slice'),
                    },

                    // Border Image Width
                    {
                        label: 'Image Width',
                        
                        property: 'border-image-width',
                        column: 'auto',
                        component: () => renderValue('border-image-width'),
                    },

                    // Border Image Outset
                    {
                        label: 'Image Outset',
                        
                        property: 'border-image-outset',
                        column: 'auto',
                        component: () => renderValue('border-image-outset'),
                    },

                    // Border Image Repeat
                    {
                        label: 'Image Repeat',
                        
                        property: 'border-image-repeat',
                        column: 'auto',
                        component: () => renderValue('border-image-repeat'),
                    },

                ],
            },

            {
                columns: 'repeat(1,minmax(0,1fr))',
                expandTitle: 'Outline',
                properties: [

                    // Outline Width
                    {
                        label: 'Width',
                        property: 'outline-width',
                        column: 'auto',
                        component: () => renderValue('outline-width'),
                    },
                    // Outline Style
                    {
                        label: 'Style',
                        property: 'outline-style',
                        column: 'auto',
                        component: () => renderValue('outline-style'),
                    },
                    // Outline Color
                    {
                        label: 'Color',
                        property: 'outline-color',
                        column: 'auto',
                        component: () => renderValue('outline-color'),
                    },
                    // Outline Offset
                    {
                        label: 'Offset',
                        property: 'outline-offset',
                        column: 'auto',
                        component: () => renderValue('outline-offset'),
                    },

                ],
            },

        ],
    };
};