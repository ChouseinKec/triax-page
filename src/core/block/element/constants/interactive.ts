import type { ElementRecord } from '@/src/core/block/element/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, PHRASING_CONTENT, FLOW_CONTENT, FLOW_WITH_SUMMARY, SELECT_CONTENT, VOID_CONTENT } from './shared';

const INTERACTIVE_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const TEXT_INTERACTIVE_ATTRIBUTES: AttributeKey[] = [...INTERACTIVE_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

const LINK_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'href', 'target', 'rel', 'download', 'referrerpolicy', 'type'];

const BUTTON_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'type', 'disabled', 'name', 'value', 'form', 'formaction', 'formmethod'];

const INPUT_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'type', 'name', 'value', 'placeholder', 'disabled', 'readonly', 'required', 'min', 'max', 'step', 'pattern', 'accept', 'checked', 'maxlength', 'minlength', 'autocomplete', 'autofocus', 'list', 'multiple', 'size', 'form'];

const SELECT_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'name', 'required', 'multiple', 'disabled', 'size', 'form', 'autocomplete', 'autofocus'];

const TEXTAREA_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'name', 'placeholder', 'required', 'disabled', 'readonly', 'maxlength', 'minlength', 'rows', 'cols', 'wrap', 'form', 'autocomplete', 'autofocus'];

const LABEL_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'for', 'form'];

const DETAILS_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'open'];

const DIALOG_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'open'];

export const INTERACTIVE_ELEMENTS: Partial<ElementRecord> = {
	a: {
		allowedAttributes: LINK_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: ['a', 'button'],
		uniqueElements: null,
		orderedElements: null,
		description: 'Hyperlink anchor for navigation or actions. Should not wrap interactive controls.',
	},
	button: {
		allowedAttributes: BUTTON_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: ['a', 'button'],
		uniqueElements: null,
		orderedElements: null,
		description: 'Button control for actions and form submission. Cannot be nested within interactive controls.',
	},
	input: {
		allowedAttributes: INPUT_ATTRIBUTES,
		allowedChildren: VOID_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Form input control (void element). Type attribute defines behavior.',
	},
	select: {
		allowedAttributes: SELECT_ATTRIBUTES,
		allowedChildren: SELECT_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Selection dropdown containing option and optgroup elements.',
	},
	textarea: {
		allowedAttributes: TEXTAREA_ATTRIBUTES,
		allowedChildren: VOID_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Multi-line text input containing raw text only.',
	},
	label: {
		allowedAttributes: LABEL_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Caption for a form control. Associates to a control by for attribute or nesting.',
	},
	details: {
		allowedAttributes: DETAILS_ATTRIBUTES,
		allowedChildren: FLOW_WITH_SUMMARY,
		forbiddenAncestors: null,
		uniqueElements: { summary: 1 },
		orderedElements: [['summary']],
		description: 'Disclosure widget for expandable content. Must include a summary element.',
	},
	summary: {
		allowedAttributes: TEXT_INTERACTIVE_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Caption for the details control.',
	},
	dialog: {
		allowedAttributes: DIALOG_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Dialog box or modal window for interactive content.',
	},
};
