// Types
import type { ElementDefinition } from '@/core/block/element/types';
import type { AttributeKey } from '@/core/block/attribute/types';

// Shared
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

export const INTERACTIVE_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'a',
		allowedAttributes: LINK_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: ['a', 'button'],
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Hyperlink anchor for navigation or actions. Should not wrap interactive controls.',
	},
	{
		key: 'button',
		allowedAttributes: BUTTON_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: ['a', 'button'],
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Button control for actions and form submission. Cannot be nested within interactive controls.',
	},
	{
		key: 'input',
		allowedAttributes: INPUT_ATTRIBUTES,
		allowedChildren: VOID_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Form input control (void element). Type attribute defines behavior.',
	},
	{
		key: 'select',
		allowedAttributes: SELECT_ATTRIBUTES,
		allowedChildren: SELECT_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Selection dropdown containing option and optgroup elements.',
	},
	{
		key: 'textarea',
		allowedAttributes: TEXTAREA_ATTRIBUTES,
		allowedChildren: VOID_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Multi-line text input containing raw text only.',
	},
	{
		key: 'label',
		allowedAttributes: LABEL_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Caption for a form control. Associates to a control by for attribute or nesting.',
	},
	{
		key: 'details',
		allowedAttributes: DETAILS_ATTRIBUTES,
		allowedChildren: FLOW_WITH_SUMMARY,
		forbiddenAncestors: null,
		uniqueChildren: { summary: 1 },
		orderedChildren: [['summary']],
		description: 'Disclosure widget for expandable content. Must include a summary element.',
	},
	{
		key: 'summary',
		allowedAttributes: TEXT_INTERACTIVE_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Caption for the details control.',
	},
	{
		key: 'dialog',
		allowedAttributes: DIALOG_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: ['dialog'],
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Dialog box or modal window for interactive content.',
	},
];
