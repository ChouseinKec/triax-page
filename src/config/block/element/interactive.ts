// Types
import type { ElementDefinition, ElementKey } from '@/core/block/element/types';
import type { AttributeKey } from '@/core/block/attribute/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, PHRASING_CONTENT, FLOW_CONTENT } from './shared';

const INTERACTIVE_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];

export const INTERACTIVE_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'a',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'href', 'target', 'rel', 'download', 'referrerpolicy', 'type'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: ['a', 'button'],
		structure: null,
		description: 'Hyperlink anchor for navigation or actions. Should not wrap interactive controls.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'button',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'type', 'disabled', 'name', 'value', 'form', 'formaction', 'formmethod'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: ['a', 'button'],
		structure: null,
		description: 'Button control for actions and form submission. Cannot be nested within interactive controls.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'input',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'type', 'name', 'value', 'placeholder', 'disabled', 'readonly', 'required', 'min', 'max', 'step', 'pattern', 'accept', 'checked', 'maxlength', 'minlength', 'autocomplete', 'autofocus', 'list', 'multiple', 'size', 'form'],
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Form input control (void element). Type attribute defines behavior.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'select',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'name', 'required', 'multiple', 'disabled', 'size', 'form', 'autocomplete', 'autofocus'],
		allowedChildren: ['option', 'optgroup'],
		forbiddenAncestors: null,
		structure: null,
		description: 'Selection dropdown containing option and optgroup elements.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'textarea',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'name', 'placeholder', 'required', 'disabled', 'readonly', 'maxlength', 'minlength', 'rows', 'cols', 'wrap', 'form', 'autocomplete', 'autofocus'],
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Multi-line text input containing raw text only.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'label',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'for', 'form'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Caption for a form control. Associates to a control by for attribute or nesting.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'details',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'open'],
		allowedChildren: [...FLOW_CONTENT, 'summary'],
		forbiddenAncestors: null,
		structure: [{ key: 'summary', order: 0, min: 0, max: 1 }],
		description: 'Disclosure widget for expandable content. Must include a summary element.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'summary',
		allowedAttributes: [...INTERACTIVE_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Caption for the details control.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'dialog',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'open'],
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: ['dialog'],
		structure: null,
		description: 'Dialog box or modal window for interactive content.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
];
