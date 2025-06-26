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
                        direction: 'column',
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
                        row: '1',
                        column: '1/-1',
                        component: () => renderFlexView(),
                    },

                    // Flex Direction (row, column, etc.)
                    {
                        label: 'Direction',
                        direction: 'column',
                        column: '2/-1',
                        property: 'flex-direction',
                        component: () => renderValue('flex-direction'),
                    },

                    // Align Items (flex-start, center, etc.)
                    {
                        label: 'Align Items',
                        direction: 'column',
                        column: '2/-1',
                        property: 'align-items',
                        component: () => renderValue('align-items'),
                    },

                    // Align Content (flex-start, center, etc.)
                    {
                        hidden: getStyle('flex-wrap') === 'nowrap' || getStyle('flex-wrap') === '', // Hide if flex-direction is column
                        label: 'Align Content',
                        direction: 'column',
                        column: '2/-1',
                        property: 'align-content',
                        component: () => renderValue('align-content'),
                    },

                    // Flex Wrap (wrap, no-wrap, etc.)
                    {
                        label: 'Wrap',
                        row: '2',
                        column: '1',
                        direction: 'column',
                        property: 'flex-wrap',
                        component: () => renderValue('flex-wrap'),
                    },



                    // Justify Content (flex-start, center, etc.)
                    {
                        label: 'Justify Content',
                        direction: 'column',
                        row: '4',
                        column: '2/-1',
                        property: 'justify-content',
                        component: () => renderValue('justify-content'),
                    },

                    // Row Gap for flex container
                    {
                        label: 'Row Gap',
                        column: '1',
                        row: '3',
                        direction: 'column',
                        property: 'row-gap',
                        component: () => renderValue('row-gap')
                    },

                    // Column Gap for flex container
                    {
                        label: 'Column Gap',
                        column: '1',
                        row: '4',
                        direction: 'column',
                        property: 'column-gap',
                        component: () => renderValue('column-gap')
                    },
                ],
            },

            // Grid section
            {
                hidden: getStyle('display') !== 'grid', // Hide if the selected display type is 'grid'
                columns: 'repeat(4,minmax(0, 1fr))',
                properties: [
                    // Grid View (for visualizing grid properties)
                    {
                        label: null,
                        row: '1',
                        column: '1/-1',
                        component: () => renderGridView(),
                    },

                    // Justify Content (grid-specific)
                    {
                        label: 'Justify Content',
                        column: '2/-1',
                        direction: 'column',
                        property: 'justify-content',
                        component: () => renderValue('justify-content'),
                    },

                    // Align Content (grid-specific)
                    {
                        label: 'Align Content',
                        column: '2/-1',
                        direction: 'column',
                        property: 'align-content',
                        component: () => renderValue('align-content'),
                    },

                    // Justify Items (grid-specific)
                    {
                        label: 'Justify Items',
                        column: '2/-1',
                        direction: 'column',
                        property: 'justify-items',
                        component: () => renderValue('justify-items'),
                    },

                    // Align Items (grid-specific)
                    {
                        label: 'Align Items',
                        column: '2/-1',
                        direction: 'column',
                        property: 'align-items',
                        component: () => renderValue('align-items'),
                    },



                    // Auto Flow (grid-specific)
                    {
                        label: 'Auto Flow',
                        row: '2',
                        column: '1',
                        direction: 'column',
                        property: 'grid-auto-flow',
                        component: () => renderValue('grid-auto-flow'),
                    },

                    // Auto Columns (grid-specific)
                    {
                        label: 'Auto Columns',
                        column: '3/-1',
                        row: '6',
                        direction: 'column',
                        property: 'grid-auto-columns',
                        component: () => renderValue('grid-auto-columns'),
                    },

                    // Auto Rows (grid-specific)
                    {
                        label: 'Auto Rows',
                        column: '1/3',
                        row: '6',
                        direction: 'column',
                        property: 'grid-auto-rows',
                        component: () => renderValue('grid-auto-rows'),
                    },



                    // Template Rows (grid-specific)
                    {
                        label: 'Template Rows',
                        column: '1/3',
                        row: '7',
                        direction: 'column',
                        property: 'grid-template-rows',
                        component: () => renderValue('grid-template-rows'),
                    },

                    // Template Columns (grid-specific)
                    {
                        label: 'Template Columns',
                        column: '3/-1',
                        row: '7',
                        direction: 'column',
                        property: 'grid-template-columns',
                        component: () => renderValue('grid-template-columns'),
                    },

                    // Row Gap for grid container
                    {
                        label: 'Row Gap',
                        row: '3',
                        column: '1',
                        direction: 'column',
                        property: 'row-gap',
                        component: () => renderValue('row-gap')
                    },

                    // Column Gap for grid container
                    {
                        label: 'Column Gap',
                        row: '4',
                        column: '1',
                        direction: 'column',
                        property: 'column-gap',
                        component: () => renderValue('column-gap')
                    },
                ],
            },

            {
                isExpandable: true,
                properties: [

                    // Direction
                    {
                        label: 'Direction',
                        direction: 'column',
                        column: 'auto',
                        property: 'direction',
                        component: () => renderValue('direction')
                    },

                    // Box-Sizing(e.g., border-box, content-box).
                    {
                        label: 'Box-Sizing',
                        column: 'auto',
                        direction: 'column',
                        property: 'box-sizing',
                        component: () => renderValue('box-sizing'),
                    },
                ]
            },
        ],
    };
};
