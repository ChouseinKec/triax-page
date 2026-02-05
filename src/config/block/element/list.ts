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
		structure: [{ key: 'li', order: null, min: 1, max: null }],
		description: 'Unordered (bulleted) list. Contains list items (li).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'ol',
		allowedAttributes: OL_ATTRIBUTES,
		allowedChildren: LIST_ITEM_ONLY,
		forbiddenAncestors: null,
		structure: [{ key: 'li', order: null, min: 1, max: null }],
		description: 'Ordered (numbered) list. Contains list items (li).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'menu',
		allowedAttributes: LIST_ATTRIBUTES,
		allowedChildren: LIST_ITEM_ONLY,
		forbiddenAncestors: null,
		structure: [{ key: 'li', order: null, min: 1, max: null }],
		description: 'Menu element. Contains list items (li) for creating menus or toolbars.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'li',
		allowedAttributes: LI_ATTRIBUTES,
		allowedChildren: FLOW_NO_LI,
		forbiddenAncestors: null,
		structure: null,
		description: 'List item. May contain flow content such as paragraphs, nested lists, or other blocks.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'dl',
		allowedAttributes: LIST_ATTRIBUTES,
		allowedChildren: DESCRIPTION_LIST_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Description list (also called definition list). Contains terms (dt) and descriptions (dd).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'dt',
		allowedAttributes: LIST_TEXT_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Description term (the item being described).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'dd',
		allowedAttributes: LIST_TEXT_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Description details for a term.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
];
