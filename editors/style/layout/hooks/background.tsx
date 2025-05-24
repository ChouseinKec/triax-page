import { useState } from 'react';

// Components
import Group from '@/editors/style/layout/components/group/component';
import HorizontalDivider from '@/components/Divider/Horizontal/component';

// Types
import { STYLE_LAYOUT } from '@/editors/style/layout/types';
import { POSITION_SELECT_SIDE, POSITION_SELECT_CORNER } from '@/components/Select/Position/types';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';

/**
 * Custom hook to render the layout for the border and shadow styles.
 * This hook generates the structure and behavior of the "Border & Shadow" section in the style editor.
 * 
 * @returns {STYLE_LAYOUT} The layout configuration for border and shadow settings.
 */
export const useBackgroundLayout = (): STYLE_LAYOUT => {
    const { renderVariantInput, renderURLInput, renderPositionSelect, renderColorSelect, renderRadioSelect, renderDropdownSelect, renderLengthInput } = useStyleFactory();
    const [currentSide, setCurrentSide] = useState<POSITION_SELECT_SIDE>('Top');
    const [currentCorner, setCurrentCorner] = useState<POSITION_SELECT_CORNER>(null);

    return {
        label: 'Background & Border',
        groups: [
            {
                columns: '0.2fr 1fr 1fr',
                rows: 'auto',
                properties: [

                    // Position selector for the border side (Top, Bottom, Left, Right)
                    {
                        label: null,
                        column: '1',
                        row: '1/3',
                        component: () => renderPositionSelect(setCurrentSide, setCurrentCorner, true),
                    },

                    // Border Width
                    {
                        label: 'Width',
                        column: '2',
                        direction: 'column',
                        disabled: currentSide === null, // Disabled if no side is selected
                        component: () => renderLengthInput(`border${currentSide || 'Top'}Width`), // Dynamic length input based on selected side
                    },

                    // Border Radius
                    {
                        label: 'Radius',
                        column: '3',
                        direction: 'column',
                        disabled: currentCorner === null, // Disabled if no corner is selected
                        component: () => renderLengthInput(`border${currentCorner || 'TopLeft'}Radius`), // Dynamic length input based on selected corner
                    },

                    // Border Style (solid, dashed, etc.)
                    {
                        label: 'Style',
                        column: '2',
                        direction: 'column',
                        disabled: currentSide === null, // Disabled if no side is selected
                        component: () => renderRadioSelect(`border${currentSide || 'Top'}Style`), // Dynamic radio selector based on selected side
                    },

                    // Border Color picker
                    {
                        label: 'Color',
                        column: '3',
                        direction: 'column',
                        disabled: currentSide === null, // Disabled if no side is selected
                        component: () => renderColorSelect(`border${currentSide || 'Top'}Color`), // Dynamic color selector based on selected side
                    },

                    // Outline Style
                    {
                        label: 'Outline Style',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderDropdownSelect('outlineStyle'),
                    },

                    // Outline Width
                    {
                        label: 'Outline Width',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderLengthInput('outlineWidth'),
                    },

                    // Outline Color picker
                    {
                        label: 'Outline Color',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderColorSelect('outlineColor'),
                    },

                    {
                        label: '',
                        column: '1/-1',
                        direction: 'column',
                        component: () => <HorizontalDivider type={'bracket'} />,
                    },


                    // Background-Image
                    {
                        label: 'Image',
                        column: '1/3',
                        direction: 'column',
                        component: () => renderURLInput('backgroundImage', 'url("', '")'),

                    },

                    // Background-Color
                    {
                        label: 'Color',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderColorSelect('backgroundColor'),
                    },

                    {
                        label: '',
                        column: '1/-1',
                        direction: 'column',
                        component: () =>
                            <Group
                                columns="minmax(0,1fr) minmax(0,1fr)"
                                properties={[
                                    // Background-Size
                                    {
                                        label: 'Size',
                                        column: 'auto',
                                        direction: 'column',
                                        component: () => renderVariantInput('backgroundSize', ' '),

                                    },

                                    // Background-Position
                                    {
                                        label: 'Position',
                                        column: 'auto',
                                        direction: 'column',
                                        component: () => renderVariantInput('backgroundPosition', ' '),
                                    },

                                ]}
                            />,
                    },


                    // Background-Repeat
                    {
                        label: 'Repeat',
                        column: '1/-1',
                        direction: 'column',
                        component: () => renderVariantInput('backgroundRepeat', ' '),
                    },

                    // Background-Attachment
                    {
                        label: 'Attachment',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderDropdownSelect('backgroundAttachment'),
                    },

                    // Background-Clip
                    {
                        label: 'Clip',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderDropdownSelect('backgroundClip'),
                    },

                    // Background-Origin
                    {
                        label: 'Origin',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderDropdownSelect('backgroundOrigin'),
                    },

                ],
            },
        ],
    };
};