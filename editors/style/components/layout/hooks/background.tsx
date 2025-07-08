
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

    const icon = <svg aria-label='Background & Mask Icon' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill='black' d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z" /></svg>;

    return {
        label: icon,
        title: 'Background&Mask',
        groups: [
            {
                styles: { gridTemplateColumns: '1fr', position: 'sticky', top: '0', zIndex: 1, boxShadow: 'inset 0 0 20px 20px #ffffff' },
                properties: [
                    {
                        styles: { position: 'sticky', top: '0', zIndex: 1 },
                        label: null,
                        component: () => renderBackgroundView(),
                    },
                ]
            },
            {
                styles: { gridTemplateColumns: '1fr' },
                properties: [
                    // Background-Image
                    {
                        label: 'Image',
                        property: 'background-image',
                        component: () => renderValue('background-image'),
                    },

                    // Background-Color
                    {
                        label: 'Color',
                        property: 'background-color',
                        component: () => renderValue('background-color'),
                    },

                    // Background-Blend-Mode
                    {
                        label: 'Blend',
                        property: 'background-blend-mode',
                        component: () => renderValue('background-blend-mode'),
                    },

                    // Background-Repeat
                    {
                        label: 'Repeat',
                        property: 'background-repeat',
                        component: () => renderValue('background-repeat'),
                    },

                    // Background-Attachment
                    {
                        label: 'Attachment',
                        property: 'background-attachment',
                        component: () => renderValue('background-attachment'),
                    },

                    // Background-Clip
                    {
                        label: 'Clip',
                        property: 'background-clip',
                        component: () => renderValue('background-clip'),
                    },

                    // Background-Origin
                    {
                        label: 'Origin',
                        property: 'background-origin',
                        component: () => renderValue('background-origin'),
                    },

                    // Background-Size
                    {
                        label: 'Size',
                        property: 'background-size',
                        component: () => renderValue('background-size'),
                    },

                    // Background-Position
                    {
                        label: 'Position',
                        property: 'background-position',
                        component: () => renderValue('background-position'),
                    },

                ]
            },

            {

                styles: { gridTemplateColumns: '1fr' },
                expandTitle: 'Mask',
                properties: [
                    // Mask-Image
                    {
                        label: 'Image',
                        property: 'mask-image',
                        component: () => renderValue('mask-image'),
                    },

                    // Mask-Type
                    {
                        label: 'Type',
                        property: 'mask-type',
                        component: () => renderValue('mask-type'),
                    },

                    // Mask-Mode
                    {
                        label: 'Mode',
                        property: 'mask-mode',
                        component: () => renderValue('mask-mode'),
                    },

                    // Mask-Repeat
                    {
                        label: 'Repeat',
                        property: 'mask-repeat',
                        component: () => renderValue('mask-repeat'),
                    },

                    // Mask-Composite
                    {
                        label: 'Composite',
                        property: 'mask-composite',
                        component: () => renderValue('mask-composite'),
                    },

                    // Mask-Clip
                    {
                        label: 'Clip',
                        property: 'mask-clip',
                        component: () => renderValue('mask-clip'),
                    },

                    // Mask-Origin
                    {
                        label: 'Origin',
                        property: 'mask-origin',
                        component: () => renderValue('mask-origin'),
                    },

                    // Mask-Size
                    {
                        label: 'Size',
                        property: 'mask-size',
                        component: () => renderValue('mask-size'),
                    },

                    // Mask-Position
                    {
                        label: 'Position',
                        property: 'mask-position',
                        component: () => renderValue('mask-position'),
                    },

                ]
            },

        ],
    };
};