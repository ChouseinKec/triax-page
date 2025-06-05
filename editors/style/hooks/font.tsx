// Components
import ExpandReveal from '@/components/Reveal/Expand/component';
import Dropdown from '@/components/Reveal/Dropdown/component';
import Group from '@/editors/style/components/group/component';

// Types
import { STYLE_LAYOUT } from '@/editors/style/components/layout/types';

// Hooks
import { useStyleFactory } from '@/hooks/style/factory';


export const useFontLayout = (): STYLE_LAYOUT => {

    const { ColorSelect, NumberInput, InputGroup, RadioSelect, DropdownSelect, LengthInput } = useStyleFactory();

    return {
        label: 'Font & Text',
        groups: [
            {
                properties: [
                    // Family
                    {
                        label: 'Family',
                        column: 'auto',
                        component: () => DropdownSelect('fontFamily'),
                    },

                    // Weight
                    {
                        label: 'Weight',
                        column: 'auto',
                        component: () => DropdownSelect('fontWeight'),
                    },

                    // Size
                    {
                        label: 'Size',
                        column: 'auto',
                        component: () => LengthInput('fontSize')
                    },

                    // Height
                    {
                        label: 'Height',
                        column: 'auto',
                        component: () => LengthInput('lineHeight')
                    },

                    // Color
                    {
                        label: 'Color',
                        column: '1/-1',
                        component: () => ColorSelect('color'),
                    },

                    // Shadow
                    {
                        label: 'Shadow',
                        column: '1/-1',
                        labelAlign: 'flex-start',
                        component: () => InputGroup('textShadow', ',')
                    },

                    // Align
                    {
                        label: 'Align',
                        column: '1/-1',
                        component: () => RadioSelect('textAlign')
                    },

                    // Style
                    {
                        label: 'Style',
                        column: 'auto',
                        component: () => RadioSelect('fontStyle')
                    },

                    // Direction
                    {
                        label: 'Direction',
                        column: 'auto',
                        component: () => RadioSelect('direction')
                    },

                    // Transform
                    {
                        label: 'Transform',
                        column: '1/-1',
                        component: () => RadioSelect('textTransform')
                    },
                ],
            },

            // Decoration
            {
                columns: '1fr 1fr 1fr',
                properties: [
                    // Decoration Line
                    {
                        label: 'Decoration',
                        column: '1/-1',
                        row: '1',
                        component: () => RadioSelect('textDecorationLine')
                    },

                    // Decoration Color
                    {
                        label: ' ',
                        column: '1',
                        row: '2',
                        component: () => ColorSelect('textDecorationColor'),
                    },

                    // Decoration Style
                    {
                        label: null,
                        column: '2',
                        row: '2',
                        component: () => DropdownSelect('textDecorationStyle'),
                    },

                    // Decoration Thickness
                    {
                        label: null,
                        column: '3',
                        row: '2',
                        component: () => LengthInput('textDecorationThickness')
                    },
                ],
            },

            // ExpandReveal
            {
                properties: [
                    // ExpandReveal
                    {
                        label: null,
                        column: '1/-1',
                        component: () => (
                            <ExpandReveal>
                                <Group
                                    columns="minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)"
                                    properties={[
                                        // Letter Spacing
                                        {
                                            label: 'Letter Spacing',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => LengthInput('letterSpacing')
                                        },

                                        // Text Indent
                                        {
                                            label: 'Text Indent',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => LengthInput('textIndent')
                                        },

                                        // Word-Break
                                        {
                                            label: 'Word-Break',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => DropdownSelect('wordBreak'),
                                        },

                                        // Line-Break
                                        {
                                            label: 'Line-Break',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => DropdownSelect('lineBreak'),
                                        },

                                        // White-Space
                                        {
                                            label: 'White-Space',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => DropdownSelect('whiteSpace'),
                                        },

                                        // Overflow
                                        {
                                            label: 'Text-Overflow',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => DropdownSelect('textOverflow'),
                                        },

                                        // Writing Mode
                                        {
                                            label: 'Writing Mode',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => DropdownSelect('writingMode'),
                                        },

                                        // Text Orientation
                                        {
                                            label: 'Text Orientation',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => DropdownSelect('textOrientation'),
                                        },

                                        // Stroke Width
                                        {
                                            label: 'Stroke Width',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => LengthInput('strokeWidth'),
                                        },

                                        // Stroke Color
                                        {
                                            label: 'Stroke Color',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => ColorSelect('strokeColor'),
                                        },

                                        // Columns
                                        {
                                            label: 'Columns',
                                            column: '2/-1',
                                            direction: 'column',
                                            component: () => (
                                                <Dropdown closeOnChange={false}>
                                                    <Group
                                                        columns='minmax(0, 0.7fr) minmax(0, 0.7fr) minmax(0, 0.7fr)'
                                                        properties={[
                                                            // Column Count
                                                            {
                                                                label: 'Count',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => NumberInput('columnCount'),
                                                            },

                                                            // Column Width
                                                            {
                                                                label: 'Width',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => LengthInput('columnWidth'),
                                                            },

                                                            // Column Gap
                                                            {
                                                                label: 'Gap',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => LengthInput('columnGap'),
                                                            },

                                                            // Column Rule Width
                                                            {
                                                                label: 'Rule Width',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => LengthInput('columnRuleWidth'),
                                                            },

                                                            // Widows
                                                            {
                                                                label: 'Widows',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => LengthInput('widows'),
                                                            },

                                                            // Orphans
                                                            {
                                                                label: 'Orphans',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => LengthInput('orphans'),
                                                            },

                                                            // Column Rule Style
                                                            {
                                                                label: 'Rule Style',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => DropdownSelect('columnRuleStyle'),
                                                            },

                                                            // Column Rule Color
                                                            {
                                                                label: 'Rule Color',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => ColorSelect('columnRuleColor'),
                                                            },

                                                            // Break Before
                                                            {
                                                                label: 'Break Before',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => DropdownSelect('breakBefore'),
                                                            },

                                                            // Break Inside
                                                            {
                                                                label: 'Break Inside',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => DropdownSelect('breakInside'),
                                                            },

                                                            // Break After
                                                            {
                                                                label: 'Break After',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => DropdownSelect('breakAfter'),
                                                            },

                                                            // Column Span
                                                            {
                                                                label: 'Column Span',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => DropdownSelect('columnSpan'),
                                                            },

                                                            // Column Fill
                                                            {
                                                                label: 'Column Fill',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => DropdownSelect('columnFill'),
                                                            },

                                                        ]}
                                                    />
                                                </Dropdown>
                                            ),
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