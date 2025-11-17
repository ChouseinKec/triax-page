import type { ElementRecord } from '@/src/core/block/element/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, LIST_ITEM_ONLY, DESCRIPTION_LIST_CONTENT, FLOW_NO_LI, PHRASING_CONTENT, FLOW_CONTENT } from './shared';

const LIST_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const LIST_TEXT_ATTRIBUTES: AttributeKey[] = [...LIST_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

const OL_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'reversed', 'start', 'type'];

const LI_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES, 'value'];

export const LIST_ELEMENTS: Partial<ElementRecord> = {
	ul: {
		allowedAttributes: LIST_ATTRIBUTES,
		allowedContent: LIST_ITEM_ONLY,
		description: 'Unordered (bulleted) list. Contains list items (li).',
	},
	ol: {
		allowedAttributes: OL_ATTRIBUTES,
		allowedContent: LIST_ITEM_ONLY,
		description: 'Ordered (numbered) list. Contains list items (li).',
	},
	li: {
		allowedAttributes: LI_ATTRIBUTES,
		allowedContent: FLOW_NO_LI,
		description: 'List item. May contain flow content such as paragraphs, nested lists, or other blocks.',
	},
	dl: {
		allowedAttributes: LIST_ATTRIBUTES,
		allowedContent: DESCRIPTION_LIST_CONTENT,
		description: 'Description list (also called definition list). Contains terms (dt) and descriptions (dd).',
	},
	dt: {
		allowedAttributes: LIST_TEXT_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Description term (the item being described).',
	},
	dd: {
		allowedAttributes: LIST_TEXT_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Description details for a term.',
	},
};
