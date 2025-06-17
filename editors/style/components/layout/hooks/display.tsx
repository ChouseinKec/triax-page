// Types
import type { LayoutProps } from '@/editors/style/components/layout/types';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';
import { useStyleManager } from '@/hooks/style/manager';


/**
 * Custom hook to render the layout for the "Display & Layout" section.
 * This hook dynamically renders display properties (e.g., flex, grid) based on the selected display type.
 * 
 * @returns {LayoutProps} The layout configuration for display and layout settings.
 */
export const useDisplayLayout = (): LayoutProps => {
    const { renderValue, renderFlexView, renderGridView } = useStyleFactory();
    const { getStyle } = useStyleManager();

    return {
        label: 'Display & Layout',
        groups: [
            // Display 
            {
                columns: '1fr',
                properties: [
                    // Display (e.g., block, inline, flex, grid)
                    {
                        label: null,
                        column: '1/-1',
                        component: () => renderValue('display')
                    },
                ],
            },

            // Flex 
            {
                hidden: getStyle('display') !== 'flex', // Hide if the selected display type is 'flex'
                columns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
                properties: [
                    // Flex View component (for visualizing flex properties)
                    {
                        label: null,
                        column: '1',
                        row: '1/3',
                        component: () => renderFlexView(),
                    },

                    // Flex Direction (row, column, etc.)
                    {
                        label: 'Direction',
                        direction: 'column',
                        component: () => renderValue('flex-direction'),
                    },

                    // Flex Wrap (wrap, no-wrap, etc.)
                    {
                        label: 'Wrap',
                        direction: 'column',
                        component: () => renderValue('flex-wrap'),
                    },

                    // Align Items (flex-start, center, etc.)
                    {
                        label: 'Align Items',
                        direction: 'column',
                        component: () => renderValue('align-items'),
                    },

                    // Align Content (flex-start, center, etc.)
                    {
                        label: 'Align Content',
                        direction: 'column',
                        component: () => renderValue('align-content'),
                    },

                    // Justify Content (flex-start, center, etc.)
                    {
                        label: 'Justify Content',
                        direction: 'column',
                        component: () => renderValue('justify-content'),
                    },

                    // Row Gap for flex container
                    {
                        label: 'Row Gap',
                        direction: 'column',
                        component: () => renderValue('row-gap')
                    },

                    // Column Gap for flex container
                    {
                        label: 'Column Gap',
                        direction: 'column',
                        component: () => renderValue('column-gap')
                    },
                ],
            },

            // Grid section
            {
                hidden: getStyle('display') !== 'grid', // Hide if the selected display type is 'grid'
                columns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
                properties: [
                    // Grid View (for visualizing grid properties)
                    {
                        label: null,
                        column: '1',
                        row: '1/3',
                        component: () => renderGridView(),
                    },

                    // Justify Content (grid-specific)
                    {
                        label: 'Justify Content',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('justify-content'),
                    },

                    // Justify Items (grid-specific)
                    {
                        label: 'Justify Items',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('justify-items'),
                    },

                    // Align Items (grid-specific)
                    {
                        label: 'Align Items',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('align-items'),
                    },

                    // Align Content (grid-specific)
                    {
                        label: 'Align Content',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('align-content'),
                    },

                    // Auto Flow (grid-specific)
                    {
                        label: 'Auto Flow',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('grid-auto-flow'),
                    },

                    // Auto Columns (grid-specific)
                    {
                        label: 'Auto Columns',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('grid-auto-columns'),
                    },

                    // Auto Rows (grid-specific)
                    {
                        label: 'Auto Rows',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('grid-auto-rows'),
                    },

                    // Template Columns (grid-specific)
                    {
                        label: 'Template Columns',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('grid-template-columns'),
                    },

                    // Template Rows (grid-specific)
                    {
                        label: 'Template Rows',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('grid-template-rows'),
                    },

                    // Row Gap for grid container
                    {
                        label: 'Row Gap',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('row-gap')
                    },

                    // Column Gap for grid container
                    {
                        label: 'Column Gap',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderValue('column-gap')
                    },
                ],
            },
        ],
    };
};
