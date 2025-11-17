import type { ElementRecord } from '@/src/core/block/element/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, FLOW_CONTENT, FLOW_NO_HEADER_FOOTER, PHRASING_CONTENT, HEADINGS_ONLY } from './shared';

const SECTIONING_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];

export const SECTIONING_ELEMENTS: Partial<ElementRecord> = {
	header: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedContent: FLOW_NO_HEADER_FOOTER,
		description: 'Introductory content or navigational aids for a section or page header.',
	},
	footer: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedContent: FLOW_NO_HEADER_FOOTER,
		description: 'Footer content for a section or page, typically containing metadata and related links.',
	},
	section: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Thematic grouping of content, usually with a heading.',
	},
	article: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Self-contained composition (e.g., blog post, comment) intended for reuse or distribution.',
	},
	aside: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Tangentially related content (e.g., sidebars, callouts).',
	},
	nav: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Section of navigation links (commonly lists and headings).',
	},
	address: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Contact information for the nearest article or body (names, addresses, links).',
	},
	hgroup: {
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedContent: HEADINGS_ONLY,
		description: 'Groups a set of h1–h6 headings so they are treated as a single composite heading.',
	},
};
