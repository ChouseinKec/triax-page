// Components
import NumberInput from '@/components/Input/Number/component';
import Expand from '@/components/Reveal/Expand/component';
import MultiValueInput from '@/components/Input/Multi/components';
import Group from '@/editors/style/layout/components/group/component';

// Types
import { STYLE_LAYOUT } from '@/editors/style/layout/types';

// Hooks
import { useStyleRender } from '@/editors/style/hooks/render';
import { useStyleState } from '@/editors/style/hooks/state';

/**
 * Custom hook for managing the "Size & Overflow" section layout in the style editor.
 *
 * @returns {STYLE_LAYOUT} Configuration for size and overflow properties in the style editor.
*/
export const useSizeLayout = (): STYLE_LAYOUT => {
    const { renderRadioSelect, renderDropdownSelect, renderUnitInput } = useStyleRender();
    const { getSingleStyle, setSingleStyle } = useStyleState();
    return {
        label: 'Size & Overflow',
        groups: [
            {
                columns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
                properties: [
                    // Width
                    {
                        label: 'Width',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderUnitInput('width'),
                    },

                    // Min-Width
                    {
                        label: 'Min',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderUnitInput('minWidth'),
                    },

                    // Max-Width
                    {
                        label: 'Max',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderUnitInput('maxWidth'),
                    },

                    // Height
                    {
                        label: 'Height',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderUnitInput('height'),
                    },

                    // Min-Height
                    {
                        label: 'Min',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderUnitInput('minHeight'),
                    },

                    // Max-Height
                    {
                        label: 'Max',
                        column: 'auto',
                        direction: 'column',
                        component: () => renderUnitInput('maxHeight'),
                    },

                    // Overflow
                    {
                        label: 'Overflow',
                        column: '1/-1',
                        direction: 'column',
                        component: () => renderRadioSelect('overflow'),
                    },

                    // Expand: Expands to reveal additional properties such as object-fit, box-sizing, and aspect-ratio.
                    {
                        label: null, // No label
                        column: '1/-1',
                        component: () => (
                            <Expand>
                                <Group
                                    properties={[
                                        // Object-Fit (e.g., cover, contain).
                                        {
                                            label: 'Object-Fit',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => renderDropdownSelect('objectFit'),
                                        },

                                        // Box-Sizing(e.g., border-box, content-box).
                                        {
                                            label: 'Box-Sizing',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => renderRadioSelect('boxSizing'),
                                        },

                                        // Aspect-Ratio(width / height).
                                        {
                                            label: 'Aspect-Ratio',
                                            column: '1/-1',
                                            direction: 'column',
                                            component: () => (
                                                <MultiValueInput
                                                    value={getSingleStyle('aspectRatio')}
                                                    onChange={(value) => setSingleStyle('aspectRatio', value)}
                                                    separator='/'
                                                >
                                                    <NumberInput />
                                                    <NumberInput />
                                                </MultiValueInput>
                                            ),
                                        },
                                    ]}
                                />
                            </Expand>
                        ),
                    },
                ],
            },
        ],
    };
};