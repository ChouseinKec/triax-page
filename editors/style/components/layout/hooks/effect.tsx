// Types
import type { LayoutProps } from '@/editors/style/components/layout/types';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';


/**
 * Custom hook to render the layout for the border and shadow styles.
 * This hook generates the structure and behavior of the "Border & Shadow" section in the style editor.
 * 
 * @returns {LayoutProps} The layout configuration for border and shadow settings.
 */
export const useEffectLayout = (): LayoutProps => {
    const { renderValue } = useStyleFactory();


    return {
        label: 'Effects',
        groups: [
            {
                columns: 'repeat(3,minmax(0,1fr))',
                properties: [

                    // Filter
                    {
                        label: 'Filter',
                        direction: 'column',
                        column: 'auto',
                        property: 'filter',
                        component: () => renderValue('filter'),
                    },

                    // Backdrop-Filter
                    {
                        label: 'Backdrop',
                        direction: 'column',
                        column: 'auto',
                        property: 'backdrop-filter',
                        component: () => renderValue('backdrop-filter'),
                    },

                    // Transform
                    {
                        label: 'Transform',
                        direction: 'column',
                        column: 'auto',
                        property: 'transform',
                        component: () => renderValue('transform'),
                    },

                    // Box-Shadow
                    {
                        label: 'Box-Shadow',
                        direction: 'column',
                        column: 'auto',
                        property: 'box-shadow',
                        component: () => renderValue('box-shadow'),
                    },
                ],
            },

        ],
    };
};