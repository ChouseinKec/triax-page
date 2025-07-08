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

    const icon = <svg aria-label='Effects Icon' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill="black" d="M48,64a8,8,0,0,1,8-8H72V40a8,8,0,0,1,16,0V56h16a8,8,0,0,1,0,16H88V88a8,8,0,0,1-16,0V72H56A8,8,0,0,1,48,64ZM184,192h-8v-8a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16Zm56-48H224V128a8,8,0,0,0-16,0v16H192a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V160h16a8,8,0,0,0,0-16ZM219.31,80,80,219.31a16,16,0,0,1-22.62,0L36.68,198.63a16,16,0,0,1,0-22.63L176,36.69a16,16,0,0,1,22.63,0l20.68,20.68A16,16,0,0,1,219.31,80Zm-54.63,32L144,91.31l-96,96L68.68,208ZM208,68.69,187.31,48l-32,32L176,100.69Z" /></svg>;


    return {
        title: 'Effects',
        label: icon,
        groups: [
            {
                properties: [

                    // Filter
                    {
                        label: 'Filter',
                        column: 'auto',
                        property: 'filter',
                        component: () => renderValue('filter'),
                    },

                    // Backdrop-Filter
                    {
                        label: 'Backdrop',
                        column: 'auto',
                        property: 'backdrop-filter',
                        component: () => renderValue('backdrop-filter'),
                    },

                    // Transform
                    {
                        label: 'Transform',
                        column: 'auto',
                        property: 'transform',
                        component: () => renderValue('transform'),
                    },

                    // Box-Shadow
                    {
                        label: 'Box-Shadow',
                        column: 'auto',
                        property: 'box-shadow',
                        component: () => renderValue('box-shadow'),
                    },

                    // Opacity
                    {
                        label: 'Opacity',
                        column: 'auto',
                        property: 'opacity',
                        component: () => renderValue('opacity'),
                    },
                ],
            },

        ],
    };
};