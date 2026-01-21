// Types
import type { ElementDefinition } from '@/core/block/element/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, FLOW_CONTENT, FLOW_NO_HEADER_FOOTER, PHRASING_CONTENT, HEADINGS_ONLY } from './shared';

const SECTIONING_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];

export const SECTIONING_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'header',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: FLOW_NO_HEADER_FOOTER,
		forbiddenAncestors: ['header', 'footer'],
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Introductory content or navigational aids for a section or page header.',
	},
	{
		key: 'footer',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: FLOW_NO_HEADER_FOOTER,
		forbiddenAncestors: ['header', 'footer'],
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Footer content for a section or page, typically containing metadata and related links.',
	},
	{
		key: 'section',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Thematic grouping of content, usually with a heading.',
	},
	{
		key: 'article',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Self-contained composition (e.g., blog post, comment) intended for reuse or distribution.',
	},
	{
		key: 'aside',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Tangentially related content (e.g., sidebars, callouts).',
	},
	{
		key: 'nav',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Section of navigation links (commonly lists and headings).',
	},
	{
		key: 'address',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Contact information for the nearest article or body (names, addresses, links).',
	},
	{
		key: 'hgroup',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: HEADINGS_ONLY,
		forbiddenAncestors: null,
		uniqueChildren: null,
		orderedChildren: null,
		description: 'Groups a set of h1–h6 headings so they are treated as a single composite heading.',
	},
];
