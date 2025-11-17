import type { ElementRecord } from '@/src/core/block/element/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, FLOW_NO_FORM, FLOW_WITH_LEGEND, PHRASING_CONTENT, OPTION_ONLY } from './shared';

const FORM_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const FORM_TEXT_ATTRIBUTES = [...FORM_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const FORM_ELEMENTS: Partial<ElementRecord> = {
	form: {
		allowedAttributes: [...FORM_ATTRIBUTES, 'action','method','autocomplete','name','target'],
		allowedElements: FLOW_NO_FORM,
		description: 'Form container for collecting user input and submitting data.',
	},
	fieldset: {
		allowedAttributes: [...FORM_ATTRIBUTES, 'disabled','form','name'],
		allowedElements: FLOW_WITH_LEGEND,
		description: 'Groups related form controls. Typically starts with a legend.',
	},
	legend: {
		allowedAttributes: FORM_TEXT_ATTRIBUTES,
		allowedElements: PHRASING_CONTENT,
		description: 'Caption describing a fieldset purpose.',
	},
	option: {
		allowedAttributes: [...FORM_TEXT_ATTRIBUTES, 'value','label','selected','disabled'],
		allowedElements: PHRASING_CONTENT,
		description: 'Selectable option within a select or datalist.',
	},
	optgroup: {
		allowedAttributes: [...FORM_ATTRIBUTES, 'label','disabled'],
		allowedElements: OPTION_ONLY,
		description: 'Groups related options inside a select.',
	},
	datalist: {
		allowedAttributes: FORM_ATTRIBUTES,
		allowedElements: OPTION_ONLY,
		description: 'Provides suggested options for an associated input.',
	},
	output: {
		allowedAttributes: [...FORM_TEXT_ATTRIBUTES, 'for','form','name'],
		allowedElements: PHRASING_CONTENT,
		description: 'Displays the result of a calculation.',
	},
	progress: {
		allowedAttributes: [...FORM_TEXT_ATTRIBUTES, 'value','max'],
		allowedElements: PHRASING_CONTENT,
		description: 'Progress bar indicating completion percentage for a task.',
	},
	meter: {
		allowedAttributes: [...FORM_TEXT_ATTRIBUTES, 'value','min','max','low','high','optimum'],
		allowedElements: PHRASING_CONTENT,
		description: 'Displays a scalar measurement within a known range (e.g., disk usage).',
	},
};
