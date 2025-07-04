// Components
import HorizontalDivider from '@/components/divider/horizontal/component';

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
                        row: '1',
                        column: '1/-1',
                        component: () => renderFlexView(),
                    },

                    // Flex Direction (row, column, etc.)
                    {
                        label: 'Direction',
                        column: '1/-1',
                        property: 'flex-direction',
                        component: () => renderValue('flex-direction'),
                    },

                    // Align Items (flex-start, center, etc.)
                    {
                        label: 'Align Items',
                        column: '1/-1',
                        property: 'align-items',
                        component: () => renderValue('align-items'),
                    },

                    // Align Content (flex-start, center, etc.)
                    {
                        hidden: getStyle('flex-wrap') === 'nowrap' || getStyle('flex-wrap') === '', // Hide if flex-direction is column
                        label: 'Align Content',
                        column: '1/-1',
                        property: 'align-content',
                        component: () => renderValue('align-content'),
                    },

                    // Flex Wrap (wrap, no-wrap, etc.)
                    {
                        label: 'Wrap',
                        column: '1/-1',
                        property: 'flex-wrap',
                        component: () => renderValue('flex-wrap'),
                    },



                    // Justify Content (flex-start, center, etc.)
                    {
                        label: 'Justify Content',
                        column: '1/-1',
                        property: 'justify-content',
                        component: () => renderValue('justify-content'),
                    },

                    // Row Gap for flex container
                    {
                        label: 'Row Gap',
                        column: '1/-1',
                        property: 'row-gap',
                        component: () => renderValue('row-gap')
                    },

                    // Column Gap for flex container
                    {
                        label: 'Column Gap',
                        column: '1/-1',
                        property: 'column-gap',
                        component: () => renderValue('column-gap')
                    },

                    // Divider
                    {
                        label: null,
                        column: '1/-1',
                        component: () => <HorizontalDivider />,
                    },
                ],
            },

            // Grid section
            {
                hidden: getStyle('display') !== 'grid', // Hide if the selected display type is 'grid'
                columns: 'repeat(2,minmax(0, 1fr))',
                properties: [
                    // Grid View (for visualizing grid properties)
                    {
                        label: null,
                        row: '1',
                        column: '1/-1',
                        component: () => renderGridView(),
                    },

                    // Justify Content 
                    {
                        label: 'Justify Content',
                        column: '1/-1',
                        property: 'justify-content',
                        component: () => renderValue('justify-content'),
                    },


                    // Justify Items 
                    {
                        label: 'Justify Items',
                        column: '1/-1',
                        property: 'justify-items',
                        component: () => renderValue('justify-items'),
                    },


                    // Align Content 
                    {
                        label: 'Align Content',
                        column: '1/-1',
                        property: 'align-content',
                        component: () => renderValue('align-content'),
                    },

                    // Align Items 
                    {
                        label: 'Align Items',
                        column: '1/-1',
                        property: 'align-items',
                        component: () => renderValue('align-items'),
                    },



                    // Auto Flow 
                    {
                        label: 'Auto Flow',
                        column: '1/-1',
                        property: 'grid-auto-flow',
                        component: () => renderValue('grid-auto-flow'),
                    },



                    // Auto Rows 
                    {
                        label: 'Auto Rows',
                        column: '1/-1',
                        property: 'grid-auto-rows',
                        component: () => renderValue('grid-auto-rows'),
                    },

                    // Auto Columns 
                    {
                        label: 'Auto Columns',
                        column: '1/-1',
                        property: 'grid-auto-columns',
                        component: () => renderValue('grid-auto-columns'),
                    },

                    // Template Rows 
                    {
                        label: 'Template Rows',
                        column: '1/-1',
                        property: 'grid-template-rows',
                        component: () => renderValue('grid-template-rows'),
                    },

                    // Template Columns 
                    {
                        label: 'Template Columns',
                        column: '1/-1',
                        property: 'grid-template-columns',
                        component: () => renderValue('grid-template-columns'),
                    },

                    // Row Gap for grid container
                    {
                        label: 'Row Gap',
                        column: '1/-1',
                        property: 'row-gap',
                        component: () => renderValue('row-gap')
                    },

                    // Column Gap for grid container
                    {
                        label: 'Column Gap',
                        column: '1/-1',
                        property: 'column-gap',
                        component: () => renderValue('column-gap')
                    },

                    // Divider
                    {
                        label: null,
                        column: '1/-1',
                        component: () => <HorizontalDivider />,
                    },

                ],
            },

            {
                properties: [
                    // Direction
                    {
                        label: 'Direction',
                        column: '1/-1',
                        property: 'direction',
                        component: () => renderValue('direction')
                    },

                    // Box-Sizing
                    {
                        label: 'Box-Sizing',
                        column: '1/-1',
                        property: 'box-sizing',
                        component: () => renderValue('box-sizing'),
                    },

                    // Object-Fit 
                    {
                        label: 'Object-Fit',
                        column: '1/-1',
                        property: 'object-fit',
                        component: () => renderValue('object-fit'),
                    },

                    // Object-Position
                    {
                        label: 'Object-Position',
                        column: '1/-1',
                        property: 'object-position',
                        component: () => renderValue('object-position'),
                    },

                    // Clear
                    {
                        label: 'Clear',
                        column: '1/-1',
                        property: 'clear',
                        component: () => renderValue('clear'),
                    },

                    // Float
                    {
                        label: 'Float',
                        column: '1/-1',
                        property: 'float',
                        component: () => renderValue('float'),
                    },

                    // Visibility
                    {
                        label: 'Visibility',
                        column: '1/-1',
                        property: 'visibility',
                        component: () => renderValue('visibility'),
                    },

                ]
            },
        ],
    };
};
