import type { ElementRecord } from '@/src/core/block/element/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, PHRASING_CONTENT } from './shared';

const HEADING_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const HEADING_ELEMENTS: Partial<ElementRecord> = {
	h1: {
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedElements: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Top-level section heading.',
	},
	h2: {
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedElements: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Second-level section heading.',
	},
	h3: {
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedElements: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Third-level section heading.',
	},
	h4: {
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedElements: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Fourth-level section heading.',
	},
	h5: {
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedElements: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Fifth-level section heading.',
	},
	h6: {
		allowedAttributes: HEADING_ATTRIBUTES,
		allowedElements: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Sixth-level section heading.',
	},
};
