// Components
import Expand from '@/components/Reveal/Expand/component';
import Dropdown from '@/components/Reveal/Dropdown/component';
import Group from '@/editors/style/layout/components/group/component';

// Types
import { STYLE_LAYOUT } from '@/editors/style/layout/types';

// Hooks
import { useStyleRender } from '@/editors/style/hooks/render';


export const useFontLayout = (): STYLE_LAYOUT => {

    const { renderColorSelect, renderNumberInput, renderInputGroup, renderRadioSelect, renderDropdownSelect, renderLengthInput } = useStyleRender();

    return {
        label: 'Font & Text',
        groups: [
            {
                properties: [
                    // Family
                    {
                        label: 'Family',
                        column: 'auto',
                        component: () => renderDropdownSelect('fontFamily'),
                    },

                    // Weight
                    {
                        label: 'Weight',
                        column: 'auto',
                        component: () => renderDropdownSelect('fontWeight'),
                    },

                    // Size
                    {
                        label: 'Size',
                        column: 'auto',
                        component: () => renderLengthInput('fontSize')
                    },

                    // Height
                    {
                        label: 'Height',
                        column: 'auto',
                        component: () => renderLengthInput('lineHeight')
                    },

                    // Color
                    {
                        label: 'Color',
                        column: '1/-1',
                        component: () => renderColorSelect('color'),
                    },

                    // Shadow
                    {
                        label: 'Shadow',
                        column: '1/-1',
                        labelAlign: 'flex-start',
                        component: () => renderInputGroup('textShadow', ',')
                    },

                    // Align
                    {
                        label: 'Align',
                        column: '1/-1',
                        component: () => renderRadioSelect('textAlign')
                    },

                    // Style
                    {
                        label: 'Style',
                        column: 'auto',
                        component: () => renderRadioSelect('fontStyle')
                    },

                    // Direction
                    {
                        label: 'Direction',
                        column: 'auto',
                        component: () => renderRadioSelect('direction')
                    },

                    // Transform
                    {
                        label: 'Transform',
                        column: '1/-1',
                        component: () => renderRadioSelect('textTransform')
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
                        component: () => renderRadioSelect('textDecorationLine')
                    },

                    // Decoration Color
                    {
                        label: ' ',
                        column: '1',
                        row: '2',
                        component: () => renderColorSelect('textDecorationColor'),
                    },

                    // Decoration Style
                    {
                        label: null,
                        column: '2',
                        row: '2',
                        component: () => renderDropdownSelect('textDecorationStyle'),
                    },

                    // Decoration Thickness
                    {
                        label: null,
                        column: '3',
                        row: '2',
                        component: () => renderLengthInput('textDecorationThickness')
                    },
                ],
            },

            // Expand
            {
                properties: [
                    // Expand
                    {
                        label: null,
                        column: '1/-1',
                        component: () => (
                            <Expand>
                                <Group
                                    columns="minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)"
                                    properties={[
                                        // Letter Spacing
                                        {
                                            label: 'Letter Spacing',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => renderLengthInput('letterSpacing')
                                        },

                                        // Text Indent
                                        {
                                            label: 'Text Indent',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => renderLengthInput('textIndent')
                                        },

                                        // Word-Break
                                        {
                                            label: 'Word-Break',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => renderDropdownSelect('wordBreak'),
                                        },

                                        // Line-Break
                                        {
                                            label: 'Line-Break',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => renderDropdownSelect('lineBreak'),
                                        },

                                        // White-Space
                                        {
                                            label: 'White-Space',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => renderDropdownSelect('whiteSpace'),
                                        },

                                        // Overflow
                                        {
                                            label: 'Text-Overflow',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => renderDropdownSelect('textOverflow'),
                                        },

                                        // Writing Mode
                                        {
                                            label: 'Writing Mode',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => renderDropdownSelect('writingMode'),
                                        },

                                        // Text Orientation
                                        {
                                            label: 'Text Orientation',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => renderDropdownSelect('textOrientation'),
                                        },

                                        // Stroke Width
                                        {
                                            label: 'Stroke Width',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => renderLengthInput('strokeWidth'),
                                        },

                                        // Stroke Color
                                        {
                                            label: 'Stroke Color',
                                            column: 'auto',
                                            direction: 'column',
                                            component: () => renderColorSelect('strokeColor'),
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
                                                                component: () => renderNumberInput('columnCount'),
                                                            },

                                                            // Column Width
                                                            {
                                                                label: 'Width',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => renderLengthInput('columnWidth'),
                                                            },

                                                            // Column Gap
                                                            {
                                                                label: 'Gap',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => renderLengthInput('columnGap'),
                                                            },

                                                            // Column Rule Width
                                                            {
                                                                label: 'Rule Width',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => renderLengthInput('columnRuleWidth'),
                                                            },

                                                            // Widows
                                                            {
                                                                label: 'Widows',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => renderLengthInput('widows'),
                                                            },

                                                            // Orphans
                                                            {
                                                                label: 'Orphans',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => renderLengthInput('orphans'),
                                                            },

                                                            // Column Rule Style
                                                            {
                                                                label: 'Rule Style',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => renderDropdownSelect('columnRuleStyle'),
                                                            },

                                                            // Column Rule Color
                                                            {
                                                                label: 'Rule Color',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => renderColorSelect('columnRuleColor'),
                                                            },

                                                            // Break Before
                                                            {
                                                                label: 'Break Before',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => renderDropdownSelect('breakBefore'),
                                                            },

                                                            // Break Inside
                                                            {
                                                                label: 'Break Inside',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => renderDropdownSelect('breakInside'),
                                                            },

                                                            // Break After
                                                            {
                                                                label: 'Break After',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => renderDropdownSelect('breakAfter'),
                                                            },

                                                            // Column Span
                                                            {
                                                                label: 'Column Span',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => renderDropdownSelect('columnSpan'),
                                                            },

                                                            // Column Fill
                                                            {
                                                                label: 'Column Fill',
                                                                column: 'auto',
                                                                direction: 'column',
                                                                component: () => renderDropdownSelect('columnFill'),
                                                            },

                                                        ]}
                                                    />
                                                </Dropdown>
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