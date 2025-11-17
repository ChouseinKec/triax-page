import type { ElementRecord } from '@/src/core/block/element/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, FLOW_CONTENT, FLOW_NO_HEADER_FOOTER, PHRASING_CONTENT, HEADINGS_ONLY } from './shared';

const SECTIONING_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];

export const SECTIONING_ELEMENTS: Partial<ElementRecord> = {
	header: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedElements: FLOW_NO_HEADER_FOOTER,
		forbiddenAncestors: ['header', 'footer'],
		uniqueElements: null,
		orderedElements: null,
		description: 'Introductory content or navigational aids for a section or page header.',
	},
	footer: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedElements: FLOW_NO_HEADER_FOOTER,
		forbiddenAncestors: ['header', 'footer'],
		uniqueElements: null,
		orderedElements: null,
		description: 'Footer content for a section or page, typically containing metadata and related links.',
	},
	section: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedElements: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Thematic grouping of content, usually with a heading.',
	},
	article: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedElements: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Self-contained composition (e.g., blog post, comment) intended for reuse or distribution.',
	},
	aside: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedElements: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Tangentially related content (e.g., sidebars, callouts).',
	},
	nav: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedElements: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Section of navigation links (commonly lists and headings).',
	},
	address: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedElements: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Contact information for the nearest article or body (names, addresses, links).',
	},
	hgroup: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedElements: HEADINGS_ONLY,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Groups a set of h1–h6 headings so they are treated as a single composite heading.',
	},
};
