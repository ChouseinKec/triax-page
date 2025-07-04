
// Components
import HorizontalDivider from '@/components/divider/horizontal/component';

// Types
import type { LayoutProps } from '@/editors/style/components/layout/types';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';


/**
 * Custom hook to render the layout for the background styles.
 * This hook generates the structure and behavior of the "Background" section in the style editor.
 * 
 * @returns {LayoutProps} The layout configuration for background settings.
 */
export const useBackgroundLayout = (): LayoutProps => {
    const { renderValue, renderBackgroundView } = useStyleFactory();

    return {
        label: 'Background & Mask',
        groups: [
            {
                properties: [
                    // Position selector for the border side (Top, Bottom, Left, Right)
                    {
                        label: null,
                        column: '1/-1',
                        row: '1',
                        component: () => renderBackgroundView(),
                    },

                ],
            },

            {
                columns: 'repeat(1,minmax(0,1fr))',
                properties: [
                    // Background-Image
                    {
                        label: 'Image',
                        column: 'auto',
                        property: 'background-image',
                        component: () => renderValue('background-image'),
                    },

                    // Background-Color
                    {
                        label: 'Color',
                        column: 'auto',
                        property: 'background-color',
                        component: () => renderValue('background-color'),
                    },

                    // Background-Blend-Mode
                    {
                        label: 'Blend',
                        column: 'auto',
                        property: 'background-blend-mode',
                        component: () => renderValue('background-blend-mode'),
                    },

                    // Background-Repeat
                    {
                        label: 'Repeat',
                        column: 'auto',
                        property: 'background-repeat',
                        component: () => renderValue('background-repeat'),
                    },

                    // Background-Attachment
                    {
                        label: 'Attachment',
                        column: 'auto',
                        property: 'background-attachment',
                        component: () => renderValue('background-attachment'),
                    },

                    // Background-Clip
                    {
                        label: 'Clip',
                        column: 'auto',
                        property: 'background-clip',
                        component: () => renderValue('background-clip'),
                    },

                    // Background-Origin
                    {
                        label: 'Origin',
                        column: 'auto',
                        property: 'background-origin',
                        component: () => renderValue('background-origin'),
                    },

                    // Background-Size
                    {
                        label: 'Size',
                        column: 'auto',
                        property: 'background-size',
                        component: () => renderValue('background-size'),
                    },

                    // Background-Position
                    {
                        label: 'Position',
                        column: 'auto',
                        property: 'background-position',
                        component: () => renderValue('background-position'),
                    },

                ]
            },


            {

                columns: 'repeat(1,minmax(0,1fr))',
                expandTitle: 'Mask',
                properties: [

                    // Mask-Image
                    {
                        label: 'Image',
                        column: 'auto',
                        property: 'mask-image',
                        component: () => renderValue('mask-image'),
                    },


                    // Mask-Type
                    {
                        label: 'Type',
                        column: 'auto',
                        property: 'mask-type',
                        component: () => renderValue('mask-type'),
                    },


                    // Mask-Mode
                    {
                        label: 'Mode',
                        column: 'auto',
                        property: 'mask-mode',
                        component: () => renderValue('mask-mode'),
                    },

                    // Mask-Repeat
                    {
                        label: 'Repeat',
                        column: 'auto',
                        property: 'mask-repeat',
                        component: () => renderValue('mask-repeat'),
                    },

                    // Mask-Composite
                    {
                        label: 'Composite',
                        column: 'auto',
                       
                        property: 'mask-composite',
                        component: () => renderValue('mask-composite'),
                    },


                    // Mask-Clip
                    {
                        label: 'Clip',
                        column: 'auto',
                        property: 'mask-clip',
                        component: () => renderValue('mask-clip'),
                    },

                    // Mask-Origin
                    {
                        label: 'Origin',
                        column: 'auto',
                        property: 'mask-origin',
                        component: () => renderValue('mask-origin'),
                    },

                    // Mask-Size
                    {
                        label: 'Size',
                        column: 'auto',
                        property: 'mask-size',
                        component: () => renderValue('mask-size'),
                    },

                    // Mask-Position
                    {
                        label: 'Position',
                        column: 'auto',
                        property: 'mask-position',
                        component: () => renderValue('mask-position'),
                    },

                ]
            },

        ],
    };
};