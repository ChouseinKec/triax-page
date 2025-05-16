import { useState } from 'react';

// Types
import { STYLE_LAYOUT } from '@/editors/style/layout/types';

// HOOKS
import { useStyleRender } from '@/editors/style/hooks/render';
import { useStyleState } from '@/editors/style/hooks/state';

/**
 * Custom hook to render the layout for the "Display & Layout" section.
 * This hook dynamically renders display properties (e.g., flex, grid) based on the selected display type.
 * 
 * @returns {STYLE_LAYOUT} The layout configuration for display and layout settings.
 */
export const useDisplayLayout = (): STYLE_LAYOUT => {
    const { renderFlexView, renderGridView, renderRadioSelect, renderDropdownSelect, renderUnitInput, renderInputGroup } = useStyleRender();
    const { getSingleStyle } = useStyleState();

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
                        component: () => renderRadioSelect('display')
                    },
                ],
            },

            // Flex 
            {
                hidden: getSingleStyle('display') === 'flex', // Hide if the selected display type is 'flex'
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
                        column: '2',
                        component: () => renderDropdownSelect('flexDirection'),
                    },

                    // Flex Wrap (wrap, no-wrap, etc.)
                    {
                        label: 'Wrap',
                        direction: 'column',
                        column: '3',
                        component: () => renderDropdownSelect('flexWrap'),
                    },

                    // Align Items (flex-start, center, etc.)
                    {
                        label: 'Align Items',
                        direction: 'column',
                        column: '2',
                        component: () => renderDropdownSelect('alignItems'),
                    },

                    // Align Content (flex-start, center, etc.)
                    {
                        label: 'Align Content',
                        direction: 'column',
                        column: '3',
                        component: () => renderDropdownSelect('alignContent'),
                    },

                    // Justify Content (flex-start, center, etc.)
                    {
                        label: 'Justify Content',
                        column: '1',
                        direction: 'column',
                        component: () => renderDropdownSelect('justifyContent'),
                    },

                    // Row Gap for flex container
                    {
                        label: 'Row Gap',
                        column: '2',
                        direction: 'column',
                        component: () => renderUnitInput('rowGap')
                    },

                    // Column Gap for flex container
                    {
                        label: 'Column Gap',
                        column: '3',
                        direction: 'column',
                        component: () => renderUnitInput('columnGap')
                    },
                ],
            },

            // Grid section
            {
                hidden: getSingleStyle('display') === 'grid', // Hide if the selected display type is 'grid'
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
                        component: () => renderDropdownSelect('justifyContent'),
                    },

                    // Justify Items (grid-specific)
                    {
                        label: 'Justify Items',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderDropdownSelect('justifyItems'),
                    },

                    // Align Items (grid-specific)
                    {
                        label: 'Align Items',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderDropdownSelect('alignItems'),
                    },

                    // Align Content (grid-specific)
                    {
                        label: 'Align Content',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderDropdownSelect('alignContent'),
                    },

                    // Auto Flow (grid-specific)
                    {
                        label: 'Auto Flow',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderDropdownSelect('gridAutoFlow'),
                    },

                    // Auto Columns (grid-specific)
                    {
                        label: 'Auto Columns',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderInputGroup('gridAutoColumns', ' '),
                    },

                    // Auto Rows (grid-specific)
                    {
                        label: 'Auto Rows',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderInputGroup('gridAutoRows', ' '),
                    },

                    // Areas dropdown (grid-specific)
                    {
                        label: 'Areas',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderDropdownSelect('gridAutoFlow'),
                    },

                    // Template Columns (grid-specific)
                    {
                        label: 'Template Columns',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderInputGroup('gridTemplateColumns', ' '),
                    },

                    // Template Rows (grid-specific)
                    {
                        label: 'Template Rows',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderInputGroup('gridTemplateRows', ' '),
                    },

                    // Row Gap for grid container
                    {
                        label: 'Row Gap',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderUnitInput('rowGap')
                    },

                    // Column Gap for grid container
                    {
                        label: 'Column Gap',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderUnitInput('columnGap')
                    },
                ],
            },
        ],
    };
};
