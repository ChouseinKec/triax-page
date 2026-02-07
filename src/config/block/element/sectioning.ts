// Types
import type { ElementDefinition, ElementKey } from '@/core/block/element/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, FLOW_CONTENT, PHRASING_CONTENT } from './shared';

const FLOW_NO_HEADER_FOOTER: ElementKey[] = FLOW_CONTENT.filter((t) => t !== 'header' && t !== 'footer');

const SECTIONING_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];

export const SECTIONING_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'header',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: FLOW_NO_HEADER_FOOTER,
		forbiddenAncestors: ['header', 'footer'],
		structure: null,
		description: 'Introductory content or navigational aids for a section or page header.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'footer',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: FLOW_NO_HEADER_FOOTER,
		forbiddenAncestors: ['header', 'footer'],
		structure: null,
		description: 'Footer content for a section or page, typically containing metadata and related links.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'section',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Thematic grouping of content, usually with a heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'article',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Self-contained composition (e.g., blog post, comment) intended for reuse or distribution.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'aside',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Tangentially related content (e.g., sidebars, callouts).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'nav',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Section of navigation links (commonly lists and headings).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'address',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: ['address'],
		structure: null,
		description: 'Contact information for the nearest article or body (names, addresses, links).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'hgroup',
		allowedAttributes: SECTIONING_ATTRIBUTES,
		allowedChildren: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		forbiddenAncestors: null,
		structure: null,
		description: 'Groups a set of h1–h6 headings so they are treated as a single composite heading.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
];
