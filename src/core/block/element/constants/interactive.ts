import type { ElementRecord } from '@/src/core/block/element/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, PHRASING_CONTENT, FLOW_CONTENT, FLOW_WITH_SUMMARY, SELECT_CONTENT, VOID_CONTENT } from './shared';

const INTERACTIVE_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const TEXT_INTERACTIVE_ATTRIBUTES = [...INTERACTIVE_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const INTERACTIVE_ELEMENTS: Partial<ElementRecord> = {
	a: {
		attributes: TEXT_INTERACTIVE_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Hyperlink anchor for navigation or actions. Should not wrap interactive controls.',
	},
	button: {
		attributes: TEXT_INTERACTIVE_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Button control for actions and form submission. Cannot be nested within interactive controls.',
	},
	input: {
		attributes: INTERACTIVE_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Form input control (void element). Type attribute defines behavior.',
	},
	select: {
		attributes: INTERACTIVE_ATTRIBUTES,
		allowedContent: SELECT_CONTENT,
		description: 'Selection dropdown containing option and optgroup elements.',
	},
	textarea: {
		attributes: TEXT_INTERACTIVE_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Multi-line text input containing raw text only.',
	},
	label: {
		attributes: TEXT_INTERACTIVE_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Caption for a form control. Associates to a control by for attribute or nesting.',
	},
	details: {
		attributes: INTERACTIVE_ATTRIBUTES,
		allowedContent: FLOW_WITH_SUMMARY,
		description: 'Disclosure widget for expandable content. Must include a summary element.',
	},
	summary: {
		attributes: TEXT_INTERACTIVE_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Caption for the details control.',
	},
	dialog: {
		attributes: INTERACTIVE_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Dialog box or modal window for interactive content.',
	},
};
