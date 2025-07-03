
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
                columns: 'repeat(3,minmax(0,1fr))',
                properties: [
                    // Background-Image
                    {
                        label: 'Image',
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

                    // Background-Blend-Mode
                    {
                        label: 'Blend',
                        column: 'auto',
                        direction: 'column',
                        property: 'background-blend-mode',
                        component: () => renderValue('background-blend-mode'),
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

                    // Background-Size
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

                ]
            },


            {

                columns: 'repeat(3,minmax(0,1fr))',
                properties: [

                    {
                        label: null,
                        column: '1/-1',
                        component: () => <HorizontalDivider title='Mask' />,
                    },

                    // Mask-Image
                    {
                        label: 'Image',
                        direction: 'column',
                        property: 'mask-image',
                        component: () => renderValue('mask-image'),
                    },


                    // Mask-Type
                    {
                        label: 'Type',
                        column: 'auto',
                        direction: 'column',
                        property: 'mask-type',
                        component: () => renderValue('mask-type'),
                    },


                    // Mask-Mode
                    {
                        label: 'Mode',
                        column: 'auto',
                        direction: 'column',
                        property: 'mask-mode',
                        component: () => renderValue('mask-mode'),
                    },

                    // Mask-Repeat
                    {
                        label: 'Repeat',
                        column: 'auto',
                        direction: 'column',
                        property: 'mask-repeat',
                        component: () => renderValue('mask-repeat'),
                    },

                    // Mask-Composite
                    {
                        label: 'Composite',
                        column: 'auto',
                        direction: 'column',
                        property: 'mask-composite',
                        component: () => renderValue('mask-composite'),
                    },


                    // Mask-Clip
                    {
                        label: 'Clip',
                        column: 'auto',
                        direction: 'column',
                        property: 'mask-clip',
                        component: () => renderValue('mask-clip'),
                    },

                    // Mask-Origin
                    {
                        label: 'Origin',
                        column: 'auto',
                        direction: 'column',
                        property: 'mask-origin',
                        component: () => renderValue('mask-origin'),
                    },

                    // Mask-Size
                    {
                        label: 'Size',
                        column: 'auto',
                        direction: 'column',
                        property: 'mask-size',
                        component: () => renderValue('mask-size'),
                    },

                    // Mask-Position
                    {
                        label: 'Position',
                        column: 'auto',
                        direction: 'column',
                        property: 'mask-position',
                        component: () => renderValue('mask-position'),
                    },

                ]
            },

        ],
    };
};