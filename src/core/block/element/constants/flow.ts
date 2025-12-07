import type { ElementRecord } from '@/src/core/block/element/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, FLOW_CONTENT, PHRASING_CONTENT, FLOW_WITH_FIGCAPTION } from './shared';

const FLOW_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];
const TEXT_ATTRIBUTES: AttributeKey[] = [...FLOW_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

const BLOCKQUOTE_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'cite'
];

export const FLOW_ELEMENTS: Partial<ElementRecord> = {
	div: {
		tag: 'div',
		allowedAttributes: FLOW_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Generic flow container used to group content without semantic meaning.',
	},
	p: {
		tag: 'p',
		allowedAttributes: TEXT_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Paragraph for grouping runs of phrasing text.',
	},
	main: {
		tag: 'main',
		allowedAttributes: FLOW_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Main landmark for dominant page content. Must be unique and typically excludes repeated site-wide content.',
	},
	pre: {
		tag: 'pre',
		allowedAttributes: TEXT_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Preformatted text preserving whitespace and newlines.',
	},
	blockquote: {
		tag: 'blockquote',
		allowedAttributes: BLOCKQUOTE_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Section quoted from another source with optional citation.',
	},
	figure: {
		tag: 'figure',
		allowedAttributes: FLOW_ATTRIBUTES,
		allowedChildren: FLOW_WITH_FIGCAPTION,
		forbiddenAncestors: null,
		uniqueElements: { figcaption: 1 },
		orderedElements: null,
		description: 'Self-contained content (image, code, etc.) with an optional figcaption.',
	},
	figcaption: {
		tag: 'figcaption',
		allowedAttributes: FLOW_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Caption for the nearest figure.',
	},
};
