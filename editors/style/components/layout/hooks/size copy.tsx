// Components
import ExpandReveal from '@/components/Reveal/Expand/component';
import Group from '@/editors/style/components/group/component';

// Types
import { LayoutProps } from '@/editors/style/components/layout/types';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';

/**
 * Custom hook for managing the "Size & Overflow" section layout in the style editor.
 *
 * @returns {LayoutProps} Configuration for size and overflow properties in the style editor.
*/
export const useSizeLayout = (): LayoutProps => {
    const { VariantInput, RadioSelect, DropdownSelect, LengthInput } = useStyleFactory();
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
                        component: () => LengthInput('width'),
                    },

                    // Min-Width
                    {
                        label: 'Min',
                        column: 'auto',
                        direction: 'column',
                        component: () => LengthInput('minWidth'),
                    },

                    // Max-Width
                    {
                        label: 'Max',
                        column: 'auto',
                        direction: 'column',
                        component: () => LengthInput('maxWidth'),
                    },

                    // Height
                    {
                        label: 'Height',
                        column: 'auto',
                        direction: 'column',
                        component: () => LengthInput('height'),
                    },

                    // Min-Height
                    {
                        label: 'Min',
                        column: 'auto',
                        direction: 'column',
                        component: () => LengthInput('minHeight'),
                    },

                    // Max-Height
                    {
                        label: 'Max',
                        column: 'auto',
                        direction: 'column',
                        component: () => LengthInput('maxHeight'),
                    },

                    // Overflow
                    {
                        label: 'Overflow',
                        column: '1/-1',
                        direction: 'column',
                        component: () => RadioSelect('overflow'),
                    },

                    // expandReveal: Expands to reveal additional properties such as object-fit, box-sizing, and aspect-ratio.
                    {
                        label: null, // No label
                        column: '1/-1',
                        component: () => (
                            <ExpandReveal>
                                <Group
                                    properties={[
                                        // Object-Fit (e.g., cover, contain).
                                        {
                                            label: 'Object-Fit',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => DropdownSelect('objectFit'),
                                        },

                                        // Box-Sizing(e.g., border-box, content-box).
                                        {
                                            label: 'Box-Sizing',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => RadioSelect('boxSizing'),
                                        },

                                        // Aspect-Ratio(width / height).
                                        {
                                            label: 'Aspect-Ratio',
                                            column: '1/-1',
                                            direction: 'column',
                                            component: () => (VariantInput('aspectRatio', '/')),
                                        },
                                    ]}
                                />
                            </ExpandReveal>
                        ),
                    },
                ],
            },
        ],
    };
};