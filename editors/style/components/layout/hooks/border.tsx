import { useState } from 'react';

// Components
import HorizontalDivider from '@/components/divider/horizontal/component';

// Types
import type { LayoutProps } from '@/editors/style/components/layout/types';
import type { Side, Corner } from '@/components/select/position/types';
import type { CSSProperties } from '@/types/style/property';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';



function generatePropertyName(property: string, suffix: string, position: Side | Corner): CSSProperties {
    if (!position) return `${property}-${suffix}` as CSSProperties;
    return `${property}-${position}-${suffix}` as CSSProperties;
}



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


    const borderWidth = generatePropertyName('border', 'width', currentSide);
    const borderStyle = generatePropertyName('border', 'style', currentSide);
    const borderColor = generatePropertyName('border', 'color', currentSide);
    const borderRadius = generatePropertyName('border', 'radius', currentCorner);

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
                columns: 'repeat(3,minmax(0,1fr))',
                properties: [

                    // Border Width
                    {
                        label: 'Width',
                        column: 'auto',
                        direction: 'column',
                        property: borderWidth,
                        disabled: currentSide === null && currentCorner !== null,
                        component: () => renderValue(borderWidth),
                    },

                    // Border Style
                    {
                        label: 'Style',
                        column: 'auto',
                        direction: 'column',
                        property: borderStyle,
                        disabled: currentSide === null && currentCorner !== null,
                        component: () => renderValue(borderStyle),
                    },

                    // Border Color
                    {
                        label: 'Color',
                        column: 'auto',
                        direction: 'column',
                        property: borderColor,
                        disabled: currentSide === null && currentCorner !== null,
                        component: () => renderValue(borderColor),
                    },

                    // Border Radius
                    {
                        label: 'Radius',
                        direction: 'column',
                        property: borderRadius,
                        column: 'auto',
                        disabled: currentCorner === null && currentSide !== null,
                        component: () => renderValue(borderRadius),
                    },


                    // Border Image Source
                    {
                        label: 'Image Source',
                        direction: 'column',
                        property: 'border-image-source',
                        column: 'auto',
                        component: () => renderValue('border-image-source'),
                    },


                    // Border Image Slice
                    {
                        label: 'Image Slice',
                        direction: 'column',
                        property: 'border-image-slice',
                        column: 'auto',
                        component: () => renderValue('border-image-slice'),
                    },

                    // Border Image Width
                    {
                        label: 'Image Width',
                        direction: 'column',
                        property: 'border-image-width',
                        column: 'auto',
                        component: () => renderValue('border-image-width'),
                    },

                    // Border Image Outset
                    {
                        label: 'Image Outset',
                        direction: 'column',
                        property: 'border-image-outset',
                        column: 'auto',
                        component: () => renderValue('border-image-outset'),
                    },

                    // Border Image Repeat
                    {
                        label: 'Image Repeat',
                        direction: 'column',
                        property: 'border-image-repeat',
                        column: 'auto',
                        component: () => renderValue('border-image-repeat'),
                    },

                ],
            },

            {
                columns: 'repeat(4,minmax(0,1fr))',
                properties: [


                    // Horizontal Divider
                    {
                        label: null,
                        direction: 'column',
                        column: '1/-1',
                        component: () => <HorizontalDivider  title='Outline' />,
                    },

                    // Outline Width
                    {
                        label: 'Width',
                        direction: 'column',
                        property: 'outline-width',
                        column: 'auto',
                        component: () => renderValue('outline-width'),
                    },
                    // Outline Style
                    {
                        label: 'Style',
                        direction: 'column',
                        property: 'outline-style',
                        column: 'auto',
                        component: () => renderValue('outline-style'),
                    },
                    // Outline Color
                    {
                        label: 'Color',
                        direction: 'column',
                        property: 'outline-color',
                        column: 'auto',
                        component: () => renderValue('outline-color'),
                    },
                    // Outline Offset
                    {
                        label: 'Offset',
                        direction: 'column',
                        property: 'outline-offset',
                        column: 'auto',
                        component: () => renderValue('outline-offset'),
                    },

                ],
            },

        ],
    };
};