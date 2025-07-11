// React hook for managing local state
import { useState } from "react";

// Types
import type { LayoutProps } from '@/editors/style/components/layout/types';
import type { Side, Corner } from '@/components/select/position/types';
import type { StylePropertyKeys } from '@/types/style/property';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';
import { useStyleManager } from '@/hooks/style/manager';

// Utilities
import { generatePropertyName } from '@/utilities/style/property';



/**
 * Custom hook for managing the "Position & Spacing" section layout in the style editor.
 *
 * @returns {LayoutProps} Configuration for the position and spacing properties in the style editor.
 */
export const usePositionLayout = (): LayoutProps => {
    const { renderValue, renderPositionSelect, renderPositionView } = useStyleFactory();
    const { getStyle } = useStyleManager();

    const [currentSide, setCurrentSide] = useState<Side>('top');
    const [, setCurrentCorner] = useState<Corner>('top-left');
    const icon = <svg aria-label='Position & Spacing Icon' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"><path fill="black" d="M216,48V96a8,8,0,0,1-16,0V67.31l-42.34,42.35a8,8,0,0,1-11.32-11.32L188.69,56H160a8,8,0,0,1,0-16h48A8,8,0,0,1,216,48ZM98.34,146.34,56,188.69V160a8,8,0,0,0-16,0v48a8,8,0,0,0,8,8H96a8,8,0,0,0,0-16H67.31l42.35-42.34a8,8,0,0,0-11.32-11.32ZM208,152a8,8,0,0,0-8,8v28.69l-42.34-42.35a8,8,0,0,0-11.32,11.32L188.69,200H160a8,8,0,0,0,0,16h48a8,8,0,0,0,8-8V160A8,8,0,0,0,208,152ZM67.31,56H96a8,8,0,0,0,0-16H48a8,8,0,0,0-8,8V96a8,8,0,0,0,16,0V67.31l42.34,42.35a8,8,0,0,0,11.32-11.32Z" /></svg>;

    return {
        label: icon,
        title: 'Position&Spacing',
        groups: [
            {
                styles: { gridTemplateColumns: '0.5fr 1fr', position: 'sticky', top: '0', zIndex: 1, boxShadow: 'inset 0 0 20px 20px #ffffff' },
                properties: [
                    // Position Select (side and corner)
                    {
                        label: null,
                        component: () => renderPositionSelect(setCurrentSide, setCurrentCorner, false, true),
                    },

                    // Position View
                    {
                        label: null,
                        component: () => renderPositionView(),
                    },
                ]
            },
            {
                styles: { gridTemplateColumns: '1fr' },
                properties: [
                    // Position
                    {
                        label: 'Position',
                        property: 'position',
                        component: () => renderValue('position'),
                    },

                    // Top-Right-Bottom-Left
                    {
                        label: currentSide || '...',
                        disabled: !['absolute', 'fixed', 'sticky'].includes(getStyle('position')) || !currentSide,
                        property: currentSide ? currentSide.toLowerCase() as StylePropertyKeys : 'top',
                        component: () => renderValue(currentSide?.toLowerCase() as StylePropertyKeys || 'top'),
                    },

                    // Padding dynamic based on current side selected.
                    {
                        label: currentSide ? `Padding-${currentSide}` : 'Padding',
                        property: generatePropertyName('padding', currentSide),
                        component: () => renderValue(generatePropertyName('padding', currentSide)),
                    },

                    // Margin dynamic based on current side selected.
                    {
                        label: currentSide ? `Margin-${currentSide}` : 'Margin',
                        property: generatePropertyName('margin', currentSide),
                        component: () => renderValue(generatePropertyName('margin', currentSide)),
                    },


                    // Z-Index
                    {
                        label: 'Z-Index',
                        property: 'z-index',
                        component: () => renderValue('z-index'),
                    },


                ],
            },

        ],
    };
};
