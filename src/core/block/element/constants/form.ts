import type { ElementRecord } from '@/src/core/block/element/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, FLOW_NO_FORM, FLOW_WITH_LEGEND, PHRASING_CONTENT, OPTION_ONLY } from './shared';

const FORM_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const FORM_TEXT_ATTRIBUTES = [...FORM_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const FORM_ELEMENTS: Partial<ElementRecord> = {
	form: {
		attributes: [...FORM_ATTRIBUTES, 'action','method','autocomplete','name','target'],
		allowedContent: FLOW_NO_FORM,
		description: 'Form container for collecting user input and submitting data.',
	},
	fieldset: {
		attributes: [...FORM_ATTRIBUTES, 'disabled','form','name'],
		allowedContent: FLOW_WITH_LEGEND,
		description: 'Groups related form controls. Typically starts with a legend.',
	},
	legend: {
		attributes: FORM_TEXT_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Caption describing a fieldset purpose.',
	},
	option: {
		attributes: [...FORM_TEXT_ATTRIBUTES, 'value','label','selected','disabled'],
		allowedContent: PHRASING_CONTENT,
		description: 'Selectable option within a select or datalist.',
	},
	optgroup: {
		attributes: [...FORM_ATTRIBUTES, 'label','disabled'],
		allowedContent: OPTION_ONLY,
		description: 'Groups related options inside a select.',
	},
	datalist: {
		attributes: FORM_ATTRIBUTES,
		allowedContent: OPTION_ONLY,
		description: 'Provides suggested options for an associated input.',
	},
	output: {
		attributes: [...FORM_TEXT_ATTRIBUTES, 'for','form','name'],
		allowedContent: PHRASING_CONTENT,
		description: 'Displays the result of a calculation.',
	},
	progress: {
		attributes: [...FORM_TEXT_ATTRIBUTES, 'value','max'],
		allowedContent: PHRASING_CONTENT,
		description: 'Progress bar indicating completion percentage for a task.',
	},
	meter: {
		attributes: [...FORM_TEXT_ATTRIBUTES, 'value','min','max','low','high','optimum'],
		allowedContent: PHRASING_CONTENT,
		description: 'Displays a scalar measurement within a known range (e.g., disk usage).',
	},
};
