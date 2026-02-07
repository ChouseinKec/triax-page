// Types
import type { ElementDefinition, ElementKey } from '@/core/block/element/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, FLOW_CONTENT, PHRASING_CONTENT } from './shared';

const FORM_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const FORM_TEXT_ATTRIBUTES = [...FORM_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

const OPTION_ONLY: ElementKey[] = ['option'];

export const FORM_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'form',
		allowedAttributes: [...FORM_ATTRIBUTES, 'action', 'method', 'autocomplete', 'name', 'target'],
		allowedChildren: FLOW_CONTENT.filter((t) => t !== 'form'),
		forbiddenAncestors: ['form'],
		structure: null,
		description: 'Form container for collecting user input and submitting data.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'fieldset',
		allowedAttributes: [...FORM_ATTRIBUTES, 'disabled', 'form', 'name'],
		allowedChildren: [...FLOW_CONTENT, 'legend'],
		forbiddenAncestors: null,
		structure: [{ key: 'legend', order: 0, min: 0, max: 1 }],
		description: 'Groups related form controls. Typically starts with a legend.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'legend',
		allowedAttributes: FORM_TEXT_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Caption describing a fieldset purpose.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'option',
		allowedAttributes: [...FORM_TEXT_ATTRIBUTES, 'value', 'label', 'selected', 'disabled'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Selectable option within a select or datalist.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'optgroup',
		allowedAttributes: [...FORM_ATTRIBUTES, 'label', 'disabled'],
		allowedChildren: OPTION_ONLY,
		forbiddenAncestors: null,
		structure: null,
		description: 'Groups related options inside a select.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'datalist',
		allowedAttributes: FORM_ATTRIBUTES,
		allowedChildren: OPTION_ONLY,
		forbiddenAncestors: null,
		structure: null,
		description: 'Provides suggested options for an associated input.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'output',
		allowedAttributes: [...FORM_TEXT_ATTRIBUTES, 'for', 'form', 'name'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Displays the result of a calculation.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'progress',
		allowedAttributes: [...FORM_TEXT_ATTRIBUTES, 'value', 'max'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Progress bar indicating completion percenkeye for a task.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'meter',
		allowedAttributes: [...FORM_TEXT_ATTRIBUTES, 'value', 'min', 'max', 'low', 'high', 'optimum'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Displays a scalar measurement within a known range (e.g., disk usage).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
];
