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
		attributes: FLOW_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Generic flow container used to group content without semantic meaning.',
	},
	p: {
		attributes: TEXT_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Paragraph for grouping runs of phrasing text.',
	},
	main: {
		attributes: FLOW_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Main landmark for dominant page content. Must be unique and typically excludes repeated site-wide content.',
	},
	pre: {
		attributes: TEXT_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Preformatted text preserving whitespace and newlines.',
	},
	blockquote: {
		attributes: BLOCKQUOTE_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Section quoted from another source with optional citation.',
	},
	figure: {
		attributes: FLOW_ATTRIBUTES,
		allowedContent: FLOW_WITH_FIGCAPTION,
		description: 'Self-contained content (image, code, etc.) with an optional figcaption.',
	},
	figcaption: {
		attributes: FLOW_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Caption for the nearest figure.',
	},
};
