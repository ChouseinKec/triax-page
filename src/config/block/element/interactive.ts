// Types
import type { ElementDefinition } from '@/core/block/element/types';
import type { AttributeKey } from '@/core/block/attribute/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, PHRASING_CONTENT, FLOW_CONTENT, FLOW_WITH_SUMMARY, SELECT_CONTENT} from './shared';

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
		structure: null,
		description: 'Hyperlink anchor for navigation or actions. Should not wrap interactive controls.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'button',
		allowedAttributes: BUTTON_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: ['a', 'button'],
		structure: null,
		description: 'Button control for actions and form submission. Cannot be nested within interactive controls.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'input',
		allowedAttributes: INPUT_ATTRIBUTES,
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Form input control (void element). Type attribute defines behavior.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'select',
		allowedAttributes: SELECT_ATTRIBUTES,
		allowedChildren: SELECT_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Selection dropdown containing option and optgroup elements.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'textarea',
		allowedAttributes: TEXTAREA_ATTRIBUTES,
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Multi-line text input containing raw text only.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'label',
		allowedAttributes: LABEL_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Caption for a form control. Associates to a control by for attribute or nesting.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'details',
		allowedAttributes: DETAILS_ATTRIBUTES,
		allowedChildren: FLOW_WITH_SUMMARY,
		forbiddenAncestors: null,
		structure: [{ key: 'summary', order: 0, min: 0, max: 1 }],
		description: 'Disclosure widget for expandable content. Must include a summary element.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'summary',
		allowedAttributes: TEXT_INTERACTIVE_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Caption for the details control.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'dialog',
		allowedAttributes: DIALOG_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: ['dialog'],
		structure: null,
		description: 'Dialog box or modal window for interactive content.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
];
