// Types
import type { ElementDefinition } from '@/core/block/element/types';
import type { AttributeKey } from '@/core/block/attribute/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, LIST_ITEM_ONLY, DESCRIPTION_LIST_CONTENT, FLOW_NO_LI, PHRASING_CONTENT, FLOW_CONTENT } from './shared';

const LIST_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const LIST_TEXT_ATTRIBUTES: AttributeKey[] = [...LIST_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

const OL_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'reversed', 'start', 'type'];

const LI_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES, 'value'];

export const LIST_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'ul',
		allowedAttributes: LIST_ATTRIBUTES,
		allowedChildren: LIST_ITEM_ONLY,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Unordered (bulleted) list. Contains list items (li).',
	},
	{
		key: 'ol',
		allowedAttributes: OL_ATTRIBUTES,
		allowedChildren: LIST_ITEM_ONLY,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Ordered (numbered) list. Contains list items (li).',
	},
	{
		key: 'li',
		allowedAttributes: LI_ATTRIBUTES,
		allowedChildren: FLOW_NO_LI,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'List item. May contain flow content such as paragraphs, nested lists, or other blocks.',
	},
	{
		key: 'dl',
		allowedAttributes: LIST_ATTRIBUTES,
		allowedChildren: DESCRIPTION_LIST_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Description list (also called definition list). Contains terms (dt) and descriptions (dd).',
	},
	{
		key: 'dt',
		allowedAttributes: LIST_TEXT_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Description term (the item being described).',
	},
	{
		key: 'dd',
		allowedAttributes: LIST_TEXT_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Description details for a term.',
	},
];
