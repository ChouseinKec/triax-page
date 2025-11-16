import type { ElementRecord } from '@/src/core/block/element/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, PHRASING_CONTENT } from './shared';

const HEADING_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const HEADING_ELEMENTS: Partial<ElementRecord> = {
	h1: {
		attributes: HEADING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Top-level section heading.',
	},
	h2: {
		attributes: HEADING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Second-level section heading.',
	},
	h3: {
		attributes: HEADING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Third-level section heading.',
	},
	h4: {
		attributes: HEADING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Fourth-level section heading.',
	},
	h5: {
		attributes: HEADING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Fifth-level section heading.',
	},
	h6: {
		attributes: HEADING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Sixth-level section heading.',
	},
};
