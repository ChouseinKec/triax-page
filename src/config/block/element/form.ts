// Types
import type { ElementDefinition } from '@/core/block/element/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, FLOW_NO_FORM, FLOW_WITH_LEGEND, PHRASING_CONTENT, OPTION_ONLY } from './shared';

const FORM_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const FORM_TEXT_ATTRIBUTES = [...FORM_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const FORM_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'form',
		allowedAttributes: [...FORM_ATTRIBUTES, 'action', 'method', 'autocomplete', 'name', 'target'],
		allowedChildren: FLOW_NO_FORM,
		forbiddenAncestors: ['form'],
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Form container for collecting user input and submitting data.',
	},
	{
		key: 'fieldset',
		allowedAttributes: [...FORM_ATTRIBUTES, 'disabled', 'form', 'name'],
		allowedChildren: FLOW_WITH_LEGEND,
		forbiddenAncestors: null,
		uniqueChildren: { legend: 1 },
		orderedChildren: [['legend']],
		description: 'Groups related form controls. Typically starts with a legend.',
	},
	{
		key: 'legend',
		allowedAttributes: FORM_TEXT_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Caption describing a fieldset purpose.',
	},
	{
		key: 'option',
		allowedAttributes: [...FORM_TEXT_ATTRIBUTES, 'value', 'label', 'selected', 'disabled'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Selectable option within a select or datalist.',
	},
	{
		key: 'optgroup',
		allowedAttributes: [...FORM_ATTRIBUTES, 'label', 'disabled'],
		allowedChildren: OPTION_ONLY,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Groups related options inside a select.',
	},
	{
		key: 'datalist',
		allowedAttributes: FORM_ATTRIBUTES,
		allowedChildren: OPTION_ONLY,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Provides suggested options for an associated input.',
	},
	{
		key: 'output',
		allowedAttributes: [...FORM_TEXT_ATTRIBUTES, 'for', 'form', 'name'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Displays the result of a calculation.',
	},
	{
		key: 'progress',
		allowedAttributes: [...FORM_TEXT_ATTRIBUTES, 'value', 'max'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Progress bar indicating completion percenkeye for a task.',
	},
	{
		key: 'meter',
		allowedAttributes: [...FORM_TEXT_ATTRIBUTES, 'value', 'min', 'max', 'low', 'high', 'optimum'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Displays a scalar measurement within a known range (e.g., disk usage).',
	},
];
