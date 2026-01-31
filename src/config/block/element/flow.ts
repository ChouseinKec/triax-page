// Types
import type { ElementDefinition } from '@/core/block/element/types';
import type { AttributeKey } from '@/core/block/attribute/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, FLOW_CONTENT, PHRASING_CONTENT, FLOW_WITH_FIGCAPTION } from './shared';

const FLOW_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const TEXT_ATTRIBUTES: AttributeKey[] = [...FLOW_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

const BLOCKQUOTE_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'cite'];

export const FLOW_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'div',
		allowedAttributes: FLOW_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Generic flow container used to group content without semantic meaning.',
		isStyleEditable: true,
		isAttributeEditable: true,
		isDeletable: true,
	},
	{
		key: 'p',
		allowedAttributes: TEXT_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: ['p'],
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Paragraph for grouping runs of phrasing text.',
		isStyleEditable: true,
		isAttributeEditable: true,
		isDeletable: true,
	},
	{
		key: 'main',
		allowedAttributes: FLOW_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: ['main'],
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Main landmark for dominant page content. Must be unique and typically excludes repeated site-wide content.',
		isStyleEditable: true,
		isAttributeEditable: true,
		isDeletable: true,
	},
	{
		key: 'pre',
		allowedAttributes: TEXT_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Preformatted text preserving whitespace and newlines.',
		isStyleEditable: true,
		isAttributeEditable: true,
		isDeletable: true,
	},
	{
		key: 'blockquote',
		allowedAttributes: BLOCKQUOTE_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Section quoted from another source with optional citation.',
		isStyleEditable: true,
		isAttributeEditable: true,
		isDeletable: true,
	},
	{
		key: 'figure',
		allowedAttributes: FLOW_ATTRIBUTES,
		allowedChildren: FLOW_WITH_FIGCAPTION,
		forbiddenAncestors: null,
		uniqueChildren: { figcaption: 1 },
		orderedChildren: null,
		description: 'Self-contained content (image, code, etc.) with an optional figcaption.',
		isStyleEditable: true,
		isAttributeEditable: true,
		isDeletable: true,
	},
	{
		key: 'figcaption',
		allowedAttributes: FLOW_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Caption for the nearest figure.',
		isStyleEditable: true,
		isAttributeEditable: true,
		isDeletable: true,
	},
];
